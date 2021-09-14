import React, { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import PropTypes from 'prop-types';

const ImageGallery = ({ currentStyle }) => {
  const [currentImageIndex, changeImage] = useState(0);
  const currentPhoto = currentStyle.photos[currentImageIndex].url;
  const { photos } = currentStyle;
  const { length } = photos;

  const handleLeftArrow = () => {
    changeImage(currentImageIndex === 0 ? length - 1 : currentImageIndex - 1);
  };

  const handleRightArrow = () => {
    changeImage(currentImageIndex === length - 1 ? 0 : currentImageIndex + 1);
  };

  return (
    <div className="mainImageContainer">
      <AiOutlineArrowLeft className="leftArrow" onClick={handleLeftArrow} />
      <AiOutlineArrowRight className="rightArrow" onClick={handleRightArrow} />
      <img className="mainImage" src={currentPhoto} alt="selected style" />
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
  }).isRequired,
};

export default ImageGallery;
