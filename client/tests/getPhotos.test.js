import getPhotos from '../utils/getPhotos';

jest.mock('../utils/getPhotos');

describe('getPhotos utitlity function', () => {
  const mockPhotos = [
    {
      thumbnail_url: 'urlplaceholder/style_1_photo_number_thumbnail.jpg',
      url: 'urlplaceholder/style_1_photo_number.jpg',
    },
    {
      thumbnail_url: 'urlplaceholder/style_1_photo_number_thumbnail.jpg',
      url: 'urlplaceholder/style_1_photo_number.jpg',
    },
  ];

  test('it should return a function', () => {
    expect(typeof getPhotos()).toBe('object');
  });

  test('it should work with promises', () => {
    expect.assertions(1);
    return getPhotos(1234).then((data) => expect(data.results[0].photos).toEqual(mockPhotos));
  });

  test('it should throw an error with invalid id', () => getPhotos(5150).catch((err) => expect(err).toBe('No photos here')));
});
