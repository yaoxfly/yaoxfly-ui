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
    if (!this.compName) {
      return h('div', '组件名称')
    }
    return h('div', {
      class: 'slot-render'
    }, [
      h(this.compName, {
        value: this.curValue,
        props: {
          ...this.props
        },
        on: {
          input: (v) => {
            this.curValue = v
          }
        }
      })
    ])
  }
}
</script>