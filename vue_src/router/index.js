import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Reviews from "@/views/Reviews"
import Edit from "@/views/Edit";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/reviews',
    name: 'reviews',
    component: Reviews
  }, 
  {
    path: '/edit/:id',
    name: 'edit',
    component: Edit
  },
  {
    path: '/edit',
    name: 'edit',
    component: Edit
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
