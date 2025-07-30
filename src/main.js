import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');

form.addEventListener('submit', e => {
  e.preventDefault();

  const query = input.value.trim();
  if (!query) {
    iziToast.error({ message: 'Please enter a search term!' });
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.info({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        createGallery(data.hits);
      }
    })
    .catch(error => {
      iziToast.error({ message: 'Error fetching images. Try again later.' });
      console.error(error);
    })
    .finally(() => {
      hideLoader();
    });
});
