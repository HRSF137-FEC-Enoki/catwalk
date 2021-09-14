import React from 'react';

import mockProductStyles from '../../../MockData/ProductStyles';
import ImageGallery from './ImageGallery';
import '../../css/ProductOverviewCSS.css';

const ProductOverview = () => {
  const currentStyleIndex = 0;
  const currentStyle = mockProductStyles.results[currentStyleIndex];
  return (
    <>
      <div> This is the product overview page </div>
      <div><ImageGallery currentStyle={currentStyle} /></div>
    </>
  );
};

export default ProductOverview;
