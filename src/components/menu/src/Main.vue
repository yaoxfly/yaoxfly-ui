<!--
* @Author: yx
* @Description: 左侧菜单栏封装
* @Date: 2020-10-13
-->
<template>
  <div :style="{ width: `${tempWidth}px` }">
    <el-scrollbar style="height: 100%">
      <el-menu
        class="eve-menu"
        :router="router"
        :unique-opened="uniqueOpened"
        :default-active="active"
        :mode="mode"
        :collapse="tempCollapse"
        :background-color="backgroundColor"
        :text-color="textColor"
        :active-text-color="activeTextColor"
        @select="(index, indexPath) => select(index, indexPath, data)"
        :style="{ height: `calc(100vh - ${top}px)` }"
      >
        <menu-item
          v-for="(item, index) in data"
          :menu-data="item"
          :key="`eve-menu${index}`"
        ></menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Bus from '../../../assets/js/bus.js'
import MenuItem from './MenuItem'
export default {
  name: 'EveMenu',
  provide () {
    return {
      //传一个类名用来改样式，以防和滚动菜单全局污染样式
      className: 'eve-menu__menu-item'
    }
  },
  props: {
    /* element-ui的属性 */

    // 模式  horizontal / vertical
    mode: {
      type: String,
      default: 'vertical'
    },

    // 当前激活菜单的标识--可不在外面设置已经根据路由变化而变化了
    defaultActive: {
      type: String,
      default: 'use'
    },

    // 是否只保持一个子菜单的展开
    uniqueOpened: {
      type: Boolean,
      default: false
    },

    // 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
    router: {
      type: Boolean,
      default: true
    },

    // 菜单的背景色（仅支持 hex 格式）
    backgroundColor: {
      type: String,
      default: '#ffffff'
    },

    // 菜单的文字颜色（仅支持 hex 格式）
    textColor: {
      type: String,
      default: '#303133'
    },

    // 当前激活菜单的文字颜色（仅支持 hex 格式）
    activeTextColor: {
      type: String,
      default: '#409EFF'
    },

    // 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
    collapse: {
      type: Boolean,
      default: false
    },

    /* 自定义的属性 */

    // 菜单数据
    data: {
      type: Array,
      default: () => [
        {
          path: '',
          type: 'submenu',
          text: '关于',
          children: [
            {
              path: 'about',
              type: 'item', // 子菜单
              icon: 'el-icon-location',
              text: '测试3',
            }
          ],
        },
        {
          path: '/',
          type: 'item',
          text: '开始'
        },

      ]
    },
    // 宽度
    width: {
      type: Number,
      default: 200
    },
    // 距离顶部(header)的距离(原本属性是height现在改完top)
    top: {
      type: Number,
      default: 55
    }

  },
  data () {
    return {
      // 当前激活菜单的标识(菜单高亮)--可让子组件改父组件传来的值
      active: '',
      // 是否水平折叠收起菜单(内部用)
      tempCollapse: '',
      // 宽度(内部用)
      tempWidth: 200
    }
  },
  mounted () {
    this.receiveBus()
  },

  methods: {
    /**@description  菜单激活回调
      * @author yx
      * @param  {String}  index path 路径
      * @param  {Array}  indexPath 路径数组
      * @param  {Array}  data 菜单数据
     */
    select (index, indexPath, data) {
      this.$emit('select', {
        index: index,
        indexPath: indexPath,
        data: data
      })
    },

    /**@description  根据路由查找菜单数据中匹配路径的数组
       * @author yx
       * @param  {String}  path path 路径
       * @param  {Array}  data 菜单数据
     */
    findPath (path, data) {
      data = Array.from(data)
      let arr = []
      data.some(item => {
        if (item.path === path) {
          arr.push(item)
          return true
        } else if (item.children) {
          arr = this.findPath(path, item.children)
          if (arr.length > 0) { //递归退出条件 要不断的退出n个循环递归，否则循环会继续执行，但不会陷入死循环。
            return true
          } else {
            return false
          }
        }
      })
      return arr
    },

    /**@description 接收各种兄弟通信
     * @author yx
     */
    receiveBus () {
      Bus.$on('breadcrumb-container-menu-collapse', collapse => {
        // console.log(collapse, 'menu')
        this.tempCollapse = collapse
        this.tempWidth = this.tempCollapse ? 64 : this.width
        this.$emit('update:collapse', this.tempCollapse)
        this.$emit('update:width', this.tempWidth)
      })
    }
  },

  components: {
    MenuItem
  },

  watch: {
    defaultActive: {
      handler (val, oldVal) {
        this.active = val
        this.$emit('updata:defaultActive', this.active)
      },
      immediate: true
    },
    $route: {
      handler (val) {
        //路由子路由配置中无论是带/还是不带斜杆,路由监听时总是带有斜杆
        const menu = this.findPath(val.path, this.data, false)
        //判断外面传进来的菜单的路径(path)是否有加斜杆,无论路径(path)是否带斜杆都可以找到(path兼容斜杆)。
        this.active = menu.length > 0 ? val.path : val.path.split('/')[1]
        this.$emit('updata:defaultActive', this.active)
      },
      immediate: true,
      // 深度观察监听
      // deep: true
    },
    collapse: {
      handler (val) {
        this.tempCollapse = val
      },
      immediate: true,
    },
    width: {
      handler (val) {
        this.tempWidth = val
      },
      immediate: true,
    }
  }
}

</script>


<style lang='scss' scoped >
.eve-menu {
  user-select: none;
}

//隐藏滚动条的横向滚动条
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
::v-deep .el-scrollbar__bar.is-vertical > div {
  width: 120%;
}
:v-deep .el-scrollbar__bar.is-horizontal > div {
  height: 120%;
}
</style>

 <style lang="scss" >
//  菜单收缩时element会给菜单添加el-menu--collapse类，这时候把文字和下拉图标隐藏掉即可,
/* element-ui 的<el-menu>标签本身希望里面嵌套的是<el-menu-item>,<el-submenu>,<el-menu-item-group>之一，但是却嵌套了其他标签,而导致收折就隐藏不了文字。*/
.el-menu--collapse .el-submenu__title span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
.el-menu--collapse .el-submenu__icon-arrow {
  display: none;
}

//没有排除el-menu--collapse类会没有动画,el-menu--collapse这里设置收缩后的宽度,默认64
.eve-menu:not(.el-menu--collapse) {
  width: 100%;
}

.eve-menu__menu-item {
  .el-submenu__title:focus,
  .el-submenu__title:hover {
    background: #f0f3f6 !important;
    border-right: 3px solid #409eff;
  }
  /*里面最底层孩子项的颜色 */
  .el-menu-item:focus,
  .el-menu-item:hover {
    background: #f0f3f6 !important;
    border-right: 3px solid #409eff;
  }
}

/*加快收缩的动画 */
.collapse-transition {
  transition: 0.2s height, 0.1s padding-top, 0.1s padding-bottom;
}
.horizontal-collapse-transition {
  transition: 0s width, 0s padding-left, 0s padding-right;
}
.horizontal-collapse-transition .el-submenu__title .el-submenu__icon-arrow {
  -webkit-transition: 0s;
  transition: 0s;
  opacity: 0;
}

.el-submenu .el-menu-item {
  min-width: 0;
  width: 100%;
}
</style>


