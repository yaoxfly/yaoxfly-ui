<!--
* @Author: yx
* @Description: 页签组件
* @Date: 2020-11-18
-->
<template>
  <div class="eve-tag-views">
    <el-tag
      v-for="item in tempData"
      :key="item.text"
      :closable="active(item.path)"
      :type="item.type"
      class="eve-tag-views__button"
      :effect="active(item.path) ? 'dark' : 'plain'"
      @click="jump(item.path)"
      @close="close(item.path)"
      :disable-transitions="disableTransitions"
    >
      <span> {{ item.text }} </span>
    </el-tag>
  </div>
</template>
<script>

import Bus from '../../../assets/js/bus.js'
export default {
  name: 'EveTagViews',
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
    //自定义页签数据(如果有用配套封装的菜单组件可不需要传,内部已经做好数据联动)
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      tempData: this.getCacheData() //内部页签数据
    }
  },
  mounted () {
    this.receiveBus()
  },

  methods: {
    /**@description  路由跳转
     * @param  {String}  path 路径名称
     * @author yx
     */
    jump (path) {
      this.$router.push({
        path: path
      })
      this.$emit('click', path)
    },

    /**@description  关闭页签
      * @param  {String}  path 路径名称
      * @author yx
    */
    close (path) {
      let index = ''
      this.tempData.forEach((item, idx) => {
        if (item.path === path) {
          index = idx
        }
      })
      this.tempData.splice(index, 1)
      this.setCacheData()
      const data = this.tempData[this.tempData.length - 1]
      data && this.$router.push({
        path: data.path
      })
      this.$emit('close', path)
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
      Bus.$on('menu-tag-views-data', data => {
        this.addData(data)
        // console.log(data, '菜单数据')
      })
    },

    /**@description 添加页签数据
     * @param  {String}  data 单个页签数据
     * @author yx
     */
    addData (data) {
      const { path, value: text } = data || {}
      let flag = true
      this.tempData.forEach(item => {
        if (item.path === path) {
          flag = false
        }
      })
      flag && this.tempData.push({ text: text, path: path })
      this.cache && this.setCacheData()
    }
  },

  computed: {
    active () {
      return function (path) {
        // console.log(33)
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
        // console.log(val, 22)
        this.tempData = val
      },
    },
  }
}
</script>

<style lang="scss" scoped>
.eve-tag-views {
  height: 50px;
  background: #fff;
  display: flex;
  align-items: center;
  user-select: none;
  &__button {
    display: block;
    cursor: pointer;
    margin-left: 20px;
  }
}
</style>
