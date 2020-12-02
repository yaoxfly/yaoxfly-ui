<template>
  <div>
    <form-design ref="fd" />
  </div>
</template>

<script>
import FormDesign from '../../components/form-design/src/Main'

export default {
  components: {
    FormDesign
  },
  // mounted () {
  //   // setTimeout(() => {
  //   //   this.$refs.fd.setFormConfig(this.fdJson)
  //   // }, 1000)
  // },
  data () {
    return {
      // 测试用的数据
      fdJson: {
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
            comp: 'fd-div',
            label: 'div',
            id: '200004',
            category: 'layout',
            props: {
              backfill: true,
              mode: 'api',
              apiUrl: '',
              tableName: '',
              fieldNames: []
            },
            children: [
              {
                comp: 'div',
                props: {},
                comps: [
                  {
                    comp: 'fd-input',
                    label: '输入框',
                    id: '100001',
                    category: 'input',
                    props: {
                      placeholder: '123',
                      status: 'enable',
                      size: 'medium'
                    },
                    elFormItem: {
                      formItemLabel: '输入框222',
                      labelWidth: 0,
                      isRequired: false,
                      fieldName: 's1',
                      size: '',
                      diyValidator: 'function validator (form, callback) {\n  callback()\n}',
                      defaultValue: null
                    },
                    common: {
                      fieldShowScript: 'function show (data) {\n  return true\n}',
                      status: ''
                    },
                    key: 'form_field_66172'
                  },
                  {
                    comp: 'fd-input',
                    label: '输入框',
                    id: '100001',
                    category: 'input',
                    props: {
                      placeholder: '123',
                      status: 'enable',
                      size: 'medium'
                    },
                    elFormItem: {
                      formItemLabel: '输入框32',
                      labelWidth: 0,
                      isRequired: false,
                      fieldName: 's2',
                      size: '',
                      diyValidator: 'function validator (form, callback) {\n  callback()\n}',
                      defaultValue: null
                    },
                    common: {
                      fieldShowScript: 'function show (data) {\n  return true\n}',
                      status: ''
                    },
                    key: 'form_field_34148'
                  },
                  {
                    comp: 'fd-div',
                    label: 'div',
                    id: '200004',
                    category: 'layout',
                    props: {
                      backfill: true,
                      mode: 'api',
                      apiUrl: '',
                      tableName: '',
                      fieldNames: []
                    },
                    children: [
                      {
                        comp: 'div',
                        props: {},
                        comps: [
                          {
                            comp: 'el-row',
                            label: '栅格',
                            id: '200002',
                            category: 'layout',
                            props: {
                              gutter: 0,
                              type: 'flex'
                            },
                            children: [
                              {
                                comp: 'el-col',
                                props: {
                                  span: 12
                                },
                                comps: [
                                  {
                                    comp: 'fd-input',
                                    label: '输入框',
                                    id: '100001',
                                    category: 'input',
                                    props: {
                                      placeholder: '123',
                                      status: 'enable',
                                      size: 'medium'
                                    },
                                    elFormItem: {
                                      formItemLabel: '输入框1',
                                      labelWidth: 0,
                                      isRequired: false,
                                      fieldName: 's3',
                                      size: '',
                                      diyValidator: 'function validator (form, callback) {\n  callback()\n}',
                                      defaultValue: null
                                    },
                                    common: {
                                      fieldShowScript: 'function show (data) {\n  return true\n}',
                                      status: ''
                                    },
                                    key: 'form_field_14760'
                                  }
                                ]
                              },
                              {
                                comp: 'el-col',
                                props: {
                                  span: 12
                                },
                                comps: [
                                  {
                                    comp: 'fd-input',
                                    label: '输入框',
                                    id: '100001',
                                    category: 'input',
                                    props: {
                                      placeholder: '123',
                                      status: 'enable',
                                      size: 'medium'
                                    },
                                    elFormItem: {
                                      formItemLabel: '输入框2',
                                      labelWidth: 0,
                                      isRequired: false,
                                      fieldName: 's4',
                                      size: '',
                                      diyValidator: 'function validator (form, callback) {\n  callback()\n}',
                                      defaultValue: null
                                    },
                                    common: {
                                      fieldShowScript: 'function show (data) {\n  return true\n}',
                                      status: ''
                                    },
                                    key: 'form_field_73827'
                                  }
                                ]
                              }
                            ],
                            common: {
                              fieldShowScript: 'function show (data) {\n  return true\n}',
                              status: ''
                            },
                            key: 'layout_form_field_93226'
                          }
                        ]
                      }
                    ],
                    common: {
                      fieldShowScript: 'function show (data) {\n  return true\n}',
                      status: ''
                    },
                    key: 'layout_form_field_93751'
                  }
                ]
              }
            ],
            common: {
              fieldShowScript: 'function show (data) {\n  return true\n}',
              status: ''
            },
            key: 'layout_form_field_57327'
          }
        ]
      }
    }
  }
}
</script>