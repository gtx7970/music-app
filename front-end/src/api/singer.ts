import { get } from './axios'

export function getSingerList() {
  return get('/singer/list')
}
