import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ComparisonModal from '../components/relatedProducts/ComparisonModal';

describe('Comparison Modal', () => {
  const mockRelated = {
    name: 'Banksy',
    category: 'art',
    default_price: '9999',
    features: [
      { feature: 'medium', value: 'canvas' },
      { feature: 'design', value: 'grafitti' },
    ],
  };

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
    render(<ComparisonModal
      current={mockCurrent}
      related={mockRelated}
      handleCloseClick={() => {}}
    />);
  });

  test('renders the comparison modal', async () => {
    screen.debug();

    expect(screen.getByText('Comparing')).toBeInTheDocument();
  });

  test('It should display name of current product', () => {
    expect(screen.getByText('Jackson Pollock')).toBeInTheDocument();
  });

  test('It should display name of related product', () => {
    expect(screen.getByText('Banksy')).toBeInTheDocument();
  });

  test('It should set a feature when not in current', () => {
    expect(screen.getByText('tools')).toBeInTheDocument();
    expect(screen.getByText('splatterfun')).toBeInTheDocument();
  });
});
