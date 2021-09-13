import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import ReviewBody from './ReviewBody';
import Helpfulness from './Helpfulness';
import StarRating from './StarRating';

const Review = ({ review }) => {
  console.log(review);
  return (
    <div>
      <StarRating review={review} />
      <div>
        {review.reviewer_name}
        {review.date}
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
};

export default Review;
