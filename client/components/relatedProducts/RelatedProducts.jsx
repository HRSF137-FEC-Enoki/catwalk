import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Card from './Card';

import '../../css/relatedProducts/RelatedProducts.scss';

const RelatedProducts = ({ productId }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ error: false, msg: '' });

  useEffect(() => {
    // make a GET request to /api/products/:product_id/related
    axios.get(`/api/products/${productId}/related`)
      .then(({ data }) => data)
      .then((ids) => ids.map((id) => axios.get(`/api/products/${id}`)))
      .then((promises) => {
        Promise.all(promises).then((values) => {
          setProducts(values);
          setIsLoading(false);
        });
      })
      .catch((err) => {
        setIsError({ error: true, msg: err });
      });
  }, []);

  return (
    <div className="related-products">
      <h3>RelatedProducts</h3>
      <div className="related-products__row">
        {isLoading ? <div>Loadiing Related Products!</div>
          : (
            <ul className="related-products__carousel">
              {products.map((product) => (
                <li key={product.data.id} className="related-products__carousel-item">
                  <Card relatedProduct={product.data} />
                </li>
              ))}
            </ul>
          )}
        {isError.error ? <div>Error Loading Related Products</div> : ''}
      </div>
    </div>
  );
};

RelatedProducts.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default RelatedProducts;
