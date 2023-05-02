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
async function onPagination() {
  currentPage += 1;

  try {
    const {hits, totalHits} = await getImages(searchQuery, currentPage);
    gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
    if(gallery.children.length >= totalHits){
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results")
      loadMoreButton.hidden = true;
    };
  } catch (error) {
    console.log(err)
  }
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
    .then(({hits, totalHits}) => {
      gallery.innerHTML = createMarkup(hits);
      
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
