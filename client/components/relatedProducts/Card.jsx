import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineStar } from 'react-icons/ai';

import StarRating from '../StarRating';

import getStarRatingAvg from '../../utils/getStarRatingAvg';
import getPhotos from '../../utils/getImageUrl';

import '../../css/relatedProducts/Card.scss';

const STAR_SIZE = 16;

const Card = ({
  relatedProduct, handleActionBtnClick, handleCardClick,
}) => {
  const [rating, setRating] = useState(0);
  const [thumbnails, setThumbnails] = useState([]);
  const [mainImageUrl, setMainImageUrl] = useState('');

  useEffect(() => {
    getStarRatingAvg(relatedProduct.id).then((result) => setRating(result.avg));
    getPhotos(relatedProduct.id).then((images) => {
      const firstImage = images[0];
      const remaining = images.slice(1, 5);

      setMainImageUrl(firstImage.url);
      setThumbnails(remaining);
    });
  }, []);

  return (
    <div className="related-products__card" role="button" tabIndex={0} onKeyPress={() => { handleCardClick(relatedProduct.id); }} onClick={() => handleCardClick(relatedProduct.id)}>
      <div className="related-products__card-image" style={mainImageUrl ? { backgroundImage: `url(${mainImageUrl})` } : {}}>
        <span className="related-products__action-btn" role="button" tabIndex={0} onKeyPress={() => { handleActionBtnClick(relatedProduct); }} onClick={(e) => { e.stopPropagation(); handleActionBtnClick(relatedProduct); }}>
          <AiOutlineStar color="goldenrod" size={STAR_SIZE} />
        </span>
        <div className="related-products__card-thumbnails">
          {thumbnails.map((image) => {
            return <span className="related-products__card-thumbnail" style={{backgroundImage: `url(${image.thumbnail_url})`}} />
          })}
        </div>
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
