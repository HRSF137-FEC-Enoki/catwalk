import React, { useState } from 'react';

import PropTypes from 'prop-types';

const WriteReview = ({ isClickAdd, closeWriteReview }) => {
  const [newReview, setNewReview] = useState({
    rating: 0,
    summary: '',
    body: '',
    recommend: '',
    name: '',
    email: '',
    photo: [],
  });
  const [characteristics, setCharacteristics] = useState({
    characteristics_id: '',
    characteristics_value: '',
  });
  const onChangeHandler = (e) => {
    if (e.target.name === 'characteristics_value' || e.target.name === 'characteristics_id') {
      setCharacteristics({ ...characteristics, [e.target.name]: e.target.value });
    } else {
      setNewReview({ ...newReview, [e.target.name]: e.target.value });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    closeWriteReview();
  };
  return (
    <div className={isClickAdd ? 'window' : 'close'}>
      <form className="modal">
        <h3>Review</h3>
        <label
          htmlFor="rating"
        >
          Rating:
          <input name="rating" id="rating" value={newReview.rating} onChange={onChangeHandler} />
        </label>
        <label
          htmlFor="summary"
        >
          Summary:
          <input name="summary" id="summary" value={newReview.summary} onChange={onChangeHandler} />
        </label>
        <label
          htmlFor="body"
        >
          Body:
          <input name="body" id="body" value={newReview.body} onChange={onChangeHandler} />
        </label>
        <label
          htmlFor="recommend"
        >
          Recommend:
          <input name="recommend" id="recommend" value={newReview.recommend} onChange={onChangeHandler} />
        </label>
        <label
          htmlFor="name"
        >
          Name:
          <input name="name" id="name" value={newReview.name} onChange={onChangeHandler} />
        </label>
        <label
          htmlFor="email"
        >
          Email:
          <input name="email" id="email" value={newReview.email} onChange={onChangeHandler} />
        </label>
        <label
          htmlFor="photos"
        >
          Photos:
          <input name="photos" id="photos" value={newReview.photos} onChange={onChangeHandler} />
        </label>
        <label
          htmlFor="characteristics"
        >
          Characteristics:
          <input name="characteristics_id" placeholder="id" id="characteristics_id" value={characteristics.characteristics_id} onChange={onChangeHandler} />
          <input name="characteristics_value" placeholder="value" id="characteristics_value" value={characteristics.characteristics_value} onChange={onChangeHandler} />
        </label>
        <button type="button" onClick={onSubmit}>Submit</button>
      </form>
    </div>
  );
};
WriteReview.propTypes = {
  isClickAdd: PropTypes.bool,
}.isRequired;

export default WriteReview;
