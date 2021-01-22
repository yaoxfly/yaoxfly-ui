import _ from 'lodash'

// 组件解析函数对象
export default {
  /**
   *  [{
   *    name: 'prop名称',
   *    isBasicJsType: '配置值是否是js变量名或者是 布尔值 | 数字 | undefined | null',
   *    notNull: '表示该配置项如果为空值就不添加到prop字符串中可选值 true 或 false',
   *    isUpdate: 主要提供给像地区选择器这种需要多个字段的组件使用，是否需要为该属性添加更新事件,
   *    key: 有的prop不是按name在配置文件中命名的。。。
   *    isCurrentFormItem: 有时需要传入当前项配置
   * }]
   * @param {*} h
   * @param {*} instance
   * @param {*} vueNodeConfig 节点数据
   * @param {*} formPropertyName 表单字段名称
   */
  'ue-input': (h, instance, vueNodeConfig, formPropertyName, parentKey) => {
    const componentProps = [
      {
        name: 'type'
      },
      {
        name: 'min',
        isBasicJsType: true
      },
      {
        name: 'max',
        isBasicJsType: true,
        notNull: true
      },
      {
        name: 'rows',
        isBasicJsType: true,
        notNull: true
      },
      {
        name: 'autoNumber',
        isBasicJsType: true
      },
      {
        name: 'placeholder',
        notNull: true
      }
    ]
    if (vueNodeConfig.type === 'Number') {
      if (vueNodeConfig.step) {
        componentProps.push({
          name: 'step',
          isBasicJsType: true
        })
        componentProps.push({
          // 数值精度
          name: 'precision',
          isBasicJsType: true
        })
      }
    } else {
      if (vueNodeConfig.maxlength) {
        componentProps.push(
          {
            name: 'maxlength',
            isBasicJsType: true
          })
      }
    }
    return buildFormItemRender(h, instance, formPropertyName, vueNodeConfig, componentProps, parentKey, {})
  },
  'ue-radio': (h, instance, vueNodeConfig, formPropertyName, parentKey) => {
    const componentProps = [
      {
        name: 'selections',
        isBasicJsType: true
      }
    ]
    return buildFormItemRender(h, instance, formPropertyName, vueNodeConfig, componentProps, parentKey, {})
  },
  'ue-switch': (h, instance, vueNodeConfig, formPropertyName, parentKey) => {
    const componentProps = [
      {
        name: 'activeValue',
        isBasicJsType: true,
        notNull: true
      },
      {
        name: 'inactiveValue',
        isBasicJsType: true,
        notNull: true
      },
      {
        name: 'mode',
        isBasicJsType: true
      },
      {
        name: 'label',
        isBasicJsType: true
      }
    ]
    return buildFormItemRender(h, instance, formPropertyName, vueNodeConfig, componentProps, parentKey, {})
  },
  'ue-color-picker': (h, instance, vueNodeConfig, formPropertyName, parentKey) => {
    const componentProps = [
      {
        name: 'preDefineColors',
        isBasicJsType: true
      },
      {
        name: 'needAuto',
        isBasicJsType: true
      }
    ]
    return buildFormItemRender(h, instance, formPropertyName, vueNodeConfig, componentProps, parentKey, {})
  },
  // 下拉框
  'ue-select': (h, instance, vueNodeConfig, formPropertyName, parentKey) => {
    const componentProps = [
      {
        name: 'selections',
        isBasicJsType: true
      },
      {
        name: 'clearable',
        isBasicJsType: true
      },
      {
        name: 'multiple',
        isBasicJsType: true
      },
      {
        name: 'mode'
      },
      {
        name: 'btnLabel'
      }
    ]
    return buildFormItemRender(h, instance, formPropertyName, vueNodeConfig, componentProps, parentKey, {})
  },
  // 颜色盘
  'ue-color-plate': (h, instance, vueNodeConfig, formPropertyName, parentKey) => {
    const componentProps = []
    return buildFormItemRender(h, instance, formPropertyName, vueNodeConfig, componentProps, parentKey, {})
  },
  'ue-tab-config-table': (h, instance, vueNodeConfig, formPropertyName, parentKey) => {
    const componentProps = []
    return buildFormItemRender(h, instance, formPropertyName, vueNodeConfig, componentProps, parentKey, {})
  },
  'ue-size-range': (h, instance, vueNodeConfig, formPropertyName, parentKey) => {
    const componentProps = [
      { name: 'minLabel' },
      { name: 'maxLabel' },
      { name: 'type' },
      { name: 'inputType' }
    ]
    return buildFormItemRender(h, instance, formPropertyName, vueNodeConfig, componentProps, parentKey, {})
  },
  // 开启词云
  'ue-word-cloud-rotation': (h, instance, vueNodeConfig, formPropertyName, parentKey) => {
    const componentProps = [
      {
        name: 'trueValue',
        isBasicJsType: true,
        notNull: true
      },
      {
        name: 'falseValue',
        isBasicJsType: true,
        notNull: true
      }
    ]
    return buildFormItemRender(h, instance, formPropertyName, vueNodeConfig, componentProps, parentKey, {})
  },
  'ue-rich-editor': (h, instance, vueNodeConfig, formPropertyName, parentKey) => {
    const componentProps = []
    return buildFormItemRender(h, instance, formPropertyName, vueNodeConfig, componentProps, parentKey, {})
  },
  'ue-color-stops': (h, instance, vueNodeConfig, formPropertyName, parentKey) => {
    const componentProps = [
      { name: 'startLabel' },
      { name: 'stopLabel' }
    ]
    return buildFormItemRender(h, instance, formPropertyName, vueNodeConfig, componentProps, parentKey, {})
  },
  // 标签模板编辑器
  'ue-chart-text-format-editor': (h, instance, vueNodeConfig, formPropertyName, parentKey) => {
    const componentProps = [
      {
        name: 'templateVars',
        isBasicJsType: true
      }
    ]
    return buildFormItemRender(h, instance, formPropertyName, vueNodeConfig, componentProps, parentKey, {})
  },
  // 过滤组件通用配置
  'ue-filter-comp-config': (h, instance, vueNodeConfig, formPropertyName, parentKey) => {
    const componentProps = [
      { name: 'notFilterComp', isBasicJsType: true, notNull: true }
    ]
    return buildFormItemRender(h, instance, formPropertyName, vueNodeConfig, componentProps, parentKey, {})
  },
  'ue-chart-interaction-config': (h, instance, vueNodeConfig, formPropertyName, parentKey) => {
    const componentProps = [
    ]
    return buildFormItemRender(h, instance, formPropertyName, vueNodeConfig, componentProps, parentKey, {})
  },
  'ue-children-config': (h, instance, vueNodeConfig, formPropertyName, parentKey) => {
    const componentProps = [
      { name: 'childFormConfig', isBasicJsType: true },
      { name: 'childPropName' },
      { name: 'formPropertyName', value: formPropertyName },
      { name: 'childOriginalTemplate', isBasicJsType: true },
      { name: 'noRandom', isBasicJsType: true },
      { name: 'label' }
    ]
    return buildFormItemRender(h, instance, formPropertyName, vueNodeConfig, componentProps, parentKey, {})
  },
  'code-editor': (h, instance, vueNodeConfig, formPropertyName, parentKey) => {
    const componentProps = [
      { name: 'mode', isBasicJsType: true },
      // 注释
      { name: 'comment', isBasicJsType: true },
      { name: 'btnLabel', isBasicJsType: true, notNull: true }
    ]
    return buildFormItemRender(h, instance, formPropertyName, vueNodeConfig, componentProps, parentKey, {})
  },
  'ue-self-setter': (h, instance, vueNodeConfig, formPropertyName, parentKey) => {
    const componentProps = []
    return buildFormItemRender(h, instance, formPropertyName, vueNodeConfig, componentProps, parentKey, {})
  }
}

