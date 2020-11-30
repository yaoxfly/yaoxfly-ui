<template>
  <el-form ref="form" :model="formData" :rules="formRules" label-position="left" label-width="95px"> 
    <el-form-item label="级联框" prop="form_field_81056">
      <fd-cascader v-model="formData.form_field_81056" :selections="formItemOptionsDic.form_field_81056" readOnlySeperator="/" :multiple="false" :clearable="true" size="medium" :isRemote="false" status="readOnly"></fd-cascader>
    </el-form-item>
    <el-form-item label="输入框" prop="form_field_77263">
      <fd-input v-model="formData.form_field_77263" placeholder="123" status="enable" size="medium"></fd-input>
    </el-form-item>
    <el-row :gutter="0" type="default">
      <el-col :span="12">
        <el-form-item label="输入框" prop="form_field_8200">
          <fd-input v-model="formData.form_field_8200" placeholder="123" status="enable" size="medium"></fd-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="下拉框" prop="form_field_57594">
          <fd-select v-model="formData.form_field_57594" :selections="formItemOptionsDic.form_field_57594" :multiple="false" :clearable="true" size="medium" :isRemote="false" status="enable"></fd-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-tabs v-model="tabsDic.layout_form_field_21912" type="-" :stretch="false">
          <el-tab-pane label="标签页1" name="tab1">
            <el-form-item label="输入框" prop="form_field_26046">
              <fd-input v-model="formData.form_field_26046" placeholder="123" status="enable" size="medium"></fd-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="标签页2" name="tab2">
            <el-row :gutter="0" type="flex">
              <el-col :span="12">
                <el-form-item label="输入框" prop="form_field_89641">
                  <fd-input v-model="formData.form_field_89641" placeholder="123" status="enable" size="medium"></fd-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="级联框" prop="form_field_72153">
                  <fd-cascader v-model="formData.form_field_72153" :selections="formItemOptionsDic.form_field_72153" readOnlySeperator="/" :multiple="false" :clearable="true" size="medium" :isRemote="false" status="enable"></fd-cascader>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="下拉框" prop="form_field_65218">
              <fd-select v-model="formData.form_field_65218" :selections="formItemOptionsDic.form_field_65218" :multiple="false" :clearable="true" size="medium" :isRemote="false" status="enable"></fd-select>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button size="small" type="primary" @click="handleSubmit">Submit</el-button>
      <el-button size="small" @click="handleReset" style="margin-left: 8px">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import formCompsMixin from '@/components/form-design/src/mixins/form-comps-mixin'

export default {
  mixins: [formCompsMixin],
  data () {
    return {
      formRules: {},
      formData: {
        form_field_81056: ['zhinan', 'daohang', 'dingbudaohang'],
        form_field_77263: null,
        form_field_8200: null,
        form_field_57594: null,
        form_field_26046: null,
        form_field_89641: null,
        form_field_72153: null,
        form_field_65218: null
      },
      tabsDic: {
        layout_form_field_21912: 'tab1'
      },
      formItemOptionsDic: {
        form_field_81056: [
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
        form_field_57594: [
          {
            label: '选项1',
            value: '1'
          },
          {
            label: '选项2',
            value: '2'
          }
        ],
        form_field_72153: [
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
        form_field_65218: [
          {
            label: '选项1',
            value: '1'
          },
          {
            label: '选项2',
            value: '2'
          }
        ]
      },
    }
  },
  methods: {
    handleSubmit () {},
    handleReset () {}
  }
}
</script>