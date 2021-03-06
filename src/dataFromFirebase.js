import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import libraryFilmCard from './library-film-card.hbs';
import refs from './refs.js';
import * as auth from './firebase-auth.js';
import * as dataToFirebase from './dataToFirebase.js';
import * as myLibrary from './myLibrary.js';


//ФУКНЦІЯ ЯКА ПЕРЕВІРЯЄ ЧИ Є В БД АЙДІШНИК ПО ЯКОМУ КЛІКНУЛИ
//І РОБИТЬ ВІДПОВІДНІ СТИЛІ ДЛЯ КНОПОК
function setModalBtnStyles(button) {
    button.textContent = 'ADD TO WATCHED'
    button.removeAttribute('disabled');
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
        let uid = currentUser.uid;
        let movieId = localStorage.getItem('firebase-id');
        console.log(movieId);
        auth.readUserData(uid)
            .then((data) => data.val())
            .then((data) => {
                let watched = data.watched || [];

                // if(!watched.includes(movieId)) {
                //     button.textContent = 'ADD TO WATCHED'
                //     button.setAttribute('disabled', 'false');
                    
                // }

                if (watched.includes(movieId)) {
                    button.classList.add=('inactive-btn-style')
                    button.textContent = 'ALREADY IN WATCHED'
                    button.setAttribute('disabled', 'true');

                }
            })
    }
}

// ФУНКЦІЯ ДЛЯ ЩОБ ОТРИМАТИ АЙДІШНИКИ З БД І ПО НИМ ЗРОБИТИ ЗАПИТ НА СЕРВЕР
// ТА ВІД РЕНДЕРИТИ РОЗМІТКУ ПО ОТРИМАНИХ ДАННИХ
function getMoviesWatched(uid) {
    auth.readUserData(uid)
        .then((data) => data.val())
        .then(async(data) => {
            if (data.watched) {
                let watchedList = data.watched;
                let movieObjects = await Promise.all(
                    watchedList.map(async movieId => {
                        let movieObject = await fetch(
                            `https://api.themoviedb.org/3/movie/${movieId}?api_key=50b81e1c6c3b9e5f74d2015b742ff0b0&`,
                        );
                        return movieObject.json();
                    }),
                )

                console.log(movieObjects);
                movieObjects.map(({ id, title, poster_path }) => {
                    const movie = [{ id, title, poster_path }];
                    updateMarkup(movie);
                });
                
            }
        }).catch((error)=>console.log("error"))
}


// ФУНКЦІЯ ЯКА ЧИСТИТЬ РОЗМІТКУ
// ВИДАЛЯЄ АЙДІШНИК ФІЛЬМА НА ЯКОМУ КЛІКНУЛИ КНОПКУ З БД
// І РЕНДЕРИТЬ НОВУ РОЗМІТКУ ПО АЙДІШНИКАХ ЯКІ ЛИШИЛИСЬ В БД
function removeFromWatch() {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
        refs.gallery.innerHTML = '';
        let uid = currentUser.uid;
        let movieId = localStorage.getItem('firebase-id');
        auth.readUserData(uid)
        .then((data) => data.val())
        .then((data) => {
            if (data.watched) {
                let watched = data.watched || [];
                if (watched.includes(movieId)) {
                    let movieIndex = watched.indexOf(movieId)
                    watched.splice(movieIndex, 1);
                    console.log('NEW WATCHED', watched)
                };
                const updateList = dataToFirebase.updateWatchedList(uid, [...watched]);
                myLibrary.renderWatched();
            }
        })
        console.log(watched);
    }

}

//РЕНДЕР РОЗМІТКИ ПО ШАБЛОНУ
function updateMarkup(movie) {
    let markup = libraryFilmCard(movie);;
    refs.gallery.insertAdjacentHTML('beforeend',markup) ;
};




export {getMoviesWatched,removeFromWatch, setModalBtnStyles,}