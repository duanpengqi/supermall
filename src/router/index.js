//1. 导入路由和Vue实例
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'views/home/Home'
import Category from 'views/category/Category'
import Cart from 'views/cart/Cart'
import Profile from 'views/profile/Profile'

// 2. 注册路由插件
Vue.use(VueRouter)

// 3. 创建 vue-router 实例
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// 4. 导出路由
export default router

// 5. 挂载路由