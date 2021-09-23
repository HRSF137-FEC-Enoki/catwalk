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

  const mockProduct = {
    id: 48432,
    campus: 'hr-sfo',
    name: 'Camo Onesie',
    slogan: 'Blend in to your crowd',
    description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
    category: 'Jackets',
    default_price: '140.00',
    created_at: '2021-09-09T19:03:37.378Z',
    updated_at: '2021-09-09T19:03:37.378Z',
    features: [
      {
        feature: 'Fabric',
        value: 'Canvas',
      },
      {
        feature: 'Buttons',
        value: 'Brass',
      },
    ],
  };

  beforeEach(async () => {
    axios.get.mockImplementation((url) => {
      if (url === '/api/products/1234/related') {
        return Promise.resolve({ data: mockRelated });
      } if (url === 'api/products/1234') {
        return Promise.resolve({ data: mockProduct });
      }
      return Promise.reject(new Error('error:: not found'));
    });

    await act(async () => {
      render(<RelatedProducts
        currentProduct={mockCurrent}
        handleCardClick={() => {}}
      />);
    });
  });

  test('it should have a header element', () => {
    expect(screen.getByRole('heading')).toHaveTextContent('Related Products');
  });

  test('it should render a loading state', () => {
    expect(screen.getByText('Loadiing Related Products!')).toBeInTheDocument();
  });

  // test('it should render multiple list elements', async () => {
  //   const items = await screen.findAllByTestId('list-items');

  //   expect(items.length).toBeGreaterThan(0);
  // });
});
