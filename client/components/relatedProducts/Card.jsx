import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineStar } from 'react-icons/ai';

import StarRating from '../StarRating';

import '../../css/relatedProducts/Card.scss';

const Card = ({ relatedProduct, imageUrl, rating }) => (
  <div className="related-products__card">
    <div className="related-products__card-image" style={{ backgroundImage: `url(${imageUrl})` }}>
      <AiOutlineStar />
    </div>
    <div className="related-products__card-details">
      <p className="related-products__card-category">{relatedProduct.category}</p>
      <p className="related-products__card-expanded-name">
        {`${relatedProduct.name} : ${relatedProduct.slogan}`}
      </p>
      <p className="related-products__card-price">{`$${relatedProduct.default_price}`}</p>
      <StarRating size={24} rating={rating} />
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
};

export default Card;
