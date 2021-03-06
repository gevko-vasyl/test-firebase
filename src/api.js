import template from './film-card.hbs'
import refs from './refs.js'

const apiKey = "api_key=50b81e1c6c3b9e5f74d2015b742ff0b0";

//ЗАПИТ ДЛЯ РЕНДЕРУ ГАЛЕРЕЇ 
function fetchSearchedMovie() {
    const url = `https://api.themoviedb.org/3/trending/movie/week?${apiKey}&page=1`;
  
    return fetch(url)
        .then(response => response.json())
        .then(({ results }) => {
            refs.gallery.innerHTML = template(results);
        })
        .catch(error => console.log(error));
}

// function fetchOneMovie(movie_id) {
//     const url = `https://api.themoviedb.org/3/movie/${movie_id}?${apiKey}`;
//     return fetch(url)
//         .then(response => response.json())
//         .catch(error => console.log(error));
// }



export { fetchSearchedMovie };
