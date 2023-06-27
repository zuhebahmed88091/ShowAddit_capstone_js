/* eslint import/prefer-default-export: "off" */
import { commentUrl } from './api.js';

const postComment = async (commentdata) => {
  await fetch(commentUrl, {
    method: 'POST',
    body: JSON.stringify(commentdata),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const getComments = async (commentid) => {
  const commenturl = `?item_id=${commentid}`;
  const response = await fetch(commentUrl + commenturl);
  const data = await response.json();
  return data;
};

export { getComments, postComment };