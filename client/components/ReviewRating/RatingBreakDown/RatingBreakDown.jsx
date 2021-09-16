import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import StarRating from '../../StarRating';

const RatingBreakDown = ({ reviews, id }) => {
  const [ratings, setRatings] = useState({});
  const [recommended, setRecommended] = useState({});
  const rating = 3.2;
  const reviewsCount = Number(recommended.true) + Number(recommended.false);

  useEffect(() => {
    axios.get(`/reviews/meta/${id}`)
      .then((res) => {
        setRatings(res.data.ratings);
        setRecommended(res.data.recommended);
      });
  }, []);

  const getPercentage = (target) => {
    let recRate = Number(target) / reviewsCount;
    recRate = (parseFloat(recRate * 100).toFixed(0));
    return recRate.concat('%');
  };

  const updateRatingBar = () => {
    for (let i = 1; i < 6; i += 1) {
      if (ratings[String(i)]) {
        document.getElementById(i).style.width = getPercentage(ratings[String(i)]);
      }
    }
  };

  useEffect(() => {
    console.log(Object.keys(ratings).length, recommended)
    updateRatingBar();
  }, [recommended]);

  const onClickHandler = () => {
    console.log('click');
  };

  return (

    <div className="ratingBreakDown">
      <div className="ratingScore">
        <p>{rating}</p>
        <StarRating size={16} rating={rating} />
      </div>
      <p>
        {Object.keys(recommended).length === 0 ? '0 ' : getPercentage(recommended.true)}
        of reviews recommend this product
      </p>
      {[...Array(5)].map((star, index) => (
        <div className="starBreakDown">
          <a href="/" onClick={onClickHandler}>
            {index}
            star
          </a>
          <div className="ratingBar">
            <div className="ratingBarLeft" id={5 - index} />
          </div>

        </div>
      ))}
      <div className="starFilter">
        <span>Filter: 2star</span>
        <a href="/">remove all</a>
      </div>
    </div>
  );
};

RatingBreakDown.propTypes = {
  id: PropTypes.number,
  reviews: PropTypes.instanceOf(Array).isRequired,
}.isRequired;

export default RatingBreakDown;
