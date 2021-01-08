<!--
* @Author: yx
* @Description: 动态面包屑
* @Date: 2020-11-02
-->
<template>
  <div>
    <div>
      <i :class="className" @click="iconClick" class="eve-breadcrumb-icon"></i>
    </div>
  </div>
</template>
<script>

import { send } from 'eve-ui/src/bus/breadcrumb.js'
export default {
  name: 'EveBreadcrumbIcon',
  props: {
    // 左边字体图标类
    iconClass: {
      type: Object,
      default: () => ({
        expand: 'el-icon-s-fold', //展开
        shrink: 'el-icon-s-unfold' //收缩
      })
    },
  },

  data () {
    return {
      //左边菜单是否收缩--通信用
      collapse: false
    }
  },

  computed: {
    className () {
      return this.collapse ? this.iconClass.shrink : this.iconClass.expand
    }
  },

  methods: {
    /** @description 左边图标的点击事件，主要用来做左边菜单收缩功能的
         * @author yx
      */
    iconClick () {
      this.sendBus()
      this.$emit('icon-click')
    },

    /**@description 判断是否是字符串
     * @author yx
     * @param  {String}  str 高度、宽度、left等类型的值
     */
    checkString (str) {
      return typeof str === 'string' ? str : `${str}px`
    },

    /**@description 发送通信
     * @author yx
     */
    sendBus () {
      this.collapse = !this.collapse
      send.breadcrumbCollapse(this.collapse)
    }
  },

}
</script>

<style lang="scss" scoped>
.eve-breadcrumb-icon {
  user-select: none;
  cursor: pointer;
  font-size: 24px;
}
</style>
