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
export {addToWatch,  updateWatchedList}