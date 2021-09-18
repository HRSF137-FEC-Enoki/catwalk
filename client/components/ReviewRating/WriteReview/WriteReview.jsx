import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import StarRating from '../../StarRating';

const WriteReview = ({
  isClickAdd, closeWriteReview, id, fetchReviews, productName, charName, charId,
}) => {
  const [newReview, setNewReview] = useState({
    summary: '',
    body: '',
    recommend: true,
    name: '',
    email: '',
    photos: [],
    product_id: id,
  });
  const [characteristics, setCharacteristics] = useState({
    Size: null,
    Width: null,
    Comfort: null,
    Quality: null,
    Length: null,
    Fit: null,
  });
  const [isValid, setIsValid] = useState(true);
  const [errorGroup, setErrorGroup] = useState([]);
  const [selectRate, setSelectRate] = useState(5);

  useEffect(() => {
    if (newReview.photos.length === 5) {
      document.getElementById('upload').disabled = true;
    }
  }, [newReview.photos]);
  const looksLikeMail = (str) => {
    const lastAtPos = str.lastIndexOf('@');
    const lastDotPos = str.lastIndexOf('.');
    return (lastAtPos < lastDotPos && lastAtPos > 0 && str.indexOf('@@') === -1 && lastDotPos > 2 && (str.length - lastDotPos) > 2);
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      if (newReview.photos.length < 5) {
        const images = [...newReview.photos];
        images.push(URL.createObjectURL(img));
        setNewReview({ ...newReview, photos: images });
      }
      document.getElementById('upload').value = '';
    }
  };
  const onChangeHandler = (e) => {
    if (charName.includes(e.target.name)) {
      setCharacteristics({ ...characteristics, [e.target.name]: e.target.value });
    } else {
      setNewReview({ ...newReview, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    setIsValid(true);
    e.preventDefault();
    if (!newReview.summary) {
      setErrorGroup([...errorGroup, 'summary']);
      setNewReview({ ...newReview, summary: '' });
      document.getElementById('summary').placeholder = 'Example: Best purchase ever!';
      setIsValid(false);
    }
    if (!newReview.body) {
      setErrorGroup([...errorGroup, 'body']);
      setNewReview({ ...newReview, body: '' });
      document.getElementById('body').placeholder = 'Why did you like the product or not?';
      setIsValid(false);
    }
    if (!newReview.email) {
      setErrorGroup([...errorGroup, 'email']);
      setNewReview({ ...newReview, email: '' });
      document.getElementById('email').placeholder = 'Example: jackson11@email.com';
      setIsValid(false);
    }
    if (!newReview.name) {
      setErrorGroup([...errorGroup, 'Nikename']);
      setNewReview({ ...newReview, name: '' });
      document.getElementById('name').placeholder = 'Example: jackson11!';
      setIsValid(false);
    }
    if (newReview.email && !looksLikeMail(newReview.email)) {
      if (!errorGroup.includes('email')) {
        setErrorGroup([...errorGroup, 'email']);
      }
      setNewReview({ ...newReview, email: '' });
      document.getElementById('email').placeholder = 'Example: jackson11@email.com';
      setIsValid(false);
    }
    if (newReview.body && newReview.body.length < 5) {
      setNewReview({ ...newReview, body: '' });
      if (!errorGroup.includes('body')) {
        setErrorGroup([...errorGroup, 'body']);
      }
      document.getElementById('body').placeholder = 'must be greater than 50 characters';
      setIsValid(false);
    }
    if (isValid) {
      const review = newReview;
      review.rating = Number(selectRate);
      const newChar = {};
      for (let i = 0; i < charName.length; i += 1) {
        console.log(characteristics[charName[i]], String(charId[i]));
        let value = characteristics[charName[i]];
        const key = String(charId[i]);
        if (value !== null) {
          value = Number(value);
          newChar[key] = value;
        }
      }
      review.characteristics = newChar;
      setNewReview(review);
      console.log(newReview);
      if (review.name !== '') {
        axios.post('/api/reviews', newReview)
          .then(() => {
            fetchReviews();
          });
        closeWriteReview();
      }
    }
  };
  return (
    <div className={isClickAdd ? 'window' : 'close'}>
      {!isValid && <div id="error_message">“You must enter the following:”</div>}
      <form className="modal">
        <h1>Write Your Review</h1>
        <h3>
          About the
          {' '}
          {productName}
        </h3>
        <div className="inputLabel">
          <span>
            Rating:
            <StarRating size={30} rating={selectRate} callback={setSelectRate} />
          </span>
        </div>
        <div className="inputLabel">
          Recommend:
          <span>
            Yes
            <input name="recommend" id="yes" type="radio" value onChange={onChangeHandler} defaultChecked />
          </span>
          <span>
            No
            <input name="recommend" id="no" type="radio" value={false} onChange={onChangeHandler} />
          </span>
        </div>

        <div className="inputLabel">
          {charName.map((title) => (
            <div key={title}>
              <span key={title}>
                {title}
              </span>
              <input name={title} type="radio" value={1 || ''} onChange={onChangeHandler} />

              <input name={title} type="radio" value={2 || ''} onChange={onChangeHandler} />

              <input name={title} type="radio" value={3 || ''} onChange={onChangeHandler} />

              <input name={title} type="radio" value={4 || ''} onChange={onChangeHandler} />

              <input name={title} type="radio" value={5 || ''} onChange={onChangeHandler} />

            </div>
          ))}
        </div>

        <div className="inputLabel">
          <span>
            Summary:
          </span>
          <input
            className="formInput"
            name="summary"
            id="summary"
            value={newReview.summary || ''}
            onChange={onChangeHandler}
            maxLength="60"
            placeholder="Example: Best purchase ever!"
            required
          />
        </div>
        <div className="inputLabel">
          <span>
            Body:
          </span>
          <textarea
            className="formInput"
            name="body"
            id="body"
            value={newReview.body || ''}
            onChange={onChangeHandler}
            maxLength="1000"
            row="10"
            placeholder="Why did you like the product or not?"
            required
          />
        </div>
        <div id="wordCount">
          {newReview.body.length > 50
            ? 'Minimum reached'
            : `Minimum required characters left: ${50 - newReview.body.length}`}
        </div>

        <div className="inputLabel">
          <span>
            Photos:
          </span>
          <input type="file" name="photos" id="upload" onChange={onImageChange} />
          <div>
            {newReview.photos.map((photo, index) => (
              <img src={newReview.photos[index]} alt="not found" width="20px" key={photo} />
            ))}
          </div>
        </div>

        <div className="inputLabel">
          <span>
            Nickname:
          </span>
          <input className="formInput" name="name" id="name" value={newReview.name || ''} onChange={onChangeHandler} placeholder="Example: jackson11!" maxLength="60" />
        </div>
        <div className="inputLabel">
          <span>
            Email:
          </span>
          <input className="formInput" name="email" id="email" value={newReview.email || ''} onChange={onChangeHandler} required placeholder="Example: jackson11@email.com" maxLength="60" />
        </div>
        <div className="reviewBtn">
          <button type="button" onClick={() => closeWriteReview()}>Cancel</button>
          <button type="button" onClick={onSubmit}>Submit</button>
        </div>

      </form>
    </div>
  );
};
WriteReview.propTypes = {
  isClickAdd: PropTypes.bool,
}.isRequired;

export default WriteReview;
