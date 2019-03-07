import Vue from 'vue'
import App from '@/App'
import router from '@/router'                 // api: https://github.com/vuejs/vue-router
import store from '@/store'                   // api: https://github.com/vuejs/vuex
import VueCookie from 'vue-cookie'            // api: https://github.com/alfhen/vue-cookie
import '@/element-ui'                         // api: https://github.com/ElemeFE/element
import '@/icons'                              // api: http://www.iconfont.cn/
import '@/element-ui-theme'
import '@/assets/scss/index.scss'
import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios
import { isAuth } from '@/utils'
import cloneDeep from 'lodash/cloneDeep'
// import vueBaiduMap from 'vue-baidu-map'
Vue.use(VueCookie)
Vue.config.productionTip = false

// 非生产环境, 适配mockjs模拟数据                 // api: https://github.com/nuysoft/Mock
if (process.env.NODE_ENV !== 'production') {
  require('@/mock')
}

// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.isAuth = isAuth     // 权限方法

// 保存整站vuex本地储存初始状态
window.SITE_CONFIG['storeState'] = cloneDeep(store.state)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

// App.use(vueBaiduMap)
/** *******sessionStorage 存储的数据********/
// loginData: 						登录数据，为便于存取，将loginData转化为以下几个内容，它失效所有都失效
	// 	token: 							用于认证，直接存储到http的header里
	// 	totalMenuList: 			所有菜单数据，用于渲染绑定视图，通过id来进行导航操作
	// 	permissions: 				所有权限
	// 	dynamicMenuRoutes: 	所有动态路由，id与菜单数据一致
