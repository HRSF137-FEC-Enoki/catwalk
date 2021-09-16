import React, { useState, useEffect } from 'react';
import axios from 'axios';

import RelatedProducts from './relatedProducts/RelatedProducts';
import ReviewRating from './ReviewRating/ReviewList/ReviewRating';
import ProductOverview from './ProductOverview/ProductOverview';

import '../css/App.scss';

const App = () => {
  // const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ error: false, msg: '' });

  useEffect(() => {
    axios.get('/api/products')
      .then(({ data }) => {
        setCurrentProduct(data[0]);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError({ error: true, msg: err });
      });
  }, []);
  return (
    <div className="app__container">
      <header id="header">Logo and Search Go Here</header>
      <ProductOverview />
      {isLoading ? <p>Loading!</p> : <RelatedProducts productId={currentProduct.id} />}
      {isError.error ? <p>Currently unable to load page error!</p> : ''}
      {currentProduct && <ReviewRating id={currentProduct.id} />}
    </div>
  );
};

export default App;
