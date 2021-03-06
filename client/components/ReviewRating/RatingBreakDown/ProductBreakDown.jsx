import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { GoTriangleDown } from 'react-icons/go';

const ProductBreakDown = ({ charValue, charName }) => {
  const characteristics = {
    Size: ['Too small', 'Perfect', 'Too wide'],
    Width: ['Too narrow', 'Perfect', 'Too wide'],
    Comfort: ['Uncomfortable', 'Ok', 'Perfect'],
    Quality: ['Poor', 'What I expect', 'Perfect'],
    Length: ['Runs Short', 'Perfect', 'Runs Long'],
    Fit: ['Runs tight', 'Perfect', 'Runs Long'],
  };
  const findPosition = () => {
    const char = Object.entries(characteristics);

    for (let i = 0; i < char.length; i += 1) {
      if (charName.includes(char[i][0])) {
        const index = charName.indexOf(char[i][0]);
        const position = ((charValue[index] / 5) * 100 - 5).toFixed(0).concat('%');
        document.getElementById(char[i][0]).style.left = position;
      }
    }
  };
  useEffect(() => {
    if (charName.length > 0 && charValue.length > 0) {
      findPosition();
    }
  }, [charName, charValue]);

  return (
    <div className="product_breakdown">
      {charName
        && charName.length > 0
        && charName
          .map((name) => (
            <div className="scale" key={name}>
              <div className="product_bar">
                <span className="char_name">{name}</span>
                <span className="pointer" id={name}><GoTriangleDown color="goldenrod" size={36} /></span>
              </div>
              <div className="level">
                {characteristics[name] && characteristics[name].map((scale) => (
                  <span key={scale}>{scale}</span>
                ))}
              </div>
            </div>
          ))}
    </div>
  );
};

ProductBreakDown.propTypes = PropTypes.shape({
  charName: PropTypes.instanceOf(Array),
  charValue: PropTypes.instanceOf(Array),
}).isRequired;

export default ProductBreakDown;
