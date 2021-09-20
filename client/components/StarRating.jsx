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
  padding-right: 5px;
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
  backgroundColor, color, rating, size,
}) => {
  let val = rating;

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, i) => {
        const ratingVal = i + 1;
        let percentage = null;

        if (val >= (7 / 8)) {
          percentage = 100;
        } else if (val >= (5 / 8)) {
          percentage = 75;
        } else if (val >= (3 / 8)) {
          percentage = 50;
        } else if (val >= (1 / 8)) {
          percentage = 25;
        } else {
          percentage = 0;
        }

        val -= 1;

        return (
          <Span
            size={size}
            backgroundColor={backgroundColor}
            percentage={percentage}
            color={color}
            key={ratingVal}
            className="star"
          >
            <FaStar />
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
};

StarRating.defaultProps = {
  size: 36,
  backgroundColor: '#ddd',
  color: 'goldenrod',
  rating: 5,
};

export default StarRating;
