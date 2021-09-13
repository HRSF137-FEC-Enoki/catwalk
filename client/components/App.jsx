/* eslint-disable react/no-unused-state */
import React from 'react';
import axios from 'axios';

import RelatedProducts from './RelatedProducts';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      currentProduct: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    axios.get('/api/products')
      .then(({ data }) => {
        this.setState({
          products: data,
          currentProduct: data[0],
          isLoading: false,
        });
      });
  }

  render() {
    const { currentProduct, isLoading } = this.state;

    return (
      <div className="app-container">
        <header>
          Logo and Search Go Here
        </header>
        {isLoading ? <p>Loading!</p> : <RelatedProducts productId={currentProduct.id} />}
      </div>
    );
  }
}

export default App;
