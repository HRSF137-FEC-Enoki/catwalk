import React from 'react';
import { FaStar } from 'react-icons/fa';

const clickableStar = (rating) => [...Array(rating)].map((star, i) => (
  <span onClick={onClickHandler} >
    <FaStar style={{ color: 'yellow' }} name={i}/>
  </span>
));

const onClickHandler = (e) => (
  console.log(e.target.parentElement)
);

export default clickableStar;
