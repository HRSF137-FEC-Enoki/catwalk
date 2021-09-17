import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineStar } from 'react-icons/ai';

import StarRating from '../StarRating';

import getStarRatingAvg from '../../utils/getStarRatingAvg';
import getImageUrl from '../../utils/getImageUrl';

import '../../css/relatedProducts/Card.scss';

const STAR_SIZE = 24;

const Card = ({
  relatedProduct, handleActionBtnClick, handleCardClick,
}) => {
  const [rating, setRating] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const hasNoRating = Number.isNaN(rating);

  useEffect(() => {
    getStarRatingAvg(relatedProduct.id).then((result) => setRating(result.avg));
    getImageUrl(relatedProduct.id).then((url) => setImageUrl(url));
  }, []);

  return (
    <div className="related-products__card" role="button" tabIndex={0} onKeyPress={() => { handleCardClick(relatedProduct.id); }} onClick={() => { handleCardClick(relatedProduct.id); }}>
      <div className="related-products__card-image" style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : {}}>
        <span className="related-products__action-btn" role="button" tabIndex={0} onKeyPress={() => { handleActionBtnClick(relatedProduct); }} onClick={() => handleActionBtnClick(relatedProduct)}>
          <AiOutlineStar size={STAR_SIZE} />
        </span>
      </div>
      <div className="related-products__card-details">
        <p className="related-products__card-category">{relatedProduct.category}</p>
        <p className="related-products__card-expanded-name">
          {`${relatedProduct.name} : ${relatedProduct.slogan}`}
        </p>
        <p className="related-products__card-price">{`$${relatedProduct.default_price}`}</p>
        <StarRating size={STAR_SIZE} rating={rating} />
        {hasNoRating && <span className="star-rating__no-rating-msg">Be the first to rate this product!</span>}
      </div>
    </div>
  );
};

Card.propTypes = {
  relatedProduct: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    slogan: PropTypes.string,
    category: PropTypes.string,
    default_price: PropTypes.string,
  }).isRequired,
  handleActionBtnClick: PropTypes.func.isRequired,
  handleCardClick: PropTypes.func.isRequired,
};

export default Card;
