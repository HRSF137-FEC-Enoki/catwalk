import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

import ProductOverview from '../components/ProductOverview/ProductOverview';
import mockStylesData from '../../MockData';

jest.mock('axios');

describe('Product Overview Component', () => {
  let rerender;
  beforeEach(async () => {
    const mockCurrent = {
      id: 48432,
      name: 'Jackson Pollock',
      category: 'art',
      default_price: '8765',
      features: [
        { feature: 'medium', value: 'walls' },
        { feature: 'design', value: 'abstract' },
        { feature: 'tools', value: 'splattergun' },
      ],
    };
    const rating = 3.8;
    const totalReviews = 12;

    axios.get.mockResolvedValue({ data: mockStylesData });
    await act(async () => {
      const renderOptions = render(
        <ProductOverview
          currentProduct={mockCurrent}
          productId={mockCurrent.id}
          rating={rating}
          totalReviews={totalReviews}
        />,
      );

      rerender = renderOptions.rerender;
    });
  });

  test('Buttons should exist', async () => {
    expect(screen.getAllByRole('button'));
  });

  test('Shirt size and quantity should exist', () => {
    expect(screen.getAllByRole('combobox'));
  });

  // If first style id changes, this test will fail
  // We expect the Forest Green & Black style to be the first result
  test('Forest Green & Black is selected on load', () => {
    expect(screen.getByTestId(293480)).toHaveAttribute('id', 'selected');
  });

  test('Clicking on new style updates currently selected style', () => {
    userEvent.click(screen.getByTestId(293481));
    expect(screen.getByTestId(293481)).toHaveAttribute('id', 'selected');
  });

  test('Applies sale price on appropriate style', () => {
    userEvent.click(screen.getByTestId(293482));
    expect(screen.getByTestId('original-price')).toHaveClass('priceStrikethrough');
    expect(screen.getByTestId('original-price')).toHaveTextContent('$140.00');
    expect(screen.getByTestId('sale-price')).toHaveTextContent('$100.00');
  });

  test('Expands main image on click', () => {
    userEvent.click(screen.getByTestId('main-image'));
    expect(screen.getByTestId('main-image')).toHaveClass('focusedImageExpand');
    expect(screen.getByTestId('product-info')).toHaveAttribute('id', 'collapsed');
  });

  test('Navigates to next image on right arrow click', () => {
    userEvent.click(screen.getByTestId('right-arrow'));
    expect(screen.getByTestId('main-image')).toHaveStyle({
      backgroundImage: 'url("https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80")',
    });
  });
  test('Navigates to previous image on left arrow click', () => {
    userEvent.click(screen.getByTestId('right-arrow'));
    userEvent.click(screen.getByTestId('right-arrow'));
    userEvent.click(screen.getByTestId('left-arrow'));
    expect(screen.getByTestId('main-image')).toHaveStyle({
      backgroundImage: 'url("https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80")',
    });
  });

  test('Product Overview Component without total reviews', async () => {
    const mockCurrent = {
      id: 48432,
      name: 'Jackson Pollock',
      category: 'art',
      default_price: '8765',
      features: [
        { feature: 'medium', value: 'walls' },
        { feature: 'design', value: 'abstract' },
        { feature: 'tools', value: 'splattergun' },
      ],
    };
    const rating = 3.8;
    const totalReviews = 0;
    axios.get.mockResolvedValue({ data: mockStylesData });
    await act(async () => rerender(<ProductOverview
      currentProduct={mockCurrent}
      productId={mockCurrent.id}
      rating={rating}
      totalReviews={totalReviews}
    />));
    expect(screen.queryByText(/Read all/i)).not.toBeInTheDocument();
  });
});
