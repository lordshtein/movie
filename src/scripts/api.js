import {
  API_URL, API_KEY, TRANSLATE_API_URL, TRANSLATE_API_KEY, LANG, PAGE,
} from './consts';


const input = document.querySelector('#getMovieInput');

export const getTranslation = async function getTranslation(query) {
  const url = TRANSLATE_API_URL + TRANSLATE_API_KEY + query + LANG;
  const res = await fetch(url);
  const data = await res.json();
  return data.text[0];
};

export const getMovieList = async function getMovieList(query, counter) {
  const url = API_URL + query + API_KEY + PAGE + counter;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const formSubmit = async function formSubmit(pageCounter) {
  document.querySelectorAll('.lds-default').forEach((e) => e.classList.add('visible'));
  const query = input.value;
  const translatedQuery = await getTranslation(query);
  const movieList = await getMovieList(translatedQuery, pageCounter);
  document.querySelectorAll('.lds-default').forEach((e) => e.classList.remove('visible'));
  return movieList;
};
