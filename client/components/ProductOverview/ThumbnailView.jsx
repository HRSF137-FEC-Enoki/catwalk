import React, { useState, useEffect } from 'react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import PropTypes from 'prop-types';

const ThumbnailView = ({ photos, handleClick, currentIndex }) => {
  const [thumbnailStart, setThumbnailStart] = useState(currentIndex);
  const [thumbnailEnd, setThumbnailEnd] = useState(7);

  const arrowSize = 45;

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
      {currentIndex !== 0 ? <AiOutlineArrowUp className="upArrow" size={arrowSize} onClick={handleArrowUp} /> : <AiOutlineArrowUp className="upArrow" size={arrowSize} onClick={handleArrowUp} style={{ visibility: 'hidden' }} />}
      <div className="thumbnailContainer">
        {photos.map((photo, index) => {
          if (index >= thumbnailStart && index < thumbnailEnd) {
            return (
              <input
                className="thumbnailInput"
                type="image"
                alt="image from selected style set"
                onClick={() => handleClick(index)}
                id={index === currentIndex ? 'selected' : 'unselected'}
                key={photo.thumbnail_url}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1200px-HD_transparent_picture.png"
                style={{ backgroundImage: `url(${photo.thumbnail_url || '../../../no_image.png'})` }}
              />
            );
          } return null;
        })}
      </div>
      {currentIndex !== photos.length - 1 ? <AiOutlineArrowDown className="downArrow" size={arrowSize} onClick={handleArrowDown} /> : <AiOutlineArrowDown className="downArrow" size={arrowSize} onClick={handleArrowDown} style={{ visibility: 'hidden' }} />}
    </div>
  );
};

ThumbnailView.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClick: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,

};

export default ThumbnailView;
