<template>
  <div>
    <eve-tree
      :data="data"
      :show-checkbox="showCheckbox"
      :props="props"
      :node-key="nodeKey"
      :highlight-current="highlightCurrent"
      :width="width"
      :only-leaf="onlyLeaf"
      :operate="operate"
      :operate-color="operateColor"
      :is-show-filter="isShowFilter"
    ></eve-tree>
  </div>
</template>

<script>
export default {
  name: 'FdTree',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    showCheckbox: {
      type: Boolean,
      default: () => false
    },
    props: {
      type: Object,
      default: () => { }
    },
    nodeKey: {
      type: String,
      default: () => ''
    },
    highlightCurrent: {
      type: Boolean,
      default: () => true
    },
    width: {
      type: [String, Number],
      default: () => '100%'
    },
    onlyLeaf: {
      type: Boolean,
      default: () => true
    },
    operate: {
      type: Boolean,
      default: () => true
    },
    operateColor: {
      type: String,
      default: () => ''
    },
    isShowFilter: {
      type: Boolean,
      default: () => true
    }
  },

  data () {
    return {}
  },
}
</script>

<style lang="scss" scoped>
</style>
