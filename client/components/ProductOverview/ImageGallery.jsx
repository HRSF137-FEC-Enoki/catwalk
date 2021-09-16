import React from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import PropTypes from 'prop-types';

import ThumbnailView from './ThumbnailView';

const ImageGallery = ({ currentStyle, imageIndex, updateImageIndex }) => {
  if (currentStyle === null) {
    return <div>No data available</div>;
  }

  const { photos } = currentStyle;
  const { length } = photos;
  if (imageIndex > length) {
    updateImageIndex(0);
  }
  const currentPhoto = currentStyle.photos[imageIndex].url;

  const handleLeftArrow = () => {
    updateImageIndex(imageIndex === 0 ? length - 1 : imageIndex - 1);
  };

  const handleRightArrow = () => {
    updateImageIndex(imageIndex === length - 1 ? 0 : imageIndex + 1);
  };

  const handleThumbNailClick = (index) => {
    updateImageIndex(index);
  };

  return (
    <div className="imageGalleryContainer">
      <div className="mainImageContainer" style={{ backgroundImage: `url(${currentPhoto})` }} />
      <ThumbnailView photos={photos} handleClick={handleThumbNailClick} className="thumbnailComponent" currentIndex={imageIndex} />
      <AiOutlineArrowLeft className="leftArrow" onClick={handleLeftArrow} size={35} />
      <AiOutlineArrowRight className="rightArrow" onClick={handleRightArrow} size={35} />
    </div>
  );
};

ImageGallery.propTypes = {
  currentStyle: PropTypes.shape({
    style_id: PropTypes.number,
    name: PropTypes.string,
    original_price: PropTypes.string,
    sale_price: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.object),
    skus: PropTypes.objectOf(PropTypes.object),
  }),
  imageIndex: PropTypes.number.isRequired,
  updateImageIndex: PropTypes.func.isRequired,
};

ImageGallery.defaultProps = {
  currentStyle: null,
};

export default ImageGallery;
