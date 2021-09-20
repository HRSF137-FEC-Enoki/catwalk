import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';

import '../css/StarRating.scss';

const Span = styled.span`
  color: ${({ backgroundColor }) => backgroundColor};
  display: inline-block;
  font-size: ${({ size }) => size}px;
  margin: 0 5px;
  position: relative;

  &:after {
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    content: "\f005";
    position: absolute;
    left: 0;
    top: 0;
    width: ${({ percentage }) => percentage}%;
    overflow: hidden;
    color: ${({ color }) => color};
  }
`;

const StarRating = ({
  backgroundColor, color, rating, size, callback,
}) => {
  let val = rating;
  const onClickHandler = (e) => {
    if (callback) {
      const firstIndex = e.target.getAttribute('data-id');
      const secondIndex = e.target.parentElement.getAttribute('data-id');
      // console.log(firstIndex, secondIndex, val)
      const index = firstIndex === null ? Number(secondIndex) : Number(firstIndex);
      callback(index);
    }
  };
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, i) => {
        const ratingVal = i + 1;
        let percentage = null;

        if (val >= (1)) {
          percentage = 100;
        } else if (val >= (3 / 4)) {
          percentage = 75;
        } else if (val >= (1 / 2)) {
          percentage = 50;
        } else if (val >= (1 / 4)) {
          percentage = 25;
        } else {
          percentage = 0;
        }
        // if (val >= (7 / 8)) {
        //   percentage = 100;
        // } else if (val >= (5 / 8)) {
        //   percentage = 75;
        // } else if (val >= (3 / 8)) {
        //   percentage = 50;
        // } else if (val >= (1 / 8)) {
        //   percentage = 25;
        // } else {
        //   percentage = 0;
        // }

        val -= 1;

        return (
          <Span
            size={size}
            backgroundColor={backgroundColor}
            percentage={percentage}
            color={color}
            key={ratingVal}
            className="star"
            data-id={ratingVal}
            onClick={onClickHandler}
          >
            <FaStar data-id={ratingVal} />
          </Span>
        );
      })}
    </div>
  );
};

StarRating.propTypes = {
  size: PropTypes.number,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  rating: PropTypes.number,
  callback: PropTypes.func,
};

StarRating.defaultProps = {
  size: 36,
  backgroundColor: '#ddd',
  color: 'goldenrod',
  rating: 5,
  callback: undefined,
};

export default StarRating;
