<template>
  <div class="layout">
    <eve-menu :data="data" :top="0"></eve-menu>
    <div class="layout__router-in-main">
      <router-view class="layout__router" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { routes } from '../router/index'
export default {
  name: 'Layout',
  data () {
    return {
      data: []
    }
  },
  mounted () {
    this.getMenu()
  },
  methods: {
    getMenu () {
      const arr = routes.filter(item => item.name === 'Layout')
      const route = JSON.parse(JSON.stringify(arr[0].children))
      route.forEach(element => {
        element.text = element.name === 'Use' ? '安装' : element.name
        element.type = 'item'
        element.title = element.meta && element.meta.title
      })
      this.data = route
    }
  }
}
</script>
 

<style lang='scss' scoped>
.layout {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  padding-left: 200px;
  overflow: hidden;
  height: 100%;
  &__router-in-main {
    width: calc(100vw - 400px);
    height: 100vh;
    padding-bottom: 30px;
    overflow: hidden;
    overflow-y: auto;
  }
  &__router {
    margin: 20px;
  }
}
::v-deep .el-menu-item-group__title {
  color: #333;
  font-size: 16px;
  font-weight: bold;
}

::v-deep .el-menu-item,
::v-deep .el-submenu__title {
  height: 40px;
  line-height: 40px;
}
</style>
