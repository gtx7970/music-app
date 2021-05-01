import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: () => import(/* webpackChunkName: "recommend" */ '@/views/recommend.vue')
  },
  {
    path: '/singer',
    component: () => import(/* webpackChunkName: "singer" */ '@/views/singer.vue')
  },
  {
    path: '/top-list',
    component: () => import(/* webpackChunkName: "top-list" */ '@/views/top-list.vue')
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "search" */ '@/views/search.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
