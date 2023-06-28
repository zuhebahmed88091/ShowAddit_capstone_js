/* eslint import/prefer-default-export: "off" */
import { commentUrl } from './api.js';

const getComments = async (commentid) => {
  const commenturl = `?item_id=${commentid}`;
  const response = await fetch(commentUrl + commenturl);
  const data = await response.json();
  return data;
};

const updateCommentCount = (count) => {
  const modalSpan = document.querySelector('.modal .comment-headline span');
  const previousCount = parseInt(modalSpan.textContent.replace(/[^\d]/g, ''), 10);
  const newCount = parseInt(count, 10);

  // Update the comment count only if the new count is different and valid
  if (
    !Number.isNaN(previousCount)
    && !Number.isNaN(newCount)
    && previousCount !== newCount
    && !Number.isNaN(count)
  ) {
    modalSpan.textContent = `(${newCount})`;
  }
};

const countComments = async (id) => {
  const commenturl = `?item_id=${id}`;
  const response = await fetch(commentUrl + commenturl);
  const result = await response.json();
  return result;
};

export { getComments, updateCommentCount, countComments };
