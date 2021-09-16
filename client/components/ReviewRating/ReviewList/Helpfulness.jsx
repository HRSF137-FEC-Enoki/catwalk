import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';

const Helpfulness = ({ review, fetchReviews }) => {
  const onChangeHandler = (e) => {
    e.preventDefault();
    const action = e.target.name;
    axios.put(`/reviews/${review.review_id}/${action}`);
    fetchReviews();
  };
  return (
    <div className="helpful">
      <span data-testid="helpful">Helpful?</span>
      <a
        name="helpful"
        href="/"
        onClick={onChangeHandler}
      >
        Yes(
        {review && review.helpfulness}
        )
      </a>
      <span>|</span>
      <a
        name="report"
        href="/"
        onClick={onChangeHandler}
      >
        Report
      </a>
    </div>
  );
};
Helpfulness.propTypes = PropTypes.shape({
  helpfulness: PropTypes.string,
}).isRequired;
export default Helpfulness;
