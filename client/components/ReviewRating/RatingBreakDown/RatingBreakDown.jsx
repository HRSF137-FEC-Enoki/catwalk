import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import StarRating from '../../StarRating';
import ProductBreakDown from './ProductBreakDown';

const RatingBreakDown = ({
  id, setStarFilter, starFilter, rating, charValue, charName,
}) => {
  const [ratings, setRatings] = useState({});
  const [recommended, setRecommended] = useState({});

  useEffect(() => {
    axios.get(`/api/reviews/meta/${id}`)
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
    // Total 5 stars, and check which star has value from API
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
    <>
      <div className="rating_breakdown">
        <div className="rating_score">
          <p>{Number.isNaN(rating) ? 0 : rating}</p>
          <StarRating size={36} rating={rating} />
        </div>
        <p className="rating_recommended">
          {recommended && getPercentage(recommended.true)}
          {'  '}
          of reviews recommend this product
        </p>
        {[...Array(5)].map((star, index) => (
          <div className="star_breakdown">
            <a href="/" name={5 - index} onClick={onClickHandler}>
              {5 - index}
              star
            </a>
            <div className="rating_bar">
              <div className="rating_bar_left" id={5 - index} />
            </div>

          </div>
        ))}
        {starFilter && starFilter.length !== 0
          && (
            <div className="star_filter">

              <span>
                {starFilter.map((i) => (
                  <div key={i}>
                    {String(i)}
                    {' '}
                    star
                    <StarRating size={16} rating={i} />
                  </div>
                ))}
              </span>
              <div>
                <button type="button" onClick={clearFilter}>clear</button>
              </div>
            </div>
          )}
      </div>
      <ProductBreakDown
        charName={charName}
        charValue={charValue}
      />
    </>
  );
};

RatingBreakDown.propTypes = {
  id: PropTypes.number,
  reviews: PropTypes.instanceOf(Array).isRequired,
}.isRequired;

export default RatingBreakDown;
