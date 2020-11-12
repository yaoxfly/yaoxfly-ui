<!--
* @Author: xjd
* @Description: 表单设计器单选选框组封装
* @Date: 2020-11-09
-->
<template>
  <div class="eve-checkbox-group">
    <!-- {{ selections }} -->
    <el-radio-group
      v-model="curValue"
      :size="size"
      style="width: 100%"
      :disabled="isDisabled || isReadOnly"
    >
      <el-radio v-for="(item, index) in selections" :label="item.value" :key="`radio_selection_${index}`">{{item.label}}</el-radio>
    </el-radio-group>
  </div>
</template>
<script>
import VModelMixin from '../../fd-mixin'

export default {
  name: 'FdRadioGroup',
  mixins: [
    VModelMixin
  ],
  props: {
    selections: {
      type: Array,
      default: () => []
    },
    isRemote: {
      type: Boolean,
      default: false
    },
    remoteApi: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
