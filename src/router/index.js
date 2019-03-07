/**
 * 全站路由配置
 *
 * 建议:
 * 1. 代码中路由统一使用name属性跳转(不使用path属性)
 */
import Vue from 'vue'
import Router from 'vue-router'
import http from '@/utils/httpRequest'
import { isURL } from '@/utils/validate'
import { clearLoginInfo } from '@/utils'

Vue.use(Router)

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
  { path: '/404', component: _import('common/404'), name: '404', meta: { title: '404未找到' } },
  { path: '/login', component: _import('common/login1'), name: 'login', meta: { title: '登录' } }
]

const mainRoutes = {
  path: '/',
  component: _import('main'),
  name: 'main',
  redirect: { name: 'home' },
  meta: { title: '主入口整体布局' },
  //子布局
  children: [
    // 通过meta对象设置路由展示方式
    // 1. isTab: 是否通过tab展示内容, true: 是, false: 否
    // 2. iframeUrl: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
    // 提示: 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
   { path: 'main-content', component:_import('main-content1'), meta: { title: '无子菜单布局' }, children: [
    { path: 'home', component: _import('common/home'), name: 'home', meta: { title: '主题' } }
   ]},
  ],
  beforeEnter (to, from, next) {
    let token = sessionStorage.getItem('token')
    if (!token || !/\S/.test(token)) {
      clearLoginInfo()
      next({ name: 'login' })
    }
    next()
  }
}

// 动态路由
const dynamicRoutes = {
  path: '/',
  component: _import('main'),
  name: 'dynamicRoutes',
  redirect: { name: 'home' },
  meta: { title: '主入口整体布局' },
  //子布局
  children: [
    { path: 'main-content-menu', component:_import('main-content-menu'), name: 'main-content-menu', meta: { title: '子菜单布局' }, children: [
    ]},
    { path: 'main-content', component:_import('main-content1'), name: 'main-content', meta: { title: '无子菜单布局' }, children: []},
  ],
  beforeEnter (to, from, next) {
    let token = sessionStorage.getItem('token')
    if (!token || !/\S/.test(token)) {
      clearLoginInfo()
      next({ name: 'login' })
    }
    next()
  }
}

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: globalRoutes.concat(mainRoutes)
})

router.beforeEach((to, from, next) => {
  // 添加动态(菜单)路由
  // 1. 已经添加 or 全局路由, 直接访问
  // 2. 获取菜单列表, 添加并保存本地存储
  
  if (router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to, globalRoutes) === 'global') {
    next()
  } else {
    // http({
    //   url: http.adornUrl('/user/login'),
    //   method: 'post',
    //   params: http.adornParams()
    // }).then(({data}) => {
      var loginData = sessionStorage.getItem('loginData')
      var data = JSON.parse(loginData)
      if (data && data.code == 1014) {
        data = transToRRMenu(data)
        fnAddDynamicMenuRoutesU(data.menuList)
        router.options.isAddDynamicMenuRoutes = true
        sessionStorage.setItem('totalMenuList', JSON.stringify(data.menuList || '[]'))
        sessionStorage.setItem('permissions', JSON.stringify(data.permissions || '[]'))
        next({ ...to, replace: true })
      } else {
        sessionStorage.setItem('totalMenuList', '[]')
        sessionStorage.setItem('permissions', '[]')
        next()
      }
    // }).catch((e) => {
    //   console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue')
    //   router.push({ name: 'login' })
    // })
  }
})

/**
 * 修改数据源，使其和人人平台一样
 */

function transToRRMenu(data) {
  function transMenu(menu = []) {
    let nMenu = []
    console.log(menu);
    for(let i = 0; i < menu.length; i++) {
      nMenu.push({
        'menuId': menu[i].obj.id,
        'parentId': menu[i].obj.fid,
        'parentName': null,
        'name': menu[i].obj.menuName,
        'url': menu[i].obj.url,
        'perms': menu[i].obj.permission,
        'type': menu[i].obj.type,
        'icon': menu[i].obj.icon,
        'orderNum': 0,
        'open': null,
        'list': transMenu(menu[i].child)
      });
    }
    return nMenu
  }

  function getPermissions(perms =[]) {
    let nPerms = [];
    for(let i = 0; i < perms.length; i++) {
      if (perms[i].permission) {
         nPerms.push(perms[i].permission);
       }
    } 
    return nPerms
  }
  return {
    'msg': data.msg,
    'code': data.code,
    'menuList': transMenu(data.data.menus),
    'permissions':getPermissions(data.data.permissons)
  }
}

/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType (route, globalRoutes = []) {
  var temp = []
  for (var i = 0; i < globalRoutes.length; i++) {
    if (route.path === globalRoutes[i].path) {
      return 'global'
    } else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
      temp = temp.concat(globalRoutes[i].children)
    }
  }
  return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}

/**
 * 
 * 添加不含侧边栏布局的动态路由
 */
function fnAddDynamicMenuRoutesU (menuList = [], routes = []) {
  var contentRoutes = [] //上下布局下的路由
  var temp = [] //所有子菜单路由
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].list && menuList[i].list.length >= 1) {
      temp = temp.concat(menuList[i].list)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      var route = {
        path: menuList[i].url.replace('/', '-'),
        component: null,
        name: menuList[i].url.replace('/', '-'),
        meta: {
          menuId: menuList[i].menuId,
          title: menuList[i].name,
          isDynamic: true,
          isTab: true,
          iframeUrl: ''
        }
      }
      // url以http[s]://开头, 通过iframe展示
      if (isURL(menuList[i].url)) {
        route['path'] = `i-${menuList[i].menuId}`
        route['name'] = `i-${menuList[i].menuId}`
        route['meta']['iframeUrl'] = menuList[i].url
      } else {
        try {
          route['component'] = _import(`modules/${menuList[i].url}`) || null
        } catch (e) {}
      }
      contentRoutes.push(route)
    }
  }
  dynamicRoutes.children[1].children = contentRoutes

  fnAddDynamicMenuRoutes(temp)
}


/**
 * 添加子菜单布局路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes (menuList = [], routes = []) {
  console.log('menuList: ', menuList);
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].list && menuList[i].list.length >= 1) {
      temp = temp.concat(menuList[i].list)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      var route = {
        path: menuList[i].url.replace('/', '-'),
        component: null,
        name: menuList[i].url.replace('/', '-'),
        meta: {
          menuId: menuList[i].menuId,
          title: menuList[i].name,
          isDynamic: true,
          isTab: true,
          iframeUrl: ''
        }
      }
      // url以http[s]://开头, 通过iframe展示
      if (isURL(menuList[i].url)) {
        route['path'] = `i-${menuList[i].menuId}`
        route['name'] = `i-${menuList[i].menuId}`
        route['meta']['iframeUrl'] = menuList[i].url
      } else {
        try {
          route['component'] = _import(`modules/${menuList[i].url}`) || null
        } catch (e) {}
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    fnAddDynamicMenuRoutes(temp, routes)
  } else {
    console.log('routes:', routes);
    dynamicRoutes.children[0].children = routes
    router.addRoutes([
      dynamicRoutes,
      { path: '*', redirect: { name: '404' } }
    ])
    sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(dynamicRoutes.children[0].children.concat(dynamicRoutes.children[1].children) || '[]'))
    console.log('\n')
    console.log('%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue')
    console.log(dynamicRoutes)
    console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->', 'color:blue')
  }
}



export default router
