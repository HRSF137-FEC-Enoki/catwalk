import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewList from './ReviewList';
import WriteReview from '../WriteReview/WriteReview';
import Sorting from '../Sorting/Sorting';
import '../../../css/reviewRating.scss';

const ReviewRating = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewShow, setReviewShow] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [isClickAdd, setIsClickAdd] = useState(false);
  const [sort, setSort] = useState('relevant');

  useEffect(() => {
    axios.get('/api/reviews', { params: { product_id: id, sort } })
      .then((res) => setReviews(res.data.results));
  }, [sort]);

  const loadMoreView = () => {
    if (reviews.length - reviewShow <= 2) {
      setIsLoading(true);
    }
    setReviewShow(reviewShow + 2);
  };

  const closeWriteReview = () => {
    setIsClickAdd(false);
  };
  return (
    <>
      <Sorting id={id} setSort={setSort} reviews={reviews} />
      <div className="reviewRatingContainer">
        <ReviewList reviews={reviews} reviewShow={reviewShow} />
      </div>
      <div className="reviewBtn">
        {reviews.length > 2 && !isLoading && <button data-testid="button" type="button" onClick={loadMoreView}>More View</button>}
        <button type="button" onClick={() => setIsClickAdd(true)}>
          ADD A REVIEW +
        </button>
        <WriteReview isClickAdd={isClickAdd} closeWriteReview={closeWriteReview} id={id} />
      </div>
    </>
  );
};
ReviewRating.propTypes = {
  id: PropTypes.number,
}.isRequired;

export default ReviewRating;