/**
 *
 * @param {*} h
 * @param {*} vueNodeConfig 当前输入项配置 vueNodeConfig
 * @param {*} instance 实例
 * @param {*} componentProps 组件配置
 * @param {*} useLabelWidth 是否使用formItem的label
 * @param {*} parentKey 父节点key值
 * events 事件
 * slots 插槽
 */
function buildFormItemRender (h, instance, formPropertyName, vueNodeConfig, componentProps, parentKey, events) {
  const { props, updateEvts } = parseProps(vueNodeConfig, componentProps, instance)
  const style = {
    width: '100%'
  }
  return h(vueNodeConfig.component, {
    props: {
      // 默认值不能直接通过等于号赋值给数据对象 也不能通过vue实例的$set方法进行赋值，后者会造成render的无限更新
      value: instance.getFormFieldData(formPropertyName),
      ...props,
      // 在单选输入域中只有被选中的输入项才可以进行数据输入
      disabled: instance.disabled[formPropertyName]
    },
    style,
    on: {
      input: function (value) {
        if (vueNodeConfig.type === 'Number') {
          value = value || 0
        }
        const temp = instance.getFormFieldData(formPropertyName)
        // 是否需要提交更新 抑制初始化时提交mutation
        // 自动适应的值 auto 是字符串不需要 Number化
        let oldValue = null
        // vueNodeConfig.type === 'Number' ? Number(temp) : temp
        if (vueNodeConfig.type === 'Number' && temp !== 'auto') {
          oldValue = Number(temp)
        } else {
          oldValue = temp
        }
        // oldValue为空表示是初始化
        const haveToCommitUpdate = (`${temp}` !== 'null' && typeof temp !== 'undefined') || formPropertyName === 'elFormItem.defaultValue'
        instance.$set(instance.form, formPropertyName, value)
        // 设置显示隐藏
        if (vueNodeConfig.hideOther) {
          if (_.isString(vueNodeConfig.hideFunction)) {
            // eslint-disable-next-line no-eval
            vueNodeConfig.hideFunction = eval(`(false || function () { return ${vueNodeConfig.hideFunction} })()`)
          }
          vueNodeConfig.hideFunction(value, instance.setFormItemHideStatus(parentKey), instance.getOtherKeyValue(parentKey))
        }
        // 设置禁用
        vueNodeConfig.disableOther && vueNodeConfig.disableFunction(value, instance.setFormItemHideStatus(parentKey, true), instance.getOtherKeyValue(parentKey))
        if (haveToCommitUpdate) {
          // 只有新值与旧值不相等才需要放到撤回栈中
          instance.commitUpdate(formPropertyName, value, oldValue, oldValueNotEqualsValue(oldValue, value))
        }
      },
      blur: function () {
        instance.$emit('on-blur', formPropertyName, instance.form[formPropertyName])
      },
      ...events,
      ...updateEvts
    }
  })
}

