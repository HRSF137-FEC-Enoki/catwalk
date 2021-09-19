import React, { useState, useEffect } from 'react';
import axios from 'axios';

import getStarRatingAvg from '../utils/getStarRatingAvg';

import RelatedProducts from './relatedProducts/RelatedProducts';
import ReviewRating from './ReviewRating/ReviewList/ReviewRating';
import ProductOverview from './ProductOverview/ProductOverview';

import '../css/App.scss';

const INITIAL_PRODUCT_ID = 48432;

const App = () => {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ error: false, msg: '' });
  const [rating, setRating] = useState(0);
  const [productId, setProductId] = useState(INITIAL_PRODUCT_ID);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`/api/products/${productId}`)
      .then(({ data }) => {
        setCurrentProduct(data);
        getStarRatingAvg(data.id)
          .then((result) => {
            setRating(result.avg);
            setTotalReviews(result.count);
          });
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError({ error: true, msg: err });
      });
  }, [productId]);

  const handleCardClick = (id) => {
    setProductId(id);
  };

  return (
    <div className="app__container">
      <header className="app__header">Project Catwalk</header>
      {!isLoading ? (
        <>
          <ProductOverview
            currentProduct={currentProduct}
            productId={productId}
            rating={rating}
            totalReviews={totalReviews}
          />
          <RelatedProducts
            rating={rating}
            currentProduct={currentProduct}
            handleCardClick={handleCardClick}
          />
          <ReviewRating id={productId} />
        </>
      ) : <p>Loading!</p>}
      {isError.error && <p>Currently unable to load page error!</p>}
    </div>
  );
};

export default App;
