import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import ProductOverview from '../components/ProductOverview/ProductOverview';

beforeEach(() => {
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

  render(<ProductOverview currentProduct={mockCurrent} productId={mockCurrent.id} />);
});

describe('Product Overview Component', () => {
  test('Should show loading indicator before item render', () => {
    expect(screen.getByText('Loading Product Info'));
  });
});
