import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Card from '../components/relatedProducts/Card';

beforeEach(() => {
  const mockProduct = {
    name: 'Adidas Supernovas',
    slogan: 'Out of this world!',
    category: 'Footwear',
    default_price: '90.00',
  };
  const mockRating = 2.25;
  const mockUrl = 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80';

  render(<Card
    relatedProduct={mockProduct}
    rating={mockRating}
    imageUrl={mockUrl}
    handleCardClick={() => {}}
  />);
});

describe('Card Component', () => {
  test('Should combine name and slogan separated by a colon', () => {
    expect(screen.getByText(/Adidas Supernovas/)).toHaveTextContent('Adidas Supernovas : Out of this world!');
  });
});
