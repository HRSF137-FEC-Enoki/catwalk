import React from 'react';
import PropTypes from 'prop-types';

import { AiOutlineCheckCircle } from 'react-icons/ai';

import '../../css/StyleSelector.scss';

const StyleSelector = ({ styles, currentStyle, updateCurrentStyle }) => {
  if (styles) {
    return (
      <div className="stylesContainer">
        <div className="styleSelected">
          <span className="styleIndicator">{'Style > '}</span>
          {currentStyle.name}
        </div>
        <div className="stylesAvailable">
          {styles.map((style, index) => (
            <span className="stylesAvailable__list-item" key={style.style_id}>
              <div
                role="button"
                onKeyPress={(e) => {
                  e.stopPropagation();
                  if (e.key === 'Enter') { updateCurrentStyle(index); }
                }}
                tabIndex={0}
                style={{ backgroundImage: `url(${style.photos[0].thumbnail_url || '../../../no_image.png'})` }}
                alt="stylethumbail"
                data-testid={style.style_id}
                className="styleThumbnail"
                id={currentStyle.style_id === style.style_id ? 'selected' : 'unselected'}
                onClick={() => updateCurrentStyle(index)}
              />
              {currentStyle.style_id === style.style_id && <AiOutlineCheckCircle color="goldenrod" size={24} className="stylesAvailable__selected" />}
            </span>
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