// 数值判断是否相等
function oldValueNotEqualsValue (oldValue, value) {
  let isNotEqual = false
  if (_.isArray(oldValue)) {
    if (oldValue.length !== value.length) {
      return true
    } else {
      for (let i = 0; i < oldValue.length; i++) {
        if (oldValueNotEqualsValue(oldValue[i], value[i])) {
          isNotEqual = true
          break
        }
      }
    }
  } else if (_.isObject(oldValue)) {
    if (!value) {
      return true
    }
    for (const key in oldValue) {
      if (oldValueNotEqualsValue(oldValue[key], value[key])) {
        isNotEqual = true
        break
      }
    }
  } else {
    isNotEqual = oldValue !== value
  }
  return isNotEqual
}

/**
 *
 * @param {*} vueNodeConfig 当前组件配置项
 * @param {*} componentProps 组件props配置
 * [{
 *  name: 'prop名称',
 *  isBasicJsType: '配置值是否是js变量名或者是 布尔值 | 数字 | undefined | null',
 *  notNull: '表示该配置项如果为空值就不添加到prop字符串中可选值 true 或 false',
 *  isUpdate: 主要提供给像地区选择器这种需要多个字段的组件使用，是否需要为该属性添加更新事件,
 *  key: 有的prop不是按name在配置文件中命名的。。。
 *  isCurrentFormItem: 有时需要传入当前项配置
 * }]
 * @param {*} formPropertyName 组件对应的表单字段名称
 */
function parseProps (vueNodeConfig, componentProps, instance, formPropertyName) {
  const props = {}
  const updateEvts = {}
  for (const i in componentProps) {
    const { name, value, isBasicJsType, notNull, isUpdate, key, isCurrentFormItem } = componentProps[i]
    let p = value || instance.form[formPropertyName] || vueNodeConfig[key || name]
    if (isCurrentFormItem) {
      p = vueNodeConfig
    }
    if (notNull && (p === undefined || p === null)) {
      continue
    }
    if (!isBasicJsType) {
      props[name] = `${p}`
    } else {
      props[name] = p
    }
    // 如果是需要update的属性 那么它存在于数据对象上
    if (isUpdate) {
      props[name] = instance.form[p]
    }
    // 添加更新事件的前提是有值
    if (p && isUpdate) {
      updateEvts['update:' + name] = (evt) => {
        instance.form[p] = evt
      }
    }
  }
  // 全局表单不可编辑
  if (instance.disabledAll) {
    props.disabled = true
  }
  if (vueNodeConfig.disabled) {
    props.disabled = true
  }
  return { props, updateEvts }
}
