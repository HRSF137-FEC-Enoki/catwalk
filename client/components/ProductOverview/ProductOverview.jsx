import React from 'react';

import mockProductStyles from '../../../MockData/ProductStyles';
import ImageGallery from './ImageGallery';

import '../../css/ProductOverviewCSS.css';

const ProductOverview = () => {
  const currentStyleIndex = 0;
  const currentStyle = mockProductStyles.results[currentStyleIndex];
  return (
    <div className="productOverviewContainer">
      <ImageGallery currentStyle={currentStyle} id="imageGallery" />
      <div className="productInfo">
        <div>Stars</div>
        <div>Category</div>
        <div>Name</div>
      </div>
    </div>
  );
};

export default ProductOverview;
