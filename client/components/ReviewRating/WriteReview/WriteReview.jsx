import React, { useState } from 'react';

import PropTypes from 'prop-types';
import axios from 'axios';

const WriteReview = ({ isClickAdd, closeWriteReview, id }) => {
  const [newReview, setNewReview] = useState({
    rating: 5,
    summary: '',
    body: '',
    recommend: 'Yes',
    name: '',
    email: '',
    photo: '',
    product_id: id,
  });
  const [characteristics, setCharacteristics] = useState({
    characteristics: '',
    characteristics_value: 5,
  });
  const [isValid, setIsValid] = useState(true);
  const [photoUrl, setPhotoUrl] = useState([]);

  const looksLikeMail = (str) => {
    const lastAtPos = str.lastIndexOf('@');
    const lastDotPos = str.lastIndexOf('.');
    return (lastAtPos < lastDotPos && lastAtPos > 0 && str.indexOf('@@') === -1 && lastDotPos > 2 && (str.length - lastDotPos) > 2);
  };
  const saveUrl = () => {
    if (newReview.photo && (newReview.photo.match(/\.(jpeg|jpg|gif|png)$/) != null)) {
      setPhotoUrl([...photoUrl, newReview.photo]);
    } else {
      document.getElementById('photo').classList.add('error');
      document.getElementById('photo').placeholder = 'invalid ulr';
    }
    setNewReview({ ...newReview, photo: '' });
  };
  const onChangeHandler = (e) => {
    document.getElementById('summary').classList.remove('error');
    document.getElementById('name').classList.remove('error');
    document.getElementById('email').classList.remove('error');
    document.getElementById('body').classList.remove('error');
    document.getElementById('characteristics').classList.remove('error');
    document.getElementById('photo').classList.remove('error');

    if (e.target.name === 'characteristics_value' || e.target.name === 'characteristics') {
      setCharacteristics({ ...characteristics, [e.target.name]: e.target.value });
    } else {
      setNewReview({ ...newReview, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    setIsValid(true);
    e.preventDefault();
    if (!newReview.summary) {
      document.getElementById('summary').classList.add('error');
      document.getElementById('summary').placeholder = 'can not be empty';
      setIsValid(false);
    }
    if (!characteristics.characteristics) {
      document.getElementById('characteristics').classList.add('error');
      document.getElementById('characteristics').placeholder = 'can not be empty';
      setIsValid(false);
    }
    if (!newReview.body) {
      document.getElementById('body').classList.add('error');
      document.getElementById('body').placeholder = 'can not be empty';
      setIsValid(false);
    }
    if (!newReview.email) {
      document.getElementById('email').classList.add('error');
      document.getElementById('email').placeholder = 'can not be empty';
      setIsValid(false);
    }
    if (!newReview.name) {
      document.getElementById('name').classList.add('error');
      document.getElementById('name').placeholder = 'can not be empty';
      setIsValid(false);
    }
    if (newReview.email && !looksLikeMail(newReview.email)) {
      document.getElementById('email').classList.add('error');
      setNewReview({ ...newReview, email: '' });
      document.getElementById('email').placeholder = 'invalid email';
      setIsValid(false);
    }
    if (newReview.body && newReview.body.length < 5) {
      document.getElementById('body').classList.add('error');
      setNewReview({ ...newReview, body: '' });
      document.getElementById('body').placeholder = 'must be greater than 50 characters';
      setIsValid(false);
    }
    if (isValid) {
      const review = newReview;
      review.photo = photoUrl;
      review.characteristics = characteristics;
      if (review.name !== '') {
        axios.post('/reviews', review);
        closeWriteReview();
        console.log(review);
      }
    }
  };
  return (
    <div className={isClickAdd ? 'window' : 'close'}>
      <form className="modal">
        <h3>Review</h3>
        <label
          htmlFor="rating"
        >
          Rating:
          <input className="formInput" name="rating" id="rating" type="range" min="0" max="5" value={newReview.rating || ''} onChange={onChangeHandler} required />
        </label>
        <label
          htmlFor="summary"
        >
          Summary:
          <input className="formInput" name="summary" id="summary" value={newReview.summary || ''} onChange={onChangeHandler} maxLength="60" required />
        </label>
        <label
          htmlFor="body"
        >
          Body:
          <textarea className="formInput" name="body" id="body" value={newReview.body || ''} onChange={onChangeHandler} maxLength="2500" row="10" required />
        </label>
        <label
          htmlFor="recommend"
        >
          Recommend:
          <label htmlFor="yes">
            Yes
            <input name="recommend" id="yes" type="radio" value={'yes' || ''} onChange={onChangeHandler} checked />
          </label>

          <label htmlFor="no">
            No
            <input name="recommend" id="no" type="radio" value={'no' || ''} onChange={onChangeHandler} />
          </label>
        </label>
        <label
          htmlFor="name"
        >
          Name:
          <input className="formInput" name="name" id="name" value={newReview.name || ''} onChange={onChangeHandler} />
        </label>
        <label
          htmlFor="email"
        >
          Email:
          <input className="formInput" name="email" id="email" value={newReview.email || ''} onChange={onChangeHandler} required />
        </label>
        <label
          htmlFor="photo"
        >
          Photos:
          <input name="photo" id="photo" value={newReview.photo || ''} onChange={onChangeHandler} />
          <button type="button" onClick={saveUrl}>add url</button>
        </label>
        {photoUrl && photoUrl.map((url) => (
          <div key={url}>{url}</div>
        ))}
        <label
          htmlFor="characteristics"
        >
          Characteristics:
          <input name="characteristics" placeholder="characteristics" id="characteristics" value={characteristics.characteristics || ''} onChange={onChangeHandler} />
          <input name="characteristics_value" type="range" min="0" max="5" id="characteristics_value" value={characteristics.characteristics_value || ''} onChange={onChangeHandler} />
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
