import { get } from './axios'

export function getRecommend() {
  return get('/music/recommend')
}
