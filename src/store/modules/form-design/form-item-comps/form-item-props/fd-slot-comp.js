export const slotComp = {
    props: {
      compName: '',
      props: {},
      style: {}
    }
  }
  
  export const slotCompPropsForm = {
    props: {
      compName: {
        configName: '组件名称',
        type: 'String',
        component: 'ue-input',
        maxlength: 100
      },
      props: {
        type: 'Object',
        component: 'code-editor',
        btnLabel: '组件属性',
        mode: 'application/json'
      },
      style: {
        type: 'Object',
        component: 'code-editor',
        btnLabel: 'style 样式',
        mode: 'application/json'
      }
    }
  }