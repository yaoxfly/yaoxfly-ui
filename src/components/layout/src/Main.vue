<!--
* @Author: yx
* @Description: 中间内容布局组件
* @Date: 2020-11-11
-->
<template>
  <div>1</div>
</template>

<script>

export default {
  name: 'EveLayout',
  props: {
    //logo
    logo: {
      type: String,
      default: require('../../../assets/logo.png')
    },
  },

  data () {
    return {
      visible: false // 是否显示
    }
  },

  methods: {


  }
}

</script>
<style lang='scss' scoped >
</style>

 