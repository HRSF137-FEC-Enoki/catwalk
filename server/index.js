const express = require('express');
const path = require('path');
const axios = require('axios');
const url = require('url');

const { API_BASE_URL, GITHUB_API_TOKEN } = require('../config/config');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = 3000;
const options = {
  headers: { Authorization: GITHUB_API_TOKEN },
};

app.get('/products', (req, res) => {
  axios.get(`${API_BASE_URL}/products`, options)
    .then((response) => {
      console.log(response.data);

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

app.get('/reviews', (req, res) => {
  const { query } = url.parse(req.url);
  const id = query.slice(query.indexOf('=') + 1);
  axios.get(`${API_BASE_URL}/reviews?product_id=${id}`, options)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(`Error:: ${err}`);
    });
});
app.put('/reviews/:review_id/helpful', (req, res) => {
  axios.put(`${API_BASE_URL}/reviews/${req.params.review_id}/helpful`, options)
    .then(() => res.sendStatus(204))
    .catch((err) => {
      res.send(`Error:: ${err}`);
    });
});
app.put('/reviews/:review_id/report', (req, res) => {
  axios.put(`${API_BASE_URL}/reviews/${req.params.review_id}/report`, options)
    .then(() => res.sendStatus(204))
    .catch((err) => {
      res.send(`Error:: ${err}`);
    });
});
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server running on ${port}`);
});
