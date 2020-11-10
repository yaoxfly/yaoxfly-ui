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
    if (!curCompCanShow(formItem, instance)) {
      // 当前组件不能展示
      clearFormDataByFormItem(formItem, instance)
      return
    }
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
      const theProps = {
        ...formItem.props
      }
      if (formItem.comp === 'el-tabs') {
        theProps.value = instance.tabsActiveNameDic[formItem.key]
      }
      renders.push(h(formItem.comp, { props: theProps }, childrenRenders))
    } else {
      /**
       * 非布局组件
       */
      const formItemProps = setFormItemProps(formItem, instance)
      renders.push(
        h('el-form-item', {
          props: formItemProps
        }, [
          setEveCompProps(h, formItem, instance)
        ])
      )
    }
  })
  return renders
}

/**
 * 当前表单组件能否显示
 * @param {*} formItem 
 */
function curCompCanShow (formItem, instance) {
  const { common } = formItem
  // console.log(common, ' common')
  try {
    const funcStr = common.fieldShowScript
    // eslint-disable-next-line no-eval
    return eval(`(false || function () { return ${funcStr} })()`)(instance.form)
  } catch (e) {
    console.error(e)
    instance.$message.error(`[${formItem.key}] 组件显示 脚本设置异常`)
    return false
  }
}

/**
 * 如果当前组件不能显示，那就需要清空当前表单项
 * 布局组件要清空当前布局组件下所有表单项的字段值
 * @param {*} formItem 
 * @param {*} instance 
 */
function clearFormDataByFormItem (formItem, instance) {
  const { category } = formItem
  if (category !== 'layout') {
    const { fieldName } = formItem.elFormItem || {}
    delete instance.form[fieldName]
  } else {
    const { children } = formItem
    children.forEach((childComp, idx) => {
      /**
       * 子组件配置
       */
      const { comps } = childComp
      /**
       * 递归解析当前子布局组件下的所有组件
       */
      comps.forEach(compItem => clearFormDataByFormItem(compItem, instance))
    })
  }
}

/**
 * 设置el-form 下的 el-form-item 的 配置的组件的属性
 * @param {*} h 
 * @param {*} formItem 
 * @param {*} instance 
 */
function setEveCompProps (h, formItem, instance) {
  const { fieldName, size } = formItem.elFormItem || {}
  const props = formItem.props
  if (size) {
    props.size = size
  } else {
    props.size = instance.global.common.size
  }
  return h(formItem.comp, {
    props: {
      ...props,
      value: instance.form[fieldName],
      formData: instance.form
    },
    on: {
      input: (value) => {
        instance.handleInput(fieldName, value, { formItem })
      }
    }
  })
}

/**
 * 
 * @param {*} formItem 
 * @param {*} instance 
 */
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
      if (formItem.comp === 'el-tabs') {
        instance.$set(instance.tabsActiveNameDic, formItem.key, '-')
        if (children.length > 0) {
          instance.$set(instance.tabsActiveNameDic, formItem.key, children[0].props.name)
        }
      }
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
      const { fieldName, isRequired, formItemLabel, diyValidator, defaultValue } = formItem.elFormItem || {}
      if (fieldName) {
        // form[fieldName] = getEmpytValue(formItem.props)
        const v = getEmpytValue(formItem.props)
        const trigger = _.isArray(v) || formItem.triggerUseChange ? 'change' : 'blur'
        instance.$set(form, fieldName, defaultValue || v)
        const rulesArr = []
        if (isRequired) {
          rulesArr.push(
            {
              required: true,
              validator: (rule, v, callback) => {
                const value = instance.form[fieldName]
                let isEmpyt = false
                // 日期类型的数据非空校验
                if (_.isArray(value) || _.isObject(value)) {
                  isEmpyt = _.isEmpty(value)
                } else {
                  isEmpyt = !value
                }
                if (isEmpyt) {
                  callback(new Error(`${formItemLabel}不能为空！`))
                } else {
                  callback()
                }
              },
              trigger
            }
          )
        }
        rulesArr.push(
          {
            validator: (rule, v, callback) => {
              if (diyValidator) {
                try {
                  const funcStr = diyValidator
                  // eslint-disable-next-line no-eval
                  eval(`(false || function () { return ${funcStr} })()`)(instance.form, callback)
                } catch (e) {
                  console.error(e)
                  callback(new Error('自定义校验函数脚本设置异常!'))
                  instance.$message.error(`[${formItem.key}] 组件自定义校验函数 脚本设置异常!`)
                }
              } else {
                callback()
              }
            },
            trigger
          }
        )
        instance.$set(rules, fieldName, rulesArr)
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