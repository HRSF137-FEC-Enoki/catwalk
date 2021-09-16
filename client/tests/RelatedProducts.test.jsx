import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import RelatedProducts from '../components/relatedProducts/RelatedProducts';

describe('Related Products', () => {
  const mockProductId = 43432;

  beforeEach(() => {
    render(<RelatedProducts productId={mockProductId} />);
  });

  test('it should have a header element', () => {
    expect(screen.getByRole('heading')).toHaveTextContent('Related Products');
  });

  test('it should render multiple list elements', async () => {
    const items = await screen.findAllByRole('li');

    expect(items.length).toBeGreaterThan(0);
  });
});
