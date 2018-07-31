importScripts('https://www.gstatic.com/firebasejs/4.12.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.12.1/firebase-messaging.js');
//importScripts('/__/firebase/init.js');

firebase.initializeApp({
	apiKey: "AIzaSyC3p8_vXGN2I_M6gT8GpBIUnjISGUwrH8A",
	authDomain: "vue-works.firebaseapp.com",
	databaseURL: "https://vue-works.firebaseio.com",
	projectId: "vue-works",
	storageBucket: "vue-works.appspot.com",
    messagingSenderId: "897883747796"
})

var messaging = firebase.messaging();

// messaging.setBackgroundMessageHandler(function(payload) {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);

//   var notificationTitle = 'Background Message Title';
//   var notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };

//   return self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });