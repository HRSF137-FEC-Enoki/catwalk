import React, { useState, useEffect } from 'react';
import axios from 'axios';

import RelatedProducts from './relatedProducts/RelatedProducts';

import '../css/App.scss';

const App = () => {
  // const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/products')
      .then(({ data }) => {
        // setProducts(data);
        setCurrentProduct(data[0]);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="app__container">
      <header>Logo and Search Go Here</header>
      {isLoading ? <p>Loading!</p> : <RelatedProducts productId={currentProduct.id} />}
    </div>
  );
};

export default App;
