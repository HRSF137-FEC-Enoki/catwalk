import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineStar } from 'react-icons/ai';

const Card = ({ relatedProduct }) => (
  <div className="related-products__card">
    <div className="related-products__card-image">
      <AiOutlineStar />
    </div>
    <p className="related-products__card-category">{relatedProduct.category}</p>
    <p className="related-proucts__card-expanded-name">
      {`${relatedProduct.name} - ${relatedProduct.slogan}`}
    </p>
    <p className="related-products__card-price">{relatedProduct.default_price}</p>
    <p className="related-products__card-rating">TODO:: Star Rating</p>
  </div>
);

Card.propTypes = {
  relatedProduct: PropTypes.shape({
    name: PropTypes.string,
    slogan: PropTypes.string,
    category: PropTypes.string,
    default_price: PropTypes.string,
  }).isRequired,
};

export default Card;
