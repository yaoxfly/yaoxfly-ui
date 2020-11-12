<!--
* @Author: xjd
* @Description: 级联框的封装
* @Date: 2020-10-20
-->
<template>
  <div class="eve-cascader">
    <el-cascader
      v-if="!isReadOnly"
      v-model="curValue"
      :size="size"
      style="width: 100%"
      :disabled="isDisabled"
      :placeholder="placeholder"
      :clearable="clearable"
      :multiple="multiple"
      filterable
      :options="selections"
      :separator="readOnlySeperator"
    />
    <template v-else>
      {{ readOnlyValue }}
    </template>
  </div>
</template>
<script>
import VModelMixin from '../../fd-mixin'
import _ from 'lodash'

export default {
  name: 'FdCascader',
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
    },
    // 只读分隔符
    readOnlySeperator: {
      type: String,
      default: '/'
    }
  },
  // 选项值到label的映射 isReadOnly 时用
  computed: {
    selectionsDic () {
      const dic = {}
      this.setDic(this.selections, dic)
      return dic
    },
    readOnlyValue () {
      const v = []
      const arr = this.curValue || []
      arr.forEach(value => {
        v.push(this.selectionsDic[value])
      })
      return v.join(this.readOnlySeperator)
    }
  },
  methods: {
    setDic (list, dic) {
      if (_.isArray(list)) {
        list.forEach(item => {
          dic[item.value] = item.label
          if (item.children) {
            this.setDic(item.children, dic)
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
