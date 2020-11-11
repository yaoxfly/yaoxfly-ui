const ElRowChildContructor = class {
  constructor () {
    this.comp = 'el-col'
    this.props = {
      span: 12
    }
    this.comps = []
  }
}

export const elRow = {
  props: {
    gutter: 0,
    type: 'flex'
  },
  children: [
    new ElRowChildContructor(),
    new ElRowChildContructor()
  ]
}

export const elRowFormConfig = {
  props: {
    gutter: {
      configName: '间隔',
      type: 'Number',
      component: 'ue-input',
      min: 0,
      step: 1,
      max: 3000
    },
    type: {
      configName: '布局模式',
      component: 'ue-select',
      selections: [
        { label: 'flex', value: 'flex' },
        { label: 'default', value: 'default' }
      ]
    }
  },
  childConfig: {
    // 子项模板 用于添加新项
    childOriginalTemplate: new ElRowChildContructor(),
    childFormConfig: {
      props: {
        span: {
          configName: '栅格宽度',
          type: 'Number',
          component: 'ue-input',
          min: 1,
          max: 24,
          step: 1
        }
      }
    }
  }
}