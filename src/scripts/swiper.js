import Swiper from 'swiper';
import {
  formSubmit,
} from './api';

const form = document.querySelector('form');
let movies = {};
const mySwiper = new Swiper('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 4,
  slidesPerGroup: 4,
});

mySwiper.allowTouchMove = true;

function createMovieCard(movie) {
  const card = document.createElement('div');
  card.classList.add('swiper-slide');
  card.innerHTML = `
    <span class='movie-title'>${movie.Title}</span>
      <div class='poster-container'>
        <img class="movie-poster" src="${movie.Poster}" alt="${movie.Title}">
      </div>
    <span class="movie-year">${movie.Year}</span>
  `;
  return card;
}

function responseError() {
  const query = document.querySelector('.movie-search__input').value;
  document.querySelector('.movie-search__input').value = `No results for ${query}.`;
}

function createSlides(movieList) {
  movies = movieList.Search;
  for (let i = 0; i < movies.length; i += 1) {
    mySwiper.appendSlide(createMovieCard(movies[i]));
  }
}

function clearResults() {
  document.querySelector('.swiper-wrapper').innerHTML = '';
}
function setState(e) {
  movies = '';
  e.preventDefault();
  clearResults();
  formSubmit(1)
    .then((movieList) => {
      if (movieList.Response === 'True') { createSlides(movieList); }
      if (movieList.Response === 'False') { responseError(); }
    });
}
form.addEventListener('submit', setState);
