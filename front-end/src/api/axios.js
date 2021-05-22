import axios from 'axios'

const base_url = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000'
const ERR_OK = 0

axios.defaults.baseURL = base_url

export function get(url, params) {
  return axios.get(url, {params}).then(res => {
    const serverData = res.data

    if (serverData.code === ERR_OK) {
      return serverData.result
    }
   }).catch(err => console.log(err))
}