import React from 'react';

import Moment from 'react-moment';
import { AiOutlineCheck } from 'react-icons/ai';
import PropTypes from 'prop-types';

import ReviewBody from './ReviewBody';
import Helpfulness from './Helpfulness';
import StarRating from '../../StarRating';

const STAR_SIZE = 16;
const Review = ({ review, fetchReviews, fetchMeta }) => (
  <div className="review">
    <div className="rating_reviewer_date">
      <StarRating size={STAR_SIZE} rating={review.rating} />
      <div>
        {review.reviewer_name}
        <span>,&nbsp;</span>
        <Moment format="MMMM Do, YYYY">{review.date}</Moment>
      </div>
    </div>

    <div className="summary" data-testid="summary">{review.summary}</div>
    <ReviewBody review={review} />
    {review.recommend && (
      <div className="recommend">
        <AiOutlineCheck />
        <span data-testid="recommend">I recommend this product</span>
      </div>
    )}
    {review.response && (
      <div className="review_response">
        <p>Response:</p>
        <p data-testid="review_response">{review.response}</p>
      </div>
    )}
    <Helpfulness review={review} fetchReviews={fetchReviews} fetchMeta={fetchMeta} />
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
