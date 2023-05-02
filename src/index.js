import { getImages } from './js/getImages';
import { createMarkup } from './js/createMarkup';
import Notiflix from 'notiflix';

//form element
const form = document.getElementById('search-form');

//Where to add founded images
const gallery = document.querySelector('.gallery');

//Form event listener
form.addEventListener('submit', formOnSubmit);

//Page var
let currentPage = 1;
let searchQuery = '';

//Load more button
const loadMoreButton = document.querySelector('.load-more');

//Button Event listener
loadMoreButton.addEventListener('click', onPagination);

//Function for the button
function onPagination() {
  currentPage += 1;
 
  getImages(searchQuery, currentPage)
    .then((data) => {
      gallery.insertAdjacentHTML('beforeend', createMarkup(data));
      if(gallery.children.length >= totalHits){
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results")
        loadMoreButton.hidden = true;
      };
    })
    .catch((err) => console.log(err));
}

//Main function
function formOnSubmit(evt) {
  evt.preventDefault();
  const formData = new FormData(evt.currentTarget);
  searchQuery = formData.get('searchQuery');
  if (searchQuery === '') {
    gallery.innerHTML = '';
    return;
  }
  getImages(searchQuery)
    .then((data) => {
      gallery.innerHTML = createMarkup(data);
      totalHits = data.totalHits;
      if (totalHits <= 0) {
        Notiflix.Notify.info('No results found.');
        loadMoreButton.hidden = true;
      } else {
        loadMoreButton.hidden = false;
      }
    })
    .catch((err) => console.log(err))
    .finally(() => evt.target.reset());
}
