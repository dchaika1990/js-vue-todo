import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Tasks',
    component: () => import(/* webpackChunkName: "about" */ '../views/Tasks')
  },
  {
    path: '/task/:id',
    name: 'Task',
    component: () => import(/* webpackChunkName: "about" */ '../views/Task')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
