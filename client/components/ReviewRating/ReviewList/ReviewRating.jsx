import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import WriteReview from '../WriteReview/WriteReview';
import Sorting from '../Sorting/Sorting';
import RatingBreakDown from '../RatingBreakDown/RatingBreakDown';
import ReviewList from './ReviewList';

import '../../../css/reviewRating.scss';

const ReviewRating = ({ id, rating, productName }) => {
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
  const [ratings, setRatings] = useState({});
  const [recommended, setRecommended] = useState({});

  const fetchReviews = () => {
    axios.get('/api/reviews', { params: { product_id: id, sort } })
      .then((res) => setReviews(res.data.results));
  };
  const fetchMeta = () => {
    axios.get(`/api/reviews/meta/${id}`)
      .then((res) => {
        setRatings(res.data.ratings);
        setRecommended(res.data.recommended);
      });
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
    fetchMeta();
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [sort]);

  const loadMoreView = () => {
    if (currReviewsLength - reviewShow <= 2) {
      setIsLoading(true);
    }
    fetchMeta();
    setReviewShow(reviewShow + 2);
  };

  const closeWriteReview = () => {
    fetchMeta();
    setIsClickAdd(false);
  };
  return (
    <div className="widget">
      {reviews.length !== 0
        ? (

          <div className="review_rating_container" data-testid="widget">
            <h3>Ratings and Reviews</h3>
            <div className="rating_col">
              <RatingBreakDown
                id={id}
                starFilter={starFilter}
                setStarFilter={setStarFilter}
                rating={rating}
                charName={charName}
                charValue={charValue}
                ratings={ratings}
                recommended={recommended}
                fetchMeta={fetchMeta}
              />
            </div>
            <div className="review_col">
              <Sorting id={id} setSort={setSort} reviews={reviews} fetchMeta={fetchMeta} />
              <div className="review_list_container">
                <ReviewList
                  reviews={reviews}
                  reviewShow={reviewShow}
                  fetchReviews={fetchReviews}
                  fetchMeta={fetchMeta}
                  starFilter={starFilter}
                  setStarFilter={setStarFilter}
                  rating={rating}
                  charName={charName}
                  charValue={charValue}
                  setCurrReviewsLength={setCurrReviewsLength}
                />
              </div>
              <div className="review_col">
                <div className="review_btn">
                  {reviews.length > 2 && !isLoading && <button data-testid="button" type="button" onClick={loadMoreView}>More Reviews</button>}
                  <button type="button" onClick={() => setIsClickAdd(true)} data-testid="addBtn">
                    ADD A REVIEW +
                  </button>
                  <WriteReview
                    isClickAdd={isClickAdd}
                    closeWriteReview={closeWriteReview}
                    id={id}
                    fetchReviews={fetchReviews}
                    charName={charName}
                    charId={charId}
                    charValue={charValue}
                    productName={productName}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (<div style={{ textAlign: 'center' }}>No Reviews</div>)}
    </div>
  );
};
ReviewRating.propTypes = {
  id: PropTypes.number,
}.isRequired;

export default ReviewRating;
