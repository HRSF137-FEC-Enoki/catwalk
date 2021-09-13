import React, { useState } from 'react';
import ImageGallery from './ImageGallery';

const ProductOverview = () => {
  const [productID, changeProductID] = useState(null);

  return (
    <>
      <div> This is the product overview page </div>
      <div><ImageGallery /></div>
    </>
  );
};

export default ProductOverview;
