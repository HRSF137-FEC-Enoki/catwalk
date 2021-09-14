import PropTypes from 'prop-types';
import React from 'react';

const Helpfulness = ({ review }) => (

  <div className="helpful">
    <span>Helpful?</span>
    <span>
      Yes(
      {review.helpfulness}
      )
    </span>
    <span>|</span>
    <span>Report</span>
  </div>
);
Helpfulness.propTypes = {
  review: PropTypes.instanceOf(Object).isRequired,
};
export default Helpfulness;
