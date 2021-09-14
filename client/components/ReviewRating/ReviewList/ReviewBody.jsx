import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

const ReviewBody = ({ review }) => {
  const [isMoreThanMaxChar, setIsMoreThanMaxChar] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const imgStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '400px',
      height: '405px',
    },
  };
  const onClickImage = (e) => {
    setIsImageOpen(!isImageOpen);
    setImageUrl(e.target.src);
  };
  if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#app');
  useEffect(() => {
    if (review && review.body.length > 250) {
      setIsMoreThanMaxChar(true);
    }
  }, []);
  return (
    <div className="reviewBody" data-testid="reviewBody">
      {isMoreThanMaxChar ? (
        <div>
          {review.body.slice(0, 250)}
          <button type="button" onClick={() => setIsMoreThanMaxChar(false)}>show more</button>
        </div>
      )
        : <div>{review && review.body}</div>}
      {
        review && review.photos.map((photo) => (
          <>
            <img src={photo.url} alt="product" width="50px" key={photo.id} onClick={onClickImage} role="presentation" />
          </>
        ))
      }
      <ReactModal isOpen={isImageOpen} style={imgStyles} onRequestClose={onClickImage}>
        <img src={imageUrl} alt="product" width="100%" onClick={onClickImage} role="presentation" />
      </ReactModal>
    </div>
  );
};
ReviewBody.propTypes = PropTypes.shape({
  body: PropTypes.string,
  photo: PropTypes.instanceOf(Array),
}).isRequired;
export default ReviewBody;
