import { inputCompProps, inputCompPropsForm } from './form-item-props/eve-input-props'
import { selectProps, selectPropsForm } from './form-item-props/eve-select-props'
import { elRow, elRowFormConfig } from './form-layout-item-props/el-row'
import { ElTabs, ElTabsFormConfig } from './form-layout-item-props/el-tabs'
import { checkboxGroupProps, checkboxGroupPropsForm } from './form-item-props/eve-checkbox-group'
import { radioGroupProps, radioGroupPropsForm } from './form-item-props/eve-radio-group'
import { datePickerProps, datePickerPropsForm } from './form-item-props/eve-date-picker'
import { eveDiv, eveDivFormConfig } from './form-layout-item-props/eve-div'
import { eveLabelFormConfig, eveLabel } from './other-props/eve-label'
import { cascaderPropsForm, cascaderProps } from './form-item-props/eve-cascader'

/**
 * 普通输入组件
 */
export const commonComps = [
  {
    // 输入框在用户失焦时触发校验
    comp: 'eve-input',
    label: '输入框',
    id: '100001',
    category: 'input',
    props: inputCompProps.props
  },
  {
    comp: 'eve-select',
    label: '下拉框',
    id: '100002',
    category: 'input',
    props: selectProps.props,
    triggerUseChange: true
  },
  {
    comp: 'eve-checkbox-group',
    label: '多选框组',
    id: '100003',
    category: 'input',
    props: checkboxGroupProps.props,
    triggerUseChange: true
  },
  {
    comp: 'eve-radio-group',
    label: '单选框组',
    id: '100004',
    category: 'input',
    props: radioGroupProps.props,
    // 数据变更时触发 表单校验
    triggerUseChange: true
  },
  {
    comp: 'eve-date-picker',
    label: '日期选择器',
    id: '100005',
    category: 'input',
    props: datePickerProps.props,
    // 数据变更时触发 表单校验
    triggerUseChange: true
  },
  {
    comp: 'eve-cascader',
    label: '级联框',
    id: '100006',
    category: 'input',
    props: cascaderProps.props,
    triggerUseChange: true
  },
]
/**
 * 布局组件
 */
export const layoutComps = [
  {
    comp: 'el-row',
    label: '栅格',
    id: '200002',
    category: 'layout',
    props: elRow.props,
    children: elRow.children
  },
  {
    comp: 'el-tabs',
    label: '标签页',
    id: '200003',
    category: 'layout',
    props: ElTabs.props,
    children: ElTabs.children
  },
  {
    comp: 'eve-div',
    label: 'div',
    id: '200004',
    category: 'layout',
    props: eveDiv.props,
    children: eveDiv.children
  }
]
// 其他组件 装饰组件没有绑定字段的组件
export const otherComps = [
  {
    comp: 'eve-label',
    label: '标签',
    id: '300001',
    category: 'other',
    props: eveLabel.props
  }
]
export const formItemPropsForms = {
  'eve-input': inputCompPropsForm,
  'eve-select': selectPropsForm,
  'el-row': elRowFormConfig,
  'el-tabs': ElTabsFormConfig,
  'eve-radio-group': radioGroupPropsForm,
  'eve-checkbox-group': checkboxGroupPropsForm,
  'eve-date-picker': datePickerPropsForm,
  'eve-div': eveDivFormConfig,
  'eve-label': eveLabelFormConfig,
  'eve-cascader': cascaderPropsForm
}