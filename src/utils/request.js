import axios from 'axios'
import moment from 'moment'


const service = axios.create({
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 0) { // 请求返回错误
      alert(res.msg || "error");
      return Promise.reject(res)
    } else { // 请求成功
      return res
    }
  },
  error => {
    return Promise.reject(`${error.config.url}:${error.message}`)
  }
)

export default service
