const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

const port = 3000;

const config = require('../config/config');

const PRODUCTS_URL = `${config.API_URL}products`;
const options = {
  headers: { Authorization: config.GITHUB_API_TOKEN },
};

app.use(express.static(path.join(__dirname, '../public')));

app.get('/products', (req, res) => {
  axios.get(PRODUCTS_URL, options)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(`Error:: ${err}`);
    });
});

app.get('/products/:product_id', (req, res) => {
  const productId = req.params.product_id;

  axios.get(`${PRODUCTS_URL}/${productId}`, options)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server running on ${port}`);
});
