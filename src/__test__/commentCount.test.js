import { countComments } from '../modules/commentCount.js';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(
    [
      {
        username: 'Zuheb',
        creation_date: '2023-06-24',
        comment: 'Good series',
      },
      {
        creation_date: '2022-04-11',
        username: 'Ahmed',
        comment: 'Bad review',
      },
      {
        creation_date: '2020-04-05',
        username: 'Linas',
      },
    ],
  ),
}));

describe('comment counter tests using Jest', () => {
  test('Test Comment Count with items', async () => {
    const response = await countComments(3);
    expect(response.length).toBe(3);
  });

  test('Test Comment Count with no items', async () => {
    const response = await countComments();
    expect(response.length).not.toBe(0);
  });
});
