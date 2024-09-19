import axios from 'axios'
import router from '@/router'
import { error } from '@/utils/error'

const requestAxios = axios.create({
  baseURL: import.meta.env.VITE_DB_KEY
})

requestAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      router.push('/auth?message=auth')
    }

    return Promise.reject(error)
  }
)

export default requestAxios
