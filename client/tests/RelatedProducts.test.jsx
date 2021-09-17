import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import RelatedProducts from '../components/relatedProducts/RelatedProducts';

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

  const mockRating = 3.5;

  beforeEach(() => {
    render(<RelatedProducts currentProduct={mockCurrent} rating={mockRating} />);
  });

  test('it should have a header element', () => {
    expect(screen.getByRole('heading')).toHaveTextContent('Related Products');
  });

  // test('it should render multiple list elements', async () => {
  //   const items = await screen.findAllByRole('');

  //   expect(items.length).toBeGreaterThan(0);
  // });
});
