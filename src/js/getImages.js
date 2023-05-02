import axios from 'axios';

//Function to get images
async function getImages(images, page = 1) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '35890843-7500688730c28920b4cfb1288';
    try {
      const response = await axios.get(
        `${BASE_URL}?key=${API_KEY}&q=${images}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
      );
      console.log(response);
      return response.data
    } catch (error) {
      console.log(error);
    }
  }

  export {getImages};
  