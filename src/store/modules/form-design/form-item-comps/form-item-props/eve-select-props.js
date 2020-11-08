export const selectProps = {
  props: {
    selections: [
      {
        label: '选项1',
        value: 1
      },
      {
        label: '选项2',
        value: 2
      }
    ],
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

export const selectPropsForm = {
  props: {
    placeholder: {
      configName: '占位显示',
      type: 'String',
      component: 'ue-input',
      maxlength: 100
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
      component: 'ue-children-config',
      // 子项模板 用于添加新项
      childOriginalTemplate: {
        label: '选项-',
        value: '-'
      },
      childFormConfig: {
        label: {
          configName: '值标签',
          component: 'ue-input',
          type: 'String',
          maxlength: 200
        },
        value: {
          configName: '值',
          component: 'ue-input',
          type: 'String',
          maxlength: 200
        }
      }
    }
  }
}