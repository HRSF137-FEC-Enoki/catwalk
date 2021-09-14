import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewList from './ReviewList';
import '../../../css/reviewRating.css';

const ReviewRating = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewShow, setReviewShow] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get('/reviews', { params: { product_id: id } })
      .then((res) => setReviews(res.data.results));
  }, []);
  const loadMoreView = () => {
    if (reviews.length - reviewShow <= 2) {
      setIsLoading(true);
    }
    setReviewShow(reviewShow + 2);
  };
  return (
    <>
      <div className="reviewRatingContainer"><ReviewList reviews={reviews} reviewShow={reviewShow} /></div>
      {reviews.length > 2 && !isLoading && <button data-testid="button" type="button" onClick={loadMoreView}>More View</button>}
    </>
  );
};
ReviewRating.propTypes = {
  id: PropTypes.number,
}.isRequired;

export default ReviewRating;
