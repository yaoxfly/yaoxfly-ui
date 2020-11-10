<script>
import UeInput from './UeInput'
import UeSwitch from './UeSwitch'
import UeRadio from './UeRadio'
import UeSelect from './UeSelect'
import UeCommonGroup from './UeCommonGroup'
import UeChildrenConfig from './UeChildrenConfig'
import CodeEditor from './code-editor'
import ueSelfSetter from './ue-self-setter'

import { chartConfigFormTreeBuilder } from './utils/chart-config-form-tree-builder'
import { buildReder, buildChartForm } from './utils/build-chart-form-config-render'

import { mapMutations, mapState } from 'vuex'
import { getPropertyDataFromNestObj } from '../../../../lib/utils'

export default {
  name: 'ConfigForm',
  components: {
    UeInput,
    UeSwitch,
    UeRadio,
    UeCommonGroup,
    UeSelect,
    UeChildrenConfig,
    CodeEditor,
    // 引用自身
    ueSelfSetter
  },
  props: {
    // 图表表单配置
    config: {
      type: Object,
      default: () => ({})
    },
    root: {
      type: String,
      default: null
    },
    // 不显示的formPropertyName
    dontShow: {
      type: Object,
      default: () => ({})
    },
    labelPosition: {
      type: String,
      default: ''
    },
    isUpdateGlobal: {
      // 用于更新全局配置对象
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: String,
      default: '100px'
    }
  },
  data () {
    return {
      formTree: null,
      form: {},
      activeNames: [],
      // 表单项隐藏对象
      hide: {},
      // 表单项禁止输入对象
      disabled: {},
      // configKeys 例如系列 需要通过一个下拉框来确定配置哪个系列的控制对象
      configKeysSelectorValueDic: {},
      // 刷新页面
      refreshRender: false
    }
  },
  computed: {
    ...mapState({
      // 当前点击的图表配置
      activateItem: state => state.FormDesign.activateItem,
      global: state => state.FormDesign.global
    })
  },
  created () {
    this.init()
  },
  watch: {
    config () {
      this.init()
    }
  },
  methods: {
    ...mapMutations({
      // 在vuex 的 mutation 中执行事件的命令
      updateFormItemConfig: 'FormDesign/UPDATE_FORM_ITEM_CONFIG'
    }),
    init () {
      // 构建配置树
      this.formTree = chartConfigFormTreeBuilder(this.config, this.root)
      // 构建配置表单
      const configKeysSelectorValueDic = {}
      buildChartForm(this.formTree, '', this.form, this.activeNames, this.activateItem, configKeysSelectorValueDic)
      // 解决render渲染的页面数据变更不响应的问题
      for (const key in configKeysSelectorValueDic) {
        this.$set(this.configKeysSelectorValueDic, key, configKeysSelectorValueDic[key])
      }
    },
    getFormFieldData (formPropertyName) {
      const curChartOptions = this.isUpdateGlobal ? this.global : this.activateItem
      /**
       * 从chart配置对象中读取某个字段的值
       */
      return getPropertyDataFromNestObj(curChartOptions, formPropertyName)
    },
    /**
     * 更新表单
     */
    commitUpdate (formPropertyName, value, oldValue, canRedo) {
      const p = {
        fieldName: formPropertyName,
        value,
        oldValue,
        isUpdateGlobal: this.isUpdateGlobal
      }
      if (!this.isUpdateGlobal) {
        p.formItemKey = this.activateItem.key
      }
      this.updateFormItemConfig(p)
      if (canRedo) {
        this.$emit('update-success', { formPropertyName, value })
      }
    },
    // 外部设置数据
    setData (data) {

    },
    // 设置节点隐藏状态
    setFormItemHideStatus (parentKey, isDisabled) {
      // 闭包 用于拼接出需要的key值
      const _this = this
      // status 为true隐藏 false显示
      return (key, status, activateItem) => {
        _this.$nextTick(() => {
          _this.$set(isDisabled ? _this.disabled : _this.hide, parentKey + '.' + key, status)
        })
      }
    },
    // 设置用户的选择configKey
    setSelectedConfigKey (configKey, value) {
      this.$set(this.configKeysSelectorValueDic, configKey, `${value}`)
    }
  },
  render: function (h) {
    return h('div', { class: 'ue-chart-config' }, [
      // h('div', { style: { color: 'blue' }}, JSON.stringify(this.form)),
      buildReder(h, this, this.formTree)
      // h('div', { style: { color: 'red' }}, JSON.stringify(this.configKeysSelectorValueDic))
    ])
  }
}
</script>

<style lang="scss">
.ue-chart-config {
  .ue-component-wrapper {
    padding: 0 5px;
  }
  width: 100%;
  .el-form-item {
    margin-bottom: 0px;
  }
  .title, .el-collapse-item__header {
    font-weight: 700;
    color: #383838;
    font-size: 14px;
    // line-height: 1.2;
  }
  .title {
    display: block;
    margin-top: 5px;
  }
  $lineHeight: 38px;
  .el-collapse-item__header {
    padding: 0 0 0 14px;
    border-left: #2296F3 .25rem solid;
    height: $lineHeight;
    line-height: $lineHeight;
  }
  .el-collapse-item__content{
    margin: 12px;
    padding-bottom: 0;
  }
  .el-collapse{
    border: none;
  }
}
</style>
