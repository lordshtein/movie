function clearInput() {
  document.querySelector('.movie-search__input').value = '';
}

document.querySelector('.movie-search__delete-icon').addEventListener('click', () => {
  clearInput();
});
