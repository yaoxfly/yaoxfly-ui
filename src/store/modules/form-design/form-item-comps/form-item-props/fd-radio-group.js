export const radioGroupProps = {
  props: {
    selections: [
      {
        label: '选项1',
        value: 1
      },
      {
        label: '选项2',
        value: 2
      },
      {
        label: '选项3',
        value: 3
      }
    ],
    size: 'medium',
    // 远端获取
    isRemote: false,
    // 远端api
    remoteApi: ''
  }
}

export const radioGroupPropsForm = {
  props: {
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
    // selections: {
    //   type: 'Array',
    //   component: 'ue-children-config',
    //   // 子项模板 用于添加新项
    //   childOriginalTemplate: {
    //     label: '选项-',
    //     value: '单选-'
    //   },
    //   childFormConfig: {
    //     label: {
    //       configName: '值标签',
    //       component: 'ue-input',
    //       type: 'String',
    //       maxlength: 200
    //     },
    //     value: {
    //       configName: '值',
    //       component: 'ue-input',
    //       type: 'String',
    //       maxlength: 200
    //     }
    //   }
    // }
  }
}