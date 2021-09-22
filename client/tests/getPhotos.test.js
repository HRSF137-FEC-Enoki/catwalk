import axios from 'axios';

import getPhotos from '../utils/getPhotos';

jest.mock('axios');

describe('getPhotos utitlity function', () => {
  const productSyles = {
    product_id: 1234,
    results: [
      {
        style_id: 1,
        name: 'Forest Green & Black',
        original_price: '140',
        sale_price: '0',
        'default?': true,
        photos: [
          {
            thumbnail_url: 'urlplaceholder/style_1_photo_number_thumbnail.jpg',
            url: 'urlplaceholder/style_1_photo_number.jpg',
          },
          {
            thumbnail_url: 'urlplaceholder/style_1_photo_number_thumbnail.jpg',
            url: 'urlplaceholder/style_1_photo_number.jpg',
          },
        ],
        skus: {
          37: {
            quantity: 8,
            size: 'XS',
          },
          38: {
            quantity: 16,
            size: 'S',
          },
          39: {
            quantity: 17,
            size: 'M',
          },
        },
      },
    ],
  };

  const mockPhotos = [
    {
      thumbnail_url: 'urlplaceholder/style_1_photo_number_thumbnail.jpg',
      url: 'urlplaceholder/style_1_photo_number.jpg',
    },
    {
      thumbnail_url: 'urlplaceholder/style_1_photo_number_thumbnail.jpg',
      url: 'urlplaceholder/style_1_photo_number.jpg',
    },
  ]

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: productSyles });
  });

  test('it should return a function', () => {
    expect(typeof getPhotos()).toBe('object');
  });

  test('it should work with promises', () => getPhotos(1234).then((photos) => expect(photos).toEqual(mockPhotos)));

  test('it works with async/await', async () => {
    expect.assertions(1);
    const data = await getPhotos(1234);

    expect(data).toEqual(mockPhotos);
  });

  test('it should throw an error with invalid id', () => getPhotos(5150).catch((err) => expect(err).toBe('No photos here')));
});
