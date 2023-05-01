import axios from 'axios';

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
    .catch(err => console.log(err))
    .finally(() => evt.target.reset());
}

//Function to get images
async function getImages(images) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '35890843-7500688730c28920b4cfb1288';
  const axios = require('axios').default;
  // const response = axios;
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${images}&image_type=photo&orientation=horizontal&safesearch=true`
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }

  const data = await Promise.allSettled(responses);
  const result = data.filter(({ status }) => status === 'fulfilled');

  console.log(result);
  return result;
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
