import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'

router.beforeEach((to,from,next) => {
  // let token = localStorage.getItem('token')
  // if(to.path !== '/home' && (token == '' || token == undefined || token == null)) {
  //   next({path:'/home'})
  // }else {
    next()
  // }
})

// 配置一个响应拦截器，拦截所有的后台响应
// axios.interceptors.response.use(function (res) {
//   if (res.data.code === 10001) {
//     console.log('sss', res.data.code, vm.$router);
//     vm.$router.push('/home')
//   }
//   return res
// }, function (err) {
//   // 处理响应的错误信息
//   console.log(err)
// })

createApp(App).use(ElementPlus).use(store).use(router).mount('#app')
