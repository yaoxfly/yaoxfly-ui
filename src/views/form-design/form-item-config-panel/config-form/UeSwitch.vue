<template>
  <div class="ue-component-wrapper">
    <el-switch v-if="mode === 'switch'" v-model="curValue" :active-value="activeValue" :inactive-value="inactiveValue" size="small" :disabled="disabled" />
    <el-checkbox v-else v-model="curValue" size="small" :disabled="disabled">
      {{ label }}
    </el-checkbox>
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
    },
    mode: {
      type: String,
      // switch checkbox
      default: 'switch'
    },
    label: {
      type: String,
      default: ''
    }
  }
}
</script>
