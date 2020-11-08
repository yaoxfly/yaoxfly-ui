<script>
export default {
  props: {
    formItemConfig: {
      type: Object,
      required: true
    }
  },
  render: function (h) {
    const { comp, category, props } = this.formItemConfig
    if (category === 'layout') {
      return h(comp, {
        props
      }, this.$slots.default)
    } else {
      const formItemProps = {}
      const {
        elFormItem
      } = this.formItemConfig
      if (elFormItem.labelWidth) {
        formItemProps.labelWidth = `${elFormItem.labelWidth}px`
      }
      return h('el-form-item', {
        props: formItemProps
      }, h(comp))
    }
  }
}
</script>