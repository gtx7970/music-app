import axios from 'axios'
import { ResModel } from '@/types'

const base_url =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001'

axios.defaults.baseURL = base_url

export function get(url: string, params?: any) {
  return axios
    .get<ResModel>(url, { params })
    .then((res) => {
      const serverData = res.data

      if (serverData.success) {
        return serverData.data
      }
    })
    .catch((err) => console.log(err))
}
