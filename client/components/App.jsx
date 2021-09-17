import React, { useState, useEffect } from 'react';
import axios from 'axios';

import getStarRatingAvg from '../utils/getStarRatingAvg';

import RelatedProducts from './relatedProducts/RelatedProducts';
import ProductOverview from './ProductOverview/ProductOverview';

import '../css/App.scss';

const App = () => {
  // const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ error: false, msg: '' });
  const [rating, setRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    axios.get('/api/products')
      .then(({ data }) => {
        setCurrentProduct(data[0]);
        getStarRatingAvg(data[0].id)
          .then((result) => {
            setRating(result.avg);
            setTotalReviews(result.count);
          });
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError({ error: true, msg: err });
      });
  }, []);

  return (
    <div className="app__container">
      <header className="app__header">Logo and Search Go Here</header>
      {isLoading ? <p>Loading!</p>
        : (
          <ProductOverview
            productId={currentProduct.id}
            rating={rating}
            totalReviews={totalReviews}
            currentProduct={currentProduct}
          />
        )}
      {isLoading ? <p>Loading!</p>
        : <RelatedProducts rating={rating} productId={currentProduct.id} />}
      {isError.error && <p>Currently unable to load page error!</p>}
    </div>
  );
};

export default App;
