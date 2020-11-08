import _ from 'lodash'

/**
 * 根据配置渲染页面组件
 * @param {*} h render渲染函数
 * @param {*} formItemList 组件列表
 * @param {*} instance 页面实例
 */
export const buildRender = (h, formItemList, instance) => {
  const renders = []
  formItemList.forEach(formItem => {
    /**
     * comp: 组件类型
     * category 组件类型 layout 布局组件
     * props 当前组件的属性
     * elFormItem 表单属性配置
     */
    if (formItem.category === 'layout') {
      /**
       * children 子组件配置
       */
      const { children } = formItem
      const childrenRenders = []
      children.forEach((childComp, idx) => {
        /**
         * 子组件配置
         */
        const { comp, comps, props } = childComp
        /**
         * 递归解析当前子布局组件下的所有组件
         */
        const renders = buildRender(h, comps, instance)
        childrenRenders.push(
          h(comp, {
            props
          }, renders)
        )
      })
      renders.push(h(formItem.comp, { props: formItem.props }, childrenRenders))
    } else {
      /**
       * 非布局组件
       */
      const formItemProps = setFormItemProps(formItem, instance)
      renders.push(
        h('el-form-item', {
          props: formItemProps
        }, [
          setFormItemComp(h, formItem, instance)
        ])
      )
    }
  })
  return renders
}

/**
 * 设置
 * @param {*} h 
 * @param {*} formItem 
 * @param {*} instance 
 */
function setFormItemComp (h, formItem, instance) {
  const { fieldName } = formItem.elFormItem || {}
  return h(formItem.comp, {
    props: {
      ...formItem.props,
      value: instance.form[fieldName]
    }
  })
}

function setFormItemProps (formItem, instance) {
  const { labelWidth, formItemLabel, fieldName } = formItem.elFormItem || {}
  const formItemProps = {
    label: formItemLabel,
    prop: fieldName
  }
  if (labelWidth) {
    formItemProps.labelWidth = `${labelWidth}px`
  }
  return formItemProps
}

/**
 * 遍历所有表单项节点 构建表单 以及校验规则
 * @param {*} formItemList 
 */
export const visitFormItem = (formItemList, form, rules, instance) => {
  formItemList.forEach(formItem => {
    /**
     * comp: 组件类型
     * category 组件类型 layout 布局组件
     * props 当前组件的属性
     * elFormItem 表单属性配置
     */
    if (formItem.category === 'layout') {
      /**
       * children 子组件配置
       */
      const { children } = formItem
      children.forEach((childComp, idx) => {
        /**
         * 子组件配置
         */
        const { comps } = childComp
        /**
         * 递归解析当前子布局组件下的所有组件
         */
        visitFormItem(comps, form, rules, instance)
      })
    } else {
      /**
       * 非布局组件 字段名称
       */
      const { fieldName, isRequired, formItemLabel } = formItem.elFormItem || {}
      if (fieldName) {
        // form[fieldName] = getEmpytValue(formItem.props)
        const v = getEmpytValue(formItem.props)
        instance.$set(form, fieldName, v)
        if (isRequired) {
          instance.$set(rules, fieldName, [
            {
              required: true,
              validateor: (rule, value, callback) => {
                if (_.isEmpty(value)) {
                  callback(new Error(`${formItemLabel}不能为空！`))
                } else {
                  callback()
                }
              },
              trigger: _.isArray(v) || formItem.triggerUseChange ? 'change' : 'blur'
            }
          ])
        }
      }
    }
  })
}

/**
 * 当前项的空值
 * @param {*} props
 */
function getEmpytValue (props) {
  if (props.multiple) {
    return []
  } else {
    return null
  }
}