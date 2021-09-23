import axios from 'axios';

const getPhotos = (productId) => new Promise((resolve, reject) => {
  axios.get(`/api/products/${productId}/styles`)
    .then((styles) => resolve(styles.data.results[0].photos))
    .catch((err) => reject(err));
});

export default getPhotos;
