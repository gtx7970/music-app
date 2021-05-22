import React from 'react'

export const routes = [
  {
    path: '/recommend',
    component: React.lazy(() => import('../views/recommend')),
    name: 'recommend'
  },
  {
    path: '/singer',
    component: React.lazy(() => import('../views/singer')),
    name: 'singer'
  },
  {
    path: '/top-list',
    component: React.lazy(() => import('../views/top-list')),
    name: 'top-list'
  },
  {
    path: '/search',
    component: React.lazy(() => import('../views/search')),
    name: 'search'
  }
]