import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ImageGallery from './ImageGallery';

import '../../css/ProductOverviewCSS.scss';

const ProductOverview = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [styleIndex, setStyleIndex] = useState(0);
  const [currentStyle, setCurrentStyle] = useState(null);

  useEffect(() => {
    axios.get('/products/48436/styles')
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

export default ProductOverview;
