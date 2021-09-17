import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Helpfulness = ({ review, fetchReviews }) => {
  const onClickHandler = (e) => {
    e.preventDefault();
    const action = e.target.name;
    axios.put(`/api/reviews/${review.review_id}/${action}`)
      .then(() => fetchReviews());
  };
  return (
    <div className="helpful">
      <span data-testid="helpful">Helpful?</span>
      <a
        name="helpful"
        href="/"
        aria-hidden="true"
        onClick={onClickHandler}
      >
        Yes(
        {review && review.helpfulness}
        )
      </a>
      <span>|</span>
      <a
        name="report"
        href="/"
        aria-hidden="true"
        onClick={onClickHandler}
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
