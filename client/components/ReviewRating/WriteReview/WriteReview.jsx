import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import axios from 'axios';

const WriteReview = ({
  isClickAdd, closeWriteReview, id, fetchReviews,
}) => {
  const [newReview, setNewReview] = useState({
    rating: 5,
    summary: '',
    body: '',
    recommend: true,
    name: '',
    email: '',
    photos: '',
    characteristics: {},
    product_id: id,
  });
  const [isValid, setIsValid] = useState(true);
  const [photoUrl, setPhotoUrl] = useState([]);
  const [charName, setCharName] = useState([]);
  const [charId, setCharId] = useState([]);
  const [charValue, setCharValue] = useState([]);

  useEffect(() => {
    axios.get(`/api/reviews/meta/${id}`)
      .then((res) => {
        setCharName(Object.entries(res.data.characteristics)
          .map((name) => name[0]));
        setCharId(Object.entries(res.data.characteristics)
          .map((name) => name[1])
          .map((_id) => _id.id));
        setCharValue(Object.entries(res.data.characteristics)
          .map((name) => name[1])
          .map((val) => parseInt(val.value, 10)));
      });
  }, []);

  const looksLikeMail = (str) => {
    const lastAtPos = str.lastIndexOf('@');
    const lastDotPos = str.lastIndexOf('.');
    return (lastAtPos < lastDotPos && lastAtPos > 0 && str.indexOf('@@') === -1 && lastDotPos > 2 && (str.length - lastDotPos) > 2);
  };
  const saveUrl = () => {
    if (newReview.photos && (newReview.photos.match(/\.(jpeg|jpg|gif|png)$/) != null)) {
      setPhotoUrl([...photoUrl, newReview.photos]);
    } else {
      document.getElementById('photos').classList.add('error');
      document.getElementById('photos').placeholder = 'invalid ulr';
    }
    setNewReview({ ...newReview, photos: '' });
  };
  const onChangeHandler = (e) => {
    if (e.target.name !== 'recommend') {
      document.getElementById(e.target.name).classList.remove('error');
    }
    if (charName.includes(e.target.name)) {
      const copyCharValue = [...charValue];
      copyCharValue[charName.indexOf(e.target.name)] = e.target.value;
      setCharValue(copyCharValue);
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
      review.photos = photoUrl;
      review.rating = Number(review.rating);
      for (let i = 0; i < charName.length; i += 1) {
        review.characteristics[charId[i]] = Number(charValue[i]);
      }

      if (review.name !== '') {
        axios.post('/api/reviews', review)
          .then(() => {
            fetchReviews();
          });
        closeWriteReview();
      }
    }
  };
  return (
    <div className={isClickAdd ? 'window' : 'close'}>
      <form className="modal">
        <h3>Review</h3>
        <div className="inputLabel">
          <span>
            Rating:
          </span>
          <input className="formInput" name="rating" id="rating" type="range" min="0" max="5" value={newReview.rating || ''} onChange={onChangeHandler} required />
        </div>
        <div className="inputLabel">
          <span>
            Summary:
          </span>
          <input className="formInput" name="summary" id="summary" value={newReview.summary || ''} onChange={onChangeHandler} maxLength="60" required />
        </div>
        <div className="inputLabel">
          <span>
            Body:
          </span>
          <textarea className="formInput" name="body" id="body" value={newReview.body || ''} onChange={onChangeHandler} maxLength="2500" row="10" required />
        </div>
        <div className="inputLabel">
          Recommend:
          <span htmlFor="yes">
            Yes
            <input name="recommend" id="yes" type="radio" value={true || ''} onChange={onChangeHandler} checked />
          </span>
          <span htmlFor="no">
            No
            <input name="recommend" id="no" type="radio" value={false || ''} onChange={onChangeHandler} />
          </span>
        </div>
        <div className="inputLabel">
          <span>
            Name:
          </span>
          <input className="formInput" name="name" id="name" value={newReview.name || ''} onChange={onChangeHandler} />
        </div>
        <div className="inputLabel">
          <span>
            Email:
          </span>
          <input className="formInput" name="email" id="email" value={newReview.email || ''} onChange={onChangeHandler} required />
        </div>
        <div className="inputLabel">
          <span>
            Photos:
          </span>
          <input name="photos" id="photos" value={newReview.photos || ''} onChange={onChangeHandler} />
          <button type="button" onClick={saveUrl}>add url</button>
        </div>
        {photoUrl && photoUrl.map((url) => (
          <div key={url}>{url}</div>
        ))}
        <label
          htmlFor="characteristics"
          className="characteristicsLabel"
          id="urlBox"
        >
          {charName && charName.map((char, index) => (
            <div key={char}>
              <label
                htmlFor={char}
              >
                {char}
              </label>
              <input className="formInput" value={charValue[index] || ''} name={char} id={char} type="range" min="1" max="5" onChange={onChangeHandler} />
            </div>
          ))}
        </label>
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