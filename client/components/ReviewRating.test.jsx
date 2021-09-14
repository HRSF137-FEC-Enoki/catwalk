import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ReviewRating from './ReviewRating/ReviewList/ReviewRating';

beforeEach(() => {
  render(<ReviewRating />);
});

describe('ReviewRating Component', () => {
  test('should equal to 2', () => {
    expect(screen.getByText('review'));
  });
  // test('Header Contains Greeting', () => {
  //   expect(screen.getByRole('heading')).toHaveTextContent('Hello from the React App');
  // });
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
