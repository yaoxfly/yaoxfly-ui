export const uploaderCompProps = {
  props: {
    fileType: '',
    fileSize: 10,
    multiple: true,
    isImage: false,
    isFlex: true,
    tip: '',
    // 是否需要删除确认
    needDeleteConfirm: true
  }
}

export const uploaderCompPropsForm = {
  props: {
    isImage: {
      configName: '是否以图片展示文件',
      type: 'Boolean',
      component: 'ue-switch'
    },
    needDeleteConfirm: {
      configName: '是否需要删除确认',
      type: 'Boolean',
      component: 'ue-switch'
    },
    multiple: {
      configName: '是否可多选',
      type: 'Boolean',
      component: 'ue-switch',
      hideOther: true,
      hideFunction: function (multiple, setFormItemHideStatus) {
        setFormItemHideStatus('isFlex', !multiple)
      }
    },
    isFlex: {
      configName: '是否以flex展示文件',
      type: 'Boolean',
      component: 'ue-switch'
    },
    tip: {
      configName: '提示',
      type: 'String',
      component: 'ue-input',
      maxlength: 1000
    },
    fileType: {
      configName: '文件类型(多个用,隔开)',
      type: 'String',
      component: 'ue-input',
      maxlength: 1000
    },
    fileSize: {
      type: 'Number',
      component: 'ue-input',
      configName: '文件大小',
      step: 1,
      min: 1,
      max: 10240
    }
  }
}
