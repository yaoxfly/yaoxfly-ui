export const fdCard = {
  props: {
    header: '卡片标题',
    shadow: 'never'
  },
  children: [
    {
      comp: 'div',
      props: {},
      comps: []
    }
  ]
}

export const fdCardFormConfig = {
  props: {
    header: {
      component: 'ue-input',
      type: 'String',
      configName: '卡片标题',
      maxlength: 500
    },
    shadow: {
      configName: '阴影显示方式',
      component: 'ue-select',
      type: 'String',
      selections: [
        { label: 'never', value: 'never' },
        { label: 'always', value: 'always' },
        { label: 'hover', value: 'hover' }
      ]
    }
  }
}
