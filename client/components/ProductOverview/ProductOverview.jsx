import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import ImageGallery from './ImageGallery';

import '../../css/ProductOverview.scss';

const ProductOverview = ({ productId }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [styleIndex, setStyleIndex] = useState(0);
  const [currentStyle, setCurrentStyle] = useState(null);

  useEffect(() => {
    axios.get(`/api/products/${productId}/styles`)
      .then((response) => {
        setStyleIndex(0);
        setCurrentStyle(response.data.results[styleIndex]);
      });
  }, []);

  const updateImageIndex = (index) => {
    setImageIndex(index);
  };

  return (
    <div>
      <div className="productOverviewContainer" data-testid="productOverView">
        <ImageGallery currentStyle={currentStyle} id="imageGallery" imageIndex={imageIndex} updateImageIndex={updateImageIndex} />
        <div className="productInfo">
          <div>Stars</div>
          <div>Category</div>
          <div>Name</div>
        </div>
      </div>
      <div className="productDescription">Product Description</div>
    </div>
  );
};

ProductOverview.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default ProductOverview;
