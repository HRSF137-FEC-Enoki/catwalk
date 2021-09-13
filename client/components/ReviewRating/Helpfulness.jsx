import React from 'react';

const Helpfulness = ({ review }) => (
  <div>
    helpful?:
    <span>
      Yes (
      {review.helpfulness}
      )
    </span>
    <span>No</span>
  </div>
);

export default Helpfulness;
