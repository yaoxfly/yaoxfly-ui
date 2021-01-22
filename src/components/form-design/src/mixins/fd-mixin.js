export default {
  props: {
    // 当前表单的数据
    formData: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: [String, Number, Object, Boolean, Array, Date]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * { label: '默认', value: 'medium' },
     * { label: '小', value: 'small' },
     * { label: 'mini', value: 'mini' }
     */
    size: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: ''
    },
    // 标识当前组件是在中间的拖拽面板或者在组件属性配置的默认值设置中使用
    isConfig: {
      type: Boolean,
      default: false
    },
    // 标识当前组件是在中间的拖拽面板
    inConfigPanel: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      curValue: null
    }
  },
  computed: {
    isDisabled () {
      return this.disabled || this.status === 'disabled'
    },
    isReadOnly () {
      return this.status === 'readOnly'
    }
  },
  watch: {
    value () {
      this.curValue = this.value
    },
    curValue () {
      this.$emit('input', this.curValue)
    }
  },
  created () {
    this.curValue = this.value
  }
}
