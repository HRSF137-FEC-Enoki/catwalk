import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewRating from './ReviewRating/ReviewList/ReviewRating';
import ProductOverview from './ProductOverview/ProductOverview';

const App = () => {
  const [product, setProduct] = useState('');
  useEffect(() => {
    axios.get('/products').then((res) => setProduct(res.data));
  }, []);
  return (
    <div id="app">
      <div><ProductOverview /></div>
      {product && <ReviewRating id={product[1].id} />}
    </div>
  );
};

export default App;
