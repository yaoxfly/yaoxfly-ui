import { commonComps, layoutComps, formItemPropsForms } from './form-item-comps'
import { elFormItemConfig, elFormItem } from './form-item-comps/common-config'

export default {
  // 用户点击的项
  activateItem: null,
  // 用户设计
  formItemConfigs: [],
  // 普通组件
  commonComps,
  // 布局组件
  layoutComps,
  // 各表单项配置表单对象
  formItemPropsForms,
  // 全局
  global: null,
  // elForm组件elFormItem子组件配置
  elFormItem,
  elFormItemConfig
}