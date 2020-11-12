<!--
* @Author: xjd
* @Description: 表单设计器多选框组封装
* @Date: 2020-11-09
-->
<template>
  <div class="eve-checkbox-group">
    <!-- {{ selections }} -->
    <el-checkbox-group
      v-model="curValue"
      :size="size"
      style="width: 100%"
      :disabled="isDisabled || isReadOnly"
    >
      <el-checkbox v-for="(item, index) in selections" :label="item.value" :key="`check_group_selection_${index}`">{{item.label}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
import VModelMixin from '../../../mixins/fd-mixin'

export default {
  name: 'FdCheckboxGroup',
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
  },

  mounted () {

  },

  data () {
    return {
      data: ''
    }
  },

  methods: {
    
  }
}
</script>
<style lang="scss" scoped>

</style>
