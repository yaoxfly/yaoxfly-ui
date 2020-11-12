<template>
  <div class="eve-form-design-item" @click="handleClickFormItem" :class="activateItemKey === formItem.key ? activeClass : ''">
    <component :is="formItem.category === 'input' ? `el-form-item` : 'div'" v-if="formItem.category !== 'layout'" :label-width="`${theFormItemLabel ? elFormItemConfig.labelWidth : 0}px`" style="margin-bottom: 0">
      <div v-if="formItem.category === 'input'" slot="label" :class="elFormItemConfig.isRequired ? 'form-item-reqiured' : ''">
        {{ theFormItemLabel }}
      </div>
      <form-item-render :global="global" :form-item-config="formItem"/>
    </component>
    <div v-else style="width: 100%; overflow-x: hidden">
      <!-- 布局组件 -->
      <!-- 比如 el-row -->
      <form-item-render :global="global" :form-item-config="formItem">
        <!-- 比如 el-col -->
        <!-- v-bind 可以将 一个对象 扩展为vue组件的props -->
        <component
          :is="childComp.comp"
          v-for="(childComp, compIndex) in formItem.children" 
          v-bind="childComp.props"
          :key="`child_comp_${compIndex}`">
          <div class="eve-form-design-layout-comp">
            <!-- col中的组件 -->
            <vue-draggable
              tag="div"
              class="grid"
              :value="childComp.comps"
              @input="handleCompsAddNewElement($event, compIndex)"
              @change="handleFormItemsChange($event, childComp.comps)"
              v-bind="{ group: 'formDesign', ghostClass: 'ghost', animation: 100, handle: '.drag-widget' }">
              <form-config-item v-for="(formItem, listIdx) in childComp.comps" :parent-list-name="`${curListName}.${compIndex}.comps`" :list-index="listIdx" :key="formItem.key" :form-item="formItem"></form-config-item>
            </vue-draggable>
          </div>
        </component>
      </form-item-render>
      <!--  -->
    </div>
    <!-- 克隆 删除 icon -->
    <div v-show="formItem.key === activateItemKey" class="operation-tools">
      <!-- 拖拽icon -->
      <i :style="{ background: formItem.key === activateItemKey ? iconBackgroundColor : '' }" class="el-icon-rank widget-tool drag-widget" :size="20" />
      <i 
        v-if="formItem.category !== 'layout'" 
        @click="handleClickClone"  
        :style="{ background: formItem.key === activateItemKey ? iconBackgroundColor : '' }" 
        class="el-icon-copy-document widget-tool clone"/>
      <i 
        @click="handleCLickDelete" 
        :style="{ background: formItem.key === activateItemKey ? iconBackgroundColor : '' }" 
        class="el-icon-delete widget-tool delete"/>
    </div>
  </div>
</template>

<script>
import FormCompsMixin from '../mixins/form-comps-mixin'
import FormItemRender from './FormItemRender.vue'
import VueDraggable from 'vuedraggable'
import { mapMutations, mapState } from 'vuex'
import { elFormItem, common } from '../common-config'

