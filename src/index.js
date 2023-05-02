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
async function formOnSubmit(evt) {
  evt.preventDefault();
  const formData = new FormData(evt.currentTarget);
  searchQuery = formData.get('searchQuery');
  if (searchQuery === '') {
    gallery.innerHTML = '';
  }
  currentPage = 1;

  try {
    const {hits, totalHits} = await getImages(searchQuery);
    gallery.innerHTML = createMarkup(hits);
      
      if (totalHits <= 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        loadMoreButton.hidden = true;
      } else if(totalHits < 40){
        loadMoreButton.hidden = true;
      } else 
      loadMoreButton.hidden = false;
  } catch (error) {
    console.log(err)
  } finally {
    evt.currentTarget.reset()
  };
  reset();
}
