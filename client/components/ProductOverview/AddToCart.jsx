import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import '../../css/AddToCart.scss';

const AddToCart = ({ currentStyle }) => {
  const [shirtSKU, setShirtSKU] = useState(null);
  const [sizeChosen, setSizeChosen] = useState(null);
  const [isAddToCart, setIsAddToCart] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartMessage, setCartMessaage] = useState(null);

  const openSizeSelector = useRef(null);

  useEffect(() => {
    setShirtSKU(null);
    setSizeChosen(null);
    setIsAddToCart(false);
    setShowCart(false);
    setCartMessaage(null);
  }, [currentStyle]);

  const chooseShirtSize = (e) => {
    setSizeChosen(e.target.value);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setShirtSKU(e.target.value);
  };

  const renderCartWarning = () => {
    if (!isAddToCart) {
      return null;
    }

    if (!shirtSKU && isAddToCart) {
      return <p>Please Choose a Size</p>;
    }

    if (!sizeChosen && isAddToCart) {
      return <p>Please Choose a Quantity</p>;
    }
    return null;
  };

  const handleAddToCartClick = () => {
    if (!shirtSKU) {
      setIsAddToCart(true);
      openSizeSelector.current.focus();
      return;
    }
    if (shirtSKU && !sizeChosen) {
      setIsAddToCart(true);
      return;
    }
    if (shirtSKU && sizeChosen) {
      axios.post('/api/cart', { sku_id: shirtSKU })
        .then(() => {
          setShowCart(true);
          axios.get('/api/cart')
            .then((response) => {
              setCartMessaage(
                <div className="cartItems">
                  <p>Added to cart!</p>
                  <div>Items in Cart:</div>
                  <div className="cartItemsWrapper">
                    {response.data.map((item) => <p key={Math.random()}>{`Item: ${item.sku_id} Count: ${item.count}`}</p>)}
                  </div>
                </div>,
              );
            });
        })
        .catch(() => { setShowCart('error'); });
    }
  };

  const renderCartAdd = () => {
    if (!showCart) {
      return null;
    }
    if (showCart === 'error') {
      return <p>Unable to add to cart</p>;
    }
    if (showCart === true) {
      return cartMessage;
    }
    return null;
  };

  const shirtSizeDropdown = () => {
    if (!shirtSKU) {
      return <option value="default" disabled hidden> - </option>;
    }
    if (!currentStyle.skus[shirtSKU]) {
      return <option value="default" disabled hidden> - </option>;
    }
    let maxQuantity = 0;
    const shirtQuantities = [];
    shirtQuantities.push(<option value="default" key="chooseSize">-</option>);
    if (currentStyle.skus[shirtSKU].quantity <= 15) {
      maxQuantity = currentStyle.skus[shirtSKU].quantity;
    } else {
      maxQuantity = 15;
    }
    for (let i = 0; i < maxQuantity; i += 1) {
      shirtQuantities.push(
        <option data-testid="quantity-choices" value={i + 1} key={i + 1}>{i + 1}</option>,
      );
    }
    return shirtQuantities;
  };

  if (!currentStyle.skus.null) {
    return (
      <div key={currentStyle.style_id} className="addToCart__actions">
        <span>
          <select
            data-testid="select-shirt-size"
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
          <select data-testid="shirt-quantity" defaultValue="default" onChange={chooseShirtSize} id="shirtCount">
            {shirtSizeDropdown()}
          </select>
        </span>
        <div className="addToCart__btn-container">
          <button type="button" onClick={handleAddToCartClick} className="addToCart__btn">Add To Cart</button>
          {renderCartWarning()}
          {renderCartAdd()}
        </div>

      </div>
    );
  }
  return (
    <div key={currentStyle.style_id}>
      <span>
        <select name="shirtSizes" id="shirtSizes" defaultValue="default">
          <option disabled value="default">
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
