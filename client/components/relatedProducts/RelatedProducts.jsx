import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import $ from 'jquery';

import Card from './Card';
import ComparisonModal from './ComparisonModal';

import '../../css/relatedProducts/RelatedProducts.scss';

const RelatedProducts = ({ currentProduct, handleCardClick }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ error: false, msg: '' });
  const [showComparison, setShowComparison] = useState(false);
  const [relatedProduct, setRelatedProduct] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  let distance = 0; // distance of wheel scroll

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

  const handleNavigationClick = (e) => {
    e.stopPropagation();
    const isLeft = $(e.target).hasClass('related-products__chevron-left');
    // margin-left: 10px + card width: 250px + margin-rignt: 10px = 270px
    const direction = isLeft ? { right: '-=270' } : { right: '+=270' };
    const duration = 300;
    const idx = imageIndex;

    setImageIndex(isLeft ? idx - 1 : idx + 1);

    $('.related-products__card').animate(direction, duration);
  };

  const handleOnWheel = (e) => {
    const $cards = $('.related-products__card');
    const numOfCards = $cards.length;
    const outerWidth = $('.related-products')[0].getBoundingClientRect().width;
    const innerWidth = numOfCards * 270;
    const HALF_CARD_WIDTH = 125;

    distance += e.deltaY;

    if (distance > 0 && distance < (innerWidth - outerWidth) + HALF_CARD_WIDTH) {
      $cards.css({ right: `+=${e.deltaY}` });
    }
  };

  return (
    <div className="related-products">
      <h3>Related Products</h3>
      <div className="related-products__row" onWheel={handleOnWheel}>
        <div className="related-products__nav-overlay">
          <button
            type="button"
            onClick={handleNavigationClick}
            className={`related-products__chevron-left related-products__navigation ${imageIndex <= 0 ? 'invisible' : ''}`}
          >
            {'<'}
          </button>
          <button
            type="button"
            onClick={handleNavigationClick}
            className={`related-products__chevron-right related-products__navigation ${imageIndex >= products.length - 4 ? 'invisible' : ''}`}
          >
            {'>'}
          </button>
        </div>
        {!isLoading ? (
          <ul className="related-products__carousel">
            {products.map((product) => (
              <li data-testid="list-items" key={product.id} className="related-products__carousel-item">
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
