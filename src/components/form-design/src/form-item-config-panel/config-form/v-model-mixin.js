export default {
  props: {
    value: {
      type: [String, Number, Object, Boolean, Array]
    },
    disabled: {
      type: Boolean,
      default: false
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
