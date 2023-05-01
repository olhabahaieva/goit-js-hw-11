import axios from 'axios';
import Notiflix from 'notiflix';

//form element
const form = document.getElementById('search-form');

//Input Eelement
const input = document.querySelector('.search-form input[name=searchQuery]');

//Where to add founded images
const gallery = document.querySelector('.gallery');

//event listener
form.addEventListener('submit', formOnSubmit);

//Main function

function formOnSubmit(evt) {
  evt.preventDefault();
  const formData = new FormData(evt.currentTarget);
  const images = formData.get('searchQuery');
  getImages(images)
    .then(data => (gallery.innerHTML = createMarkup(data)))
    .catch(Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.'))
    .finally(() => evt.target.reset());
}

//Function to get images
async function getImages(images) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '35890843-7500688730c28920b4cfb1288';
  const axios = require('axios').default;
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${images}&image_type=photo&orientation=horizontal&safesearch=true`
    );
    console.log(response);
    const data = await Promise.allSettled(response.data.hits);
    const result = data
    .filter(({ status }) => status === 'fulfilled')
    .map(({ value }) => value);

    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
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
