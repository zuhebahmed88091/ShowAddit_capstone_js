import { seriesApiUrl, likeUrl } from './api.js';
import { itemCounter } from './itemCount.js';

const getSeries = async () => {
  const response = await fetch(seriesApiUrl);
  const seriesData = await response.json();
  const finalData = seriesData.slice(10, 50);
  itemCounter(finalData.length);
  return finalData;
};

const getLikes = async () => {
  const response = await fetch(likeUrl);
  const likes = await response.json();
  return likes;
};

const likePostApi = async (url, id) => {
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: id,
    }),
  });
};

export { getSeries, getLikes, likePostApi };
