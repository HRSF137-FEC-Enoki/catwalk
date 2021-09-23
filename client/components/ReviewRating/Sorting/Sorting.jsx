import React from 'react';
import PropTypes from 'prop-types';

const Sorting = ({ setSort, reviews, fetchMeta }) => {
  const onChangeHandler = (e) => {
    const selectOrderBy = e.target.value;
    setSort(selectOrderBy);
    fetchMeta();
  };
  return (
    <form className="sorting">
      <span>
        {reviews.length}
        &nbsp;reviews, sorted by&nbsp;
      </span>
      <select id="sorting" onChange={onChangeHandler} defaultValue="relevant">
        <option value="helpful">Helpful</option>
        <option value="relevant">Relevant</option>
        <option value="newest">Newest</option>
      </select>
    </form>
  );
};

Sorting.propTypes = {
  id: PropTypes.number,
}.isRequired;

export default Sorting;
