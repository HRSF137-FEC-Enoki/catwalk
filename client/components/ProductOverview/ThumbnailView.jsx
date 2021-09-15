import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ThumbnailView = ({ photos, handleClick, currentIndex }) => {
  const thumbnailClick = (index) => {
    handleClick(index);
  };

  return (
    <div className="thumbnailContainer">
      {photos.map((photo, index) => (<input type="image" alt="style of thumbnail" src={photo.thumbnail_url} id={currentIndex === index ? 'selected' : 'unselected'} className="thumbnail" onClick={() => { thumbnailClick(index); }} />))}
    </div>
  );
};

ThumbnailView.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClick: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,

};

export default ThumbnailView;
