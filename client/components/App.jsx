import React from 'react';

import ProductOverview from './ProductOverview/ProductOverview';
import '../css/AppCSS.css';

const App = () => (
  <div className="appContainer">
    <div className="logo">Logo</div>
    <div><ProductOverview /></div>
  </div>
);

export default App;
