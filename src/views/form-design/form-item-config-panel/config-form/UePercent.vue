<template>
  <div>
    <!-- 百分比 -->
    <el-slider v-model="curValue" />
  </div>
</template>

<script>
import VModelMixin from './v-model-mixin'

export default {
  name: 'UePercent',
  mixins: [
    VModelMixin
  ],
  props: {
    selections: {
      type: Array,
      default: () => []
    }
  }
}
</script>
