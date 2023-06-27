import { testShows } from '../modules/itemCount.js';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(
    [
      {
        show: {
          id: 786,
          url: 'https://www.tvmaze.com/shows/5/true-detective',
          name: 'Cohle',
          type: 'Scripted',
          language: 'English',
        },
      },
      {
        show: {
          id: 379,
          url: 'https://www.tvmaze.com/shows/2/person-of-interest',
          name: 'John',
          type: 'Scripted',
          language: 'English',
        },
      },
    ],
  ),
}));
describe('items counter tests using Jest', () => {
  test('items count ', async () => {
    const response = await testShows();
    expect(response).toBe(2);
  });
});