import React, { useState, useEffect } from 'react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import PropTypes from 'prop-types';

const ThumbnailView = ({ photos, handleClick, currentIndex }) => {
  const [thumbnailStart, setThumbnailStart] = useState(currentIndex);
  const [thumbnailEnd, setThumbnailEnd] = useState(7);

  const arrowSize = 45;

  useEffect(() => {
    if (photos.length <= 7) {
      setThumbnailStart(0);
      setThumbnailEnd(photos.length);
    } else if (photos.length > 7) {
      if (currentIndex > photos.length - 7) {
        setThumbnailStart(photos.length - 7);
        setThumbnailEnd(photos.length);
      } else if (currentIndex < 7) {
        setThumbnailStart(0);
        setThumbnailEnd(7);
      } else {
        setThumbnailStart(currentIndex);
        setThumbnailEnd(currentIndex + 7);
      }
    }
  }, [currentIndex]);

  const handleArrowUp = () => {
    if (currentIndex > thumbnailStart && currentIndex <= thumbnailEnd - 1) {
      handleClick(currentIndex - 1);
    } else if (currentIndex === thumbnailStart) {
      setThumbnailStart(thumbnailStart - 1);
      setThumbnailEnd(thumbnailEnd - 1);
      handleClick(currentIndex - 1);
    }
  };

  const handleArrowDown = () => {
    if (currentIndex >= thumbnailStart && currentIndex < thumbnailEnd - 1) {
      handleClick(currentIndex + 1);
    } else if (currentIndex >= thumbnailEnd - 1) {
      setThumbnailStart(thumbnailStart + 1);
      setThumbnailEnd(thumbnailEnd + 1);
      handleClick(currentIndex + 1);
    }
  };

  return (
    <div className="arrowsThumbnailContainer">
      {currentIndex !== 0 ? <AiOutlineArrowUp className="upArrow" size={arrowSize} onClick={handleArrowUp} /> : null}
      <div className="thumbnailContainer">
        {photos.map((photo, index) => {
          if (index >= thumbnailStart && index < thumbnailEnd) {
            return (
              <input
                type="image"
                alt="style of thumbnail"
                src={photo.thumbnail_url}
                id={index === currentIndex ? 'selected' : 'unselected'}
                key={photo.thumbnail_url}
                className="thumbnail"
                onClick={() => handleClick(index)}
              />
            );
          } return null;
        })}
      </div>
      {currentIndex !== photos.length - 1 ? <AiOutlineArrowDown className="downArrow" size={arrowSize} onClick={handleArrowDown} /> : null}
    </div>
  );
};

ThumbnailView.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClick: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,

};

export default ThumbnailView;
