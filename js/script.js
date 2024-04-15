const getMovies = (url) => {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      showMovies(data);
    })
    .catch(err => console.log(err));
};

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=982ec2ffef3bcbfc04b0e551b230e735';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = 'https://api.themoviedb.org/3/search/movie?&api_key=982ec2ffef3bcbfc04b0e551b230e735';
const dropdown = document.getElementById('myMoviesDropdown');


document.addEventListener('DOMContentLoaded', () => {
  getMovies(API_URL);
  loadDropdown();
});

const showMovies = (data) => {
  main.innerHTML = '';
  data.results.forEach(movie => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');

    const addButton = document.createElement('button');
    addButton.innerText = '+';
    addButton.className = 'btn btn-add';
    addButton.onclick = () => addToDropdown(title);

    const movieInfo = `
    <img src="${IMG_URL + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getColor(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${overview}
      </div>
    `;

    movieElement.innerHTML = movieInfo;
    movieElement.querySelector('.movie-info').appendChild(addButton);
    main.appendChild(movieElement);
  });
};

const addToDropdown = (title) => {
  let movies = JSON.parse(localStorage.getItem('moviesList')) || [];
  if (!movies.includes(title)) {
    movies.push(title);
    localStorage.setItem('moviesList', JSON.stringify(movies));
    addMovieToList(title);
    updatePlaceholderVisibility(movies.length);  // Update placeholder visibility
  }
};

const loadDropdown = () => {
  const movies = JSON.parse(localStorage.getItem('moviesList')) || [];
  updatePlaceholderVisibility(movies.length);  // Update placeholder visibility
  movies.forEach(addMovieToList);
};

const addMovieToList = (title) => {
  const listItem = document.createElement('li');
  listItem.textContent = title;

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.className = 'remove-btn';
  removeButton.onclick = () => removeMovie(title, listItem);

  listItem.appendChild(removeButton);
  dropdown.appendChild(listItem);
};

const removeMovie = (title, listItem) => {
  const movies = JSON.parse(localStorage.getItem('moviesList'));
  const filteredMovies = movies.filter(movie => movie !== title);
  localStorage.setItem('moviesList', JSON.stringify(filteredMovies));
  dropdown.removeChild(listItem);
  updatePlaceholderVisibility(filteredMovies.length);  // Update placeholder visibility
};

const updatePlaceholderVisibility = (numberOfMovies) => {
  const placeholder = document.getElementById('myMoviesPlaceholder');
  placeholder.style.display = numberOfMovies === 0 ? 'block' : 'none';
};

const getColor = (vote) => {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(searchURL + '&query=' + searchTerm);
  }
});


document.getElementById('downloadPdf').addEventListener('click', function() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const movies = JSON.parse(localStorage.getItem('moviesList')) || [];
  let content = "My Movies List:\n\n";
  movies.forEach((movie, index) => {
      content += (index + 1) + ". " + movie + "\n";
  });

  doc.text(content, 10, 10);
  doc.save('MyMoviesList.pdf');
});