import axios from 'axios'
// post请求
export function post(url, data = {}, method = 'post') {
  let token = localStorage.getItem('token')
  return new Promise((resolve, reject) => {
    axios({
        url: url,
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        data: data
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(res => {
        // 失败
        reject(res)
        // this.$toast('网络异常，请检查网络设置');
      })
  })
}

// get请求
export function get(url, data = {}, method = 'get') {
  let token = localStorage.getItem('token')
  return new Promise((resolve, reject) => {
    axios({
        url: url,
        method: method,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'token': token
        },
        data: data
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(res => {
        // 失败
        reject(res)
        // this.$toast('网络异常，请检查网络设置');


      })
  })
}

//上传图片请求
export function upImg(url, data = {}, method = 'post') {
  let token = localStorage.getItem('token')
  return new Promise((resolve, reject) => {
    axios({
        url: url,
        method: method,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'token': token
        },
        data: data
      })
      .then(res => {
        // 成功
        resolve(res.data)
      })
      .catch(res => {
        // 失败
        reject(res)
      })
  })
}

