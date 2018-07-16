import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'

Vue.use(Vuex)

export const store = new Vuex.Store({
  	state: {
    	todoItems: [],
    	user: null,
    	error: null,
    	loading: false,
		uid:null
  	},
  	mutations: {
    	createTodo (state, payload) {
        	state.todoItems.push(payload)
    	},
    	setUser (state, payload) {
        	state.user = payload
    	},
    	setError (state, payload) {
        	state.error = payload
    	},
    	setLoading (state, payload) {
        	state.loading = payload
    	},
    	setUid (state, payload) {
        	state.uid = payload
    	}
  	},
  	actions: {
    	userSignUp ({commit}, payload) {
      		commit('setLoading', true)
      		firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
			.then(firebaseUser => {
				commit('setUser', {email: firebaseUser.email})
				commit('setLoading', false)
				commit('setError', null)
				router.push('/todo')
			})
			.catch(error => {
				commit('setError', error.message)
				commit('setLoading', false)
			})
    	},
    	userSignIn ({commit}, payload) {
      		commit('setLoading', true)
      		firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      		.then(firebaseUser => {
        		commit('setUser', {email: firebaseUser.email})
        		commit('setLoading', false)
        		commit('setError', null)
        		router.push('/todo')
      		})
      		.catch(error => {
        		commit('setError', error.message)
        		commit('setLoading', false)
      		})
    	},
    	autoSignIn ({commit}, payload) {
      		commit('setUser', {email: payload.email})
      		let user = firebase.auth().currentUser
      		commit('setUid', {uid: user.uid})
    	},
    	userSignOut ({commit}) {
      		firebase.auth().signOut()
      		commit('setUser', null)
      		router.push('/')
		},
		createTodo ({commit}, payload) {
        	const todoItems = {
				title: payload.title,
				date : payload.date,
				time : payload.time,
				important : payload.important,
				kind : payload.kind,
				filtered : payload.filtered,
            	itemCheck: payload.itemCheck
			}
			console.log(todoItems)
        	let user = firebase.auth().currentUser
        	firebase.database().ref(user.uid).push(todoItems)
        	.then((data) => {
            	commit('createTodo', todoItems)
	        })
        	.catch(error => {
            	console.log(error)
        	})
		},
		deleteTodo ({commit}, payload) {
			let user = firebase.auth().currentUser
        	firebase.database().ref(user.uid).child(payload).remove()
        	.then((data) => {
            	//commit('createTodo', todoItems)
	        })
        	.catch(error => {
            	console.log(error)
        	})
		},
		checkTodo({commit}, payload) {
			const todoItems = {
            	itemId: payload.itemId,
            	itemCheckValue: payload.itemCheckValue
        	}
			let user = firebase.auth().currentUser
        	firebase.database().ref(user.uid).child(payload.itemId).update({itemCheck: payload.itemCheckValue})
        	.then((data) => {
            	//commit('createTodo', todoItems)
	        })
        	.catch(error => {
            	console.log(error)
        	})
		},
		updateMessage ({commit}, payload) {
			const todoItems = {
            	itemId: payload.itemId,
            	itemText: payload.itemText
        	}
			console.log(payload);
			let user = firebase.auth().currentUser
        	firebase.database().ref(user.uid).child(payload.itemId).update({title: payload.itemText})
        	.then((data) => {
            	//commit('createTodo', todoItems)
	        })
        	.catch(error => {
            	console.log(error)
        	})
		}
	},
  	getters: {
    	isAuthenticated (state) {
        	return state.user !== null && state.user !== undefined
    	}
  	}
})
