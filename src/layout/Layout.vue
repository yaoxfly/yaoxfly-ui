<template>
  <div class="layout">
    <div class="layout__header-container">
      <div class="layout__header">
        <div class="layout__header-main">
          <span class="layout__header-title">eve-ui</span>
        </div>
        <div class="layout__header-introduce">
          基于element-ui二次封装的高级组件，对element-ui做了个性化需求调整，新增新的属性、事件、方法、slot等。
        </div>
      </div>
    </div>

    <div class="layout__main">
      <div class="layout__content">
        <eve-menu :data="data" :top="100"></eve-menu>
        <div class="layout__router-in-main">
          <eve-main :height-differ="120" scroll :shrink-width="264">
            <router-view class="layout__router" />
          </eve-main>
        </div>
      </div>
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
      data: [],
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
    },

  }
}
</script>
 

<style lang='scss' scoped>
.layout {
  width: 100%;
  overflow: hidden;
  height: 100%;

  &__router {
    margin: 20px;
  }
  &__header {
    height: 100px;
    width: 1350px;
    &-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  &__header-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__content {
    display: flex;
  }

  &__header-title {
    font-size: 32px;
    color: #1976d2;
    line-height: 50px;
  }
  &__header-introduce {
    font-size: 18px;
  }
  &__main {
    display: flex;
    justify-content: center;
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

::v-deep .eve-main {
  width: 1170px !important;
}
</style>
