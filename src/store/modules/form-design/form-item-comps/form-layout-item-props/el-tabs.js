const ElTabsChildContructor = class {
  constructor (label, name) {
    this.comp = 'el-tab-pane'
    this.props = {
      label: label || '标签页',
      name: name || 'tab1'
    }
    this.comps = []
  }
}

export const ElTabs = {
  props: {
    // card/border-cart/-
    type: '-',
    // 标签页宽度是否自适应
    stretch: false
  },
  children: [
    new ElTabsChildContructor('标签页1'),
    new ElTabsChildContructor('标签页2', 'tab2')
  ]
}

export const ElTabsFormConfig = {
  props: {
    type: {
      configName: '风格类型',
      type: 'String',
      component: 'ue-select',
      selections: [
        {
          label: 'default',
          value: '-'
        },
        {
          label: 'card',
          value: 'card'
        },
        {
          label: 'border-card',
          value: 'border-card'
        }
      ]
    },
    stretch: {
      configName: '标签页名宽度自适应',
      component: 'ue-switch',
      type: 'Boolean'
    }
  },
  childConfig: {
    // 子项模板 用于添加新项
    childOriginalTemplate: new ElTabsChildContructor(),
    childFormConfig: {
      props: {
        label: {
          configName: '标签页名称',
          type: 'String',
          component: 'ue-input',
          maxlength: 30
        },
        name: {
          configName: '标签页唯一标识',
          type: 'String',
          component: 'ue-input',
          maxlength: 30
        }
      }
    }
  }
}