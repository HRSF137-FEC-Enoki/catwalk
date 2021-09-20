import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import '../../css/AddToCart.scss';

const AddToCart = ({ currentStyle }) => {
  const [shirtSKU, setShirtSKU] = useState(null);
  const openSizeSelector = useRef(null);

  useEffect(() => {
    setShirtSKU(null);
  }, [currentStyle]);

  const shirtSizeDropdown = () => {
    if (!shirtSKU) {
      return <option value="default" disabled hidden> - </option>;
    }
    if (!currentStyle.skus[shirtSKU]) {
      return <option value="default" disabled hidden> - </option>;
    }
    let maxQuantity = 0;
    const shirtQuantities = [];
    if (currentStyle.skus[shirtSKU].quantity <= 15) {
      maxQuantity = currentStyle.skus[shirtSKU].quantity;
    } else {
      maxQuantity = 15;
    }
    for (let i = 0; i < maxQuantity; i += 1) {
      shirtQuantities.push(
        <option value={i + 1} key={i + 1}>{i + 1}</option>,
      );
    }
    return shirtQuantities;
  };

  const handleChange = (e) => {
    e.preventDefault();
    setShirtSKU(e.target.value);
  };

  const clickDropDown = () => {
    openSizeSelector.current.focus();
  };

  if (!currentStyle.skus.null) {
    return (
      <div key={currentStyle.style_id}>
        <span>
          <select
            name="shirtSizes"
            id="shirtSizes"
            defaultValue="default"
            onChange={handleChange}
            ref={openSizeSelector}
          >
            <option value="default" disabled hidden>Select Size</option>
            {Object.keys(currentStyle.skus).map((sku) => (
              <option
                value={sku}
                key={sku}
              >
                {currentStyle.skus[sku].size}
              </option>
            ))}
          </select>
        </span>
        <span>
          <select name="shirtQuantity" defaultValue="default">
            {shirtSizeDropdown()}
          </select>
        </span>
        <button type="button" onClick={clickDropDown}>Current Shirt SKU</button>
      </div>
    );
  }
  return (
    <div key={currentStyle.style_id}>
      <span>
        <select name="shirtSizes" id="shirtSizes" disabled>
          <option disabled selected>
            OUT OF STOCK
          </option>
        </select>
      </span>
    </div>
  );
};

AddToCart.propTypes = {
  currentStyle: PropTypes.shape({
    style_id: PropTypes.number,
    name: PropTypes.string,
    original_price: PropTypes.string,
    sale_price: PropTypes.string,
    'default?': PropTypes.bool,
    photos: PropTypes.arrayOf(PropTypes.object),
    skus: PropTypes.objectOf(PropTypes.object),
  }).isRequired,
};

export default AddToCart;
