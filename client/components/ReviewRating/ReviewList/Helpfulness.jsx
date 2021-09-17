import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from 'axios';

const Helpfulness = ({ review, fetchReviews }) => {
  const [clickHelpful, setClickHelpful] = useState(false);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const action = e.target.name;
    if (!clickHelpful) {
      axios.put(`/reviews/${review.review_id}/${action}`);
      setClickHelpful(true);
      fetchReviews();
      if (e.target.name === 'helpful') {
        e.target.nextSibling.nextSibling.removeAttribute('href');
      } else {
        e.target.previousSibling.previousSibling.removeAttribute('href');
      }
      e.target.removeAttribute('href');
    }
  };
  return (
    <div className="helpful">
      <span data-testid="helpful">Helpful?</span>
      <a
        name="helpful"
        href="/"
        onClick={onChangeHandler}
        id="helpful"
      >
        Yes(
        {review && review.helpfulness}
        )
      </a>
      <span>|</span>
      <a
        name="report"
        href="/"
        id="report"
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
