import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaFacebook, FaTwitter, FaPinterest } from 'react-icons/fa';
import axios from 'axios';

import ImageGallery from './ImageGallery';
import StyleSelector from './StyleSelector';
import StarRating from '../StarRating';

import '../../css/ProductOverview.scss';

const ProductOverview = ({
  productId, rating, totalReviews, currentProduct,
}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [styleIndex, setStyleIndex] = useState(2);
  const [currentStyle, setCurrentStyle] = useState(null);
  const [allStyles, setAllStyles] = useState(null);
  const starSize = 20;
  const socialMediaButtonSize = 40;
  const salePrice = () => {
    if (currentStyle.sale_price) {
      return (
        <div className="productPrice">
          <span className="priceStrikethrough">{currentStyle.original_price}</span>
          <span className="salePrice">{currentStyle.sale_price}</span>
        </div>
      );
    }
    return (
      <div className="productPrice">
        {currentStyle.original_price}
      </div>
    );
  };

  useEffect(() => {
    axios.get(`/api/products/${productId}/styles`)
      .then((response) => {
        setStyleIndex(2);
        setAllStyles(response.data.results);
        setCurrentStyle(response.data.results[styleIndex]);
      });
  }, []);

  const updateImageIndex = (index) => {
    setImageIndex(index);
  };

  const updateCurrentStyle = (index) => {
    setStyleIndex(index);
    setCurrentStyle(allStyles[index]);
  };

  if (currentStyle) {
    return (
      <div>
        <div className="productOverviewContainer" data-testid="productOverview">
          <ImageGallery currentStyle={currentStyle} id="imageGallery" imageIndex={imageIndex} updateImageIndex={updateImageIndex} />
          <div className="productInfo">
            <div className="starRating">
              <StarRating rating={rating} size={starSize} />
            </div>
            {totalReviews ? <i>{`Read all ${totalReviews} reviews`}</i> : null}
            <div className="productCategory">{currentProduct.category}</div>
            <div className="productName">{currentProduct.name}</div>
            { currentStyle ? salePrice() : <div className="productPrice">Loading Price</div> }
            <div className="socialMedia">
              <FaFacebook size={socialMediaButtonSize} />
              <FaTwitter size={socialMediaButtonSize} />
              <FaPinterest size={socialMediaButtonSize} />
            </div>
            <StyleSelector
              styles={allStyles}
              currentStyle={currentStyle}
              updateCurrentStyle={updateCurrentStyle}
            />
          </div>
        </div>
        <div className="productDescription">{currentProduct.description}</div>
      </div>
    );
  }
  return <div>Loading Product Info</div>;
};

ProductOverview.propTypes = {
  productId: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  totalReviews: PropTypes.number.isRequired,
  currentProduct: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    slogan: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    default_price: PropTypes.string,
  }).isRequired,
};

export default ProductOverview;
