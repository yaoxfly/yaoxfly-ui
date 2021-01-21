<!--
* @Author: xjd
* @Description: 下拉框的封装
* @Date: 2020-10-20
-->
<script>
import VModelMixin from '../../../mixins/fd-mixin'

export default {
  name: 'FdSlotComp',
  mixins: [
    VModelMixin
  ],
  data() {
    return {
    }
  },
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    style: {
      type: Object,
      default: () => ({})
    },
    // 组件名称
    compName: {
      type: String,
      default: ''
    }
  },
  methods: {
    onClick () {}
  },
  render: function(h) {
    if (!this.compName || this.inConfigPanel) {
      return h('div', '自定义组件插槽')
    }
    return h(this.compName, {
      style: this.style,
      props: {
        value: this.curValue,
        ...this.props,
        placeholder: '请输入'
      },
      on: {
        input: (v) => {
          this.curValue = v
        }
      }
    })
  }
}
</script>