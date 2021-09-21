import React, { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import PropTypes from 'prop-types';

import ThumbnailView from './ThumbnailView';

import '../../css/ImageGallery.scss';

const ImageGallery = ({
  currentStyle, imageIndex, updateImageIndex, expand,
}) => {
  if (currentStyle === null) {
    return <div>No data available</div>;
  }

  const [bgPosition, setPosition] = useState('center');
  const [isImageExpanded, setImageExpanded] = useState(false);

  const { photos } = currentStyle;
  const { length } = photos;
  const arrowSize = 35;

  if (imageIndex > length) {
    updateImageIndex(0);
  }

  // /home/andylei/hackreactor/catwalk/client/components/ProductOverview/ImageGallery.jsx
  // /home/andylei/hackreactor/catwalk/public/no_image.png
  const currentPhoto = currentStyle.photos[imageIndex].url || '../../../no_image.png';

  const handleMousePosition = (e) => {
    const relativeX = e.clientX - e.target.offsetLeft;
    const relativeY = e.clientY - e.target.offsetTop;
    const width = e.target.offsetWidth;
    const height = e.target.offsetHeight;

    const bgPosX = ((relativeX) / width) * 100;
    const bgPosY = ((relativeY) / height) * 100;

    setPosition(`${bgPosX}% ${bgPosY}%`);
  };

  const handleMouseLeave = () => {
    setPosition('center');
  };

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

  const handleImageClick = () => {
    expand();
    setImageExpanded(!isImageExpanded);
  };

  return (
    <div className="imageGalleryContainer">
      <div className="mainImageContainer">
        <input
          className={isImageExpanded ? 'focusedImageExpand' : 'focusedImage'}
          style={
            isImageExpanded ? { backgroundImage: `url(${currentPhoto})`, backgroundPosition: `${bgPosition}` } : { backgroundImage: `url(${currentPhoto})` }
          }
          onClick={handleImageClick}
          onMouseMove={handleMousePosition}
          onMouseLeave={handleMouseLeave}
        />
      </div>
      <ThumbnailView photos={photos} handleClick={handleThumbNailClick} className="thumbnailComponent" currentIndex={imageIndex} />
      {imageIndex === 0 ? <AiOutlineArrowLeft className="leftArrow" onClick={() => handleArrow('left')} size={arrowSize} style={{ visibility: 'hidden' }} /> : <AiOutlineArrowLeft className="leftArrow" onClick={() => handleArrow('left')} size={arrowSize} />}
      {imageIndex === length - 1 ? <AiOutlineArrowRight className="rightArrow" onClick={() => handleArrow('right')} size={arrowSize} style={{ visibility: 'hidden' }} /> : <AiOutlineArrowRight className="rightArrow" onClick={() => handleArrow('right')} size={arrowSize} />}
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
  expand: PropTypes.func.isRequired,
};

ImageGallery.defaultProps = {
  currentStyle: null,
};

export default ImageGallery;
