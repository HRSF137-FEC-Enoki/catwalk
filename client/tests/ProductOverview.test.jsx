import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import ProductOverview from '../components/ProductOverview/ProductOverview';

beforeEach(() => {
  render(<ProductOverview />);
});

describe('Product Overview Component', () => {
  test('Header Contains Greeting', () => {
    expect(screen.getByText('This is the product overview page')).toBeInTheDocument();
  });
  test('Product Image Should Be Present', () => {
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
