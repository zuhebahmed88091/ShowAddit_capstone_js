import { testComments } from '../modules/commentCount.js';

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
  test('test Comment Count ', async () => {
    const response = await testComments(3);
    expect(response.length).toBe(3);
  });
  test('Wrong test Comment Count', async () => {
    const response = await testComments(3);
    expect(response.length).not.toBe(1);
  });
});