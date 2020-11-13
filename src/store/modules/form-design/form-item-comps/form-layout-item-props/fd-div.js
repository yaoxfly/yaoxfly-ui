export const eveDiv = {
  props: {
    backfill: false,
    // api接口回填 table 表回填
    mode: 'api',
    apiUrl: '',
    tableName: '',
    // 字段名称
    fieldNames: []
  },
  children: [
    {
      comp: 'div',
      props: {},
      comps: []
    }
  ]
}

export const eveDivFormConfig = {
  props: {
    backfill: {
      label: '是否使用数据回填',
      component: 'ue-switch',
      type: 'Boolean',
      mode: 'checkbox',
      disableOther: true,
      // 选了开启数据回填才会出现模式选择项
      disableFunction: function (optionAfterToday, hideFunc, getOtherKeyValue) {
        ['mode', 'apiUrl', 'tableName'].forEach(key => hideFunc(key, !optionAfterToday))
      }
    },
    mode: {
      configName: '回填方式',
      component: 'ue-select',
      type: 'String',
      selections: [
        { label: '接口', value: 'api' },
        { label: '数据表', value: 'table' }
      ],
      hideOther: true,
      // 选了开启数据回填才会出现模式选择项
      hideFunction: function (mode, hideFunc, getOtherKeyValue) {
        if (mode === 'table') {
          hideFunc('tableName', false)
          hideFunc('apiUrl', true)
        } else {
          hideFunc('tableName', true)
          hideFunc('apiUrl', false)
        }
      }
    },
    apiUrl: {
      component: 'ue-input',
      type: 'String',
      configName: '接口地址',
      maxlength: 500
    },
    tableName: {
      component: 'ue-input',
      type: 'String',
      configName: '数据表名',
      maxlength: 500
    }
  }
}