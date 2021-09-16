import React from 'react';

import Moment from 'react-moment';
import { AiOutlineCheck } from 'react-icons/ai';
import PropTypes from 'prop-types';

import ReviewBody from './ReviewBody';
import Helpfulness from './Helpfulness';
import StarRating from './StarRating';

const Review = ({ review, fetchReviews }) => (
  <div className="review">
    <div className="rating_reviewer_date">
      <StarRating />
      <div>
        {review.reviewer_name}
        <span>,&nbsp;</span>
        <Moment format="MMMM Do, YYYY">{review.date}</Moment>
      </div>
    </div>

    <div className="summary">{review.summary}</div>
    <ReviewBody review={review} />
    {review.recommend ? (
      <div className="recommend">
        <AiOutlineCheck />
        <span>I recommend this product</span>
      </div>
    ) : ''}
    {review.response ? (
      <div className="reviewResponse">
        <p>Response:</p>
        <p>{review.response}</p>
      </div>
    )
      : ''}
    <Helpfulness review={review} fetchReviews={fetchReviews} />
  </div>
);
Review.propTypes = PropTypes.shape({
  review_name: PropTypes.string,
  date: PropTypes.string,
  summary: PropTypes.string,
  recommend: PropTypes.string,
  response: PropTypes.string,
}).isRequired;

export default Review;
