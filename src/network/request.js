import axios from 'axios'

// 创建导出的函数
export function request(config) {
  // 1. 创建axios实例
  const instance1 = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })
  // 2. 进行axios实例发送http请求时拦截 和 服务器http相应时拦截
  instance1.interceptors.request.use(
    config => {
      return config
    },
    err => {
      console.log(err);
    }
  )
  instance1.interceptors.response.use(
    res => {
      return res.data
    },
    err => {
      console.log(err);
    }
  )
  // 3. 真正的网络请求
  return instance1(config)
}