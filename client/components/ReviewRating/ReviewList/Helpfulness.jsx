import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Helpfulness = ({
  review, fetchReviews, fetchMeta,
}) => {
  const [hasClickedHelpful, setHasClickedHelpful] = useState(false);

  const onClickHandler = (e) => {
    e.preventDefault();
    const action = e.target.name;
    if (!hasClickedHelpful) {
      axios.put(`/api/reviews/${review.review_id}/${action}`)
        .then(() => {
          fetchReviews();
          fetchMeta();
          setHasClickedHelpful(true);
        });

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
        aria-hidden="true"
        onClick={onClickHandler}
        data-testid="helpful_link"
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
