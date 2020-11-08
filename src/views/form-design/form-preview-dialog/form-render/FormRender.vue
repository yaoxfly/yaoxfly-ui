<script>
import { visitFormItem, buildRender } from './util'

export default {
  props: {
    formConfig: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      form: {},
      rules: {}
    }
  },
  computed: {
    global () {
      return this.formConfig.global
    },
    formItemConfigs () {
      return this.formConfig.formItemConfigs
    }
  },
  created () {
    const form = {}
    const rules = {}
    visitFormItem(this.formItemConfigs, form, rules, this)
    this.form = form
    this.rules = rules
  },
  render: function (h) {
    const props = {
      labelWidth: `${this.global.common.labelWidth}px`,
      labelPosition: this.global.common.labelPosition,
      rules: this.rules
    }
    return h('el-form', {
      props
    }, [
      h('div', JSON.stringify(this.rules)),
      ...buildRender(h, this.formItemConfigs, this)
    ])
  },
  methods: {
    getFormInstance () {
      return this.$children[0]
    }
  }
}
</script>