import { vueClonedeep, setValue, getPropertyDataFromNestObj } from '../../../lib/utils'
import Vue from 'vue'

export default {
  // 表单配置更新事件
  UPDATE_FORM_ITEM_CONFIG: (state, { fieldName, value, isUpdateGlobal, formItemKey }) => {
    // 更新的是表单全局配置
    if (isUpdateGlobal) {
      setValue(state.global, fieldName, value)
    } else {
      // 更新的是组件配置
      if (state.activateItem && state.activateItem.key === formItemKey) {
        const formItem = state.activateItem
        setValue(formItem, fieldName, value)
      }
    }
  },
  COMMIT_FORM_ITEM_OPERATION: (state, { listName, index, type }) => {
    const list = getPropertyDataFromNestObj(state, listName)
    if (list) {
      if (type === 'delete') {
        // 删除事件，如果删除的是当前激活的项 清空当前激活项
        if (list[index].key === state.activateItem.key) {
          state.activateItem = null
        }
        list.splice(index, 1)
      } else if (type === 'clone') {
        // 复制一个表单项
        const cloned = vueClonedeep(list[index])
        // 设置新的key值
        let key = `form_field_${(Math.random() * 10 ** 5).toFixed(0)}`
        // 对于高级组件（大部分是布局组件）会加一个layout前缀
        if (cloned.category === 'layout') {
          key = 'layout_' + key
        } else {
          // newFormItem.fieldName = key
          cloned.elFormItem.fieldName = key
        }
        Vue.set(cloned, 'key', key)
        list.push(cloned)
      }
    }
  },
  /**
   * 数值更新
   */
  COMMIT_FORM_ITEMS_CONFIGS: (state, { listName, valueList }) => {
    setValue(state, listName, valueList)
  },
  /**
   * 添加表单项后对表单项进行初始设置
   */
  COMMIT_FORM_ITEM_INIT: (state, { element, index, list }) => {
    // 添加新的配置项
    const newFormItem = vueClonedeep(element)
    // 每一项的唯一编号，根据这个编号进行表单项的配置定位
    let key = `form_field_${(Math.random() * 10 ** 5).toFixed(0)}`
    // 对于高级组件（大部分是布局组件）会加一个layout前缀
    if (newFormItem.category === 'layout') {
      key = 'layout_' + key
    } else {
      // newFormItem.fieldName = key
      const elFormItem = vueClonedeep(state.elFormItem)
      elFormItem.formItemLabel = newFormItem.label
      elFormItem.fieldName = key
      Vue.set(newFormItem, 'elFormItem', elFormItem)
    }
    Vue.set(newFormItem, 'key', key)
    Vue.set(list, index, newFormItem)
    state.activateItem = newFormItem
  },
  COMMIT_USER_ACTIVE_ITEM: (state, formItem) => {
    state.activateItem = formItem
  },
  // 初始化表单全局设置
  INIT_GLOBAL: (state, global) => {
    state.global = vueClonedeep(global)
  }
}