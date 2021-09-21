import React from 'react';
import PropTypes from 'prop-types';

import '../../css/StyleSelector.scss';

const StyleSelector = ({ styles, currentStyle, updateCurrentStyle }) => {
  if (styles) {
    return (
      <div>
        <div className="styleSelected">
          <span className="styleIndicator">{'Style > '}</span>
          {currentStyle.name}
        </div>
        <div className="stylesAvailable">
          {styles.map((style, index) => (
            <input
              type="image"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1200px-HD_transparent_picture.png"
              style={{ backgroundImage: `url(${style.photos[0].thumbnail_url || '../../../no_image.png'})` }}
              alt="stylethumbail"
              key={style.style_id}
              className="styleThumbnail"
              id={currentStyle.style_id === style.style_id ? 'selected' : 'unselected'}
              onClick={() => updateCurrentStyle(index)}
            />
          ))}
        </div>
      </div>
    );
  }
  return <div>Loading Styles</div>;
};

StyleSelector.propTypes = {
  styles: PropTypes.arrayOf(PropTypes.object),
  currentStyle: PropTypes.shape({
    style_id: PropTypes.number,
    name: PropTypes.string,
    original_price: PropTypes.string,
    sale_price: PropTypes.string,
    'default?': PropTypes.bool,
    photos: PropTypes.arrayOf(PropTypes.object),
    skus: PropTypes.objectOf(PropTypes.object),
  }).isRequired,
  updateCurrentStyle: PropTypes.func.isRequired,
};

StyleSelector.defaultProps = {
  styles: null,
};

export default StyleSelector;
