import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';

import RelatedProducts from '../components/relatedProducts/RelatedProducts';

jest.mock('axios');

describe('Related Products', () => {
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

  const mockRelated = [
    48433,
    48434,
    48439,
    48438,
  ];

  beforeEach(async () => {
    // let rerender;

    axios.get.mockResolvedValueOnce({ data: mockRelated });

    await act(async () => {
      const renderOptions = render(<RelatedProducts
        currentProduct={mockCurrent}
        handleCardClick={() => {}}
      />);

      // rerender = renderOptions.render;
    });
  });

  test('it should have a header element', () => {
    expect(screen.getByRole('heading')).toHaveTextContent('Related Products');
  });

  test('it should render a loading state', () => {
    expect(screen.getByText('Loadiing Related Products!')).toBeInTheDocument();
  });

  test('it should render multiple list elements', async () => {
    const items = await screen.findAllByTestId('list-items');

    expect(items.length).toBeGreaterThan(0);
  });
});
