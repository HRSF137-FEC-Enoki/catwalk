/* eslint-disable react/prop-types */
import React from 'react';

const ReviewBody = ({ review }) => (
  <div>
    <div>{review.body}</div>
    {review.photos.map((photo) => (
      <img src={photo.url} alt="product" />
    ))}

  </div>
);

export default ReviewBody;
