import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import rerender from 'react-test-renderer';

import ReviewRating from '../components/ReviewRating/ReviewList/ReviewRating';
import ReviewBody from '../components/ReviewRating/ReviewList/ReviewBody';
import Helpfulness from '../components/ReviewRating/ReviewList/Helpfulness';

describe('ReviewRating Component', () => {
  test('render ReviewList Component', () => {
    const rendered = render(<ReviewRating />);
    const div = rendered.container.querySelector('div');
    expect(div.className).toBe('widget');
  });
  test('render reviewBody Component', () => {
    const { getByTestId } = render(<Helpfulness />);
    const input = getByTestId('helpful');
    expect(input).toBeTruthy();
  });
  test('render reviewBody Component', () => {
    const { getByTestId } = render(<ReviewBody />);
    const input = getByTestId('reviewBody');
    expect(input).toBeTruthy();
  });
  test('render reviewBody Component', () => {
    const component = rerender.create(<ReviewRating />).getInstance();
    if (component) {
      component.datafunction();
      expect(component.state.reviewShow).toBe(2);
    }
  });
});
