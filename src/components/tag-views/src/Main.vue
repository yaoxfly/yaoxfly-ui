<!--
* @Author: yx
* @Description: 页签组件--已和内部菜单组件做好联动并做好了缓存，不需要传递数据，
  如果使用第三方菜单组件，可使用内部方法addData添加数据,并做好了缓存,不需要传递数据，
  或者开启自定义模式，但要传递数据,且需自己做缓存。
* @Date: 2020-11-18
-->
<template>
  <div class="eve-tag-views" :style="{ height: checkString(height) }">
    <div :style="{ paddingLeft: checkString(iconLeft) }" v-if="icon">
      <slot name="left">
        <BreadcrumbIcon @icon-click="iconClick" :icon-class="iconClass" />
      </slot>
    </div>

    <eve-scroll
      v-if="scroll"
      v-bind="$attrs"
      class="eve-tag-views__scroll"
      :width="scrollWidth"
    >
      <swiper-slide v-for="item in tempData" :key="item[tempConfig.text]">
        <el-tag
          :closable="active(item[tempConfig.path])"
          :type="item.type"
          class="eve-tag-views__button"
          :effect="active(item[tempConfig.path]) ? 'dark' : 'plain'"
          @click="jump(item[tempConfig.path])"
          @close="close(item[tempConfig.path])"
          :disable-transitions="disableTransitions"
        >
          <span> {{ item[tempConfig.text] }} </span>
        </el-tag>
      </swiper-slide>
    </eve-scroll>

    <el-tag
      v-else
      v-for="item in tempData"
      :key="item[tempConfig.text]"
      :closable="active(item[tempConfig.path])"
      :type="item.type"
      class="eve-tag-views__button"
      :effect="active(item[tempConfig.path]) ? 'dark' : 'plain'"
      @click="jump(item[tempConfig.path])"
      @close="close(item[tempConfig.path])"
      :disable-transitions="disableTransitions"
    >
      <span> {{ item[tempConfig.text] }} </span>
    </el-tag>
  </div>
</template>
<script>
import { SwiperSlide } from 'vue-awesome-swiper'
import { receive } from 'eve-ui/src/bus/tagViews.js'
import BreadcrumbIcon from 'eve-ui/src/components/breadcrumb/src/BreadcrumbIcon.vue'
export default {
  name: 'EveTagViews',
  components: {
    BreadcrumbIcon,
    SwiperSlide
  },
  props: {
    // 是否开启缓存
    cache: {
      type: Boolean,
      default: () => true
    },
    //缓存名称
    cacheName: {
      type: String,
      default: () => 'tagViewsDatas'
    },
    //是否禁用渐变动画
    disableTransitions: {
      type: Boolean,
      default: () => false
    },
    //是否开启自定义模式(没有使用配套的菜单组件且不想用当前组件内部封装的添加方法时，可使用自定义模式)
    custom: {
      type: Boolean,
      default: () => false
    },
    //自定义模式的页签数据(开启自定义模式后才能使用)
    data: {
      type: Array,
      default: () => []
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
    // 页签高度
    height: {
      type: [Number, String],
      default: () => 50
    },
    // 配置菜单的text、path、children等key值--支持只修改某个key值,其他配置默认
    config: {
      type: Object,
      default: () => ({
        text: 'text', //文本
        path: 'path', // 路径
        children: 'children' //树结构数据的孩子节点
      })
    },
    //是否滚动
    scroll: {
      type: Boolean,
      default: false
    },
    scrollWidth: {
      type: [Number, String],
      default: '100%'
    }
  },
  data () {
    return {
      tempData: this.getCacheData(), //内部页签数据
      //key默认配置--配置菜单、面包屑数据的text、path、children等key值(内部用可被config覆盖)
      tempConfig: {
        text: 'text', //文本
        path: 'path', // 路径
        children: 'children' //树结构数据的孩子节点
      },
    }
  },
  mounted () {
    this.receiveBus()
  },

  methods: {
    /** @description 左边图标的点击事件，主要用来做左边菜单收缩功能的
        * @author yx
     */
    iconClick () {
      this.$emit('icon-click')
    },

    /**@description  路由跳转
     * @param  {String}  path 路径名称
     * @author yx
     */
    jump (path) {
      this.$router.push({
        path: path
      })
      this.$emit('click', { path: path, data: this.tempData })
    },

    /**@description  关闭页签
      * @param  {String}  path 路径名称
      * @author yx
    */
    close (path) {
      let index = ''
      this.tempData.forEach((item, idx) => {
        if (item[this.tempConfig.path] === path) {
          index = idx
        }
      })
      this.tempData.splice(index, 1)
      !this.custom && this.cache && this.setCacheData()
      const data = this.tempData[this.tempData.length - 1]
      data && this.$router.push({
        path: data[[this.tempConfig.path]]
      })
      this.$emit('close', { path: path, data: this.tempData })
      this.$emit('updata:data', this.tempData)
    },

    /**@description  从缓存中获取数据
     * @param  {String}  cacheName 缓存名称
     * @author yx
     */
    getCacheData (cacheName = this.cacheName) {
      const tagViewsData = sessionStorage.getItem(cacheName)
      return tagViewsData && this.cache ? JSON.parse(tagViewsData) : []
    },

    /**@description 设置缓存数据
      * @param  {String}  cacheName 缓存名称
      * @author yx
      */
    setCacheData (cacheName = this.cacheName) {
      sessionStorage.setItem(cacheName, JSON.stringify(this.tempData))
    },

    /**@description 接收各种兄弟通信数据
     * @author yx
     */
    receiveBus () {
      receive.menuTagViewsData(data => {
        this.addData(data)
      })
    },

    /**@description 添加页签数据
     * @param  {String}  data 单个页签数据 模式格式{text:"",path:""}
     * @author yx
     */
    addData (data) {
      let flag = true
      this.tempData.forEach(item => {
        if (item[this.tempConfig.path] === data[this.tempConfig.path]) {
          flag = false
        }
      })
      flag && this.tempData.push({ [this.tempConfig.text]: data[this.tempConfig.text], [this.tempConfig.path]: data[this.tempConfig.path] })
      !this.custom && this.cache && this.setCacheData()
      this.$emit('updata:data', this.tempData)
    },

    /**@description 判断是否是字符串
        * @author yx
        * @param  {String}  str 高度、宽度、left等类型的值
    */
    checkString (str) {
      return typeof str === 'string' ? str : `${str}px`
    },
  },

  computed: {
    active () {
      return function (path) {
        let active = false
        if (path.substr(0, 1) === '/') {
          if (this.$route.path === path) {
            active = true
          }
        } else {
          if (this.$route.path.split('/')[1] === path) {
            active = true
          }
        }
        return active
      }
    }
  },

  watch: {
    data: {
      handler (val) {
        if (!this.custom) return
        this.tempData = val
      },
      immediate: true
    },
    config: {
      handler (val) {
        Object.assign(this.tempConfig, val)
        // console.log(111, this.tempConfig, val)
      },
      immediate: true,
    },
  }
}
</script>

<style lang="scss" scoped>
.eve-tag-views {
  background: #fff;
  display: flex;
  align-items: center;
  user-select: none;
  &__button {
    display: block;
    cursor: pointer;
    margin-left: 20px;
  }
  &__scroll {
    margin-left: 20px;
  }
}

::v-deep.el-tag {
  height: 28px;
  line-height: 26px;
  text-align: center;
}

::v-deep.swiper-slide {
  padding-right: 20px;
}
</style>
