import axios from 'axios';

//form element
const form = document.getElementById('search-form');

//Where to add founded images
const gallery = document.querySelector('.gallery');

//event listener
form.addEventListener('submit', formOnSubmit);

//Main function

function formOnSubmit(evt) {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  const images = formData.getAll('image');
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
  const searchTerm = images[0];
  const response = await axios
  try {
    const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${searchTerm}`);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

function createMarkup(response) {
  return response
    .map(
      data => `
      <div class="photo-card">
      <img src="" alt="" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
        </p>
        <p class="info-item">
          <b>Views</b>
        </p>
        <p class="info-item">
          <b>Comments</b>
        </p>
        <p class="info-item">
          <b>Downloads</b>
        </p>
      </div>
    </div>
  `
    )
    .join('');
}
