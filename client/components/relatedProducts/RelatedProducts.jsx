import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Card from './Card';

const RelatedProducts = ({ productId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // make a GET request to /api/products/:product_id/related
    axios.get(`/api/products/${productId}/related`)
      .then(({ data }) => data)
      .then((ids) => ids.map((id) => axios.get(`/api/products/${id}`)))
      .then((promises) => {
        Promise.all(promises).then((values) => setProducts(values));
      });
  }, []);

  return (
    <div>
      <h3>RelatedProducts</h3>
      {products.map((product) => <Card key={product.data.id} relatedProduct={product.data} />)}
    </div>
  );
};

RelatedProducts.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default RelatedProducts;
