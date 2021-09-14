import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      {products.map(({ data }) => {
        return <div key={data.id}>{data.name}</div>;
      })}
    </div>
  );
};

export default RelatedProducts;
