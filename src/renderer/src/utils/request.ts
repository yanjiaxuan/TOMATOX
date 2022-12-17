import axios from 'axios'
import { message } from 'antd'

const request = axios.create({
  baseURL: '/',
  timeout: 10000
})

request.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    message.error(err)
    return Promise.reject(err)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  ({ data }) => {
    return data
  },
  (err) => {
    message.error(err.message)
    return null
  }
)

export default request
