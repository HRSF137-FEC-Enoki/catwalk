import axios from 'axios';

const getImageUrl = (productId) => new Promise((resolve, reject) => {
  axios.get(`/api/products/${productId}/styles`)
    .then((reviews) => {
      const { results } = reviews.data;
      const { photos } = results[0];
      const firstPhotoUrl = photos[0].url;

      resolve(firstPhotoUrl);
    })
    .catch((err) => {
      reject(err);
    });
});

export default getImageUrl;
