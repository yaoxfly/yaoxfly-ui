<template>
  <div class="ue-component-wrapper">
    <el-switch v-model="curValue" :active-value="activeValue" :inactive-value="inactiveValue" size="small" :disabled="disabled" />
  </div>
</template>

<script>
import VModelMixin from './v-model-mixin'

export default {
  name: 'UeSwitch',
  mixins: [
    VModelMixin
  ],
  props: {
    activeValue: {
      type: [String, Number, Boolean],
      default: true
    },
    inactiveValue: {
      type: [String, Number, Boolean],
      default: false
    }
  }
}
</script>
