<template>
  <div class="ue-component-wrapper comp-children">
    <template v-if="label && label !== 'undefined'">
      {{ label }}
    </template>
    <div class="child" v-for="(child, index) in children" :key="`${index}_child_config`">
      <child-form label-position="top" :form-property-name="formPropertyName" :root="`${index}${rootSufix ? '.' + rootSufix : ''}`" :config="childrenConfigForm"/>
      <i 
        @click="handleCLickDelete(index)" 
        class="el-icon-delete delete"/>
    </div>
    <div style="width: 100%; text-align: center; margin: 5px 0">
      <el-button
        size="small"
        type="primary"
        icon="el-icon-plus"
        :disabled="disabled"
        circle
        @click="handleClickAdd"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VModelMixin from './v-model-mixin'
import { getPropertyDataFromNestObj, vueClonedeep, getKey } from '../../lib/utils'
import ChildForm from './ChildForm'
import _ from 'lodash'

export default {
  name: 'UeChildrenConfig',
  mixins: [
    VModelMixin
  ],
  components: {
    ChildForm
  },
  props: {
    /**
     * 每个子项对象的配置前缀
     * 下拉框selections: [{ label: '', value: '' }]
     *  表单配置 childFormConfig 
     *  {
     *    label: {
     *      configName: '选项标签',
     *      component: 'ue-input',
     *      ...
     *    },
     *    value: { ... }
     *  }
     * 而像布局组件 el-row 的子项
     *  children: [ { comp: 'el-col', props: {}, comps: [] } ]
     *  子项配置表单
     *  {
     *    props: {
     *      span: {
     *        configName: '栅格宽度',
     *        type: 'Number',
     *        component: 'ue-input',
     *        min: 1,
     *        max: 24,
     *        step: 1
     *      }
     *    }
     *  }
     * elRow的子项配置表单 多了一个顶层 props
     * 因此需要设置 rootSufix 为 props
     */
    rootSufix: {
      default: '',
      type: String
    },
    /**
     * 子项表单配置
     *  {
     *    label: {
     *      configName: '选项标签',
     *      component: 'ue-input',
     *      ...
     *    },
     *    value: { ... }
     *  }
     */
    childFormConfig: {
      type: Object,
      default: () => ({})
    },
    /**
     * 列表字段签名 props.selections
     */
    formPropertyName: {
      type: String,
      default: ''
    },
    /**
     * 子项模板 新增子项时用于添加新项
     */
    childOriginalTemplate: {
      type: Object,
      required: true
    },
    noRandom: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState({
      activateItem: state => state.FormDesign.activateItem
    }),
    children () {
      return getPropertyDataFromNestObj(this.activateItem, this.formPropertyName)
    },
    childrenConfigForm () {
      return this.children.map(child => {
        return vueClonedeep(this.childFormConfig)
      })
    }
  },
  methods: {
    handleBlur () {
      this.$emit('blur', this.curValue)
    },
    handleClickAdd () {
      const newChild = vueClonedeep(this.childOriginalTemplate)
      const obj = this.rootSufix ? newChild[this.rootSufix] : newChild
      Object.keys(obj).forEach(key => {
        if (_.isString(obj[key]) && !this.noRandom) {
          obj[key] = `${obj[key]}${getKey()}`
        }
      })
      const cur = this.curValue
      cur.push(newChild)
      this.$emit('input', vueClonedeep(cur))
    },
    handleCLickDelete (idx) {
      const curValue = vueClonedeep(this.curValue)
      curValue.splice(idx, 1)
      this.$emit('input', curValue)
    }
  }
}
</script>


<style lang="scss">
// 加scoped 无法修改饿了么原始样式
.comp-children {
  border: 1px solid #cecece;
  .child {
    position: relative;
    border-top: 1px solid #cecece;
    margin-top: 15px;
    padding: 10px 2px;
    &:nth-child(1) {
      border-top: none;
      margin-top: 0;
    }
    .el-form-item__content {
      padding-bottom: 0 !important;
      line-height: 10px !important;
    }
    .delete {
      top: 5px;
      right: 5px;
      color: #409EFF;
      position: absolute;
      cursor: pointer;
      &:hover {
        font-size: 16px;
      }
    }
  }
}
</style>