import './styles.css';
import refs from './refs.js'
import * as auth from './firebase-auth.js'
import * as get from './api.js'
import * as dataToFirebase from './dataToFirebase.js'
import * as dataFromFirebase from './dataFromFirebase.js'
import * as myLibrary from './myLibrary.js'

auth.initApp();
get.fetchSearchedMovie();

refs.gallery.addEventListener('click', (event) => {
    if (event.target.nodeName !== 'IMG') {
    return
    }
    refs.lightBox.classList.add('is-open')
    let movieId = event.target.dataset.movieId;
    localStorage.setItem('firebase-id', movieId)
    const button = refs.lightBox.querySelector('#add-watched')
    console.log(button);
    dataFromFirebase.setModalBtnStyles(button)
});

refs.gallery.addEventListener("click", (event) => {
    if (event.target.classList.contains("del-movie-btn")) {
        let movieId = event.target.id;
        localStorage.setItem('firebase-id', movieId)
        console.log("Hello")
        dataFromFirebase.removeFromWatch();

    }
});

refs.lightBox.addEventListener('click', (event) => {
    if (event.target.className === 'lightbox__overlay') {
        refs.lightBox.classList.remove('is-open');
    };

    if (event.target.id === 'add-watched') {
        dataToFirebase.addToWatch();
    }

    // if (event.target.id === 'remove-watched') {
    //     dataFromFirebase.removeFromWatch();
    //     dataFromFirebase.renderWatched();
    // }
})



refs.library.addEventListener('click', myLibrary.showMyLibrary);


refs.home.addEventListener('click', () => {
    refs.watched.classList.add('hide');
    refs.queue.classList.add('hide');
    get.fetchSearchedMovie()
});

refs.watched.addEventListener('click', myLibrary.renderWatched);
refs.queue.addEventListener('click', myLibrary.renderQueue);









// function switcher() {
    // const elements = document.querySelectorAll('.watch-js')
    // for (let el of elements) {
    //     if (el.classList.contains('hide')) {
    //         el.classList.remove('hide');
    //     } else {
    //         el.classList.add('hide');
    //     }
    // }
// }

