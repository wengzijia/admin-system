import { createApp, createVNode, App as app } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import axios from 'axios'

router.beforeEach((to, from, next) => {
  // let token = localStorage.getItem('token')
  // if(to.path !== '/home' && (token == '' || token == undefined || token == null)) {
  //   next({path:'/home'})
  // }else {
  next()
  // }
})

const app = createApp(App)
app.use(ElementPlus).use(store).use(router).mount('#app')

// 创建Icon组件
const Icon = (props: { icon: string }) => {
  const { icon } = props
  return createVNode(Icons[icon as keyof typeof Icons])
}
// 注册Icon组件
app.component('Icon', Icon)

// 配置一个响应拦截器，拦截所有的后台响应
axios.interceptors.response.use(function (res) {
  // 100003 token 失效
  if (res.data.code === 100003) {
    router.replace({ path: 'login' })
  }
  return res
}, function (err) {
  // 处理响应的错误信息
  console.log(err)
})

