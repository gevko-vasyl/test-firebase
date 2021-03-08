import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import filmCard from './film-card.hbs';
import refs from './refs.js';
import * as auth from './firebase-auth.js';
import * as dataToFirebase from './dataToFirebase.js';
import * as myLibrary from './myLibrary.js';


// function modalAddWatchBtnFn(button, hiddenBtn) {
//     button.classList.add('hide')
//     hiddenBtn.classList.remove('hide')
//     dataToFirebase.addToWatch();
// };
// function modalRemoveWatchBtnFn(button, hiddenBtn) {
//     button.classList.add('hide')
//     hiddenBtn.classList.remove('hide')
//     removeFromWatch();
// };
const modalAddQueueBtnFn = function (button, hiddenBtn) {
    button.classList.add('hide')
    hiddenBtn.classList.remove('hide')
    dataToFirebase.addToQueue();
};
const modalRemoveQueueBtnFn = function (button, hiddenBtn) {
    button.classList.add('hide')
    hiddenBtn.classList.remove('hide')
    removeFromQueue();
};

function removeListener(el) {
    el.removeEventListener('click',event)
}

//ФУКНЦІЯ ЯКА ПЕРЕВІРЯЄ ЧИ Є В БД АЙДІШНИК ПО ЯКОМУ КЛІКНУЛИ
//І РОБИТЬ ВІДПОВІДНІ СТИЛІ ДЛЯ КНОПОК
function setModalBtnWatchStyles(button, hiddenBtn) {
    // button.textContent = 'ADD TO WATCHED'
    // button.removeAttribute('disabled');
    button.addEventListener('click', event => {
        button.classList.add('hide')
        hiddenBtn.classList.remove('hide')
        dataToFirebase.addToWatch();
        removeListener(button);
    });


    
    hiddenBtn.addEventListener('click', event =>  {
        button.classList.remove('hide')
        hiddenBtn.classList.add('hide')
        removeFromWatch(); 
        removeListener(hiddenBtn);
    });

    // button.removeEventListener('click', event);
    // removeListener(button);
    // hiddenBtn.removeEventListener('click', event)
    // removeListener(hiddenBtn);



    // const currentUser = firebase.auth().currentUser;
    // if (currentUser) {
    //     let uid = currentUser.uid;
    //     let movieId = localStorage.getItem('firebase-id');
    //     console.log(movieId);
    //     auth.readUserData(uid)
    //         .then((data) => data.val())
    //         .then((data) => {
    //             let watched = data.watched || [];

    //             // if(!watched.includes(movieId)) {
    //             //     button.textContent = 'ADD TO WATCHED'
    //             //     button.setAttribute('disabled', 'false');
                    
    //             // }

    //             if (watched.includes(movieId)) {
    //                 button.classList.add=('inactive-btn-style')
    //                 button.textContent = 'ALREADY IN WATCHED'
    //                 button.setAttribute('disabled', 'true');

    //             }
    //         })
    // }
    // button.classList.add('hide');
}

function setModalBtnQueueStyles(button,hiddenBtn) {
    // button.addEventListener('click', modalAddQueueBtnFn(button, hiddenBtn));
    // hiddenBtn.addEventListener('click', modalRemoveQueueBtnFn(button, hiddenBtn));


    button.addEventListener('click', () => {
        button.classList.add('hide')
        hiddenBtn.classList.remove('hide')
        dataToFirebase.addToQueue();
    });


    
    hiddenBtn.addEventListener('click', () => {
        button.classList.remove('hide')
        hiddenBtn.classList.add('hide')
        removeFromQueue(); 
    });

    // const currentUser = firebase.auth().currentUser;
    // if (currentUser) {
    //     let uid = currentUser.uid;
    //     let movieId = localStorage.getItem('firebase-id');
    //     console.log(movieId);
    //     auth.readUserData(uid)
    //         .then((data) => data.val())
    //         .then((data) => {
    //             let queue = data.queue || [];

    //             // if(!watched.includes(movieId)) {
    //             //     button.textContent = 'ADD TO WATCHED'
    //             //     button.setAttribute('disabled', 'false');
                    
    //             // }

    //             if (queue.includes(movieId)) {
    //                 button.classList.add=('inactive-btn-style')
    //                 button.textContent = 'ALREADY IN QUEUE'
    //                 button.setAttribute('disabled', 'true');

    //             }
    //         })
    // }
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

function getMoviesQueue(uid) {
    auth.readUserData(uid)
        .then((data) => data.val())
        .then(async(data) => {
            if (data.queue) {
                let queueList = data.queue;
                let movieObjects = await Promise.all(
                    queueList.map(async movieId => {
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
        // refs.gallery.innerHTML = '';
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
                dataToFirebase.updateWatchedList(uid, [...watched]);
                // myLibrary.renderWatched();
            }
        })
        console.log(watched);
    }

}

function removeFromQueue() {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
        // refs.gallery.innerHTML = '';
        let uid = currentUser.uid;
        let movieId = localStorage.getItem('firebase-id');
        auth.readUserData(uid)
        .then((data) => data.val())
        .then((data) => {
            if (data.queue) {
                let queue = data.queue || [];
                if (queue.includes(movieId)) {
                    let movieIndex = queue.indexOf(movieId)
                    queue.splice(movieIndex, 1);
                    console.log('NEW QUEUE', queue)
                };
                dataToFirebase.updateQueueList(uid, [...queue]);
                // myLibrary.renderQueue();
            }
        })
        console.log(queue);
    }

}

//РЕНДЕР РОЗМІТКИ ПО ШАБЛОНУ
function updateMarkup(movie) {
    let markup = filmCard(movie);;
    refs.gallery.insertAdjacentHTML('beforeend', markup);
};




export {getMoviesWatched,removeFromWatch,getMoviesQueue,removeFromQueue, setModalBtnWatchStyles,setModalBtnQueueStyles}