export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: this.value,
      className: 'vertical-center-modal',
      headerStyle: {
        fontSize: '14px',
        fontWeight: 'bold',
        textAlign: 'left'
      },
      panelStyle: {
        margin: '20px',
        background: 'white'
      },
      headerClass: '',
      footerClass: '',
      footerStyle: {},
      dialogTop: '5vh'
    }
  },
  computed: {
    modalWidth () {
      return 1100
    }
  },
  watch: {
    value () {
      this.show = this.value
    },
    show () {
      this.$emit('input', this.show)
    }
  }
}
