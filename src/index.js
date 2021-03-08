import './styles.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import refs from './refs.js'
import * as auth from './firebase-auth.js'
import * as get from './api.js'
import * as dataToFirebase from './dataToFirebase.js'
import * as dataFromFirebase from './dataFromFirebase.js'
import * as myLibrary from './myLibrary.js'

auth.initApp();
get.fetchSearchedMovie();


refs.gallery.addEventListener('click', galleryListener);

function galleryListener(event) {
    // refs.gallery.addEventListener('click', galleryListener);
    if (event.target.nodeName !== 'IMG') {
    return
    }
    refs.lightBox.classList.add('is-open');
    let movieId = event.target.dataset.movieId;
    localStorage.setItem('firebase-id', movieId);
    const addBtnWatch = refs.lightBox.querySelector('li button');
    const removeBtnWatch = refs.lightBox.querySelector('li:nth-last-child(3) button');
    const addBtnQueue = refs.lightBox.querySelector('li:nth-last-child(2) button');
    const removeBtnQueue = refs.lightBox.querySelector('li:last-child button');
    console.log(addBtnWatch);
    console.log(removeBtnWatch);
    console.log(addBtnQueue);
    console.log(removeBtnQueue);
    checkMovieInStorage(movieId, addBtnWatch, removeBtnWatch, addBtnQueue, removeBtnQueue);
    dataFromFirebase.setModalBtnWatchStyles(addBtnWatch,removeBtnWatch);
    dataFromFirebase.setModalBtnQueueStyles(addBtnQueue, removeBtnQueue);

    refs.gallery.removeEventListener('click', galleryListener);
    // removeListener(); 
    // if (event.target.className === 'lightbox__overlay') {
    //     removeListener(); 
    // }

}
// console.log(addBtnWatch)
// galleryListener();

function removeListener() {
    refs.gallery.removeEventListener('click', galleryListener);
}
// refs.gallery.removeEventListener('click', galleryListener);

function checkMovieInStorage(movieId, addBtnWatch, removeBtnWatch,addBtnQueue,removeBtnQueue) {
  let currentUser = firebase.auth().currentUser
  if (!currentUser) {
    return;
  }

  auth.readUserData(currentUser.uid)
    .then((data) => (data.val())).then((data) => {
      if (data.watched || data.queue) {
        console.log("we are in!")
        const dataFromWatched = data.watched ||[];
        const dataFromQueue = data.queue ||[];
        console.log("ok")
        // const addToWatched = refs.addToWatched(true);
        // const addToQueue = refs.addToQueue(true);

        if (dataFromWatched.includes(movieId)) {
          if (!addBtnWatch.classList.contains("hide")) {
            
              addBtnWatch.classList.add('hide');
              removeBtnWatch.classList.remove('hide');
            // addToWatched.textContent = "ALREADY IN WATCHED";
            // addToWatched.setAttribute("disabled", 'true');
          }
          } else {
            addBtnWatch.classList.remove('hide');
              removeBtnWatch.classList.add('hide');
        }
        if (dataFromQueue.includes(movieId)) {
          if (!addBtnQueue.classList.contains("hide")) {
            
              addBtnQueue.classList.add('hide');
              removeBtnQueue.classList.remove('hide');
            // addToQueue.textContent = "ALREADY IN QUEUE";
            // addToQueue.setAttribute("disabled", 'true');

          }
        } else {
            addBtnQueue.classList.remove('hide');
              removeBtnQueue.classList.add('hide');
        }
      }
    })

}



// refs.gallery.removeEventListener('click', galleryListener);



// refs.gallery.addEventListener("click", (event) => {
//     if (event.target.classList.contains("del-movie-btn")
//         && refs.watched.classList.contains('active-watch')) {
//         let movieId = event.target.id;
//         localStorage.setItem('firebase-id', movieId)
//         console.log("Hello")
//         dataFromFirebase.removeFromWatch();
//     };
//         if (event.target.classList.contains("del-movie-btn")
//         && refs.queue.classList.contains('active-queue')) {
//         let movieId = event.target.id;
//         localStorage.setItem('firebase-id', movieId)
//         console.log("Hello")
//         dataFromFirebase.removeFromQueue();

//     };
// });

refs.lightBox.addEventListener('click', (event) => {
    if (event.target.className === 'lightbox__overlay') {
        refs.lightBox.classList.remove('is-open');
    };

    // if (event.target.id === 'add-watched') {
    //     dataToFirebase.addToWatch();
    // };
    if (event.target.id === 'add-queue') {
        dataToFirebase.addToQueue();
    }
});


refs.library.addEventListener('click', myLibrary.showMyLibrary);


refs.home.addEventListener('click', () => {
    refs.watched.classList.add('hide');
    refs.queue.classList.add('hide');
    get.fetchSearchedMovie()
});

refs.watched.addEventListener('click', watchService);
refs.queue.addEventListener('click', queueService);

function watchService() {
    myLibrary.renderWatched();
    refs.queue.classList.remove('active-queue');
    refs.watched.classList.add('active-watch');
}

function queueService() {
    myLibrary.renderQueue();
    refs.watched.classList.remove('active-watch');
    refs.queue.classList.add('active-queue');
}


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

