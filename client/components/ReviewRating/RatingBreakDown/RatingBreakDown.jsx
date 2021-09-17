import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import StarRating from '../../StarRating';

const RatingBreakDown = ({ id, setStarFilter, starFilter }) => {
  const [ratings, setRatings] = useState({});
  const [recommended, setRecommended] = useState({});
  const rating = 3.2;

  useEffect(() => {
    axios.get(`/reviews/meta/${id}`)
      .then((res) => {
        setRatings(res.data.ratings);
        setRecommended(res.data.recommended);
      });
  }, []);

  const getPercentage = (target) => {
    if (target === undefined) {
      return 0;
    }
    let reviewsCount = 0;
    if (recommended.true) {
      reviewsCount += Number(recommended.true);
    }
    if (recommended.false) {
      reviewsCount += Number(recommended.false);
    }
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
    updateRatingBar();
  }, [recommended]);

  const clearFilter = (e) => {
    e.preventDefault();
    setStarFilter([]);
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    const copy = [...starFilter];
    const set = new Set(copy);
    if (set.has(Number(e.target.name))) {
      set.delete(Number(e.target.name));
    } else {
      set.add(Number(e.target.name));
    }
    setStarFilter(Array.from(set));
  };

  return (

    <div className="ratingBreakDown">
      <div className="ratingScore">
        <p>{rating}</p>
        <StarRating size={16} rating={rating} />
      </div>
      <p>
        {recommended && getPercentage(recommended.true)}
        of reviews recommend this product
      </p>
      {[...Array(5)].map((star, index) => (
        <div className="starBreakDown">
          <a href="/" name={5 - index} onClick={onClickHandler}>
            {5 - index}
            star
          </a>
          <div className="ratingBar">
            <div className="ratingBarLeft" id={5 - index} />
          </div>

        </div>
      ))}
      {starFilter.length !== 0
        && (
          <div className="starFilter">

            <span>
              Filter:
              {starFilter.map((i) => (
                <div>
                  {String(i)}
                  {' '}
                  star
                  <StarRating rating={i} />
                </div>
              ))}
            </span>
            <div>
              <a href="/" onClick={clearFilter}>remove all filter</a>
            </div>
          </div>
        )}
    </div>
  );
};

RatingBreakDown.propTypes = {
  id: PropTypes.number,
  reviews: PropTypes.instanceOf(Array).isRequired,
}.isRequired;

export default RatingBreakDown;
