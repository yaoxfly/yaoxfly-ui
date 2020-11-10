export default {
  props: {
    value: {
      type: [String, Number, Object, Boolean, Array, Date]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ''
    },
    // 不进行请求 拖拽配置时
    notRequest: {
      type: Boolean,
      default: false
    },
    isConfig: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      curValue: null
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
