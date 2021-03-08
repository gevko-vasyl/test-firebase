import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import * as auth from './firebase-auth.js'

//ЗБЕРЕЖЕННЯ АЙДІШНІКА В БД
function addToWatch() {
    const currentUser = firebase.auth().currentUser;
        console.log(currentUser);
        if (currentUser) {
            let uid = currentUser.uid;
            let movieId = localStorage.getItem('firebase-id');
            console.log(movieId);
            auth.readUserData(uid)
                .then((data) => data.val())
                .then((data) => {
                    let watched = data.watched || [];
                        if (watched.includes(movieId)) {
                            return
                        }
                        updateWatchedList(uid, [...watched, movieId]);
                    })

        }
        
}

//ЗБЕРЕЖЕННЯ АЙДІШНІКА В БД
function addToQueue() {
    const currentUser = firebase.auth().currentUser;
        console.log(currentUser);
        if (currentUser) {
            let uid = currentUser.uid;
            let movieId = localStorage.getItem('firebase-id');
            console.log(movieId);
            auth.readUserData(uid)
                .then((data) => data.val())
                .then((data) => {
                    let queue = data.queue || [];
                        if (queue.includes(movieId)) {
                            return
                        }
                        updateQueueList(uid, [...queue, movieId]);
                    })

        }
        
}


//ФУНКЦІЯ ДЛЯ ОНОВЛЕННЯ СПИСКУ АЙДІШНІКІВ В БД
function updateWatchedList(userId, movieId) {
    firebase.database().ref('users/' + userId).update({
        watched: movieId,
    }, (error) => {
        if (error) {
            console.log('FAIL!')
        } else {
            console.log('DATA UPDATE SUCCESSFULLY')
        };
    });
}

//ФУНКЦІЯ ДЛЯ ОНОВЛЕННЯ СПИСКУ АЙДІШНІКІВ В БД
function updateQueueList(userId, movieId) {
    firebase.database().ref('users/' + userId).update({
        queue: movieId,
    }, (error) => {
        if (error) {
            console.log('FAIL!')
        } else {
            console.log('DATA UPDATE SUCCESSFULLY')
        };
    });
}

export {addToWatch,  updateWatchedList, addToQueue, updateQueueList}