import axios from 'axios';

import getStarRatingAvg from '../utils/getStarRatingAvg';

jest.mock('axios');

describe('getStarRatingAvg utitlity function', () => {
  beforeEach(() => {
    const mockData = {
      product: '48432',
      page: 0,
      count: 5,
      results: [
        {
          review_id: 841259,
          rating: 2,
          summary: 'Never purchasing from here ever again!',
          recommend: false,
          response: null,
          body: 'I absolutely love the coat, however, the shoulders are tighter than they should be. I am really disappointed about that. I bought a size larger than I would normally wear, so I was surprised by the fit. I will most likely NOT order again because of the tight shoulder fit. It is very disappointing to find a coat I love and pay $140 for it only to have a tight fit in the shoulders. ***UPDATE Sadly, I made a huge mistake because I thought I could return the item. I have never even worn this coat. When I made the initial product review, I thought the manufacturer would respond. No such luck. I would have sent this back in a heartbeat and I have NEVER returned something. So now I have a coat that fits very well with the exception of my shoulders. It has a bit of an odd odor and is coming apart at a seam. I bought this coat after it was profiled on the TODAY show and will not make that mistake again. I am out $140 + tax for a coat that I have never worn. I will not ever buy from here again.',
          date: '2021-09-20T00:00:00.000Z',
          reviewer_name: 'Karen',
          helpfulness: 75,
          photos: [],
        },
        {
          review_id: 841168,
          rating: 1,
          summary: 'Not good value',
          recommend: false,
          response: null,
          body: "Wouldn't recommend. The quality is on par with cheaper competitors. This was so bad that I tried to call the company when I got my order. The customer service rep I spoke to only answered when I called him on his private line. He was polite and said I could get a refund but it's still poor value for money.",
          date: '2021-09-18T00:00:00.000Z',
          reviewer_name: 'Elizabeth',
          helpfulness: 62,
          photos: [],
        },
        {
          review_id: 841257,
          rating: 1,
          summary: 'Not good value',
          recommend: false,
          response: null,
          body: "Wouldn't recommend. The quality is on par with cheaper competitors. This was so bad that I tried to call the company when I got my order. The customer service rep I spoke to only answered when I called him on his private line. He was polite and said I could get a refund but it's still poor value for money.",
          date: '2021-09-20T00:00:00.000Z',
          reviewer_name: 'Elizabeth',
          helpfulness: 52,
          photos: [],
        },
        {
          review_id: 841162,
          rating: 5,
          summary: 'One Line Review',
          recommend: true,
          response: null,
          body: 'I love it and want more.',
          date: '2021-09-17T00:00:00.000Z',
          reviewer_name: 'Joe Dirt',
          helpfulness: 0,
          photos: [],
        },
      ],
    };

    axios.get.mockResolvedValue({ data: mockData });
  });

  test('it should provide an accurate count', () => getStarRatingAvg(48432).then((result) => expect(result.count).toBe(9)));

  test('it should return the correct average', () => getStarRatingAvg(48432).then((result) => expect(result.avg).toBe(9 / 4)));
});
