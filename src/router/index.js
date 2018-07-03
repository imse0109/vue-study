import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/Index'
import Todo from '@/components/Todo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: HelloWorld
    },
    {
      path: '/todo',
      name: 'Todo',
      component: Todo
    }
  ]
})
