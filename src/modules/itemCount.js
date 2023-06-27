import { seriesApiUrl } from './api.js';

const itemCounter = (item) => {
  const totalCount = document.getElementById('total-count');
  totalCount.innerHTML = `(${item})`;
};

const testShows = async () => {
  const response = await fetch(seriesApiUrl);
  const allData = await response.json();
  const res = allData.slice(0, 10);
  return res.length;
};

export { itemCounter, testShows };