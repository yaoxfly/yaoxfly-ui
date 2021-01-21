<template>
  <div>
    <form-render
      ref="formRender"
      @form-render-mounted="setData"
      :form-config="form"
    />
  </div>
</template>

<script>
import FormRender from '@/components/form-design/src/form-preview-dialog/form-render/FormRender'

export default {
  components: {
    FormRender
  },
  data () {
    return {
      form: null
    }
  },
  methods: {
    setData () {
      this.$refs.formRender.setRemoteData().then(formData => {
        // setTimeout(() => {
        //   const data = {}
        //   const fields = ['s1', 's2', 's4']
        //   fields.forEach((fieldName, idx) => {
        //     data[fieldName] = `preview_${idx}`
        //   })
        //   this.$refs.formRender.setFormData(data)
        // }, 3000)
      })
    },
  },
  created () {
    this.form = {
      global: {
        common: {
          labelPosition: 'left',
          labelWidth: 95,
          size: 'medium',
          globalStatus: ''
        }
      },
      formItemConfigs: [
        {
          comp: 'fd-file-uploader',
          label: '文件上传',
          id: '100007',
          category: 'input',
          props: {
            fileType: '',
            fileSize: 10,
            multiple: true,
            isImage: false,
            isFlex: true
          },
          triggerUseChange: true,
          dontShowDefault: true,
          elFormItem: {
            formItemLabel: '文件上传',
            labelWidth: 0,
            isRequired: false,
            fieldName: 'form_field_35905',
            size: '',
            diyValidator: 'function validator (form, callback) {\n  callback()\n}',
            defaultValue: null
          },
          common: {
            fieldShowScript: 'function show (data) {\n  return true\n}',
            status: ''
          },
          key: 'form_field_35905'
        },
        {
          comp: 'fd-rich-text',
          label: '富文本',
          id: '100008',
          category: 'input',
          props: {
            init: {
              height: 327
            }
          },
          triggerUseChange: true,
          dontShowDefault: true,
          elFormItem: {
            formItemLabel: '富文本',
            labelWidth: 0,
            isRequired: false,
            fieldName: 'form_field_51803',
            size: '',
            diyValidator: 'function validator (form, callback) {\n  callback()\n}',
            defaultValue: null
          },
          common: {
            fieldShowScript: 'function show (data) {\n  return true\n}',
            status: ''
          },
          key: 'form_field_51803'
        }
      ]
    }
  }
}
</script>