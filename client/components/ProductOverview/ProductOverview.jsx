import React, { useState, useEffect } from 'react';
import axios from 'axios';

import mockProductStyles from '../../../MockData/ProductStyles';
import ImageGallery from './ImageGallery';

import '../../css/ProductOverviewCSS.css';

const ProductOverview = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [styleIndex, setStyleIndex] = useState(0);
  const [currentStyle, setCurrentStyle] = useState(mockProductStyles.results[0]);

  // useEffect(() => {
  //   axios.get('/products/48436/styles')
  //   .then((response) => {
  //     console.log(response.data)
  //     console.log(response.data.results[styleIndex])
  //     setCurrentStyle('asdasd');
  //   })
  //   .then((response) => {
  //     console.log(currentStyle)
  //   })
  // }, [])

  const updateImageIndex = (index) => {
    setImageIndex(index);
  };

  return (
    <div>
      <div className="productOverviewContainer">
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

export default ProductOverview;
