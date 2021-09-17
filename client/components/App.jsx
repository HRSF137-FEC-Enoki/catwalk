import React, { useState, useEffect } from 'react';
import axios from 'axios';

import getStarRatingAvg from '../utils/getStarRatingAvg';

import RelatedProducts from './relatedProducts/RelatedProducts';
import ReviewRating from './ReviewRating/ReviewList/ReviewRating';
import ProductOverview from './ProductOverview/ProductOverview';

import '../css/App.scss';

const App = () => {
  // const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ error: false, msg: '' });
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const productId = window.location.search.split('=')[1];

    axios.get(`/api/products/${productId}`)
      .then(({ data }) => {
        setCurrentProduct(data);
        getStarRatingAvg(data.id)
          .then((result) => setRating(result));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError({ error: true, msg: err });
      });
  }, []);
  return (
    <div className="app__container">
      <header className="app__header">Logo and Search Go Here</header>
      {isLoading ? <p>Loading!</p> : <ProductOverview productId={currentProduct.id} />}
      {isLoading ? <p>Loading!</p>
        : <RelatedProducts rating={rating} currentProduct={currentProduct} />}
      {currentProduct && <ReviewRating id={currentProduct.id} />}
      {isError.error && <p>Currently unable to load page error!</p>}
    </div>
  );
};

export default App;
