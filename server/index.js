const express = require('express');
const path = require('path');
const axios = require('axios');
const { join } = require('path');

const { API_BASE_URL, GITHUB_API_TOKEN } = require('../config/config');

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 3000;
const options = {
  headers: { Authorization: GITHUB_API_TOKEN },
};

app.use(express.static(path.join(__dirname, '../public')));

// app.use('/*', (req, res, next) => {
//   console.log('req recieved')
//   console.log(join(__dirname, '..', '/public', '/index.html'))
//   res.sendFile(join(__dirname, '..', '/public', '/index.html'))
//   next()
// })

app.get('/bundle.js', (req, res, next) => {
  console.log('recieved get request')
  if (req.header('Accept-Encoding').includes('br')) {
    console.log('calling brotli')
    res.set('Content-Encoding', 'br');
    res.set('Content-Type', 'application/javascript');
    res.sendFile(join(__dirname, '..', 'public', 'bundle.js.br'));
  } else {
    console.log('calling uncompressed')
    res.sendFile(join(__dirname, '..', 'public', 'bundle.js'));
  }

});

app.get('/api/products', (req, res) => {
  axios.get(`${API_BASE_URL}/products`, options)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(`Error:: ${err}`);
    });
});

app.get('/api/products/:product_id/styles', (req, res) => {
  const pid = req.params.product_id;

  axios.get(`${API_BASE_URL}/products/${pid}/styles`, options)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

app.get('/api/products/:product_id', (req, res) => {
  const pid = req.params.product_id;

  axios.get(`${API_BASE_URL}/products/${pid}`, options)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

app.get('/api/products/:product_id/related', (req, res) => {
  const pid = req.params.product_id;

  axios.get(`${API_BASE_URL}/products/${pid}/related`, options)
    .then(({ data }) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

app.get('/api/reviews', (req, res) => {
  const { product_id: pid, sort } = req.query;
  axios.get(`${API_BASE_URL}/reviews?product_id=${pid}&sort=${sort}`, options)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

app.put('/api/reviews/:review_id/helpful', (req, res) => {
  axios.put(`${API_BASE_URL}/reviews/${req.params.review_id}/helpful`, {}, options)
    .then(() => res.sendStatus(204))
    .catch(() => {
      res.sendStatus(404);
    });
});
app.put('/api/reviews/:review_id/report', (req, res) => {
  axios.put(`${API_BASE_URL}/reviews/${req.params.review_id}/report`, {}, options)
    .then(() => res.sendStatus(204))
    .catch(() => {
      res.sendStatus(404);
    });
});
app.post('/api/reviews', (req, res) => {
  axios.post(`${API_BASE_URL}/reviews?product_id${req.body.product_id}`, req.body, options)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(404);
    });
});
app.get('/api/reviews/meta/:id', (req, res) => {
  axios.get(`${API_BASE_URL}/reviews/meta?product_id=${req.params.id}`, options)
    .then((data) => res.send(data.data))
    .catch(() => {
      res.sendStatus(404);
    });
});

app.get('/api/cart', (req, res) => {
  axios.get(`${API_BASE_URL}/cart`, options)
    .then((data) => res.send(data.data))
    .catch(() => {
      res.sendStatus(404);
    });
});

app.post('/api/cart', (req, res) => {
  axios.post(`${API_BASE_URL}/cart`, req.body, options)
    .then((data) => res.send(data.data))
    .catch(() => {
      res.sendStatus(404);
    });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server running on ${port}`);
});
