export const uploaderCompProps = {
  props: {
    fileType: '',
    fileSize: 10
  }
}

export const uploaderCompPropsForm = {
  props: {
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
