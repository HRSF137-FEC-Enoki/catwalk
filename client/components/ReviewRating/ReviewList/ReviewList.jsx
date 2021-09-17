import React from 'react';
import PropTypes from 'prop-types';

import Review from './Review';

const ReviewList = ({ reviews, reviewShow, fetchReviews }) => (
  <div className="reviewList">
    {reviews.filter((element, index) => index < reviewShow).map((review) => (
      <Review key={review.review_id} review={review} fetchReviews={fetchReviews} />
    ))}
  </div>
);
ReviewList.propTypes = {
  reviews: PropTypes.instanceOf(Array).isRequired,
  reviewShow: PropTypes.number,
  fetchReviews: PropTypes.func,
}.isRequired;

export default ReviewList;
