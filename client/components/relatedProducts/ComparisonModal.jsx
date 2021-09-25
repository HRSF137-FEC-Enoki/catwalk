import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';

import '../../css/relatedProducts/ComparisonModal.scss';

const ComparisonModal = ({ related, current, handleCloseClick }) => {
  const comparisonObj = {
    Price: [current.default_price, related.default_price],
    Category: [current.category, related.category],
  };
  // map current features to comparison object
  current.features.forEach((item) => {
    const { feature, value } = item;
    comparisonObj[feature] = [value, null];
  });
  // map related features to comparison object
  related.features.forEach((item) => {
    const { feature, value } = item;

    if (feature in comparisonObj) {
      comparisonObj[feature][1] = value;
    } else {
      comparisonObj[feature] = [null, value];
    }
  });

  const keyPressHandler = (e) => {
    // airbnb style guide requires keypress and tab index for accessibility
    // keyCode refers to tab index
    if (e.keyCode === 0) {
      handleCloseClick();
    }
  };

  return (
    <div className="comparison-modal">
      <h3 className="comparison-modal__heading">Comparing</h3>
      <span data-testid="close-modal" role="button" tabIndex="0" onKeyPress={keyPressHandler} className="comparison-modal__close" onClick={handleCloseClick}>
        <AiOutlineClose size={24} />
      </span>
      <table className="comparison-modal__table">
        <thead>
          <tr>
            <th>{current.name}</th>
            <th>Product</th>
            <th>{related.name}</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(comparisonObj).map((key) => (
            <tr key={key + Math.random()}>
              <td>{key === 'Price' ? `$ ${comparisonObj[key][0]}` : comparisonObj[key][0]}</td>
              <td>{key}</td>
              <td>{key === 'Price' ? `$ ${comparisonObj[key][1]}` : comparisonObj[key][1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ComparisonModal.propTypes = {
  related: PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    default_price: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  current: PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    default_price: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  handleCloseClick: PropTypes.func.isRequired,
};

export default ComparisonModal;
