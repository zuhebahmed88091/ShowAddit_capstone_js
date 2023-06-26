import { seriesApiUrl } from './api.js';

const getSeries = async () => {
  const response = await fetch(seriesApiUrl);
  const seriesData = await response.json();
  const finalData = seriesData.slice(10, 50);
  //   itemCounter(finalData.length);
  return finalData;
};

// eslint-disable-next-line import/prefer-default-export
export { getSeries };
