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
})

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


