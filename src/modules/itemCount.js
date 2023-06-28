import { seriesApiUrl } from './api.js';

const itemCounter = (item) => {
  const totalCount = document.getElementById('total-count');

  // Check if the item count is empty or not a number
  if (item === '' || Number.isNaN(item)) {
    totalCount.innerHTML = '(0)';
  } else {
    totalCount.innerHTML = `(${item})`;
  }
};

const itemCounts = async () => {
  const response = await fetch(seriesApiUrl);
  const allData = await response.json();
  const res = allData.slice(0, 10);
  return res.length;
};

export { itemCounter, itemCounts };