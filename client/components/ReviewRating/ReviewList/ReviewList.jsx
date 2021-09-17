import React from 'react';
import PropTypes from 'prop-types';
import Review from './Review';

const ReviewList = ({
  reviews, reviewShow, fetchReviews, starFilter, setCurrReviewsLength,
}) => {
  const filterList = (num) => {
    let list;
    if (num === 0) {
      list = reviews.filter(
        (element, index) => index < reviewShow,
      );
    } else {
      list = reviews.filter((r) => starFilter.includes(r.rating)).filter(
        (element, index) => index < reviewShow,
      );
    }
    setCurrReviewsLength(list.length);
    return list;
  };
  return (
    <>
      {
        starFilter.length === 0
          ? (
            <div className="reviewList">
              {filterList(0).map((review) => (
                <Review key={review.review_id} review={review} fetchReviews={fetchReviews} />
              ))}
            </div>
          )
          : (
            <div className="reviewList">
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
