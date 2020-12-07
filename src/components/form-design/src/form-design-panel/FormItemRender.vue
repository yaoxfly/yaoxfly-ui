<script>
import FormCompsMixin from '../mixins/form-comps-mixin'

export default {
  mixins: [
    FormCompsMixin
  ],
  // Props 是可选的
  props: {
    formItemConfig: {
      type: Object,
      required: true
    },
    global: {
      type: Object,
      required: true
    },
    isLayoutChild: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeName: '-'
    }
  },
  watch: {
    formItemConfig: {
      deep: true,
      handler: function() {
        this.setActiveName()
      }
    }
  },
  created() {
    this.setActiveName()
  },
  methods: {
    setActiveName() {
      if (this.formItemConfig.comp === 'el-tabs') {
        const children = this.formItemConfig.children
        if (children.length > 0) {
          this.activeName = children[0].props.name
        }
      }
    }
  },
  render: function(h) {
    // ...
    const { comp, props, category } = this.formItemConfig
    const rProps = {
      ...props,
      notRequest: true,
      inConfigPanel: true
    }
    if (category === 'input' && !this.isLayoutChild) {
      // 组件用通用设置
      const { size } = this.formItemConfig.elFormItem || {}
      // const props = formItem.props
      if (size) {
        rProps.size = size
      } else {
        rProps.size = this.global.common.size
      }
      rProps.value = props.multiple ? [] : null
      rProps.formData = {}
    } else if (category === 'layout') {
      if (comp === 'el-tabs') {
        rProps.value = this.activeName
      }
    }
    return h(comp, {
      props: rProps
    }, this.$slots.default)
  }
}
</script>
