import React, { useState, useEffect } from 'react';
import { BsCaretDown, BsCaretUp } from 'react-icons/bs';
import PropTypes from 'prop-types';

const ThumbnailView = ({ photos, handleClick, currentIndex }) => {
  const [thumbnailStart, setThumbnailStart] = useState(currentIndex);
  const [thumbnailEnd, setThumbnailEnd] = useState(7);

  const arrowSize = 32;

  useEffect(() => {
    const THUMBNAIL_LIMIT = 7;
    if (photos.length <= THUMBNAIL_LIMIT) {
      setThumbnailStart(0);
      setThumbnailEnd(photos.length);
    } else if (photos.length > THUMBNAIL_LIMIT) {
      if (currentIndex > photos.length - THUMBNAIL_LIMIT) {
        setThumbnailStart(photos.length - THUMBNAIL_LIMIT);
        setThumbnailEnd(photos.length);
      } else if (currentIndex < THUMBNAIL_LIMIT) {
        setThumbnailStart(0);
        setThumbnailEnd(THUMBNAIL_LIMIT);
      } else {
        setThumbnailStart(currentIndex);
        setThumbnailEnd(currentIndex + THUMBNAIL_LIMIT);
      }
    }
  }, [currentIndex]);

  const handleArrowUp = (e) => {
    e.stopPropagation();
    if (currentIndex > thumbnailStart && currentIndex <= thumbnailEnd - 1) {
      handleClick(e, currentIndex - 1);
    } else if (currentIndex === thumbnailStart) {
      setThumbnailStart(thumbnailStart - 1);
      setThumbnailEnd(thumbnailEnd - 1);
      handleClick(e, currentIndex - 1);
    }
  };

  const handleArrowDown = (e) => {
    e.stopPropagation();

    if (currentIndex >= thumbnailStart && currentIndex < thumbnailEnd - 1) {
      handleClick(e, currentIndex + 1);
    } else if (currentIndex >= thumbnailEnd - 1) {
      setThumbnailStart(thumbnailStart + 1);
      setThumbnailEnd(thumbnailEnd + 1);
      handleClick(e, currentIndex + 1);
    }
  };

  const handleKeyPress = (e, index) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      handleClick(e, index);
    }
  };

  return (
    <div className="arrowsThumbnailContainer">
      <BsCaretUp data-testid="up-arrow" className="upArrow" size={arrowSize} onClick={(e) => handleArrowUp(e)} style={currentIndex !== 0 ? {} : { visibility: 'hidden' }} />
      <div className="thumbnailContainer">
        {photos.map((photo, index) => {
          if (index >= thumbnailStart && index < thumbnailEnd) {
            return (
              <div
                className="thumbnailInput"
                role="button"
                tabIndex={0}
                alt="image from selected style set"
                onClick={(e) => handleClick(e, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                id={index === currentIndex ? 'selected' : 'unselected'}
                key={photo.thumbnail_url}
                style={{ backgroundImage: `url(${photo.thumbnail_url || '../../../no_image.png'})` }}
              />
            );
          } return null;
        })}
      </div>
      <BsCaretDown data-testid="down-arrow" className="downArrow" size={arrowSize} onClick={(e) => handleArrowDown(e)} style={currentIndex !== photos.length - 1 ? {} : { visibility: 'hidden' }} />
    </div>
  );
};

ThumbnailView.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClick: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,

};

export default ThumbnailView;
