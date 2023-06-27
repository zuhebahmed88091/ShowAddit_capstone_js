/* eslint import/prefer-default-export: "off" */
import { commentUrl } from './api.js';

const testComments = async (id) => {
  const commenturl = `?item_id=${id}`;
  const response = await fetch(commentUrl + commenturl);
  const result = await response.json();
  return result;
};

export { testComments };