import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import ProductOverview from '../components/ProductOverview/ProductOverview';

beforeEach(() => {
  render(<ProductOverview />);
});

describe('Product Overview Component', () => {
  test('Product overview container should exist', () => {
    expect(screen.getByTestId('productOverView'));
  });
});
