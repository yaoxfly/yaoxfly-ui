export const datePickerProps = {
  props: {
    placeholder: '请选择',
    type: 'date',
    valueFormat: 'yyyy-MM-dd',
    // 今天之前的日期可选
    optionBeforeToday: false,
    // 今天之后的日期可选
    optionAfterToday: false,
    // 是否包括今天 当optionBeforeToday、optionAfterToday其中有一个被选中时 inclueToday可选
    includeToday: false,
    // 今天之后/之前设置之后出现的配置项 （比如说，当前日期之后的3天可选）为0不限制
    rangeDays: 0,
    // 日期比较设置
    dateCompareConfigs: []
  }
}

export const datePickerPropsForm = {
  props: {
    placeholder: {
      configName: '占位显示',
      type: 'String',
      component: 'ue-input',
      maxlength: 100
    },
    type: {
      configName: '显示类型',
      component: 'ue-select',
      selections: [
        'date', 'datetime', 'year', 'month', 'dates', 'week'
        // 'datetimerange', ' daterange', 'monthrange'
      ].map(label => {
        return { label, value: label }
      })
    },
    valueFormat: {
      configName: '日期格式',
      component: 'ue-input',
      type: 'String',
      maxlength: 45
    },
    // 今天之前的日期可选
    optionBeforeToday: {
      label: '今天之前可选',
      component: 'ue-switch',
      mode: 'checkbox',
      type: 'Boolean',
      disableOther: true,
      // 选了今天之前可选 今天之后可选 字段disabled
      disableFunction: function (optionBeforeToday, disableOtherFunc) {
        // dateCompareConfigs
        ['optionAfterToday'].forEach(key => disableOtherFunc(key, optionBeforeToday))
      },
      hideOther: true,
      // 选了当前值是否包括今天选项才能出现, 范围天数出现
      hideFunction: function (optionBeforeToday, hideFunc) {
        ['includeToday', 'rangeDays'].forEach(key => hideFunc(key, !optionBeforeToday))
      }
    },
    // 今天之后的日期可选
    optionAfterToday: {
      label: '今天之后可选',
      component: 'ue-switch',
      type: 'Boolean',
      mode: 'checkbox',
      disableOther: true,
      // 今天之后可选 勾选了该项 要禁用 当前日期之前可选
      disableFunction: function (optionAfterToday, disableOtherFunc) {
        ['optionBeforeToday'].forEach(key => disableOtherFunc(key, optionAfterToday))
      },
      hideOther: true,
      // 选了当前值是否包括今天选项才能出现
      hideFunction: function (optionAfterToday, hideFunc) {
        ['includeToday', 'rangeDays'].forEach(key => hideFunc(key, !optionAfterToday))
      }
    },
    // 是否包括今天 当optionBeforeToday、optionAfterToday其中有一个被选中时 inclueToday可选
    includeToday: {
      label: '包括今天',
      component: 'ue-switch',
      mode: 'checkbox',
      type: 'Boolean'
    },
    rangeDays: {
      configName: '范围天数',
      component: 'ue-input',
      type: 'Number',
      step: 1,
      min: 0,
      max: 99999
    },
    dateCompareConfigs: {
      label: '日期比较(目标字段的日期格式须与当前字段一致)',
      type: 'Array',
      noRandom: true,
      component: 'ue-children-config',
      // 子项模板 用于添加新项
      childOriginalTemplate: {
        targetKey: '',
        compareMethod: '',
        // 选择范围比较 前几天 可选
        before: 0,
        // 选择范围比较 后几天 可选
        after: 0
      },
      childFormConfig: {
        targetKey: {
          configName: '目标字段',
          type: 'String',
          component: 'ue-input'
        },
        compareMethod: {
          type: 'String',
          component: 'ue-select',
          configName: '比较方法',
          hideOther: true,
          hideFunction: `(v, hideFunc) => {
            ['before', 'after'].forEach(key => hideFunc(key, v !== 'range'))
          }`,
          selections: [
            {
              label: '大于',
              value: '>'
            },
            {
              label: '大于等于',
              value: '>='
            },
            {
              label: '小于',
              value: '<'
            },
            {
              label: '小于等于',
              value: '<='
            },
            {
              label: '范围',
              value: 'range'
            }
          ]
        },
        // 当选择范围比较后才会有下述配置项出现
        // 选择范围比较 前几天 可选
        before: {
          type: 'Number',
          configName: '前几天可选',
          component: 'ue-input',
          step: 1,
          min: 0,
          max: 99999
        },
        // 选择范围比较 后几天 可选
        after: {
          type: 'Number',
          configName: '后几天可选',
          component: 'ue-input',
          step: 1,
          min: 0,
          max: 99999
        }
      }
    }
  }
}