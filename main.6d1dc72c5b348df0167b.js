(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"38EF":function(e,t,n){var o=n("mp5j");e.exports=(o.default||o).template({1:function(e,t,n,o,r){var a,i=null!=t?t:e.nullContext||{},c=e.hooks.helperMissing,s=e.escapeExpression,u=e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]};return'<li class="movie-card">\r\n    <img class="movie-poster" width="100px" src=https://image.tmdb.org/t/p/w500'+s("function"==typeof(a=null!=(a=u(n,"poster_path")||(null!=t?u(t,"poster_path"):t))?a:c)?a.call(i,{name:"poster_path",hash:{},data:r,loc:{start:{line:3,column:79},end:{line:3,column:94}}}):a)+' alt="'+s("function"==typeof(a=null!=(a=u(n,"title")||(null!=t?u(t,"title"):t))?a:c)?a.call(i,{name:"title",hash:{},data:r,loc:{start:{line:3,column:100},end:{line:3,column:109}}}):a)+'" data-movie-id="'+s("function"==typeof(a=null!=(a=u(n,"id")||(null!=t?u(t,"id"):t))?a:c)?a.call(i,{name:"id",hash:{},data:r,loc:{start:{line:3,column:126},end:{line:3,column:132}}}):a)+'">\r\n    <h1 class="movie-title">'+s("function"==typeof(a=null!=(a=u(n,"title")||(null!=t?u(t,"title"):t))?a:c)?a.call(i,{name:"title",hash:{},data:r,loc:{start:{line:4,column:28},end:{line:4,column:37}}}):a)+"</h1>\r\n</li>\r\n"},compiler:[8,">= 4.3.0"],main:function(e,t,n,o,r){var a;return null!=(a=(e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]})(n,"each").call(null!=t?t:e.nullContext||{},t,{name:"each",hash:{},fn:e.program(1,r,0),inverse:e.noop,data:r,loc:{start:{line:1,column:0},end:{line:6,column:9}}}))?a:""},useData:!0})},L1EO:function(e,t,n){},QfWi:function(e,t,n){"use strict";n.r(t);n("IvQZ"),n("4NM0"),n("L1EO");var o=n("SzhR"),r=(n("VwVG"),n("SHTW"),{gallery:document.querySelector(".gallery"),home:document.getElementById("home"),library:document.getElementById("library"),watched:document.getElementById("watched"),queue:document.getElementById("queue"),lightBox:document.querySelector(".lightbox")}),a=document.querySelector("#sign_in"),i=document.querySelector("#sign_out"),c=document.querySelector(".user-info");function s(e){return o.a.database().ref("/users/"+e).once("value")}o.a.initializeApp({apiKey:"AIzaSyB_XQuuXpnCVMzsoH_tRJd_Re2w7D-8sJE",authDomain:"test-ec373.firebaseapp.com",databaseURL:"https://test-ec373-default-rtdb.firebaseio.com",projectId:"test-ec373",storageBucket:"test-ec373.appspot.com",messagingSenderId:"655424318049",appId:"1:655424318049:web:e8ade1934133d874e6d820",measurementId:"G-RN92T8LBYY"}),a.addEventListener("click",(function(){var e=new o.a.auth.GoogleAuthProvider;o.a.auth().signInWithPopup(e).then((function(e){e.credential.accessToken;var t=e.user,n=t.uid,r=t.displayName,a=t.email,i=t.photoURL;console.log(t),console.log("Success!"),function(){var e=o.a.auth().currentUser.uid;return o.a.database().ref("/users/"+e).once("value")}().then((function(e){e.exists()?(console.log("User exist in database"),s(n)):(console.log("User NOT exist in database"),function(e,t,n,r){o.a.database().ref("users/"+e).set({username:t,email:n,profile_picture:r},(function(e){e?console.log("FAILED!!!"):console.log("SUCCESS")}))}(n,r,a,i))}))})).catch((function(e){e.code;var t=e.message;e.email,e.credential;console.log(t),console.log("Failed!")}))})),i.addEventListener("click",(function(){o.a.auth().signOut().then((function(){console.log("Sign-out successful."),window.location.href="index.html",c.innerHTML=""})).catch((function(e){console.log("ERRROR!")}))}));n("JBxO"),n("FdtR");var u=n("38EF"),l=n.n(u);function d(){return fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=50b81e1c6c3b9e5f74d2015b742ff0b0&page=1").then((function(e){return e.json()})).then((function(e){var t=e.results;r.gallery.innerHTML=l()(t)})).catch((function(e){return console.log(e)}))}n("hi3g");function h(){var e=o.a.auth().currentUser;if(console.log(e),e){var t=e.uid,n=localStorage.getItem("firebase-id");console.log(n),s(t).then((function(e){return e.val()})).then((function(e){var o=e.queue||[];o.includes(n)||m(t,[].concat(o,[n]))}))}}function f(e,t){o.a.database().ref("users/"+e).update({watched:t},(function(e){e?console.log("FAIL!"):console.log("DATA UPDATE SUCCESSFULLY")}))}function m(e,t){o.a.database().ref("users/"+e).update({queue:t},(function(e){e?console.log("FAIL!"):console.log("DATA UPDATE SUCCESSFULLY")}))}n("uQK7"),n("/YXa"),n("lmye"),n("Xlt+"),n("WoWj"),n("U00V"),n("wcNg");function p(){r.gallery.innerHTML="",o.a.auth().currentUser&&s(o.a.auth().currentUser.uid).then((function(e){return e.val()})).then(function(){var e=L(regeneratorRuntime.mark((function e(t){var n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.watched){e.next=7;break}return n=t.watched,e.next=4,Promise.all(n.map(function(){var e=L(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.themoviedb.org/3/movie/"+t+"?api_key=50b81e1c6c3b9e5f74d2015b742ff0b0&");case 2:return n=e.sent,e.abrupt("return",n.json());case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 4:o=e.sent,console.log(o),o.map((function(e){E([{id:e.id,title:e.title,poster_path:e.poster_path}])}));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return console.log("error")}));var e=document.querySelector(".movie-card");console.log(e),r.watched.setAttribute("disabled","true"),r.queue.removeAttribute("disabled")}function v(){r.gallery.innerHTML="",o.a.auth().currentUser&&s(o.a.auth().currentUser.uid).then((function(e){return e.val()})).then(function(){var e=L(regeneratorRuntime.mark((function e(t){var n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.queue){e.next=7;break}return n=t.queue,e.next=4,Promise.all(n.map(function(){var e=L(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.themoviedb.org/3/movie/"+t+"?api_key=50b81e1c6c3b9e5f74d2015b742ff0b0&");case 2:return n=e.sent,e.abrupt("return",n.json());case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 4:o=e.sent,console.log(o),o.map((function(e){E([{id:e.id,title:e.title,poster_path:e.poster_path}])}));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return console.log("error")})),r.watched.removeAttribute("disabled"),r.queue.setAttribute("disabled","true")}function g(e,t,n,o,r,a,i){try{var c=e[a](i),s=c.value}catch(e){return void n(e)}c.done?t(s):Promise.resolve(s).then(o,r)}function L(e){return function(){var t=this,n=arguments;return new Promise((function(o,r){var a=e.apply(t,n);function i(e){g(a,o,r,i,c,"next",e)}function c(e){g(a,o,r,i,c,"throw",e)}i(void 0)}))}}function b(e){e.removeEventListener("click",event)}function y(e,t){e.addEventListener("click",(function(n){e.classList.add("hide"),t.classList.remove("hide"),function(){var e=o.a.auth().currentUser;if(console.log(e),e){var t=e.uid,n=localStorage.getItem("firebase-id");console.log(n),s(t).then((function(e){return e.val()})).then((function(e){var o=e.watched||[];o.includes(n)||f(t,[].concat(o,[n]))}))}}(),b(e)})),t.addEventListener("click",(function(n){e.classList.remove("hide"),t.classList.add("hide"),function(){var e=o.a.auth().currentUser;if(e){var t=e.uid,n=localStorage.getItem("firebase-id");s(t).then((function(e){return e.val()})).then((function(e){if(e.watched){var o=e.watched||[];if(o.includes(n)){var r=o.indexOf(n);o.splice(r,1),console.log("NEW WATCHED",o)}f(t,[].concat(o))}})),console.log(watched)}}(),b(t)}))}function w(){var e=o.a.auth().currentUser;if(e){var t=e.uid,n=localStorage.getItem("firebase-id");s(t).then((function(e){return e.val()})).then((function(e){if(e.queue){var o=e.queue||[];if(o.includes(n)){var r=o.indexOf(n);o.splice(r,1),console.log("NEW QUEUE",o)}m(t,[].concat(o))}})),console.log(queue)}}function E(e){var t=l()(e);r.gallery.insertAdjacentHTML("beforeend",t)}function x(e){if("IMG"===e.target.nodeName){r.lightBox.classList.add("is-open");var t=e.target.dataset.movieId;localStorage.setItem("firebase-id",t);var n,a,i=r.lightBox.querySelector("li button"),c=r.lightBox.querySelector("li:nth-last-child(3) button"),u=r.lightBox.querySelector("li:nth-last-child(2) button"),l=r.lightBox.querySelector("li:last-child button");console.log(i),console.log(c),console.log(u),console.log(l),function(e,t,n,r,a){var i=o.a.auth().currentUser;if(!i)return;s(i.uid).then((function(e){return e.val()})).then((function(o){if(o.watched||o.queue){console.log("we are in!");var i=o.watched||[],c=o.queue||[];console.log("ok"),i.includes(e)?t.classList.contains("hide")||(t.classList.add("hide"),n.classList.remove("hide")):(t.classList.remove("hide"),n.classList.add("hide")),c.includes(e)?r.classList.contains("hide")||(r.classList.add("hide"),a.classList.remove("hide")):(r.classList.remove("hide"),a.classList.add("hide"))}}))}(t,i,c,u,l),y(i,c),a=l,(n=u).addEventListener("click",(function(){n.classList.add("hide"),a.classList.remove("hide"),h()})),a.addEventListener("click",(function(){n.classList.remove("hide"),a.classList.add("hide"),w()})),r.gallery.removeEventListener("click",x)}}o.a.auth().onAuthStateChanged((function(e){if(e){var t=e.displayName,n=e.photoURL,o=(e.email,e.uid);c.innerHTML='<img class="user-img" src="'+n+'">\n           <p>'+t+"</p>",console.log("Current user: "+t,"userId: "+o),s(o)}else c.innerHTML=""})),d(),r.gallery.addEventListener("click",x),r.lightBox.addEventListener("click",(function(e){"lightbox__overlay"===e.target.className&&r.lightBox.classList.remove("is-open"),"add-queue"===e.target.id&&h()})),r.library.addEventListener("click",(function(){r.gallery.innerHTML="",r.watched.classList.remove("hide"),r.queue.classList.remove("hide"),r.watched.removeAttribute("disabled"),p()})),r.home.addEventListener("click",(function(){r.watched.classList.add("hide"),r.queue.classList.add("hide"),d()})),r.watched.addEventListener("click",(function(){p(),r.queue.classList.remove("active-queue"),r.watched.classList.add("active-watch")})),r.queue.addEventListener("click",(function(){v(),r.watched.classList.remove("active-watch"),r.queue.classList.add("active-queue")}))}},[["QfWi",1,2]]]);
//# sourceMappingURL=main.6d1dc72c5b348df0167b.js.map