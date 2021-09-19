import axios from 'axios';

const getPhotos = (productId) => new Promise((resolve, reject) => {
  axios.get(`/api/products/${productId}/styles`)
    .then((styles) => {
      const { results } = styles.data;
      const { photos } = results[0];
      // const firstPhotoUrl = photos[0].url;

      resolve(photos);
    })
    .catch((err) => {
      reject(err);
    });
});

export default getPhotos;
