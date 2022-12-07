import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'landingpage',
    component: () => import(/* webpackChunkName: "landingpage" */ '../views/LandingpageView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/explore',
    name: 'explore',
    component: () => import(/* webpackChunkName: "about" */ '../views/AddressExplorationView.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return {x: 0, y: 0}
  }
})

export default router
