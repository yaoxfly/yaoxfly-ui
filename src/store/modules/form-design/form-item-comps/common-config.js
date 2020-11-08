// 通用配置
export const elFormItem = {
  formItemLabel: '',
  labelWidth: 0,
  isRequired: false,
  fieldName: ''
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
    isRequired: {
      configName: '是否必填',
      component: 'ue-switch',
      type: 'Boolean'
    },
    fieldName: {
      configName: '对应字段',
      component: 'ue-input',
      type: 'String',
      maxlength: 200
    }
  }
}