import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import $ from 'jquery';

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
  const [selectRate, setSelectRate] = useState(5);
  const [errMsg, setErrMsg] = useState([]);

  useEffect(() => {
    if (newReview.photos.length === 5) {
      $('#upload').disabled = true;
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
      $('#upload').value = '';
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
    const errBlock = [];
    if (!newReview.summary) {
      $('#form_summary').placeholder = 'Example: Best purchase ever!';
      errBlock.push('Summary');
    }
    if (!newReview.body) {
      errBlock.push('Body');
      $('#form_body').placeholder = 'Why did you like the product or not?';
    }
    if (!newReview.email) {
      errBlock.push('Email');
      $('#form_email').placeholder = 'Example: jackson11@email.com';
    }
    if (!newReview.name) {
      errBlock.push('Nikename');
      $('#form_name').placeholder = 'Example: jackson11!';
    }
    if (newReview.email && !looksLikeMail(newReview.email)) {
      if (!errMsg.includes('Email')) {
        errBlock.push('Email');
      }
      $('#form_email').placeholder = 'Example: jackson11@email.com';
    }
    if (newReview.body && newReview.body.length < 5) {
      if (!errMsg.includes('Body')) {
        errBlock.push('Body');
      }
      $('#form_body').placeholder = 'must be greater than 50 characters';
    }
    setErrMsg([...errMsg, errBlock]);
    if (errBlock.length !== 0) {
      setIsValid(false);
    } else {
      const review = newReview;
      review.rating = Number(selectRate);
      const newChar = {};
      for (let i = 0; i < charName.length; i += 1) {
        let value = characteristics[charName[i]];
        const key = String(charId[i]);
        if (value !== null) {
          value = Number(value);
          newChar[key] = value;
        }
      }
      review.characteristics = newChar;
      setNewReview(review);
      if (review.name !== '') {
        axios.post('/api/reviews', newReview)
          .then(() => {
            fetchReviews();
          });
        setNewReview({
          summary: '',
          body: '',
          recommend: true,
          name: '',
          email: '',
          photos: [],
          product_id: id,
        });
        setCharacteristics({
          Size: null,
          Width: null,
          Comfort: null,
          Quality: null,
          Length: null,
          Fit: null,
        });
        setErrMsg([]);
        setSelectRate(5);
        closeWriteReview();
      }
    }
  };
  return (
    <div className={isClickAdd ? 'window' : 'close'}>
      {!isValid && (
        <div id="error_message">
          <div>You must enter the following:</div>
          {errMsg[0] && errMsg[0].map((err) => (
            <div key={err}>{err}</div>
          ))}
          <button
            type="button"
            onClick={() => {
              setErrMsg([]);
              setIsValid(true);
            }}
            data-testid="form_button"
          >
            OK
          </button>
        </div>
      )}
      <div className={isValid ? 'window' : 'close'}>

        <form className="form_modal">
          <h1>Write Your Review</h1>
          <h3>
            About the
            {' '}
            {productName}
          </h3>
          <div>
            <span>
              <b>Rating:</b>
              <p />
              <StarRating size={30} rating={selectRate} callback={setSelectRate} />
            </span>
          </div>
          <div className="input_label">
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

          <div className="radios">
            {charName.map((title) => (
              <div key={title}>
                <span key={title}>
                  {title}
                </span>
                {[1, 2, 3, 4, 5].map((val) => (
                  <input name={title} type="radio" value={val || ''} key={title + val} onChange={onChangeHandler} />
                ))}
              </div>
            ))}
          </div>

          <div className="input_label">
            <span>
              Summary:
            </span>
            <input
              className="form_input"
              name="summary"
              id="form_summary"
              value={newReview.summary || ''}
              onChange={onChangeHandler}
              maxLength="60"
              placeholder="Example: Best purchase ever!"
              data-testid="form_summary"
              required
            />
          </div>
          <div className="input_label">
            <span>
              Body:
            </span>
            <textarea
              className="form_input"
              name="body"
              id="form_body"
              value={newReview.body || ''}
              onChange={onChangeHandler}
              maxLength="1000"
              row="10"
              placeholder="Why did you like the product or not?"
              data-testid="form_body"
              required
            />
          </div>
          <div id="word_count">
            {newReview.body.length > 50
              ? 'Minimum reached'
              : `Minimum required characters left: ${50 - newReview.body.length}`}
          </div>

          <div className="input_label">
            <span>
              Photos:
            </span>
            <input type="file" name="photos" id="upload" onChange={onImageChange} />
            <div>
              {newReview.photos.map((photo, index) => (
                <img src={newReview.photos[index]} alt="not found" key={photo} />
              ))}
            </div>
          </div>

          <div className="input_label">
            <span>
              Nickname:
            </span>
            <input className="form_input" name="name" id="form_name" value={newReview.name || ''} onChange={onChangeHandler} placeholder="Example: jackson11!" maxLength="60" data-testid="form_name" />
          </div>
          <div className="input_label">
            <span>
              Email:
            </span>
            <input className="form_input" name="email" id="form_email" value={newReview.email || ''} onChange={onChangeHandler} required placeholder="Example: jackson11@email.com" maxLength="60" data-testid="form_email" />
          </div>
          <div className="review_btn">
            <button type="button" onClick={() => closeWriteReview()} data-testid="cancel">Cancel</button>
            <button type="button" onClick={onSubmit} data-testid="submit">Submit</button>
          </div>

        </form>
      </div>
    </div>
  );
};
WriteReview.propTypes = {
  isClickAdd: PropTypes.bool,
}.isRequired;

export default WriteReview;
