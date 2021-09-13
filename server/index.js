/* eslint-disable arrow-parens */
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const path = require('path');
const axios = require('axios');

const port = 3000;

const config = require('../config/config');

app.use(express.static(path.join(__dirname, '../public')));

app.get('/products', (req, res) => {
  axios.get(`${config.API_URL}products`, {
    headers: { Authorization: config.GITHUB_API_TOKEN },
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      res.send(`Error:: ${err}`);
    });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server running on ${port}`);
});
