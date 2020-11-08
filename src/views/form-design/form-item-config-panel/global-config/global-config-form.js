export const global = {
  common: {
    // 标签位置
    labelPosition: 'left',
    // 标签宽度
    labelWidth: 80
  }
}

export const globalConfigForm = {
  common: {
    labelPosition: {
      configName: '标签位置',
      component: 'ue-select',
      selections: [
        {
          label: '左对齐',
          value: 'left'
        },
        {
          label: '顶部',
          value: 'top'
        },
        {
          label: '右对齐',
          value: 'right'
        }
      ],
      disableOther: true,
      disableFunction: function (data, setFormItemHideStatus) {
        setFormItemHideStatus('labelWidth', data === 'top')
      }
    },
    labelWidth: {
      configName: '标签宽度',
      component: 'ue-input',
      type: 'Number',
      min: 0,
      max: 350,
      step: 1
    }
  }
}