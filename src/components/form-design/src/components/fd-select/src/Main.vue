<!--
* @Author: xjd
* @Description: 下拉框的封装
* @Date: 2020-10-20
-->
<template>
  <div class="eve-select">
    <el-select
      v-if="!isReadOnly"
      v-model="curValue"
      :size="size"
      style="width: 100%"
      :disabled="isDisabled"
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
    <template v-else>
      {{ selectionsDic[curValue] }}
    </template>
  </div>
</template>
<script>
import VModelMixin from '../../../mixins/fd-mixin'

export default {
  name: 'FdSelect',
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
  // 选项值到label的映射 isReadOnly 时用
  computed: {
    selectionsDic () {
      const dic = {}
      this.selections.forEach(item => {
        dic[item.value] = item.label
      })
      return dic
    }
  },
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>

</style>
