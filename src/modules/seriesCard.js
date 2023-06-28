import { getSeries, getLikes, likePostApi } from './getData.js';
import { likeUrl } from './api.js';
import modalContents from './modal.js';

const seriesCard = async () => {
  const likes = await getLikes(); // Retrieve likes before updating series cards
  const finalData = await getSeries();
  const seriesCardWrapper = document.getElementById('series');
  seriesCardWrapper.innerHTML = '';
  finalData.forEach((series, index) => {
    const likeId = likes.findIndex((like) => Number(like.item_id) === index);
    let totalLikes;
    if (likeId >= 0) {
      totalLikes = likes[likeId].likes;
    } else {
      totalLikes = 0;
    }
    const showCard = document.createElement('div');
    showCard.classList.add('show-card');
    const seriesImg = document.createElement('img');
    seriesImg.classList.add('series-img');
    seriesImg.src = series.image.original;
    showCard.appendChild(seriesImg);
    const seriesDetails = document.createElement('div');
    seriesDetails.classList.add('series-details');
    const seriesName = document.createElement('h3');
    seriesName.classList.add('series-name');
    seriesName.textContent = series.name;
    seriesDetails.appendChild(seriesName);
    const likeBtnDiv = document.createElement('div');
    likeBtnDiv.classList.add('like-wrapper');
    const likeIcon = document.createElement('i');
    likeIcon.className = 'fa-solid fa-thumbs-up';
    likeIcon.dataset.id = index;
    likeBtnDiv.appendChild(likeIcon);
    seriesDetails.appendChild(likeBtnDiv);
    showCard.appendChild(seriesDetails);
    const likeCount = document.createElement('p');
    likeCount.classList.add('like-count');
    likeCount.textContent = totalLikes;
    showCard.appendChild(likeCount);
    const commentBtn = document.createElement('button');
    commentBtn.classList.add('comments');
    commentBtn.dataset.id = index;
    commentBtn.textContent = 'Comment';
    showCard.appendChild(commentBtn);
    seriesCardWrapper.appendChild(showCard);

    // Event listener for the like button
    likeIcon.addEventListener('click', async (e) => {
      likeIcon.classList.add('like-activate');
      setTimeout(() => {
        likeIcon.classList.remove('like-activate');
      }, 760);
      await likePostApi(likeUrl, e.target.dataset.id); // Wait for like to be posted
      totalLikes += 1; // Increment the like count
      likeCount.textContent = totalLikes; // Update the like count immediately
    });
  });
  const popButton = document.querySelectorAll('.comments');
  popButton.forEach((pop) => {
    pop.addEventListener('click', async (e) => {
      const modalPart = document.querySelector('.modal');
      const modalContent = document.querySelector('.modal-content');
      modalPart.classList.remove('hidden');
      modalContent.classList.add('active');
      await modalContents(finalData, e.target.dataset.id);
      const closeBtn = document.querySelector('.fa-xmark');
      closeBtn.addEventListener('click', () => {
        modalPart.classList.add('hidden');
        modalContent.classList.remove('active');
      });
    });
  });
};

export default seriesCard;
