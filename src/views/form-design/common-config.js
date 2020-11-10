// 通用配置 例如显示隐藏
export const common = {
  // 显示隐藏的脚本
  fieldShowScript: `\
function show (data) {
  return true
}`
}

export const commonConfig = {
  common: {
    fieldShowScript: {
      configName: '显示条件',
      component: 'code-editor',
      mode: 'text/javascript',
      type: 'String',
      // 注释
      comment: `\
/**
 * form是当前表单的数据对象
 * 当 s 字段等于 1 时显示当前表单项可以这样写
 * return form.s === 1
 */`
    }
  }
}

// 通用非布局组件配置
export const elFormItem = {
  formItemLabel: '',
  labelWidth: 0,
  isRequired: false,
  fieldName: '',
  size: '',
  // 自定义校验函数
  diyValidator: 
`\
function validator (form, callback) {
  callback()
}`,
  // 默认值
  defaultValue: null
}

export const elFormItemConfig = {
  elFormItem: {
    formItemLabel: {
      configName: '字段标签',
      component: 'ue-input',
      type: 'String',
      maxlength: 200
    },
    labelWidth: {
      configName: '标签宽度',
      component: 'ue-input',
      type: 'Number',
      min: 0,
      max: 350,
      step: 1
    },
    fieldName: {
      configName: '对应字段',
      component: 'ue-input',
      type: 'String',
      maxlength: 200
    },
    size: {
      configName: '组件尺寸',
      component: 'ue-select',
      type: 'String',
      clearable: true,
      selections: [
        { label: '默认', value: 'medium' },
        { label: '小', value: 'small' },
        { label: 'mini', value: 'mini' }
      ]
    },
    isRequired: {
      configName: '是否必填',
      component: 'ue-switch',
      type: 'Boolean'
    },
    diyValidator: {
      configName: '自定义校验函数',
      component: 'code-editor',
      type: 'String',
      mode: 'text/javascript',
      // 注释
      comment: `\
/**
 * 如果数据中s1的字段值是1校验通过，否则校验失败
 * if (form.s1 == 1) {
 *  callback()
 * } else {
 *  callback(new Error('校验错误!'))
 * }
 * @param {*} form 当前表单的数据对象
 * @param {*} callback 
 */`
    },
    // 设置默认值
    defaultValue: {
      configName: '默认值',
      component: 'ue-self-setter',
    }
  }
}