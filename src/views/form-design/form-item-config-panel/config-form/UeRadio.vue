<template>
  <div class="ue-component-wrapper">
    <el-radio-group v-model="curValue" size="small">
      <el-radio
        v-for="(selection, index) in selections"
        :key="`selection_${index}`"
        :disabled="disabled"
        :label="selection.value"
      >{{ selection.label }}</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
import VModelMixin from './v-model-mixin'

export default {
  name: 'UeRadio',
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
