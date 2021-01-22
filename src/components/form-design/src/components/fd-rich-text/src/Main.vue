<!--
* @Author: xjd
* @Description: 下拉框的封装
* @Date: 2020-10-20
-->
<template>
  <div>
    <eve-rich-text
       v-if="!isReadOnly"
      v-model="curValue"
      :disabled="isDisabled"
      :init="init"
      @on-click="onClick"/>
    <div v-else v-html="curValue"></div>
  </div>
</template>
<script>
import VModelMixin from '../../../mixins/fd-mixin'

export default {
  name: 'FdRichText',
  mixins: [
    VModelMixin
  ],
  data() {
    return {
    }
  },
  props: {
    init: {
      type: Object,
      default: () => ({ height: 327 })
    }
  },
  methods: {
    onClick () {}
  }
}
</script>