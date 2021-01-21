<script>
import { visitFormItem, buildRender } from './util'
import FormCompsMixin from '../../mixins/form-comps-mixin'

export default {
  mixins: [
    FormCompsMixin
  ],
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
      tabsActiveNameDic: {},
      // 各布局组件 key 到 下属字段名称的映射
      fieldNamesDic: {},
      remoteDataSetters: []
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
  mounted () {
    // console.log('mounted') // 子组件全部渲染完成后 再输出顺序 3
    this.$emit('form-render-mounted')
  },
  created () {
    // console.log('create') // 输出顺序 1
    this.init()
  },
  render: function (h) {
    // console.log('render') // 输出顺序 2
    const props = {
      labelWidth: `${this.global.common.labelWidth}px`,
      labelPosition: this.global.common.labelPosition,
      rules: this.rules,
      model: this.form
    }
    return h('el-form', {
      props
    }, buildRender(h, this.formItemConfigs, this, this.global.common.globalStatus))
  },
  methods: {
    init () {
      const form = {}
      const rules = {}
      const fieldNamesDic = {}
      visitFormItem(this.formItemConfigs, form, rules, this, null, fieldNamesDic)
      this.form = form
      this.rules = rules
      this.fieldNamesDic = fieldNamesDic
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
    // 设置表单数据
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
    },
    setRemoteDataSetter (setter) {
      this.remoteDataSetters.push(setter)
    },
    setRemoteData (params) {
      return new Promise((resolve, reject) => {
        const ps = []
        this.remoteDataSetters.forEach(setter => {
          // 当前扩展数据输入域对应的可输入项字段名称
          ps.push(new Promise(resolve => {
            setter.setRemoteData(params).then(data => {
              data && this.setFormData(data)
              resolve()
            })
          }))
        })
        if (ps.length > 0) {
          Promise.all(ps).then(rs => {
            resolve(this.form)
          })
        } else {
          resolve(this.form)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.eve-form-state-sign {
  &>label > span >span::after{
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0px;
    width: 100%;
    height: 3px;
    background: -webkit-linear-gradient(315deg, transparent, transparent 45%, #953039, transparent 55%, transparent 100%), -webkit-linear-gradient(45deg, transparent, transparent 45%, #953039, transparent 55%, transparent 100%);
    background-size: 4px 4px;
    background-repeat: repeat-x;
  }
  .eve-form-item-state::after{
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0px;
    width: 100%;
    height: 3px;
    background: -webkit-linear-gradient(315deg, transparent, transparent 45%, #953039, transparent 55%, transparent 100%), -webkit-linear-gradient(45deg, transparent, transparent 45%, #953039, transparent 55%, transparent 100%);
    background-size: 4px 4px;
    background-repeat: repeat-x;
  }
}
</style>