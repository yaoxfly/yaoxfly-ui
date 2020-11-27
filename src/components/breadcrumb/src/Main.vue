<!--
* @Author: yx
* @Description: 动态面包屑
* @Date: 2020-11-02
-->
<template>
  <div
    class="eve-breadcrumb"
    :style="{
      width: checkString(width),
      height: checkString(height),
      background: background,
    }"
  >
    <div :style="{ paddingLeft: checkString(iconLeft) }" v-if="icon">
      <slot name="left">
        <BreadcrumbIcon @icon-click="iconClick" :icon-class="iconClass" />
      </slot>
    </div>

    <section :style="{ paddingLeft: checkString(Left) }">
      <el-breadcrumb :separator="separator" :separator-class="separatorClass">
        <template v-for="(item, index) in breadcrumbData">
          <el-breadcrumb-item
            v-if="item[tempConfig.path]"
            :to="{ path: item[tempConfig.path] }"
            :key="`eve-breadcrumb${index}`"
          >
            <span> {{ item[tempConfig.text] }}</span></el-breadcrumb-item
          >
          <el-breadcrumb-item v-else :key="`eve-breadcrumb${index}`">
            <span class=""> {{ item[tempConfig.text] }}</span>
          </el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </section>
  </div>
</template>
<script>
import BreadcrumbIcon from './BreadcrumbIcon.vue'
export default {
  name: 'EveBreadcrumb',
  components: {
    BreadcrumbIcon
  },
  props: {
    /*饿了么自带属性 */

    //面包屑分割符
    separator: {
      type: String,
      default: () => '/'
    },

    //图标分割符 el-icon-arrow-right 可使用相应的 iconfont 作为分隔符,注意这将使 separator 设置失效
    separatorClass: {
      type: String,
      default: () => ''
    },

    /*自定义属性 */

    //自定义面包屑数据--自己转换而来的数据，如有传菜单数据会替换掉这个数据
    data: {
      type: Array,
      default: () => [{
        text: '主页',
        path: '/'
      }]
    },

    //菜单数据--内置了转换方法可自动转换成面包屑数据(推荐)
    menu: {
      type: Array,
      default: () => [
        // {
        //   type: 'submenu',
        //   text: '关于',
        //   children: [
        //     {

        //       type: 'submenu', // 子菜单
        //       icon: 'el-icon-location',
        //       text: '关于1-1',
        //       children: [
        //         {
        //           type: 'submenu', // 子菜单
        //           icon: 'el-icon-location',
        //           text: '关于1-1-1',
        //           children: [
        //             {
        //               path: '/Test1',
        //               type: 'item', // 子菜单
        //               icon: 'el-icon-location',
        //               text: '测试1',
        //             }
        //           ],
        //         }
        //       ],
        //     }
        //   ]
        // },
        // {
        //   path: '/',
        //   type: 'item',
        //   text: '开始'
        // },
        // {
        //   type: 'submenu',
        //   text: '测试',
        //   children: [
        //     {

        //       type: 'submenu', // 子菜单
        //       icon: 'el-icon-location',
        //       text: '测试1-1',
        //       children: [
        //         {
        //           path: 'Test2',
        //           type: 'item', // 子菜单
        //           icon: 'el-icon-location',
        //           text: '测试2',
        //         }
        //       ],
        //     }
        //   ],
        // },
      ]
    },
    //背景颜色
    background: {
      type: String,
      default: () => '#fff'
    },
    //宽度
    width: {
      type: [Number, String],
      default: () => '100%'
    },
    //高度
    height: {
      type: [Number, String],
      default: () => 50
    },
    // 文本离左边的距离
    Left: {
      type: [Number, String],
      default: () => 20
    },

    // 左边字体图标类
    iconClass: {
      type: Object,
      default: () => ({
        expand: 'el-icon-s-fold', //展开
        shrink: 'el-icon-s-unfold' //收缩
      })
    },

    //是否显示图标
    icon: {
      type: Boolean,
      default: () => true
    },

    // 图标、图片等离左边的距离
    iconLeft: {
      type: [Number, String],
      default: () => 10
    },

    // 配置菜单、面包屑数据的text、path、children等key值--支持只修改某个key值,其他配置默认
    config: {
      type: Object,
      default: () => ({
        text: 'text', //文本
        path: 'path', // 路径
        children: 'children' //树结构数据的孩子节点
      })
    },
  },

  data () {
    return {
      // 根据菜单查找的临时全局数据
      breadcrumb: [],
      // 用来循环渲染面包屑的最终数据
      breadcrumbData: [],
      //配置菜单、面包屑数据的text、path、children等key值(内部用)
      tempConfig: {
        text: 'text', //文本
        path: 'path', // 路径
        children: 'children' //树结构数据的孩子节点
      },
    }
  },
  computed: {},
  created () { },
  mounted () { },
  methods: {
    /** @description 左边图标的点击事件，主要用来做左边菜单收缩功能的
         * @author yx
      */
    iconClick () {
      this.$emit('icon-click')
    },

    /** @description 存储缓存--刷新时面包屑不刷新，传自定义数据时用
    * @param  {String}  data  要存储的数据
    * @param  {String}  name  缓存的名字
    * @author yx
    */
    saveCache (data, name = 'breadcrumd') {
      sessionStorage.setItem(name, JSON.stringify(data))
    },

    /** @description 获取缓存，传自定义数据时用
      * @param  {String}  name  缓存的名字
      * @author yx
     */
    getCache (name = 'breadcrumd') {
      return JSON.parse(sessionStorage.getItem(name))
    },

    /**@description  根据菜单数据查找面包屑数据
        * @author yx
        * @param  {String}  path path 路径
        * @param  {Array}  data 菜单数据
        * @param  {Boolean}  save  是否操作全局变量breadcrumb
    */
    findBreadcrumb (path, data, save = true) {
      data = Array.from(data)
      let arr = []
      data.some(item => {
        if (item[this.tempConfig.path] === path) {
          arr.push(item)
          save && this.breadcrumb.push(item)
          return true
        } else if (item[this.tempConfig.children]) {
          save && this.breadcrumb.push(item)
          arr = this.findBreadcrumb(path, item[this.tempConfig.children])
          if (arr.length > 0) { //递归退出条件 要不断的退出n个循环递归，否则循环会继续执行，但不会陷入死循环。
            return true
          } else {
            if (save) {
              this.breadcrumb = []
            }
            return false
          }
        }
      })
      return arr
    },

    /**@description  转换后的面包屑数据--放在v-for循环中的最终数据
     * @author yx
     * @param  {String}  path path 路径
     * @param  {Array}  data 菜单数据
     */
    formatBreadcrumb (path, data) {
      this.breadcrumb = [] //初始化防止重复添加
      this.findBreadcrumb(path, data)
      const arr = []
      this.breadcrumb.forEach(item => {
        arr.push({
          [this.tempConfig.path]: item[this.tempConfig.path],
          [this.tempConfig.text]: item[this.tempConfig.text]
        })
      })
      return arr
    },

    /**@description 判断是否是字符串
     * @author yx
     * @param  {String}  str 高度、宽度、left等类型的值
     */
    checkString (str) {
      return typeof str === 'string' ? str : `${str}px`
    },
  },

  watch: {
    data: {
      handler (val, oldVal) {
        this.breadcrumbData = Array.from(val)
      },
      immediate: true,
    },
    config: {
      handler (val) {
        Object.assign(this.tempConfig, val)
        // console.log(111, this.tempConfig, val)
      },
      immediate: true,
    },

    //放最后,放在前面刷新面包屑就没有了
    $route: {
      handler (val, oldVal) {
        if (this.menu <= 0) return
        //路由子路由配置中无论是带/还是不带斜杆,路由监听时总是带有斜杆
        const menu = this.findBreadcrumb(val.path, this.menu, false)
        //判断外面传进来的菜单的路径(path)是否有加斜杆,无论路径(path)是否带斜杆都可以找到(path兼容斜杆)。
        const path = menu.length > 0 ? val.path : val.path.split('/')[1]
        this.breadcrumbData = Array.from(this.formatBreadcrumb(path, this.menu))
      },
      immediate: true,
    },
  }
}
</script>

<style lang="scss" scoped>
.eve-breadcrumb {
  display: flex;
  align-items: center;
  user-select: none;
  &__text {
    padding-left: 20px;
    font-size: 16px;
  }
  &__icon {
    cursor: pointer;
    font-size: 24px;
  }
}

::v-deep .el-breadcrumb {
  font-size: 16px;
}
</style>
