import getPhotos from '../utils/getPhotos';

describe('getPhotos utitlity function', () => {
  test('it should return a function', () => {
    expect(typeof getPhotos()).toBe('function');
  });
});
