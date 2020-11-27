<!--
* @Author: yx
* @Description: 左侧菜单栏的子组件
* @Date: 2020-10-13
-->

<template>
  <div :class="className">
    <!--子菜单-可能有孩子的菜单-->
    <el-submenu
      v-if="menuData.type == 'submenu'"
      :index="menuData[config.path] ? menuData[config.path] : getMathFloor()"
    >
      <template slot="title">
        <i :class="menuData.icon"></i>
        <span slot="title">{{ menuData[config.text] }}</span>
      </template>
      <template
        v-if="menuData[config.children] && menuData[config.children].length > 0"
      >
        <!--递归组件-->
        <menu-item
          v-for="(item, index) in menuData[config.children]"
          :key="`menu-item${index}`"
          :menuData="item"
        ></menu-item>
      </template>
    </el-submenu>
    <!--最底层的菜单-->
    <el-menu-item
      v-else-if="menuData.type == 'item'"
      :index="menuData[config.path]"
    >
      <i :class="menuData.icon"></i>
      <span slot="title">{{ menuData[config.text] }}</span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  //接收依赖注入的类名
  inject: {
    className: {
      default: ''
    },
    config: {
      default: {}
    }
  },
  props: {
    // 菜单数组
    menuData: {
      type: Object,
      default: () => { }
    },
  },

  mounted () {
    console.log(this.config, 111)
  },

  methods: {
    /** @description 获取随机树
      * @author yx
      */
    getMathFloor () {
      // menuData.path 不能为空且不可重复，如果重复会出现，操作展开一个，出现展开多个的情况
      return this.getRandomNumber(18, 1).toString()
    },


    /**@description  获取随机数数组
     * @param  {Number}  len 长度
     * @param  {Number}  count 个数
     * @author yx
     */
    getRandomNumber (len, count) {
      let number = 1
      for (let i = 0; i < len; i++) {
        number = number * 10
      }
      const res = []
      for (let i = 0; i < count; i++) {
        const num = Math.round((Math.random()) * number)
        if (!this.exist(res, num)) {
          res.push((num + '').length >= len ? num : num + this.getZeroStr(len - (num + '').length))
        } else {
          i--
        }
      }
      return res
    },

    /**@description  随机位数不够，后面补0
     * @param  {Number}  len 长度
     * @author yx
     */
    getZeroStr (len) {
      let str = ''
      for (let i = 0; i < len; i++) {
        str += '0'
      }
      return str
    },


    /**@description  数组arr中是否存在obj元素
    * @param  {Array}  arr 随机数数组
    * @param  {obj}  obj 随机数对象
    * @author yx
    */
    exist (arr, obj) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === obj) {
          return true
        }
      }
      return false
    }
  }
}
</script>
