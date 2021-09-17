import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RelatedProducts from '../components/relatedProducts/RelatedProducts';

describe('Comparison Modal', () => {
  // const mockRelated = {
  //   name: 'Banksy',
  //   category: 'art',
  //   default_price: '9999',
  //   features: [
  //     { feature: 'medium', value: 'canvas' },
  //     { feature: 'design', value: 'grafitti' },
  //   ],
  // };

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

  beforeEach(() => {
    render(<RelatedProducts currentProduct={mockCurrent} rating={4.25} />);
  });

  test('the comparison modal should be hidden on intitial page load', async () => {
    expect(screen.queryByText(/Testing This/)).toBeNull();

    screen.debug();

    expect(await screen.findByText(/Testing This/)).toBeInTheDocument();

    screen.debug();
  });
});
