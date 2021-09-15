import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import Card from '../components/relatedProducts/Card';

beforeEach(() => {
  const mockProduct = {
    name: 'Adidas Supernovas',
    slogan: 'Out of this world!',
    category: 'Footwear',
    default_price: '90.00',
  };
  render(<Card relatedProduct={mockProduct} />);
});

describe('Card Component', () => {
  test('Should combine name and slogan separated by a colon', () => {
    // use regex to find element with name text
    expect(screen.getByText(/Adidas Supernovas/)).toHaveTextContent('Adidas Supernovas : Out of this world!');
  });

  test('should have background-image style set', () => {
    const imageDiv = screen.getByTestId('card-image');

    screen.debug();

    expect(imageDiv).toHaveStyle({
      backgroundImage: 'url(\'https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80\')',
    });
  });

  // test('Should render one button', () => {
  //   expect(screen.queryAllByRole('button')).toHaveLength(1);
  // });
  // test('Initial count value should be 0', () => {
  //   expect(screen.getByRole('button')).toHaveTextContent(0);
  // });
  // test('Clicking button should increment count value by 1', () => {
  //   userEvent.click(screen.getByRole('button'));
  //   expect(screen.getByRole('button')).toHaveTextContent(1);
  //   userEvent.click(screen.getByRole('button'));
  //   userEvent.click(screen.getByRole('button'));
  //   expect(screen.getByRole('button')).toHaveTextContent(3);
  // });
});
