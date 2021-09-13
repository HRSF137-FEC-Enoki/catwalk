const express = require('express');
const path = require('path');
const axios = require('axios');

const { API_BASE_URL, GITHUB_API_TOKEN } = require('../config/config');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = 3000;
const options = {
  headers: { Authorization: GITHUB_API_TOKEN },
};

app.use(express.static(path.join(__dirname, '../public')));

app.get('/products', (req, res) => {
  axios.get(`${API_BASE_URL}/products`, options)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(`Error:: ${err}`);
    });
});

app.get('/products/:product_id', (req, res) => {
  const pid = req.params.product_id;

  axios.get(`${API_BASE_URL}/products/${pid}`, options)
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
