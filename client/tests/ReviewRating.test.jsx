import React from 'react';
import '@testing-library/jest-dom';
import {
  render, screen, fireEvent, act,
} from '@testing-library/react';
import rerender from 'react-test-renderer';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

import ReviewRating from '../components/ReviewRating/ReviewList/ReviewRating';
import ReviewBody from '../components/ReviewRating/ReviewList/ReviewBody';
import Helpfulness from '../components/ReviewRating/ReviewList/Helpfulness';
import RatingBreakDown from '../components/ReviewRating/RatingBreakDown/RatingBreakDown';
import Review from '../components/ReviewRating/ReviewList/Review';

jest.mock('axios');
const mockReviews = {
  data: {
    results: [
      {
        review_id: 841168,
        rating: 1,
        summary: 'Not good value',
        recommend: true,
        response: 'Thank you',
        body: 'Wouldn\'t recommend. The quality is on par with cheaper competitors. This was so bad that I tried to call the company when I got my order. The customer service rep I spoke to only answered when I called him on his private line. He was polite and said I could get a refund but it\'s still poor value for money.',
        date: '2021-09-18T00:00:00.000Z',
        reviewer_name: 'Elizabeth',
        helpfulness: 62,
        photos: [],
      },
    ],
  },
};
const mockMetas = {
  data: {
    product_id: 48432,
    ratings: {
      1: 4,
      2: 8,
      3: 6,
      4: 2,
      5: 56,
    },
    recommended: {
      false: 32,
      true: 44,
    },
    characteristics: {
      Fit: {
        id: 162510,
        value: 3.4400000000000000,
      },
      Length: {
        id: 162511,
        value: 3.7045454545454545,
      },
      Comfort: {
        id: 162512,
        value: 2.4186046511627907,
      },
      Quality: {
        id: 162513,
        value: 2.9200000000000000,
      },
    },
  },
};
describe('ReviewRating Component', () => {
  beforeEach(async () => {
    await axios.get.mockImplementation((url) => {
      if (url === '/api/reviews') {
        return Promise.resolve(mockReviews);
      }
      return Promise.resolve(mockMetas);
    });
    await act(async () => {
      await render(<ReviewRating
        id={48432}
        rating={2}
        productName="Jacket"
      />);
    });
  });

  test('axios get request has been called', async () => {
    expect(axios.get).toHaveBeenCalled();
  });
  test('Add Review button in the page', async () => {
    expect(screen.getByTestId('addBtn')).toBeInTheDocument();
  });
  test('click on star filter display corresponding reviews', () => {
    fireEvent.click(screen.getByTestId('star2'));
    expect(screen.getByTestId('review_list').children.length).toBe(0);
  });
  test('click on Add button have a form pop up', async () => {
    const button = screen.getByTestId('addBtn');
    fireEvent.click(button);
    expect(screen.getByText('Write Your Review')).toBeInTheDocument();
    const email = screen.getByTestId('form_email');
    userEvent.type(email, 'example@yahoo.com');
    userEvent.type(screen.getByTestId('form_summary'), 'Have a great day');
    userEvent.type(screen.getByTestId('form_name'), 'ABC');
    userEvent.type(screen.getByTestId('form_body'), 'The shoes fit very well');
    expect(email).toHaveValue('example@yahoo.com');
    const submit = screen.getByTestId('submit');
    await axios.post.mockResolvedValue();
    expect(screen.getByTestId('cancel')).toBeInTheDocument();
    fireEvent.click(submit);
  });
});
describe('sub-component in ReviewRating', () => {
  test('render Helpfulness Component', async () => {
    await act(async () => {
      await render(<Helpfulness
        review={mockReviews.data.results[0]}
        fetchReviews={() => { }}
        fetchMeta={() => { }}
      />);
    });
    const input = screen.getByTestId('helpful');
    expect(input).toBeTruthy();
    await axios.put.mockResolvedValue();
    const helpfulLink = screen.getByTestId('helpful_link');
    fireEvent.click(helpfulLink);
    expect(helpfulLink).not.toHaveAttribute('href', '/');
  });
  test('render reviewBody Component', () => {
    const { getByTestId } = render(<ReviewBody />);
    const input = getByTestId('reviewBody');
    expect(input).toBeTruthy();
  });
  test('initial reviewShow state set to be 2', () => {
    const component = rerender.create(<ReviewRating />).getInstance();
    if (component) {
      component.datafunction();
      expect(component.state.reviewShow).toBe(2);
    }
  });
  test('render review Component', () => {
    const mockReview = {
      review_id: 841168,
      rating: 1,
      summary: 'Not good value',
      recommend: true,
      response: 'Thank you',
      body: 'Wouldn\'t recommend. The quality is on par with cheaper competitors. This was so bad that I tried to call the company when I got my order. The customer service rep I spoke to only answered when I called him on his private line. He was polite and said I could get a refund but it\'s still poor value for money.',
      date: '2021-09-18T00:00:00.000Z',
      reviewer_name: 'Elizabeth',
      helpfulness: 62,
      photos: [],
    };
    const { getByTestId } = render(<Review
      review={mockReview}
      fetchReviews={() => { }}
      fetchMeta={() => { }}
    />);
    const summary = getByTestId('summary');
    expect(summary.textContent).toBe('Not good value');
    const recommend = getByTestId('recommend');
    expect(recommend.textContent).toBe('I recommend this product');
    const response = getByTestId('review_response');
    expect(response.textContent).toBe('Thank you');
  });
});
describe('Rating and Product breakdown component', () => {
  test('render product breakdown component', () => {
    render(<RatingBreakDown
      id={12}
      setStarFilter={() => { }}
      starFilter={[]}
      rating={3}
      charValue={[1, 2, 3]}
      charName={['Fit', 'Quality', 'Length']}
      ratings={3.3}
      recommended={{ false: 69, true: 45 }}
      fetchMeta={() => { }}
    />);
    const text = screen.getByRole('note');
    expect(text).toHaveTextContent('of reviews recommend this product');
  });
});
