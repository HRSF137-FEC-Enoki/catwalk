/* eslint-disable arrow-parens */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewRating from './ReviewRating/ReviewList/ReviewRating';

<<<<<<< HEAD
const App = () => {
  const [product, setProduct] = useState('');
  useEffect(() => {
    axios.get('/products').then(res => setProduct(res.data));
  }, []);
  return (
    <div id="app">
      {product && <ReviewRating id={product[1].id} />}
    </div>
  );
};
=======
import ProductOverview from './ProductOverview/ProductOverview';

const App = () => (
  <>
    <div>Header</div>
    <div><ProductOverview /></div>
  </>
);
>>>>>>> main

export default App;
