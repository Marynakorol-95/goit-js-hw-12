import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');
let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();

  currentQuery = input.value.trim();
  if (!currentQuery) {
    iziToast.error({ 
      message: 'Please enter a search term!', 
      position: 'topRight' ,
    });
    return;
  }

  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;
    if (data.hits.length === 0) {
      iziToast.info({
        message: 'Sorry, no images found. Try again!',
        position: 'topRight',
      });
    } else {
      createGallery(data.hits);
      if (totalHits > 15) showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ message: 'Error fetching images', position: 'topRight' });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);

    const totalPages = Math.ceil(totalHits / 15);
    if (currentPage < totalPages) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    const cardHeight = document
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
  } catch (error) {
    iziToast.error({
      message: 'Failed to load more images',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});
