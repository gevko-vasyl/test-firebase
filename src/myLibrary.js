import refs from './refs.js'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import * as dataFromFirebase from './dataFromFirebase.js'


//ПОКАЗУЄ БІБЛІОТЕКУ ФІЛЬМІВ
function showMyLibrary() {
    refs.gallery.innerHTML = '';
    refs.watched.classList.remove('hide');
    refs.queue.classList.remove('hide');
    refs.watched.removeAttribute('disabled');
    renderWatched();
};

// РЕНДЕР ПЕРЕГЛЯНУТИХ ПО АЙДІШНИКАХ З БД
function renderWatched() {
    if (firebase.auth().currentUser) {
        dataFromFirebase.getMoviesWatched(firebase.auth().currentUser.uid);
    }
    refs.watched.setAttribute('disabled', 'true');
    refs.queue.removeAttribute('disabled');
};

// РЕНДЕР ТИХ ШО В ЧЕРЗІ ПО АЙДІШНИКАХ З БД
function renderQueue() {
    refs.gallery.innerHTML = '';
    refs.watched.removeAttribute('disabled');
    refs.queue.setAttribute('disabled', 'true');
};



export {renderWatched, renderQueue,showMyLibrary}