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
      rules: {},
      // tab 标签页 保存每个标签页点击页的activeName
      tabsActiveNameDic: {}
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
    this.init()
  },
  render: function (h) {
    const props = {
      labelWidth: `${this.global.common.labelWidth}px`,
      labelPosition: this.global.common.labelPosition,
      rules: this.rules,
      model: this.form
    }
    return h('el-form', {
      props
    }, buildRender(h, this.formItemConfigs, this))
  },
  methods: {
    init () {
      const form = {}
      const rules = {}
      visitFormItem(this.formItemConfigs, form, rules, this)
      this.form = form
      this.rules = rules
    },
    // 获取表单实例对象
    getFormInstance () {
      return this.$children[0]
    },
    /**
     * fieldName 字段名称
     * value 值
     * parms: 其他参数对象
     */
    handleInput (fieldName, value, params) {
      this.$set(this.form, fieldName, value)
    },
    // 外部设置表单数据
    setFormData (value) {
      this.$nextTick(() => {
        for (const key in value) {
          this.$set(this.form, key, value[key])
        }
      })
    },
    // 校验
    validate (callback, noTip) {
      const valid = true
      if (this.getFormInstance().fields.length === 0) {
        // 没有表单项配置
        callback(valid)
      } else {
        this.getFormInstance().validate(valid => {
          if (!valid) {
            this.$message.error('数据校验未通过！')
          }
          callback(valid)
        })
      }
    },
    getData () {
      return this.form
    }
  }
}
</script>