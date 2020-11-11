/**
 * 引用自身的组件
 */
<script>
import VModelMixin from '../v-model-mixin'
import { mapState } from 'vuex'

export default {
  mixins: [VModelMixin],
  computed: {
    ...mapState({
      activateItem: state => state.FormDesign.activateItem,
      global: state => state.FormDesign.global
    })
  },
  created () {
    this.curValue = this.value
    if (!this.curValue && typeof this.curValue !== 'boolean') {
      this.curValue = this.activateItem.props.multiple ? [] : null
    }
  },
  render: function (h) {
    // ...
    const { comp, props } = this.activateItem
    const rProps = {
      ...props,
      value: this.curValue,
      // 抑制一些属性的设置
      size: 'small',
      disabled: false,
      editable: false,
      placeholder: '',
      pickerOptions: {},
      isConfig: true,
      status: 'enable',
      clearable: true
    }
    return h(comp === 'eve-radio-group' ? 'eve-select' : comp, {
      props: rProps,
      on: {
        input: (v) => {
          this.$emit('input', v)
          // this.curValue = v
        }
      }
    })
  }
}
</script>