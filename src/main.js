// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import firebase from 'firebase'
import { store } from './store'
import 'vuetify/dist/vuetify.min.css'
import './assets/css/common.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'babel-polyfill'

Vue.config.productionTip = false

Vue.use(Vuetify)
firebase.initializeApp({
	apiKey: "AIzaSyC3p8_vXGN2I_M6gT8GpBIUnjISGUwrH8A",
	authDomain: "vue-works.firebaseapp.com",
	databaseURL: "https://vue-works.firebaseio.com",
	projectId: "vue-works",
	storageBucket: "vue-works.appspot.com",
    messagingSenderId: "897883747796"
})





// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();

// Add the public key generated from the console here.
messaging.usePublicVapidKey("BGmW3uP3OTI3VKIGXScfb6iBtL2KvUtBcMQCld81gPiy4dW6tdfgZUagJ2Bc5mmhTvgYl4898-8jpMBr5TaWqIU");

navigator.serviceWorker.register('/static/firebase-messaging-sw.js')
.then((registration) => {
	console.log('serviceWorker registration')
	return messaging.useServiceWorker(registration)
}).then(() => {
	return messaging.requestPermission()
})
.then(function() {
	console.log('Notification permission granted.');
	return messaging.getToken();
})
.then(function(token) {
	console.log(token);
})
.catch(function(err) {
	console.log('Unable to get permission to notify.', err);
});


// messaging.onMessage(function(payload) {
// 	console.log('onMessage: ', payload);
// });




/* eslint-disable no-new */
const unsubscribe = firebase.auth()
.onAuthStateChanged((firebaseUser) => {
new Vue({
	el: '#app',
  	router,
  	store,
  	render: h => h(App),
  	created () {
    	firebase.auth().onAuthStateChanged((firebaseUser) => {
      	if (firebaseUser) {
        	store.dispatch('autoSignIn', firebaseUser)
      	}
    	})
  	}
})
unsubscribe()
})


