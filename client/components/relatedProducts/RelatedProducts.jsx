import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Card from './Card';
import ComparisonModal from './ComparisonModal';

import '../../css/relatedProducts/RelatedProducts.scss';

const RelatedProducts = ({ currentProduct, handleCardClick }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ error: false, msg: '' });
  const [showComparison, setShowComparison] = useState(false);
  const [relatedProduct, setRelatedProduct] = useState(null);

  useEffect(() => {
    // make a GET request to /api/products/:product_id/related
    axios.get(`/api/products/${currentProduct.id}/related`)
      .then(({ data }) => data)
      .then((ids) => ids.map((id) => axios.get(`/api/products/${id}`)))
      .then((promises) => {
        Promise.allSettled(promises).then((results) => {
          const values = [];

          // Don't include rejected promises
          results.forEach((result) => {
            if (result.status === 'fulfilled') {
              values.push(result.value.data);
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

  const handleActionBtnClick = (related) => {
    setRelatedProduct(related);
    setShowComparison(true);
  };

  const handleCloseClick = () => {
    setShowComparison(false);
  };

  return (
    <div className="related-products">
      <h3>Related Products</h3>
      <div className="related-products__row">
        {!isLoading ? (
          <ul className="related-products__carousel">
            {products.map((product) => (
              <li key={product.id} className="related-products__carousel-item">
                <Card
                  handleCardClick={handleCardClick}
                  handleActionBtnClick={handleActionBtnClick}
                  relatedProduct={product}
                />
              </li>
            ))}
          </ul>
        ) : <div>Loadiing Related Products!</div>}
        {isError.error && <div>Error Loading Related Products</div>}
      </div>
      {showComparison
        && (
          <ComparisonModal
            current={currentProduct}
            related={relatedProduct}
            handleCloseClick={handleCloseClick}
          />
        )}
    </div>
  );
};

RelatedProducts.propTypes = {
  currentProduct: PropTypes.shape({
    id: PropTypes.number.isRequired,
    features: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  handleCardClick: PropTypes.func.isRequired,
};

export default RelatedProducts;
