const API_URL = 'https://api.themoviedb.org/3/discover/movie?api_key=44ea983c6ce713ab59b1ba3565d9edc3&page=1'


const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=44ea983c6ce713ab59b1ba3565d9edc3&query="'

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
        const { original_title, poster_path, vote_average, overview, original_language, release_date } = movie 

        const film = document.createElement('div')
        film.classList.add('movie')

        film.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${original_title}" />
        <div class="movie-info">
          <h3>${original_title}
          </h3>
          
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Release: ${release_date}
          Language: ${original_language}
         </h3>
          
           ${overview}
          
        </div>
      
        `
        main.appendChild(film)
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