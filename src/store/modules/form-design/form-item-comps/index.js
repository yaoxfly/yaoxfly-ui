import { inputCompProps, inputCompPropsForm } from './form-item-props/fd-input-props'
import { selectProps, selectPropsForm } from './form-item-props/fd-select-props'
import { elRow, elRowFormConfig } from './form-layout-item-props/el-row'
import { ElTabs, ElTabsFormConfig } from './form-layout-item-props/el-tabs'
import { checkboxGroupProps, checkboxGroupPropsForm } from './form-item-props/fd-checkbox-group'
import { radioGroupProps, radioGroupPropsForm } from './form-item-props/fd-radio-group'
import { datePickerProps, datePickerPropsForm } from './form-item-props/fd-date-picker'
import { eveDiv, eveDivFormConfig } from './form-layout-item-props/fd-div'
import { eveLabelFormConfig, eveLabel } from './other-props/fd-label'
import { cascaderPropsForm, cascaderProps } from './form-item-props/fd-cascader'
import { fdCard, fdCardFormConfig } from './form-layout-item-props/fd-card'

/**
 * 普通输入组件
 */
export const commonComps = [
  {
    // 输入框在用户失焦时触发校验
    comp: 'fd-input',
    label: '输入框',
    id: '100001',
    category: 'input',
    props: inputCompProps.props
  },
  {
    comp: 'fd-select',
    label: '下拉框',
    id: '100002',
    category: 'input',
    props: selectProps.props,
    triggerUseChange: true
  },
  {
    comp: 'fd-checkbox-group',
    label: '多选框组',
    id: '100003',
    category: 'input',
    props: checkboxGroupProps.props,
    triggerUseChange: true
  },
  {
    comp: 'fd-radio-group',
    label: '单选框组',
    id: '100004',
    category: 'input',
    props: radioGroupProps.props,
    // 数据变更时触发 表单校验
    triggerUseChange: true
  },
  {
    comp: 'fd-date-picker',
    label: '日期选择器',
    id: '100005',
    category: 'input',
    props: datePickerProps.props,
    // 数据变更时触发 表单校验
    triggerUseChange: true
  },
  {
    comp: 'fd-cascader',
    label: '级联框',
    id: '100006',
    category: 'input',
    props: cascaderProps.props,
    triggerUseChange: true
  }
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
    comp: 'fd-div',
    label: 'div',
    id: '200004',
    category: 'layout',
    props: eveDiv.props,
    children: eveDiv.children
  },
  {
    comp: 'fd-card',
    label: '卡片',
    id: '200005',
    category: 'layout',
    props: fdCard.props,
    children: fdCard.children
  }
]
// 其他组件 装饰组件没有绑定字段的组件
export const otherComps = [
  {
    comp: 'fd-label',
    label: '标签',
    id: '300001',
    category: 'other',
    props: eveLabel.props
  }
]
export const formItemPropsForms = {
  'fd-input': inputCompPropsForm,
  'fd-select': selectPropsForm,
  'el-row': elRowFormConfig,
  'el-tabs': ElTabsFormConfig,
  'fd-radio-group': radioGroupPropsForm,
  'fd-checkbox-group': checkboxGroupPropsForm,
  'fd-date-picker': datePickerPropsForm,
  'fd-div': eveDivFormConfig,
  'fd-label': eveLabelFormConfig,
  'fd-cascader': cascaderPropsForm,
  'fd-card': fdCardFormConfig
}
