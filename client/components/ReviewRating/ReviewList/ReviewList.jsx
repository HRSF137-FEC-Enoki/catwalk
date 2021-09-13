import React from 'react';
import Review from './Review';
import reviews from './reviews';

const ReviewList = () => (
  <div>
    {reviews.map((review) => (
      <Review review={review} />
    ))}
  </div>
);

export default ReviewList;
