/* eslint-disable react/prop-types */
import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import Moment from 'react-moment';
import ReviewBody from './ReviewBody';
import Helpfulness from './Helpfulness';
import StarRating from './StarRating';

const Review = ({ review }) => (
  <div>
    <StarRating review={review} />
    <div>
      {review.reviewer_name}
      <span>,&nbsp;</span>
      <Moment format="MMMM Do, YYYY">{review.date}</Moment>
    </div>
    <div>{review.summary}</div>
    <ReviewBody review={review} />
    {review.recommend ? (
      <div>
        <AiOutlineCheck />
        <span>I recommend this product</span>
      </div>
    ) : ''}
    {review.response ? (
      <div>
        <div>Response:</div>
        {review.response}
      </div>
    )
      : ''}
    <Helpfulness review={review} />
  </div>
);

export default Review;
