/* eslint import/prefer-default-export: "off" */
import { getComments, postComment } from './comment.js';

const modalContents = async (series, index) => {
  let dataComment = await getComments(index);
  if (dataComment.length === undefined) {
    dataComment = [];
  }
  const modalContainer = document.querySelector('.modal');
  const modalContent = document.querySelector('.modal-content');
  modalContent.innerHTML = '';
  const modalDetails = document.createElement('div');
  modalDetails.classList.add('modal-details');
  const modalImg = document.createElement('img');
  modalImg.classList.add('modal-img');
  modalImg.src = series[index].image.original;
  modalDetails.appendChild(modalImg);

  const modalName = document.createElement('h2');
  modalName.classList.add('modal-name');
  modalName.textContent = series[index].name;
  modalDetails.appendChild(modalName);

  const modalLanguage = document.createElement('h3');
  modalLanguage.classList.add('modal-language');
  modalLanguage.textContent = `Language: ${series[index].language}`;
  modalDetails.appendChild(modalLanguage);

  const modalSummary = document.createElement('p');
  modalSummary.innerHTML = series[index].summary;
  modalDetails.appendChild(modalSummary);
  modalContent.appendChild(modalDetails);

  const commentHeadline = document.createElement('h3');
  commentHeadline.classList.add('comment-headline');
  commentHeadline.textContent = 'Comments';
  const modalSpan = document.createElement('span');
  modalSpan.textContent = `(${dataComment.length})`;
  commentHeadline.appendChild(modalSpan);
  modalContent.appendChild(commentHeadline);

  const commentPackage = document.createElement('div');
  commentPackage.classList.add('comment-package');

  dataComment.forEach((comment) => {
    const modalCommentDiv = document.createElement('div');
    modalCommentDiv.classList.add('modal-comment');
    const modalCommentDate = document.createElement('p');
    modalCommentDate.classList.add('comment-date');
    modalCommentDate.textContent = formatDate(comment.creation_date);
    modalCommentDiv.appendChild(modalCommentDate);
    const modalCommentUser = document.createElement('p');
    modalCommentUser.classList.add('comment-user');
    modalCommentUser.textContent = `${comment.username} : ${comment.comment}`;
    modalCommentDiv.appendChild(modalCommentUser);
    commentPackage.appendChild(modalCommentDiv);
    modalContent.appendChild(commentPackage);
  });

  const modalFormDiv = document.createElement('div');
  modalFormDiv.classList.add('form-div');
  const modalCross = document.createElement('i');
  modalCross.className = 'fa-solid fa-xmark';
  modalFormDiv.appendChild(modalCross);
  modalContent.appendChild(modalFormDiv);

  const modalForm = document.createElement('form');
  modalForm.classList.add('comment-form');

  const modalInput = document.createElement('input');
  modalInput.type = 'text';
  modalInput.placeholder = 'Enter your name';
  modalForm.appendChild(modalInput);

  const modalTextarea = document.createElement('textarea');
  modalTextarea.placeholder = 'Your comment here...';
  modalForm.appendChild(modalTextarea);

  const modalFormButton = document.createElement('button');
  modalFormButton.classList.add('form-btn');
  modalFormButton.type = 'submit';
  modalFormButton.textContent = 'Submit';
  modalForm.appendChild(modalFormButton);
  modalFormDiv.appendChild(modalForm);
  modalContainer.appendChild(modalContent);

  modalForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = modalInput.value;
    const commentMessage = modalTextarea.value;
    const commentData = {
      item_id: index.toString(),
      username: name,
      comment: commentMessage,
    };
    if (name && commentMessage) {
      await postComment(commentData);
      const newComment = {
        username: commentData.username,
        comment: commentData.comment,
        creation_date: new Date().toISOString(),
      };
      dataComment.push(newComment);
      modalSpan.textContent = `(${dataComment.length})`;
      const modalCommentDiv = document.createElement('div');
      modalCommentDiv.classList.add('modal-comment');
      const modalCommentDate = document.createElement('p');
      modalCommentDate.classList.add('comment-date');
      modalCommentDate.textContent = formatDate(newComment.creation_date);
      modalCommentDiv.appendChild(modalCommentDate);
      const modalCommentUser = document.createElement('p');
      modalCommentUser.classList.add('comment-user');
      modalCommentUser.textContent = `${newComment.username} : ${newComment.comment}`;
      modalCommentDiv.appendChild(modalCommentUser);
      commentPackage.appendChild(modalCommentDiv);
      modalContent.insertBefore(commentPackage, modalFormDiv);
      modalForm.reset();
    }
  });
};
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

export default modalContents;
