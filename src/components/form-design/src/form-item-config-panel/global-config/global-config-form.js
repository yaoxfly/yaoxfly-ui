export const global = {
  common: {
    // 标签位置
    labelPosition: 'left',
    // 标签宽度
    labelWidth: 95,
    // 组件大小
    size: 'medium',
    // 全局组件状态
    globalStatus: ''
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
    },
    size: {
      configName: '组件尺寸',
      component: 'ue-select',
      type: 'String',
      selections: [
        { label: '默认', value: 'medium' },
        { label: '小', value: 'small' },
        { label: 'mini', value: 'mini' }
      ]
    },
    globalStatus: {
      configName: '全局组件状态',
      component: 'ue-select',
      type: 'String',
      clearable: true,
      selections: [
        { label: '启用', value: 'enable' },
        { label: '禁用', value: 'disabled' },
        { label: '只读', value: 'readOnly' },
        { label: '标记', value: 'sign' },
      ]
    }
  }
}