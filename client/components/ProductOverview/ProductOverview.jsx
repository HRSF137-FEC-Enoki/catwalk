import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaFacebook, FaTwitter, FaPinterest } from 'react-icons/fa';
import axios from 'axios';

import ImageGallery from './ImageGallery';
import StyleSelector from './StyleSelector';
import AddToCart from './AddToCart';
import StarRating from '../StarRating';

import '../../css/ProductOverview.scss';

const ProductOverview = ({
  productId, rating, totalReviews, currentProduct,
}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [styleIndex, setStyleIndex] = useState(0);
  const [currentStyle, setCurrentStyle] = useState(null);
  const [allStyles, setAllStyles] = useState(null);
  const [isCollapsed, setCollapse] = useState(false);
  const starSize = 14;
  const socialMediaButtonSize = 36;
  const SalePrice = () => {
    if (currentStyle.sale_price) {
      return (
        <div className="productPrice">
          <span className="priceStrikethrough" data-testid="original-price">{`$${currentStyle.original_price}`}</span>
          <span className="salePrice" data-testid="sale-price">{`$${currentStyle.sale_price}`}</span>
        </div>
      );
    }
    return (
      <div className="productPrice">
        {`$${currentStyle.original_price}`}
      </div>
    );
  };

  useEffect(() => {
    axios.get(`/api/products/${productId}/styles`)
      .then((response) => {
        setStyleIndex(2);
        setAllStyles(response.data.results);
        setCurrentStyle(response.data.results[styleIndex]);
      })
      .catch((err) => { throw err; });
  }, []);

  const updateImageIndex = (index) => {
    setImageIndex(index);
  };

  const updateCurrentStyle = (index) => {
    setStyleIndex(index);
    setCurrentStyle(allStyles[index]);
  };

  const expand = () => {
    setCollapse(!isCollapsed);
  };

  const scrollToReviews = () => {
    const reviews = document.getElementsByClassName('review_rating_container')[0];
    reviews.scrollIntoView({ behavior: 'smooth' });
  };

  if (currentStyle) {
    return (
      <div className="productOverviewWrapper">
        <div className="productOverviewContainer" data-testid="productOverview">
          <ImageGallery currentStyle={currentStyle} id="imageGallery" imageIndex={imageIndex} updateImageIndex={updateImageIndex} expand={expand} />
          <div className="productInfo" id={isCollapsed ? 'collapsed' : 'fullSize'} data-testid="product-info">
            <div className="starRating">
              <StarRating rating={rating} size={starSize} />
              {totalReviews ? <button id="scrollToReviews" type="button" onClick={scrollToReviews}>{`Read all ${totalReviews} reviews`}</button> : null}
            </div>
            <div className="productCategory">{currentProduct.category}</div>
            <div className="productName">{currentProduct.name}</div>
            <SalePrice />
            <StyleSelector
              styles={allStyles}
              currentStyle={currentStyle}
              updateCurrentStyle={updateCurrentStyle}
            />
            <AddToCart currentStyle={currentStyle} />
            <div className="socialMedia">
              <FaFacebook size={socialMediaButtonSize} />
              <FaTwitter size={socialMediaButtonSize} />
              <FaPinterest size={socialMediaButtonSize} />
            </div>
          </div>
        </div>
        <div className="productDescription">
          <div className="productDescription__info">
            <p className="productDescription__title">{currentProduct.slogan}</p>
            <p className="productDescription__description">{currentProduct.description}</p>
          </div>
          <div className="productDescription__features">
            <ul>
              {currentProduct.features.map((feature) => <li key={feature.value} className="productDescription__feature-item">{`${feature.value} ${feature.feature}`}</li>)}
            </ul>
          </div>
        </div>
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
    features: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default ProductOverview;
