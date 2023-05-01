import axios from 'axios';
import Notiflix from 'notiflix';

//form element
const form = document.getElementById('search-form');

//Where to add founded images
const gallery = document.querySelector('.gallery');

//Form event listener
form.addEventListener('submit', formOnSubmit);

//Page var
let currentPage = 1;

//Load more button
const loadMoreButton = document.querySelector('.load-more');

//Button Event listener
loadMoreButton.addEventListener('click', onPagination);

//Function for the button
function onPagination() {
  currentPage += 1;
  getImages(currentPage)
    .then(data => {
      gallery.innerHTML = createMarkup(data);
      loadMoreButton.hidden = false;
    })
    .catch(err =>
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      )
    )
    .finally(() => evt.target.reset());
}

//Main function

function formOnSubmit(evt) {
  evt.preventDefault();
  const formData = new FormData(evt.currentTarget);
  const images = formData.get('searchQuery');
  if (images === '') {
    gallery.innerHTML = '';
    return;
  }
  getImages(images)
    .then(data => {
      gallery.innerHTML = createMarkup(data);
      loadMoreButton.hidden = false;
    })
    .catch(err =>
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      )
    )
    .finally(() => evt.target.reset());
}

//Function to get images
async function getImages(images, page = 1) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '35890843-7500688730c28920b4cfb1288';
  const axios = require('axios').default;
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${images}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    );
    console.log(response);
    if (response.data.hits.length === 0) {
      throw new Error(
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        )
      );
    }
    const data = await Promise.allSettled(response.data.hits);
    const result = data
      .filter(({ status }) => status === 'fulfilled')
      .map(({ value }) => value);

    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <div class="photo-card">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes:</b> ${likes}
            </p>
            <p class="info-item">
              <b>Views:</b> ${views}
            </p>
            <p class="info-item">
              <b>Comments:</b> ${comments}
            </p>
            <p class="info-item">
              <b>Downloads:</b> ${downloads}
            </p>
          </div>
        </div>
      `
    )
    .join('');
}
