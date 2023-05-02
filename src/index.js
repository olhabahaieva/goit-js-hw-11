import { getImages } from './js/getImages';
import { createMarkup } from './js/createMarkup';

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
function onPagination(totalHits) {
  currentPage += 1;
  getImages(searchQuery, currentPage)
    .then(data => {
      gallery.insertAdjacentHTML('beforeend', createMarkup(data));
      if (totalHits === 0) {
        loadMoreButton.hidden = true;
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return;
      }
      if (currentPage * 40 >= totalHits) {
        loadMoreButton.hidden = true;
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        return;
      }
      loadMoreButton.hidden = false;
    })
    .catch(err => console.log(err))
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
  currentPage = 1; 
  getImages(searchQuery)
    .then(data => {
      gallery.innerHTML = createMarkup(data)
      loadMoreButton.hidden = false;
    })
    .catch(err => console.log(err))
    .finally(() => evt.target.reset());
}

