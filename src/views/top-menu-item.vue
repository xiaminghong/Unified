<template>
  <el-menu-item style="border-bottom-color: transparent;" :index="menu.menuId + ''" @click="gotoRouteHandle(menu)">
      <icon-svg :name="menu.icon || ''" class="site-sidebar__menu-icon"></icon-svg> <br>
      <span>{{ menu.name }}</span>
  </el-menu-item>
</template>

<script>
  export default {
    name: 'top-menu-item',
    props: {
      menu: {
        type: Object,
        required: true,
      }
    },
    computed: {
      sidebarLayoutSkin: {
        get () { return this.$store.state.common.sidebarLayoutSkin }
      },
      menuList: {
        get () { return this.$store.state.common.menuList },
        set (val) { this.$store.commit('common/updateMenuList', val) }
      },
      menuActiveName: {
        get () { return this.$store.state.common.menuActiveName },
        set (val) { this.$store.commit('common/updateMenuActiveName', val) }
      },
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      mainTabsActiveName: {
        get () { return this.$store.state.common.mainTabsActiveName },
        set (val) { this.$store.commit('common/updateMainTabsActiveName', val) }
      },
    },
    created () {
      this.dynamicMenuRoutes = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes') || '[]')
      this.totalMenuList =  JSON.parse(sessionStorage.getItem('totalMenuList') || '[]')
    },
    methods: {
      // 通过menuId与动态(菜单)路由进行匹配跳转至指定路由
      gotoRouteHandle (menu) {
        var route = this.dynamicMenuRoutes.filter(item => item.meta.menuId === menu.menuId)
        if (route.length >= 1) {
          this.menuActiveName = ''
          this.mainTabs = []
          this.mainTabsActiveName = ''
          this.$router.push({ name: route[0].name })
        } else {
          if (menu.list && menu.list.length > 0) {
            route = this.dynamicMenuRoutes.filter(item => item.meta.menuId === menu.list[0].menuId)
            if (route.length >= 1) {
              this.menuActiveName = ''
              this.mainTabs = []
              this.mainTabsActiveName = ''
              this.$router.push({ name: route[0].name })
              this.menuList = menu.list
              console.log(this.menuList)
            }
          }
        }
      }
    }
  }
</script>
