<!--
* @Author: xjd
* @Description: 输入框的封装
* @Date: 2020-10-20
-->
<template>
  <div class="eve-input">
    <el-input v-if="!isReadOnly" :size="size" v-model="curValue" style="width: 100%" :disabled="isDisabled" :placeholder="placeholder" />
    <template v-else>
      {{ curValue }}
    </template>
  </div>
</template>
<script>
import VModelMixin from '../../../mixins/fd-mixin'

export default {
  name: 'FdInput',
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
