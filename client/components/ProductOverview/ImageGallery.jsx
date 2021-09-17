import React from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import PropTypes from 'prop-types';

import ThumbnailView from './ThumbnailView';

import '../../css/ImageGallery.scss';

const ImageGallery = ({ currentStyle, imageIndex, updateImageIndex }) => {
  if (currentStyle === null) {
    return <div>No data available</div>;
  }

  const { photos } = currentStyle;
  const { length } = photos;
  const arrowSize = 35;

  if (imageIndex > length) {
    updateImageIndex(0);
  }
  const currentPhoto = currentStyle.photos[imageIndex].url;

  const handleArrow = (direction) => {
    if (direction === 'left') {
      updateImageIndex(imageIndex === 0 ? length - 1 : imageIndex - 1);
    } else if (direction === 'right') {
      updateImageIndex(imageIndex === length - 1 ? 0 : imageIndex + 1);
    }
  };

  const handleThumbNailClick = (index) => {
    updateImageIndex(index);
  };

  return (
    <div className="imageGalleryContainer">
      <div className="mainImageContainer" style={{ backgroundImage: `url(${currentPhoto})` }} />
      <ThumbnailView photos={photos} handleClick={handleThumbNailClick} className="thumbnailComponent" currentIndex={imageIndex} />
      {imageIndex === 0 ? null : <AiOutlineArrowLeft className="leftArrow" onClick={() => handleArrow('left')} size={arrowSize} />}
      {imageIndex === length - 1 ? null : <AiOutlineArrowRight className="rightArrow" onClick={() => handleArrow('right')} size={arrowSize} />}
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
