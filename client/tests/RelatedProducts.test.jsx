import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import RelatedProducts from '../components/relatedProducts/RelatedProducts';

// beforeEach(() => {
//   console.log('hey there');

// });

describe('Related Products Component', () => {
  render(<RelatedProducts productId={48432} />);

  test('Component renders heading on mount', () => {
    expect(screen.getByRole('heading')).toHaveTextContent('Related Products');
  });

  test('should display list elements', async () => {
    const cards = await screen.queryAllByRole('li');

    expect(cards).toHaveLength(1);
  });
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
