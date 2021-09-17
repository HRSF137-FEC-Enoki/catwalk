import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import getImageUrl from '../../utils/getImageUrl';

import Card from './Card';

import '../../css/relatedProducts/RelatedProducts.scss';

const RelatedProducts = ({ productId, rating }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ error: false, msg: '' });
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // make a GET request to /api/products/:product_id/related
    axios.get(`/api/products/${productId}/related`)
      .then(({ data }) => data)
      .then((ids) => ids.map((id) => axios.get(`/api/products/${id}`)))
      .then((promises) => {
        Promise.allSettled(promises).then((results) => {
          const values = [];

          // Don't include rejected promises
          results.forEach((result) => {
            if (result.status === 'fulfilled') {
              values.push(result.value);
            }
          });

          setProducts(values);
          setIsLoading(false);
        });
      })
      .catch((err) => {
        setIsError({ error: true, msg: err });
      });
  }, []);

  useEffect(() => {
    getImageUrl(productId).then((url) => setImageUrl(url));
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
                  <Card rating={rating} relatedProduct={product.data} imageUrl={imageUrl} />
                </li>
              ))}
            </ul>
          )}
        {isError.error && <div>Error Loading Related Products</div>}
      </div>
    </div>
  );
};

RelatedProducts.propTypes = {
  productId: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
};

export default RelatedProducts;
