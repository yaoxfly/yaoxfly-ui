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
  },
  mounted () {
    if (this.$route.query.isTest) {
      this.$refs.fd.setFormConfig({
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
      comp: 'fd-cascader',
      label: '级联框',
      id: '100006',
      category: 'input',
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
        isRemote: false,
        remoteApi: '',
        status: 'readOnly'
      },
      triggerUseChange: true,
      elFormItem: {
        formItemLabel: '级联框',
        labelWidth: 0,
        isRequired: false,
        fieldName: 'form_field_81056',
        size: '',
        diyValidator: 'function validator (form, callback) {\n  callback()\n}',
        defaultValue: [
          'zhinan',
          'daohang',
          'dingbudaohang'
        ]
      },
      common: {
        fieldShowScript: 'function show (data) {\n  return true\n}',
        status: 'readOnly'
      },
      key: 'form_field_81056'
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
        formItemLabel: '输入框',
        labelWidth: 0,
        isRequired: false,
        fieldName: 'form_field_77263',
        size: '',
        diyValidator: 'function validator (form, callback) {\n  callback()\n}',
        defaultValue: null
      },
      common: {
        fieldShowScript: 'function show (data) {\n  return true\n}',
        status: ''
      },
      key: 'form_field_77263'
    },
    {
      comp: 'el-row',
      label: '栅格',
      id: '200002',
      category: 'layout',
      props: {
        gutter: 0,
        type: 'default'
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
                formItemLabel: '输入框',
                labelWidth: 0,
                isRequired: false,
                fieldName: 'form_field_8200',
                size: '',
                diyValidator: 'function validator (form, callback) {\n  callback()\n}',
                defaultValue: null
              },
              common: {
                fieldShowScript: 'function show (data) {\n  return true\n}',
                status: ''
              },
              key: 'form_field_8200'
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
              comp: 'fd-select',
              label: '下拉框',
              id: '100002',
              category: 'input',
              props: {
                selections: [
                  {
                    label: '选项1',
                    value: '1'
                  },
                  {
                    label: '选项2',
                    value: '2'
                  }
                ],
                multiple: false,
                clearable: true,
                size: 'medium',
                placeholder: '',
                isRemote: false,
                remoteApi: '',
                status: 'enable'
              },
              triggerUseChange: true,
              elFormItem: {
                formItemLabel: '下拉框',
                labelWidth: 0,
                isRequired: false,
                fieldName: 'form_field_57594',
                size: '',
                diyValidator: 'function validator (form, callback) {\n  callback()\n}',
                defaultValue: null
              },
              common: {
                fieldShowScript: 'function show (data) {\n  return true\n}',
                status: ''
              },
              key: 'form_field_57594'
            }
          ]
        },
        {
          comp: 'el-col',
          props: {
            span: 24
          },
          comps: [
            {
              comp: 'el-tabs',
              label: '标签页',
              id: '200003',
              category: 'layout',
              props: {
                type: '-',
                stretch: false
              },
              children: [
                {
                  comp: 'el-tab-pane',
                  props: {
                    label: '标签页1',
                    name: 'tab1'
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
                        formItemLabel: '输入框',
                        labelWidth: 0,
                        isRequired: false,
                        fieldName: 'form_field_26046',
                        size: '',
                        diyValidator: 'function validator (form, callback) {\n  callback()\n}',
                        defaultValue: null
                      },
                      common: {
                        fieldShowScript: 'function show (data) {\n  return true\n}',
                        status: ''
                      },
                      key: 'form_field_26046'
                    }
                  ]
                },
                {
                  comp: 'el-tab-pane',
                  props: {
                    label: '标签页2',
                    name: 'tab2'
                  },
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
                                formItemLabel: '输入框',
                                labelWidth: 0,
                                isRequired: false,
                                fieldName: 'form_field_89641',
                                size: '',
                                diyValidator: 'function validator (form, callback) {\n  callback()\n}',
                                defaultValue: null
                              },
                              common: {
                                fieldShowScript: 'function show (data) {\n  return true\n}',
                                status: ''
                              },
                              key: 'form_field_89641'
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
                              comp: 'fd-cascader',
                              label: '级联框',
                              id: '100006',
                              category: 'input',
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
                                isRemote: false,
                                remoteApi: '',
                                status: 'enable'
                              },
                              triggerUseChange: true,
                              elFormItem: {
                                formItemLabel: '级联框',
                                labelWidth: 0,
                                isRequired: false,
                                fieldName: 'form_field_72153',
                                size: '',
                                diyValidator: 'function validator (form, callback) {\n  callback()\n}',
                                defaultValue: null
                              },
                              common: {
                                fieldShowScript: 'function show (data) {\n  return true\n}',
                                status: ''
                              },
                              key: 'form_field_72153'
                            }
                          ]
                        }
                      ],
                      common: {
                        fieldShowScript: 'function show (data) {\n  return true\n}',
                        status: ''
                      },
                      key: 'layout_form_field_25576'
                    },
                    {
                      comp: 'fd-select',
                      label: '下拉框',
                      id: '100002',
                      category: 'input',
                      props: {
                        selections: [
                          {
                            label: '选项1',
                            value: '1'
                          },
                          {
                            label: '选项2',
                            value: '2'
                          }
                        ],
                        multiple: false,
                        clearable: true,
                        size: 'medium',
                        placeholder: '',
                        isRemote: false,
                        remoteApi: '',
                        status: 'enable'
                      },
                      triggerUseChange: true,
                      elFormItem: {
                        formItemLabel: '下拉框',
                        labelWidth: 0,
                        isRequired: false,
                        fieldName: 'form_field_65218',
                        size: '',
                        diyValidator: 'function validator (form, callback) {\n  callback()\n}',
                        defaultValue: null
                      },
                      common: {
                        fieldShowScript: 'function show (data) {\n  return true\n}',
                        status: ''
                      },
                      key: 'form_field_65218'
                    }
                  ]
                }
              ],
              common: {
                fieldShowScript: 'function show (data) {\n  return true\n}',
                status: ''
              },
              key: 'layout_form_field_21912'
            }
          ]
        }
      ],
      common: {
        fieldShowScript: 'function show (data) {\n  return true\n}',
        status: ''
      },
      key: 'layout_form_field_30339'
    }
  ]
})
    }
  }
}
</script>