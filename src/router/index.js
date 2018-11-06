import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Index'
import Todo from '@/components/Todo'
import Join from '@/components/Join'
import Login from '@/components/Login'
import { store } from '@/store'

Vue.use(Router)

const requireAuth = () => (to, from, next) => {
	console.log(store.getters.isAuthenticated)
	if (store.getters.isAuthenticated) return next()
	next('/')
}

export default new Router({
  	//mode: 'history',
  	routes: [
    {
      	path: '/',
      	name: 'Main',
      	component: Main
    },
    {
      	path: '/todo',
      	name: 'Todo',
		component: Todo,
		beforeEnter: requireAuth()
    },
    {
      	path: '/join',
      	name: 'Join',
      	component: Join
    },
    {
      	path: '/login',
      	name: 'Login',
      	component: Login
    }
  ]
})
