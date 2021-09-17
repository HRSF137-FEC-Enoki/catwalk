import axios from 'axios';

const getStarRatingAvg = (productId) => new Promise((resolve, reject) => {
  axios.get(`/api/reviews?product_id=${productId}`)
    .then((reviews) => {
      const { results } = reviews.data;
      let count = 0;

      results.forEach((review) => {
        const { rating } = review;
        count += rating;
      });

      const avg = Math.round((count * 100) / results.length) / 100;

      resolve({ avg, count });
    })
    .catch((err) => {
      reject(err);
    });
});

export default getStarRatingAvg;
