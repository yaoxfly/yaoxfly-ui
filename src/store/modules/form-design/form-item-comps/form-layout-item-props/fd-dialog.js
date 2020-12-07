export const fdDialog = {
  props: {
    notBtn: false,
    dialogWidth: 800,
    dialogTop: 100,
    title: '对话框'
  },
  children: [
    {
      comp: 'div',
      props: {},
      comps: []
    }
  ]
}

export const fdDialogFormConfig = {
  props: {
    notBtn: {
      label: '是否不需要按钮',
      component: 'ue-switch',
      type: 'Boolean',
      mode: 'checkbox'
    },
    dialogWidth: {
      component: 'ue-input',
      type: 'Number',
      configName: '对话框宽度',
      max: 99999,
      min: 0,
      step: 1
    },
    dialogTop: {
      component: 'ue-input',
      type: 'Number',
      configName: 'top',
      max: 99999,
      min: 0,
      step: 1
    },
    title: {
      component: 'ue-input',
      type: 'String',
      configName: '对话框标题',
      maxlength: 500
    }
  }
}
