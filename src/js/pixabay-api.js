import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '51404682-5edc27993faaf387ba494caba';

export function getImagesByQuery(query) {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching images:', error);
      throw error;
    });
}
