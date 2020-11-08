<script>
export default {
  // Props 是可选的
  props: {
    formItemConfig: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: function (h) {
    // ...
    const { comp, props } = this.formItemConfig
    return h(comp, {
      props: {
        ...props,
        value: props.multiple ? [] : null
      }
    }, this.$slots.default)
  }
}
</script>
