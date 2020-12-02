<!--
* @Author: xjd
* @Description: 输入框的封装
* @Date: 2020-10-20
-->
<template>
  <div class="eve-input">
    <template v-if="!isReadOnly">
      <el-input v-if="inputType !== 'number'" :rows="rows" :type="inputType" :size="size" v-model="curValue" style="width: 100%" :disabled="isDisabled" :placeholder="placeholder" />
      <el-input-number
        v-else
        v-model="curValue"
        style="width: 100%"
        :size="size"
        :disabled="isDisabled"
        :min="min"
        :max="max"
        :step="step"
        :precision="precision"
        :placeholder="placeholder"
      />
    </template>
    <div v-else v-html="curValue" />
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
    },
    inputType: {
      type: String,
      default: 'text'
    },
    rows: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    step: {
      type: Number,
      default: 1
    },
    precision: {
      type: Number,
      default: 0
    },
    maxlength: {
      type: Number,
      default: 50
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
