import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineStar } from 'react-icons/ai';

import StarRating from '../StarRating';

import '../../css/relatedProducts/Card.scss';

const STAR_SIZE = 24;

const Card = ({ relatedProduct, imageUrl, rating, handleCardClick }) => (
  // TODO:: handle these airbnb eslint rules
  // - click-events-have-key-events
  // - no-static-element-interactions
  <div className="related-products__card">
    <div className="related-products__card-image" style={{ backgroundImage: `url(${imageUrl})` }}>
      <a className="related-products__action-btn" onClick={() => handleCardClick(relatedProduct)}>
        <AiOutlineStar size={STAR_SIZE} />
      </a>
    </div>
    <div className="related-products__card-details">
      <p className="related-products__card-category">{relatedProduct.category}</p>
      <p className="related-products__card-expanded-name">
        {`${relatedProduct.name} : ${relatedProduct.slogan}`}
      </p>
      <p className="related-products__card-price">{`$${relatedProduct.default_price}`}</p>
      <StarRating size={STAR_SIZE} rating={rating} />
    </div>
  </div>
);

Card.propTypes = {
  relatedProduct: PropTypes.shape({
    name: PropTypes.string,
    slogan: PropTypes.string,
    category: PropTypes.string,
    default_price: PropTypes.string,
  }).isRequired,
  imageUrl: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  handleCardClick: PropTypes.func.isRequired,
};

export default Card;
