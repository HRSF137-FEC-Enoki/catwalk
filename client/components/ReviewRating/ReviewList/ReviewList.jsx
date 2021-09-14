import React from 'react';
import PropTypes from 'prop-types';
import Review from './Review';

const ReviewList = ({ reviews, reviewShow }) => (
  <div className="reviewList">
    {reviews.filter((element, index) => index < reviewShow).map((review) => (
      <Review key={review.review_id} review={review} />
    ))}
  </div>
);
ReviewList.propTypes = {
  reviews: PropTypes.instanceOf(Array).isRequired,
  reviewShow: PropTypes.number.isRequired,
};

export default ReviewList;
