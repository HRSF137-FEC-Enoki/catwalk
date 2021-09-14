import React from 'react';

import ProductOverview from './ProductOverview/ProductOverview';

import getStarRatingAvg from '../utils/getStarRatingAvg';

getStarRatingAvg(48432).then((results) => console.log(results));

const App = () => (
  <>
    <div>Header</div>
    <div><ProductOverview /></div>
  </>
);

export default App;
