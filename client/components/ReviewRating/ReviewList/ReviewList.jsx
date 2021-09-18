import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Review from './Review';

const ReviewList = ({
  reviews, reviewShow, fetchReviews, starFilter, setCurrReviewsLength,
}) => {
  let list;
  const filterList = (num) => {
    if (num === 0) {
      list = reviews.filter(
        (element, index) => index < reviewShow,
      );
    } else {
      list = reviews.filter((r) => starFilter.includes(r.rating)).filter(
        (element, index) => index < reviewShow,
      );
    }
    return list;
  };
  useEffect(() => {
    setCurrReviewsLength(list.length);
  }, [list]);
  return (
    <>
      {
        starFilter.length === 0
          ? (
            <div className="review_list">
              {filterList(0).map((review) => (
                <Review key={review.review_id} review={review} fetchReviews={fetchReviews} />
              ))}
            </div>
          )
          : (
            <div className="review_list">
              {filterList(1).map((review) => (
                <Review key={review.review_id} review={review} fetchReviews={fetchReviews} />
              ))}
            </div>
          )
      }
    </>
  );
};
ReviewList.propTypes = {
  reviews: PropTypes.instanceOf(Array).isRequired,
  reviewShow: PropTypes.number,
  fetchReviews: PropTypes.func,
}.isRequired;

export default ReviewList;
