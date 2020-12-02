export const inputCompProps = {
  props: {
    placeholder: '',
    inputType: 'text',
    rows: 1,
    min: 0,
    max: 200,
    step: 1,
    precision: 2,
    maxlength: 300
  }
}

export const inputCompPropsForm = {
  props: {
    placeholder: {
      configName: '输入框占位显示',
      type: 'String',
      component: 'ue-input',
      maxlength: 100
    },
    inputType: {
      type: 'String',
      configName: '输入框类型',
      component: 'ue-select',
      selections: [
        {
          value: 'text',
          label: '普通输入框'
        },
        {
          value: 'password',
          label: '密码'
        },
        {
          value: 'number',
          label: '数字输入框'
        },
        {
          value: 'textarea',
          label: '文本域'
        }
      ],
      hideOther: true,
      hideFunction: function (data, setFormItemHideStatus) {
        setFormItemHideStatus('rows', data !== 'textarea')
        // 数字输入框配置
        const numberKeys = ['min', 'max', 'step', 'precision']
        // 文本配置
        const textKeys = ['maxlength']
        if (data !== 'number') {
          numberKeys.forEach(k => setFormItemHideStatus(k, true))
          textKeys.forEach(k => setFormItemHideStatus(k, false))
        } else {
          numberKeys.forEach(k => setFormItemHideStatus(k, false))
          textKeys.forEach(k => setFormItemHideStatus(k, true))
        }
      }
    },
    rows: {
      type: 'Number',
      component: 'ue-input',
      configName: '行数',
      step: 1,
      min: 1,
      max: 200
    },
    min: {
      type: 'Number',
      component: 'ue-input',
      configName: 'min',
      step: 1,
      min: -99999,
      max: 99999
    },
    max: {
      type: 'Number',
      component: 'ue-input',
      configName: 'max',
      step: 1,
      min: -99999,
      max: 99999
    },
    step: {
      type: 'Number',
      component: 'ue-input',
      configName: 'step',
      step: 1,
      min: -99999,
      max: 99999
    },
    precision: {
      type: 'Number',
      component: 'ue-input',
      configName: '精度',
      step: 1,
      min: -99999,
      max: 99999
    },
    maxlength: {
      type: 'Number',
      component: 'ue-input',
      configName: '最大长度',
      step: 1,
      min: -99999,
      max: 99999
    },
  }
}