export default {
  name: 'FormConfigItem',
  mixins: [
    FormCompsMixin
  ],
  components: {
    FormItemRender,
    VueDraggable
  },
  props: {
    formItem: {
      type: Object,
      required: true
    },
    parentListName: {
      type: String,
      required: true
    },
    listIndex: {
      type: [String, Number],
      required: true
    },
    // 父级是否是顶层
    parentIsTop: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      elFormItem,
      common
    }
  },
  computed: {
    ...mapState({
      activateItem: state => state.FormDesign.activateItem,
      global: state => state.FormDesign.global
    }),
    activateItemKey () {
      return this.activateItem ? this.activateItem.key : ''
    },
    iconBackgroundColor () {
      if (!this.activateItemKey) {
        return
      }
      return this.activateItemKey.indexOf('layout') !== -1 ? '#E6A23C' : '#409EFF'
    },
    activeClass () {
      if (!this.activateItemKey) {
        return
      }
      return this.activateItemKey.indexOf('layout') !== -1 ? 'layout-active' : 'active'
    },
    curListName () {
      return `${this.parentListName}.${this.listIndex}.children`
    },
    // elFormItem配置
    elFormItemConfig () {
      const { elFormItem } = this.formItem
      if (!elFormItem) {
        return this.global.common
      } else {
        return {
          ...elFormItem,
          labelWidth: Number(elFormItem.labelWidth) || this.global.common.labelWidth
        }
      }
    },
    theFormItemLabel () {
      return this.formItem.elFormItem && this.formItem.elFormItem.formItemLabel
    }
  },
  methods: {
    ...mapMutations({
      commitConfigsInput: 'FormDesign/COMMIT_FORM_ITEMS_CONFIGS',
      commitFormItemInit: 'FormDesign/COMMIT_FORM_ITEM_INIT',
      commitActiveFormItem: 'FormDesign/COMMIT_USER_ACTIVE_ITEM',
      commitFormItemOperation: 'FormDesign/COMMIT_FORM_ITEM_OPERATION'
    }),
    /**
     * 布局组件添加表单项
     */
    handleCompsAddNewElement (value, compIdx) {
      /**
       * listName 如果是 formItemConfigs.1.children.1.comps
       * formItemConfigs 是 vuex 中的顶层表单项数组名
       * 给 formItemConfigs 里的第二个组件
       * 比如说是
       * <el-row>
       *  <el-col>..第一个..</el-col>
       *  <el-col>..第二个..</el-col>
       * </el-row>
       * formItemConfigs.1.children.1.comps就是往第二个里加组件
       */
      this.commitConfigsInput({ listName: `${this.parentListName}.${this.listIndex}.children.${compIdx}.comps`, valueList: value })
    },
    handleFormItemsChange (evt, list) {
      if (!evt.added) {
        return
      }
      // 主要给新表单元素打标签
      // 添加新的配置项
      const newFormItem = evt.added.element
      this.commitFormItemInit({
        element: newFormItem,
        list,
        index: evt.added.newIndex,
        elFormItem: this.elFormItem,
        common: this.common
      })
    },
    handleClickFormItem () {
      event.stopPropagation()
      this.commitActiveFormItem(this.formItem)
    },
    handleClickClone () {
      event.stopPropagation()
      this.commitFormItemOperation({ listName: this.parentListName, index: this.listIndex, type: 'clone' })
    },
    handleCLickDelete () {
      event.stopPropagation()
      this.commitFormItemOperation({ listName: this.parentListName, index: this.listIndex, type: 'delete' })
    }
  }
}
</script>

<style lang="scss" scoped>
.eve-form-design-layout {
  padding: 0 !important;
}
.eve-form-design-item {
  position: relative;
  z-index: 6;
  // background: red;
  border: 1px solid #409EFF;
  padding: 3px;
  margin-bottom: 5px;
  // min-height: 87px;
  &.active {
    outline: 2px solid #409EFF;
  }
  &.layout-active {
    border: 1px solid #E6A23C !important;
    outline: 2px solid #E6A23C;
  }
  &.active, &.layout-active {
    &:hover {
      .operation-tools {
        display: block;
      }
    }
  }
  &:hover {
    background: rgba(175, 207, 240, 0.39);
  }
  i.widget-tool {
    display: inline-block;
    text-align: center;
    background: #409EFF;
    width: 28px;
    height: 28px;
    line-height: 28px;
    color: #fff;
    // opacity: 0.8;
  }
  .drag-widget {
    cursor: move;
    z-index: 9;
  }
  .operation-tools {
    display: none;
    cursor: pointer;
    position: absolute;
    right: -2px;
    bottom: -2px;
  }
  .form-item-reqiured {
    &::before {
      content: '*';
      color: red;
    }
  }
}
.eve-form-design-layout-comp {  
  .grid {
    position: relative;
    min-height: 60px !important;
    border: 1px dashed #999;
    height: 100%;
    padding: 0 2px;
  }
}
</style>