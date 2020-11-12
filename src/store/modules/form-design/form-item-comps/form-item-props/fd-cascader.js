export const cascaderProps = {
  props: {
    selections: [
      {
        value: 'zhinan',
        label: '指南',
        children: [
          {
            value: 'shejiyuanze',
            label: '设计原则',
            children: [
              {
                value: 'yizhi',
                label: '一致'
              },
              {
                value: 'fankui',
                label: '反馈'
              },
              {
                value: 'xiaolv',
                label: '效率'
              },
              {
                value: 'kekong',
                label: '可控'
              }
            ]
          },
          {
            value: 'daohang',
            label: '导航',
            children: [
              {
                value: 'cexiangdaohang',
                label: '侧向导航'
              },
              {
                value: 'dingbudaohang',
                label: '顶部导航'
              }
            ]
          }
        ]
      }
    ],
    readOnlySeperator: '/',
    multiple: false,
    clearable: true,
    size: 'medium',
    placeholder: '',
    // 远端获取
    isRemote: false,
    // 远端api
    remoteApi: ''
  }
}

export const cascaderPropsForm = {
  props: {
    placeholder: {
      configName: '占位显示',
      type: 'String',
      component: 'ue-input',
      maxlength: 100
    },
    readOnlySeperator: {
      configName: '只读分隔符',
      component: 'ue-input',
      type: 'String',
      maxlength: 30
    },
    clearable: {
      configName: '是否可清空',
      type: 'Boolean',
      component: 'ue-switch'
    },
    multiple: {
      configName: '是否可多选',
      type: 'Boolean',
      component: 'ue-switch'
    },
    isRemote: {
      configName: '是否是远端数据',
      type: 'Boolean',
      component: 'ue-switch',
      hideOther: true,
      hideFunction: function (data, setFormItemHideStatus) {
        if (data) {
          setFormItemHideStatus('selections', true)
          setFormItemHideStatus('remoteApi', false)
        } else {
          setFormItemHideStatus('selections', false)
          setFormItemHideStatus('remoteApi', true)
        }
      }
    },
    remoteApi: {
      configName: 'api路径',
      type: 'String',
      component: 'ue-input',
      maxlength: 100
    },
    selections: {
      type: 'Array',
      component: 'code-editor',
      btnLabel: '设置静态数据',
      mode: 'application/json'
    }
  }
}