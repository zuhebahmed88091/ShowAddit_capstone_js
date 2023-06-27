// import { seriesApiUrl } from './api.js';

const itemCounter = (item) => {
  const totalCount = document.getElementById('total-count');
  totalCount.innerHTML = `(${item})`;
};

// eslint-disable-next-line import/prefer-default-export
export { itemCounter };