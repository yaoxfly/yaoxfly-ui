export const eveLabel = {
  props: {
    label: '区块标题123',
    // left / right / center
    contentPosition: 'left'
  }
}

export const eveLabelFormConfig = {
  props: {
    label: {
      configName: '标签',
      component: 'ue-input',
      type: 'String',
      maxlength: 200
    },
    contentPosition: {
      configName: '文字位置',
      component: 'ue-select',
      type: 'String',
      selections: [
        { label: '居左', value: 'left' },
        { label: '居中', value: 'center' },
        { label: '居右', value: 'right' }
      ]
    }
  }
}