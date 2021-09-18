import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

const ReviewBody = ({ review }) => {
  const [isMoreThanMaxChar, setIsMoreThanMaxChar] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const onClickImage = (e) => {
    setIsImageOpen(!isImageOpen);
    setImageUrl(e.target.src);
  };
  useEffect(() => {
    if (review && review.body.length > 250) {
      setIsMoreThanMaxChar(true);
    }
  }, []);
  return (
    <div className="review_body" data-testid="reviewBody">
      {isMoreThanMaxChar ? (
        <div>
          {review.body.slice(0, 250)}
          <button type="button" onClick={() => setIsMoreThanMaxChar(false)}>show more</button>
        </div>
      )
        : <div>{review && review.body}</div>}
      {
        review && review.photos.map((photo) => (
          <span key={photo.id}>
            <img src={photo.url} alt="product" width="50px" onClick={onClickImage} role="presentation" />
          </span>
        ))
      }
      <div className={isImageOpen ? 'window' : ''}>
        {isImageOpen && <img src={imageUrl} alt="product" onClick={onClickImage} role="presentation" className="modal" />}
      </div>
    </div>
  );
};
ReviewBody.propTypes = PropTypes.shape({
  body: PropTypes.string,
  photo: PropTypes.instanceOf(Array),
}).isRequired;

export default ReviewBody;
