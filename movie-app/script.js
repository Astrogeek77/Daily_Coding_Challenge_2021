document.getElementById('searchIcon').onclick = function() {
  document.getElementById('search').style.display = 'block';
  document.getElementById('clear').style.display = 'block';
  document.getElementById('search').focus();
  document.getElementById('searchIcon').style.display = 'none';
}
document.getElementById('clear').onclick = function() {
  document.getElementById('searchIcon').style.display = 'block';
  document.getElementById('search').style.display = 'none';
  document.getElementById('clear').style.display = 'none';
}

// Api config
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

// Dom manipulation
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Get initial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview, release_date, vote_count,
            popularity, original_language, original_title } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3 class="movie-title">${title} </h3>
                <br>
                <h3 class="movie-title-original">Title(original) - ${original_title}</h3>
                <h3 class="movie-date">Release - ${release_date}</h3>
                <h3 class="movie-votes">Votes - ${vote_count}</h3>
                <h3 class="movie-pop">Popularity - ${popularity}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                <span class="movie-lang">${original_language}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `
        main.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})
