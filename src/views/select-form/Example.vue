<template>
  <div>
    <eve-select-form
      :rules="rules"
      :model="model"
      :data="data"
      @handle-submit="handleSubmit"
    >
      <template #input>
        <span class="eve-select-form__demo">追加内容</span>
      </template>
    </eve-select-form>
  </div>
</template>
<script>

export default {
  data () {
    return {
      //表单数据
      data:
        [
          {
            label: '统一社会信用代码：',
            prop: 'name',
            type: 'input',
          },

          {
            label: '所属部门：',
            prop: 'department',
            type: 'select',
            option: [
              {
                label: '北京市',
                value: 'beijing'
              },
              {
                label: '上海市',
                value: 'shanghai'
              },
              {
                label: '深圳市',
                value: 'shenzhen'
              }
            ]
          },
          {
            label: '状态：',
            prop: 'status',
            type: 'checkbox',
            option: [
              {
                label: '北京市',
                value: 'beijing1'
              },
              {
                label: '上海市',
                value: 'shanghai2'
              },
              {
                label: '深圳市',
                value: 'shenzhen3'
              }
            ]
          },
          {
            label: '地址：',
            prop: 'address',
            type: 'radio',
            option: [
              {
                label: '北京市',
                value: 'beijing'
              },
              {
                label: '上海市',
                value: 'shanghai'
              },
              {
                label: '深圳市',
                value: 'shenzhen'
              }
            ]
          },
          {
            label: '日期：',
            prop: 'date',
            type: 'date',
            pickerType: 'datetime', //类型可选为:date、datetime
            // valueFormat: 'yyyy-MM', //输出值的格式转换
            // format: 'yyyy-MM'//选择框里的值的格式转换
          },
          {
            label: '时间：',
            prop: 'time',
            type: 'time',
            // valueFormat: 'mm:ss', //输出值的格式转换
            // format: 'mm:ss'//选择框里的值的格式转换
          }
        ],

      //表单双向绑定(prop)--点击查询按钮时获取值-重置验证时也要用到
      model: {
        name: '',
        department: '',
        status: [], //checkbox是多选的时候，声明时一定要写成数组形式，否则会出现选一个全部勾选情况。
        address: '',
        date: '',
        time: ''
      },

      //规则
      rules: {
        name: [
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        status: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        date: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur' }
        ],
      }
    }
  },

  methods: {
    handleSubmit (emit) {
      console.log(emit)
    },
  }
}
</script>


<style  scoped>
.eve-select-form__demo {
  position: absolute;
  right: -60px;
  top: 10px;
}
</style>