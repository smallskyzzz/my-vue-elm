import Vue from 'vue' // 依赖vuejs库
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'// 表示从./App这个文件中引入App
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import seller from './components/seller/seller'

//import "./common/stylus/base.styl"

Vue.use(VueRouter) // 可以理解为安装插件
Vue.use(VueResource)

const routes = [
  {path: '/', component:goods},//当前页面默认加载 go方法有点问题
  {path: '/goods', component:goods},
  {path: '/ratings', component:ratings},
  {path: '/seller', component:seller}
]

const router = new VueRouter({
  // mode: 'history',//将初始页面url后面的#去掉
  linkActiveClass: 'active',
  routes
})

new Vue({
  el: '#app',
  components: {App},
  template: '<App/>',
  router
})

//router.go('/seller') 该方法会导致页面一直刷新
