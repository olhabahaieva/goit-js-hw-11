import axios from 'axios';
import Notiflix from 'notiflix';

//Function to get images
async function getImages(images, page = 1) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '35890843-7500688730c28920b4cfb1288';
    try {
      const response = await axios.get(
        `${BASE_URL}?key=${API_KEY}&q=${images}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
      );
      if (images <= 40){
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        )
      }
      console.log(response);
      if (response.data.hits.length === 0) {
        throw new Error(
          Notiflix.Notify.failure(
            "Sorry, there are no images matching your search query. Please try again."
          )
        );
      }
      return response.data.hits
    } catch (error) {
      console.log(error);
    }
  }

  export {getImages};
  