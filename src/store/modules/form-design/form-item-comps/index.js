import { inputCompProps, inputCompPropsForm } from './form-item-props/eve-input-props'
import { selectProps, selectPropsForm } from './form-item-props/eve-select-props'
import { elRow, elRowFormConfig } from './form-layout-item-props/el-row'

export const commonComps = [
  {
    comp: 'eve-input',
    label: '输入框',
    id: '100001',
    props: inputCompProps.props
  },
  {
    comp: 'eve-select',
    label: '下拉框',
    id: '100002',
    props: selectProps.props,
    triggerUseChange: true
  }
]
export const layoutComps = [
  {
    comp: 'el-row',
    label: '栅格',
    id: '200002',
    category: 'layout',
    props: elRow.props,
    children: elRow.children
  }
]
export const formItemPropsForms = {
  'eve-input': inputCompPropsForm,
  'eve-select': selectPropsForm,
  'el-row': elRowFormConfig
}