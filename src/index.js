import './styles.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB_XQuuXpnCVMzsoH_tRJd_Re2w7D-8sJE",
  authDomain: "test-ec373.firebaseapp.com",
  databaseURL: "https://test-ec373-default-rtdb.firebaseio.com",
  projectId: "test-ec373",
  storageBucket: "test-ec373.appspot.com",
  messagingSenderId: "655424318049",
  appId: "1:655424318049:web:e8ade1934133d874e6d820",
  measurementId: "G-RN92T8LBYY"
};

const signIn = document.querySelector('#sign_in');
const signOut = document.querySelector('#sign_out');
const userInfo = document.querySelector('.user-info');


firebase.initializeApp(firebaseConfig);

signIn.addEventListener('click', googleSignIn);
signOut.addEventListener('click', googleSignOut);

function initApp() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // SIGN IN
            const displayName = user.displayName;
            const photoURL = user.photoURL;
            const email = user.email;
            const uid = user.uid;
            userInfo.innerHTML = `<img class="user-img" src="${photoURL}">
           <p>${displayName}</p>`;
            console.log(`Current user: ${displayName}`, `userId: ${uid}`);
            readUserData(uid)
        } else {
            // SIGN OUT
            userInfo.innerHTML = '';
        }
    
    })
};

function googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const credential = result.credential;
            // This gives you a Google Access Token. You can use it to access the Google API. 
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            const userId = user.uid;
            const name = user.displayName;
            const email = user.email;
            const imageUrl = user.photoURL;

            console.log(user);
            console.log("Success!");
            
            // Перевірка чи є вже юзер в БД, якшо неа то добавляє
            checkUserID().then((data) => {
                if (data.exists()) {
                    console.log('User exist in database');
                    // Завантажує данні з БД
                    readUserData(userId);
                } else {
                    console.log('User NOT exist in database');
                    writeUserData(userId, name, email, imageUrl);
                }
            });

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            console.log(errorMessage);
            console.log("Failed!");
        });
};

function googleSignOut() {
    firebase.auth().signOut().then(() => {
        console.log('Sign-out successful.');
        window.location.href = 'index.html';
        userInfo.innerHTML = '';

    }).catch((error) => {
        console.log('ERRROR!');
    });
};

// ОТРИМУЄ ДАННІ ЮЗЕРА ПО АЙДІ З БД
function checkUserID() {
    const userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + userId).once('value');
};

// ЗАПИСУЄ ОСНОВНУ ІНФУ ПО ЮЗЕР В БД, ТІЛЬКИ ПРИ РЕЄСТРАЦІЇ ПЕРШОМУ ВХОДІ

function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture : imageUrl
    }, (error) => {
        if (error) {
            console.log('FAILED!!!');
        } else {
            console.log('SUCCESS');
        };
            
    });
};

function readUserData(userId) {
    return firebase.database().ref('/users/' + userId).once('value');
}

initApp();