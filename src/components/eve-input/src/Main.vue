<!--
* @Author: xjd
* @Description: 输入框的封装
* @Date: 2020-10-20
-->
<template>
  <div class="eve-input">
    <el-input v-model="curValue" style="width: 100%" :placeholder="placeholder"></el-input>
  </div>
</template>
<script>
import VModelMixin from '../../../mixins/v-model-mixin'

export default {
  name: 'EveInput',
  mixins: [
    VModelMixin
  ],
  props: {
    placeholder: {
      type: String,
      default: ''
    }
  },

  mounted () {

  },

  data () {
    return {
    }
  },

  methods: {
    
  }
}
</script>
<style lang="scss" scoped>

</style>
