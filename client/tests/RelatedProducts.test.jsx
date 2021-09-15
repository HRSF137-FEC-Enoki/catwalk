import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import RelatedProducts from '../components/relatedProducts/RelatedProducts';

describe('Related Products', () => {
  beforeEach(() => {
    render(<RelatedProducts productId={43432} />);
  });

  test('it should have a header element', () => {
    expect(screen.getByRole('heading')).toHaveTextContent('Related Products');
  });

  // test('it should render multiple list elements', () => {
  //   screen.findAllByRole('');
  // });
});
