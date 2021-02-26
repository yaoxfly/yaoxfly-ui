  # 查询表单
   查询条件的集合体,灵活配置查询条件表单，支持自适应收缩/展开等其他自定义操作,常配合TablePagination组件使用。

  # 基础用法

  <template>
  <div>
    <Example/>
  </div>
</template>

<script>

import Example from './Example'
export default {
  components: {
    Example,
  }
}
</script>

# 演示代码

```html
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
```

### Attributes
| 参数   | 说明 | 类型  | 可选值 | 默认值 |
| ----- | ------ | ----- | ----- | - |
| data  | 表单数据,数据格式、配置详见下表 | array | — | [] | 
| model | 表单双向绑定(prop 点击查询按钮时获取值,重置验证时也要用到 | object | — | {} | 
| rules | 规则验证 |  array | — | [] |
| form-width |  所有右边表单的宽度 |  number | — | 288 |
| label-width |  所有左边label的宽度 |  number | — | 140 |
| filter-param |  当参数为空时是否过滤参数 |  boolean | — | true |
| adaptive-expand |  是否开启自适应收缩展开 |  boolean | — | true |
| left-form-width |  左边表单的宽度,一般减去左边菜单栏的宽度，布局组件的间距 |  number | — | — |
| right-button-width | 右边查询、重置等按钮的宽度 |  number | — | 230 |
| right-button-data | 右边按钮的数组--当前数组会覆盖默认的按钮,个性化需求用，详细配置见下表| array | — | [] |

### right-button-data
| 参数   | 说明 | 类型  | 可选值 | 默认值 |
| ----- | ------ | ----- | ----- | - |
| value  | 按钮文本 | string | — | — | 
| buttonClassName |按钮的样式名称| string | — | —|
| iconClassName |按钮的icon名称| string | — | —|  
| valueClassName |按钮文本的样式| string | — | —| 
| type |按钮的类型| string| search(查询) reset(重置)、packUp(展开或收起)， 默认就是普通的按钮 | — | 

### Data Attributes
| 参数   | 说明 | 类型  | 可选值 | 默认值 |
| ----- | ------ | ----- | ----- | - |
| label  | 表单左边的文本 | string | — | — | 
| prop  |  表单的key值,用来规则校验的,和model、rules里key值保持同步 | string | — | — | 
| type  |  表单类型  | string | input、select、date、time、radio、checkbox | — | 
| pickerType  | type是date类型表单的显示类型  | string | 	year/month/date/dates/ week/datetime/datetimerange/ daterange/monthrange | date | 
| placeholder  |  提供可描述输入字段预期值的提示信息（hint）  | string | 	 —  |  —  | 
| valueFormat  | 可选，绑定值的格式。不指定则绑定值为 Date/time 对象  | string | 见日期格式| yyyy-MM-dd HH:mm:ss  | 
| format  |  可选，显示在输入框中的格式  | string | 见日期格式 | yyyy-MM-dd HH:mm:ss| 
| pickerOptions  | 当前时间日期选择器特有的选项参考下表  | object | — |  {}  | 
| formWidth  | 表单的宽度  | number | — |   没写默认是跟着全局属性formWidth  | 
| labelWidth  | 表单左边的文本的宽度  | number | — | 没写默认是跟着全局属性labelWidth| 


###  日期格式
> 使用format指定输入框的格式；使用value-format指定绑定值的格式。

| 格式   | 含义 | 备注  | 举例 | 
| -----  | ------ | ----- | ----- | - |
| yyyy  | 年 |  — | — | 
| M  | 月 |  不补0 | 1 | 
| MM | 月 |   | 	01 | 
| W | 周 | 仅周选择器的 format 可用；不补0  | 	1 |
| WW | 周 | 仅周选择器的 format 可用 | 	01 | 
| d | 日 | 不补0 | 	2 | 
| dd | 日 | 不补0 | 	02 |
| H | 小时 | 	24小时制；不补0  | 	3 |
| HH | 小时 | 	24小时制；不补0  | 	03 |
| h | 小时 | 	12小时制，须和 A 或 a 使用；不补0  | 	3 |
| hh | 小时 | 	12小时制，须和 A 或 a 使用  | 03 |
| m | 分钟 | 	不补0  | 4 | 
| mm | 分钟 | 	  | 04 | 
| s | 秒 | 不补0	  | 5 | 
| ss | 秒 |  	  | 05 | 
| A | AM/PM |  	仅 format 可用，大写  | AM | 
| a | am/pm |  	仅 format 可用，小写  | am | 
| timestamp | JS时间戳 |  仅 value-format 可用；组件绑定值为number类型  | 1483326245000 | 
| [MM] | 不需要格式化字符 |  使用方括号标识不需要格式化的字符 (如 [A] [MM])  | MM | 

### Events
| 事件名称              | 说明                        | 回调参数 |
| --------------------- | -------------------------  | -------- |
| handle-submit | 查询按钮的回调函数 | 双向绑定{} |
| pack-up      |  展开或收起  |    isHidden |
| right-button-event | 右边按钮事件 | 当前点击按钮的值，如{index:1,value:'重置'} |


### Slot
| name                 | 说明                          |
| -------------------- | ---------------------------- |
| prop                 | 此值是动态的,是data属性中的prop值,可单独覆盖拥有这个prop值的表单|
| input                | 所有input类型表单后追加内容,如果加上动态属性prop，格式为input-prop,表示当前prop值的input类型表单后追加内容   |
| date-picker          | 所有日期类型表单后追加内容 , 如果加上动态属性prop，格式为date-picker-prop,表示当前prop值的input类型表单后追加内容   |
| time-picker          | 所有时间类型表单后追加内容 ，如果加上动态属性prop，格式为time-picker-prop,表示当前prop值的input类型表单后追加内容  |
| select               | 所有下拉菜单类型表单后追加内容，如果加上动态属性prop，格式为select-prop,表示当前prop值的input类型表单后追加内容  |
| radio                | 所有单选类型表单后追加内容，如果加上动态属性prop，格式为radio-prop,表示当前prop值的input类型表单后追加内容      |
| checkbox             | 所有多选类型表单后追加内容 ，如果加上动态属性prop，格式为checkbox-prop,表示当前prop值的input类型表单后追加内容     |
| right-button         | 右边查询、重置等按钮内容覆盖    |

> 使用slot在表单后追加内容有可能会导致表单的自适应收缩、展开功能出现问题,原因是追加内容后变相增加了宽度,使得自适应算法不够精确,可使用css样式position:absolute 让其脱离文档流。
