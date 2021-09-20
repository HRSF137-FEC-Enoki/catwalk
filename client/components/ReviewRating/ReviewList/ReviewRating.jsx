import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import WriteReview from '../WriteReview/WriteReview';
import Sorting from '../Sorting/Sorting';
import RatingBreakDown from '../RatingBreakDown/RatingBreakDown';
import ReviewList from './ReviewList';

import '../../../css/reviewRating.scss';

const ReviewRating = ({ id, rating }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewShow, setReviewShow] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [isClickAdd, setIsClickAdd] = useState(false);
  const [sort, setSort] = useState('relevant');
  const [starFilter, setStarFilter] = useState([]);
  const [currReviewsLength, setCurrReviewsLength] = useState(0);
  const [charName, setCharName] = useState([]);
  const [charId, setCharId] = useState([]);
  const [charValue, setCharValue] = useState([]);

  const fetchReviews = () => {
    axios.get('/api/reviews', { params: { product_id: id, sort } })
      .then((res) => setReviews(res.data.results));
  };
  useEffect(() => {
    axios.get(`/api/reviews/meta/${id}`)
      .then((res) => {
        setCharName(Object.entries(res.data.characteristics)
          .map((name) => name[0]));
        setCharId(Object.entries(res.data.characteristics)
          .map((name) => name[1])
          .map((_id) => _id.id));
        setCharValue(Object.entries(res.data.characteristics)
          .map((name) => name[1])
          .map((val) => parseInt(val.value, 10)));
      });
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [sort]);

  const loadMoreView = () => {
    if (currReviewsLength - reviewShow <= 2) {
      setIsLoading(true);
    }
    setReviewShow(reviewShow + 2);
  };

  const closeWriteReview = () => {
    setIsClickAdd(false);
  };
  return (
    <div className="review_rating_container">
      <div className="rating_col">
        <RatingBreakDown
          id={id}
          starFilter={starFilter}
          setStarFilter={setStarFilter}
          rating={rating}
          charName={charName}
          charValue={charValue}
        />
      </div>
      <div className="review_col">
        <Sorting id={id} setSort={setSort} reviews={reviews} />
        <div className="review_list_container">
          <ReviewList
            reviews={reviews}
            reviewShow={reviewShow}
            fetchReviews={fetchReviews}
            starFilter={starFilter}
            setStarFilter={setStarFilter}
            rating={rating}
            charName={charName}
            charValue={charValue}
            setCurrReviewsLength={setCurrReviewsLength}
          />
        </div>
        <div className="review_btn">
          {reviews.length > 2 && !isLoading && <button data-testid="button" type="button" onClick={loadMoreView}>View More</button>}
          <button type="button" onClick={() => setIsClickAdd(true)}>
            Add a Review +
          </button>
          <WriteReview
            isClickAdd={isClickAdd}
            closeWriteReview={closeWriteReview}
            id={id}
            fetchReviews={fetchReviews}
            charId={charId}
          />
        </div>
      </div>
    </div>
  );
};
ReviewRating.propTypes = {
  id: PropTypes.number,
}.isRequired;

export default ReviewRating;
