<!--
* @Author: yx
* @Description: 查询表单的封装
* @Date: 2020-09-29
-->
<template>
  <div class="eve-select-form">
    <!-- el-form-item 和 el-form 配套使用 -->
    <el-form
      ref="formValidate"
      :model="model"
      :rules="rules"
      :label-width="'0px'"
    >
      <section class="eve-select-form__flex">
        <div class="eve-select-form__flex-start">
          <template v-for="(item, index) in data">
            <!-- input-->
            <section
              class="eve-select-form__flex-row-center"
              :key="`input${index}`"
              v-if="item.type === 'input'"
            >
              <label
                class="eve-select-form__from-lable"
                :style="{ width: `${getLabelWidth(item.labelWidth)}px` }"
                :class="[checkHidden(index)]"
              >
                <span
                  class="eve-select-form__asterisk"
                  v-if="checkAsterisk(item.prop, rules)"
                >
                  *
                </span>
                {{ item.label }}</label
              >
              <el-form-item
                :prop="item.prop"
                class="eve-select-form__formItem"
                :class="[checkHidden(index)]"
              >
                <slot :name="item.prop" :row="item" :data="data">
                  <el-input
                    v-model="model[item.prop]"
                    :placeholder="item.placeholder || '请输入'"
                    :style="{ width: `${getFormWidth(item.formWidth)}px` }"
                    clearable
                  ></el-input>
                </slot>
              </el-form-item>
              <slot name="input"></slot>
              <slot :name="`input-${item.prop}`"></slot>
            </section>

            <!--date-picker -->
            <section
              class="eve-select-form__flex-row-center"
              :key="`date-picker${index}`"
              v-if="item.type === 'date'"
            >
              <label
                class="eve-select-form__from-lable"
                :style="{ width: `${getLabelWidth(item.labelWidth)}px` }"
                :class="[checkHidden(index)]"
              >
                <span
                  class="eve-select-form__asterisk"
                  v-if="checkAsterisk(item.prop, rules)"
                >
                  *
                </span>
                {{ item.label }}</label
              >
              <el-form-item
                :prop="item.prop"
                class="eve-select-form__formItem"
                :class="[checkHidden(index)]"
              >
                <slot :name="item.prop" :row="item" :data="data">
                  <el-date-picker
                    :type="item.pickerType || 'date'"
                    v-model="model[item.prop]"
                    :placeholder="item.placeholder || '选择日期'"
                    :style="{ width: `${getFormWidth(item.formWidth)}px` }"
                    :value-format="
                      pickerFormat(item.valueFormat, item.pickerType, item.type)
                    "
                    :format="
                      pickerFormat(item.format, item.pickerType, item.type)
                    "
                  ></el-date-picker>
                </slot>
              </el-form-item>
              <slot name="date-picker"></slot>
              <slot :name="`date-picker-${item.prop}`"></slot>
            </section>

            <!--time-picker -->
            <section
              class="eve-select-form__flex-row-center"
              :key="`time-picker${index}`"
              v-if="item.type === 'time'"
            >
              <label
                class="eve-select-form__from-lable"
                :style="{ width: `${getLabelWidth(item.labelWidth)}px` }"
                :class="[checkHidden(index)]"
              >
                <span
                  class="eve-select-form__asterisk"
                  v-if="checkAsterisk(item.prop, rules)"
                >
                  *
                </span>
                {{ item.label }}
              </label>

              <el-form-item
                :prop="item.prop"
                class="eve-select-form__formItem"
                :class="[checkHidden(index)]"
              >
                <slot :name="item.prop" :row="item" :data="data">
                  <el-time-picker
                    v-model="model[item.prop]"
                    :picker-options="item.pickerOptions"
                    :style="{ width: `${getFormWidth(item.formWidth)}px` }"
                    :placeholder="item.placeholder || '选择时间'"
                    :value-format="
                      pickerFormat(item.valueFormat, item.pickerType, item.type)
                    "
                    :format="
                      pickerFormat(item.format, item.pickerType, item.type)
                    "
                  >
                  </el-time-picker>
                </slot>
              </el-form-item>
              <slot name="time-picker"></slot>
              <slot :name="`time-picker-${item.prop}`"></slot>
            </section>

            <!-- select-->
            <section
              class="eve-select-form__flex-row-center"
              :key="`select${index}`"
              v-if="item.type === 'select'"
            >
              <label
                class="eve-select-form__from-lable"
                :style="{ width: `${getLabelWidth(item.labelWidth)}px` }"
                :class="[checkHidden(index)]"
              >
                <span
                  class="eve-select-form__asterisk"
                  v-if="checkAsterisk(item.prop, rules)"
                >
                  *
                </span>
                {{ item.label }}
              </label>
              <el-form-item
                :prop="item.prop"
                class="eve-select-form__formItem"
                :class="[checkHidden(index)]"
              >
                <!-- 核心代码 -->
                <slot :name="item.prop" :row="item" :data="data">
                  <el-select
                    v-model="model[item.prop]"
                    :placeholder="item.placeholder || '请选择'"
                    :style="{ width: `${getFormWidth(item.formWidth)}px` }"
                    clearable
                  >
                    <template v-for="(itemOption, index) in item.option">
                      <el-option
                        :value="itemOption.value"
                        :key="index"
                        :label="itemOption.label"
                      ></el-option>
                    </template>
                  </el-select>
                </slot>
              </el-form-item>
              <slot name="select"></slot>
              <slot :name="`select-${item.prop}`"></slot>
            </section>

            <!--radio-->
            <section
              class="eve-select-form__flex-row-center"
              :key="`radio${index}`"
              v-if="item.type === 'radio'"
            >
              <label
                :style="{ width: `${getLabelWidth(item.labelWidth)}px` }"
                class="eve-select-form__from-lable"
                :class="[checkHidden(index)]"
              >
                <span
                  class="eve-select-form__asterisk"
                  v-if="checkAsterisk(item.prop, rules)"
                >
                  *
                </span>
                {{ item.label }}
              </label>
              <el-form-item
                :prop="item.prop"
                class="eve-select-form__formItem"
                :class="[checkHidden(index)]"
              >
                <slot :name="item.prop" :row="item" :data="data">
                  <el-radio-group
                    v-model="model[item.prop]"
                    :style="{ width: `${getFormWidth(item.formWidth)}px` }"
                  >
                    <template v-for="(itemOption, index) in item.option">
                      <el-radio :key="index" :label="itemOption.value">{{
                        itemOption.label
                      }}</el-radio>
                    </template>
                  </el-radio-group>
                </slot>
              </el-form-item>
              <slot name="radio"></slot>
              <slot :name="`radio-${item.prop}`"></slot>
            </section>

            <!--checkbox-->
            <section
              class="eve-select-form__flex-row-center"
              :key="`checkbox${index}`"
              v-if="item.type === 'checkbox'"
            >
              <label
                :style="{ width: `${getLabelWidth(item.labelWidth)}px` }"
                class="eve-select-form__from-lable"
                :class="[checkHidden(index)]"
              >
                <span
                  class="eve-select-form__asterisk"
                  v-if="checkAsterisk(item.prop, rules)"
                >
                  *
                </span>
                {{ item.label }}
              </label>
              <el-form-item
                :prop="item.prop"
                class="eve-select-form__formItem"
                :class="[checkHidden(index)]"
              >
                <slot :name="item.prop" :row="item" :data="data">
                  <el-checkbox-group
                    v-model="model[item.prop]"
                    :style="{ width: `${getFormWidth(item.formWidth)}px` }"
                  >
                    <template v-for="(itemOption, index) in item.option">
                      <el-checkbox
                        :key="`checkbox-option${index}`"
                        :label="itemOption.value"
                        :name="item.prop"
                        >{{ itemOption.label }}</el-checkbox
                      >
                    </template>
                  </el-checkbox-group>
                </slot>
              </el-form-item>
              <slot name="checkbox"></slot>
              <slot :name="`checkbox-${item.prop}`"></slot>
            </section>
          </template>

          <el-form-item
            :style="{ width: `${formWidth}px` }"
            class="eve-select-form__flex-row-center"
          >
            <slot> </slot>
          </el-form-item>
        </div>

        <!--按钮的值-->
        <el-form-item class="eve-select-form__form">
          <slot name="right-button">
            <div v-if="rightButtonData.length > 0">
              <template v-for="(item, index) in rightButtonData">
                <el-button
                  :class="item.buttonClassName"
                  :key="`rightButtonData_${index}`"
                  @click="
                    rightButtonEvent({
                      index: index,
                      value: item.value,
                      type: item.type,
                    })
                  "
                >
                  <i :class="item.iconClassName"></i>
                  <span :class="item.valueClassName">{{ item.value }}</span>
                </el-button>
              </template>
            </div>
            <div v-else>
              <el-button
                type="primary"
                ref="search"
                @click="handleSubmit('formValidate')"
              >
                <span>查 询</span>
              </el-button>
              <el-button ref="reset" @click="handleReset('formValidate')">
                <span>重 置</span>
              </el-button>
              <span
                ref="packUp"
                class="eve-select-form__pack-up"
                @click="packUp"
                v-if="isShowExpand"
              >
                {{ isHidden ? '展开' : '收起' }}
              </span>
            </div>
          </slot>
        </el-form-item>
      </section>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'EveSelectForm',
  props: {
    //  注意：prop不能一样，不然重复的那个不会显示
    data: {
      type: Array,
      default: () => [
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
          // pickerType: 'datetime', //类型可选为:date、datetime
          // valueFormat: 'yyyy-MM', //输出值的格式转换
          // format: 'yyyy-MM'//显示在输入框中的格式 
        },
        {
          label: '时间：',
          prop: 'time',
          type: 'time',
          pickerOptions: { selectableRange: '15:30:00 - 20:30:00' },
          // valueFormat: 'mm:ss', //输出值的格式转换
          // format: 'mm:ss'// 显示在输入框中的格式 
        }
      ]
    },

    // 表单双向绑定(prop)--点击查询按钮时获取值-重置验证时也要用到
    model: {
      type: Object,
      default: () => ({
        name: '',
        department: '',
        status: [], //checkbox是多选的时候，声明时一定要写成数组形式，否则会出现选一个全部勾选情况。
        address: '',
        date: '',
        time: '',
      })
    },

    // 规则验证--名字有变更之前是ruleValidate
    rules: {
      type: Object,
      default: () => ({
        // name: [
        //   {
        //     required: true,
        //     message: 'The name cannot be empty',
        //     trigger: 'blur'
        //   },
        //   {
        //     type: 'string',
        //     min: 20,
        //     message: 'Introduce no less than 20 words',
        //     trigger: 'blur'
        //   }
        // ],
        // department: [
        //   {
        //     required: true,
        //     message: "Please select the city",
        //     trigger: "change"
        //   }
        // ]
        // };
      })
    },

    // 所有右边表单的宽度--名字有变更之前是itemWidth
    formWidth: {
      type: Number,
      default: 288 // 1093 
    },

    // 所有左边label的宽度
    labelWidth: {
      type: Number,
      default: 140 // 1093 
    },

    // 当参数为空时是否过滤参数
    filterParam: {
      type: Boolean,
      default: true
    },

    // 是否开启自适应收缩展开
    adaptiveExpand: {
      type: Boolean,
      default: true
    },

    //当前组件的左偏移量,一般是指减去左边菜单栏的宽度和布局组件间距的距离--自适应收缩展开时用
    leftFormWidth: {
      type: Number,
      default: 0
    },

    // 右边查询、重置等按钮的宽度,有用插槽、样式等方式改变了右边这个宽度需要手动设置且需加上按钮离最右边body的偏移量--自适应收缩展开时用
    rightButtonWidth: {
      type: Number,
      default: 230
    },

    //右边按钮的数组--当前数组会覆盖默认的按钮，符合个性化的需求
    rightButtonData: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      winWidth: '', // 当前内容区域的宽度
      num: '', //当前的个数
      isHidden: true // 是否隐藏表单--默认开启隐藏
    }
  },

  mounted () {
    window.addEventListener('resize', this.getWidth)
    this.getWidth()
  },

  methods: {
    /** @description 表单验证并传值
     *  @author yx
     *  @param  {String}  name 表单的ref名称
     */
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          const model = this.filterParams(this.model)
          this.$emit('handle-submit', model)
        }
      })
    },

    /** @description 根据当前分辨率获取要显示的表单个数
     *  @author yx
     */
    getNum (param) {
      // console.log(this.offset(this.$refs.reset.$el), 11)
      const {
        winWidth, formWidth, labelWidth,
        leftWidth = this.leftFormWidth !== 0 ? this.leftFormWidth : this.offset(this.$refs.formValidate.$el).left,
        rightWidth = this.$refs.reset ? this.offset(this.$refs.reset.$el).right : 0
      } = param || {}
      // 250是左边导航的宽度  230:右边查询重置收起等按钮的宽度  288:formWidth 120:label   1366-250-200/408=2.24 Math.floor()
      return Math.floor((winWidth - leftWidth - this.rightButtonWidth - rightWidth) / (formWidth + labelWidth))
    },

    /**@description 获取距离body的偏移量
     * @author yx
     * @param  {String}  curEle 要获取偏移量的dom元素
     */
    offset (curEle) {
      const width = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth
      return {
        left: curEle.getBoundingClientRect().left,
        top: curEle.getBoundingClientRect().top,
        right: width - curEle.getBoundingClientRect().right
      }
    },

    /** @description 表单重置
     * @author yx
     * @param  {String}  name 表单的ref名称
     */
    handleReset (name) {
      // console.log(this.$refs[name])
      this.$refs[name].resetFields()
    },

    /** @description  展开或收起
     * @author yx
     */
    packUp () {
      this.isHidden = !this.isHidden
      this.$emit('pack-up', this.isHidden)
    },

    /** @description  获取当前内容区域的宽度
     * @author yx
     */
    getWidth () {
      let winWidth
      if (window.innerWidth) {
        winWidth = window.innerWidth
      } else if (document.body && document.body.clientWidth) {
        winWidth = document.body.clientWidth
      }
      const num = this.getNum({
        winWidth: winWidth,
        formWidth: this.formWidth,
        labelWidth: this.labelWidth
      })
      this.num = num > 1 ? num : 1
      this.isHidden = this.adaptiveExpand && this.data.length > this.num
      this.winWidth = winWidth
    },

    /** @description  根据filterParam判断是否过滤参数
     *  @author yx
     *  @param  {Object}  model //要过滤的对象
     */
    filterParams (model) {
      model = JSON.parse(JSON.stringify(model))
      this.filterParam && Object.keys(model).some(item => {
        if (!model[item] || (Array.isArray(model[item]) && model[item].length <= 0)) {
          delete model[item]
        }
      })
      return model
    },

    /** @description  右边按钮事件
      * @author yx
      * @param  {Object}  param //事件回调
      */
    rightButtonEvent (param) {
      const { type, index, value } = param || {}
      const emitParam = {}
      const keyMap = {
        reset: () => {
          this.handleReset('formValidate')
          Object.assign(emitParam, {
            index: index,
            value: value
          })
        },
        'pack-up': () => {
          this.isHidden = !this.isHidden
          Object.assign(emitParam, {
            isHidden: this.isHidde,
          })
        },
        search: () => {
          this.$refs.formValidate.validate(valid => {
            if (valid) {
              const model = this.filterParams(this.model)
              Object.assign(emitParam, model)
            }
          })
        },
        default: () => {
          Object.assign(emitParam, {
            index: index,
            value: value
          })
        }
      }
      keyMap[type] ? keyMap[type]() : keyMap.default()
      this.$emit('right-button-event', emitParam)
    }
  },

  computed: {
    // 是否显示展开/收起按钮
    isShowExpand () {
      return this.adaptiveExpand && this.data.length > this.num
    },
    // 判断是否隐藏或显示输入框，select等表单  true隐藏 false显示
    checkHidden () {
      // 闭包传值
      return function (index) {
        return (index === this.num && this.isHidden) || (index > this.num && this.isHidden)
          ? 'eve-select-form__display-none'
          : 'eve-select-form__display-block'
      }
    },
    //获取表单左边lable局部或全局的宽度--用户在局部有传labelWidth就使用局部的，局部覆盖全局
    getLabelWidth () {
      // 如果有局部的就用局部的宽，没有就用全局的，改变局部的宽可能对自适应收缩展开功能有一定影响
      return function (width) {
        return width || this.labelWidth
      }
    },

    //获取表单局部或全局的宽度--用户在局部有传formWidth就使用局部的，局部覆盖全局
    getFormWidth () {
      return function (width) {
        return width || this.formWidth
      }
    },

    //日期/时间 输出格式
    pickerFormat () {
      return function (valueFormat, pickerType = 'date', type) {
        if (valueFormat) {
          return valueFormat
        }
        if (type === 'time') {
          return 'HH:mm:ss'
        }
        const KeyMap = {
          datetime: () => {
            return 'yyyy-MM-dd HH:mm:ss'
          },
          date: () => {
            return 'yyyy-MM-dd'
          }
        }
        return KeyMap[pickerType] && KeyMap[pickerType]()
      }
    },

    //该字段是否必填,显示*号
    checkAsterisk () {
      return function (prop, rules) {
        let flag = false
        rules[prop] && rules[prop].some(item => {
          if (item.required) {
            flag = true
            return true
          }
        })
        return flag
      }
    }
  }

}
</script>
<style lang="scss" scoped>
.eve-select-form {
  color: #606266;
  font-size: 14px;
  &__flex-start {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
    flex: auto;
  }

  &__flex-row-center {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  &__pack-up {
    margin-left: 8px;
    cursor: pointer;
    user-select: none;
  }

  &__form {
    width: 230;
    flex: none;
  }

  &__from-lable {
    word-break: break-all;
    word-wrap: break-word;
    text-align: right;
    margin-right: 4px;
    margin-bottom: 25px;
  }
  &__display-none {
    display: none;
  }

  &__display-block {
    display: block;
  }

  &__flex {
    display: flex;
    align-items: stretch;
  }

  &__asterisk {
    color: red;
  }
}
//修改input的宽度
// ::v-deep .el-input__inner {
//   height: 34px;
// }
</style>
