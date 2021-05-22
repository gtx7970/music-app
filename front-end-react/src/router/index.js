import React from 'react'
import a from '../views/recommend'

const Recommend = React.lazy(() => import('../views/recommend'))
const Singer = React.lazy(() => import('../views/singer'))

console.log(Singer)
console.log(a)

export const routes = [
  {
    path: '/recommend',
    component: Recommend
  },
  {
    path: '/singer',
    component: Singer
  }
]