import PropTypes from 'prop-types';
import React from 'react';

const Helpfulness = ({ review }) => (
  <>
    <div className="helpful">
      <span data-testid="helpful">Helpful?</span>
      <span>
        Yes(
        {review && review.helpfulness}
        )
      </span>
      <span>|</span>
      <span>Report</span>
    </div>
  </>
);
Helpfulness.propTypes = PropTypes.shape({
  helpfulness: PropTypes.string,
}).isRequired;
export default Helpfulness;
