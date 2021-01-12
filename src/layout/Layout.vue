<template>
  <div class="layout">
    <div class="layout__header-container">
      <div class="layout__header">
        <div class="layout__header-main">
          <span class="layout__header-title">eve-ui</span>
        </div>
        <div class="layout__header-introduce">
          基于element-ui二次封装的高级组件，对element-ui做了个性化需求调整，新增新的属性、事件、方法、slot等；
        </div>
      </div>
    </div>

    <div class="layout__main">
      <div class="layout__content">
        <div class="layout__left">
          <eve-menu
            :data="data"
            :top="140"
            class="layout__menu"
            :border-right="false"
            @select="select"
          ></eve-menu>
        </div>
        <div class="layout__right" ref="routerView">
          <div class="layout__router-in-main">
            <router-view class="layout__router" />
            <div
              class="layout__up-container"
              @click="select"
              v-if="scrollTop === 600"
            >
              <el-icon class="el-icon-caret-top"></el-icon>
            </div>
          </div>
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
      scrollTop: ''
    }
  },
  mounted () {
    this.getMenu()
    this.handleScroll()
  },
  methods: {
    handleScroll () {
      console.log(11)
      this.$refs.routerView.addEventListener('scroll', () => {
        this.scrollTop = this.$refs.routerView.scrollTop
        // console.log(this.$refs.routerView.scrollTop)
        // console.log(this.$refs.routerView.scrollHeight / 2)
      })
    },
    getMenu () {
      const arr = routes.filter(item => item.name === 'Layout')
      const route = JSON.parse(JSON.stringify(arr[0].children))
      route.forEach(element => {
        element.text = element.name
        element.type = 'item'
        element.title = element.meta && element.meta.title
      })
      this.data = route
    },

    //菜单激活回调
    select () {
      setTimeout(() => {
        this.$refs.routerView.scrollTop = 0
      }, 100)
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
    margin: 0 20px;
  }
  &__header {
    height: 100px;
    width: 100%;
    margin-left: calc(25% - 181px);
    border-bottom: 1px solid #e2dfdf;
    &-container {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
  &__header-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__content {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  &__header-title {
    font-size: 32px;
    color: rgb(64, 158, 255);
    line-height: 50px;
  }
  &__header-introduce {
    font-size: 16px;
  }
  &__main {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }
  &__router-in-main {
    width: 89%;
    height: 80vh;
    position: relative;
  }
  &__left {
    width: 25%;
    display: flex;
    justify-content: flex-end;
    height: calc(100vh - 152px);
    margin-top: 12px;
  }
  &__right {
    width: 75%;
    overflow: hidden;
    overflow-y: auto;
    height: calc(100vh - 152px);
  }
  &__up-container {
    position: fixed;
    background-color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #409eff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
    cursor: pointer;
    z-index: 5;
    right: 50px;
    bottom: 100px;
    &:hover {
      background: #f2f6fc;
    }
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

::-webkit-scrollbar-track-piece {
  //滚动条凹槽的颜色，还可以设置边框属性
  background-color: #f8f8f8;
}
::-webkit-scrollbar {
  //滚动条的宽度
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-thumb {
  //滚动条的设置
  background-color: rgba(144, 147, 153, 0.5);
  background-clip: padding-box;
  min-height: 10px;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(144, 147, 153, 0.5);
}

::v-deep .eve-menu__menu-item .el-menu-item:focus,
::v-deep .eve-menu__menu-item .el-menu-item:hover {
  background: transparent !important;
  border-right: 0 solid transparent;
}
</style>
