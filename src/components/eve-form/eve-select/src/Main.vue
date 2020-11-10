<!--
* @Author: xjd
* @Description: 下拉框的封装
* @Date: 2020-10-20
-->
<template>
  <div class="eve-select">
    <el-select
      v-model="curValue"
      :size="size"
      style="width: 100%"
      :disabled="disabled"
      :placeholder="placeholder"
      :clearable="clearable"
      :multiple="multiple"
      filterable
    >
      <el-option
        v-for="(item, index) in selections"
        :key="`el_ue_option_${index}`"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>
<script>
import VModelMixin from '../../eve-form-mixin'

export default {
  name: 'EveSelect',
  mixins: [
    VModelMixin
  ],
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    selections: {
      type: Array,
      default: () => []
    },
    clearable: {
      type: Boolean,
      default: false
    },
    isRemote: {
      type: Boolean,
      default: false
    },
    remoteApi: {
      type: String,
      default: ''
    },
    // 能否多选
    multiple: {
      type: Boolean,
      default: false
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
