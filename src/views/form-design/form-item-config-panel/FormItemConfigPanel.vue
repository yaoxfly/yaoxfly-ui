<template>
  <el-tabs class="eve-form-item-config-form-panel" v-model="activeName" >
    <el-tab-pane v-if="activateItemKey" label="表单组件配置" name="curForm">
      <div class="form-item-config">
        key -> {{ activateItemKey }}
        <template v-if="activateItem.category !== 'layout'">
          <el-divider>表单属性配置</el-divider>
          <config-form labelWidth="70px" :config="elFormItemConfig" root="elFormItem"/>
          <el-divider>组件属性配置</el-divider>
        </template>
        <config-form :config="curFormItemPropsConfigForm" labelWidth="100px" root="props"/>
        <!-- 有些布局组件要配置子项属性 如 elRow的col -->
        <template v-if="activateItem.category === 'layout'">
          <el-divider>子项配置</el-divider>
          <ue-children-config 
            :value="activateItem.children" 
            @input="handleAddNewChildInput" 
            rootSufix="props"
            form-property-name="children" 
            :child-original-template="childConfig.childOriginalTemplate" 
            :child-form-config="childConfig.childFormConfig" 
            root="children"/>
        </template>
      </div>
    </el-tab-pane>
    <el-tab-pane label="全局配置" name="global">
      <global-form></global-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import ConfigForm from './config-form'
import UeChildrenConfig from './config-form/UeChildrenConfig'
import GlobalForm from './global-config'

export default {
  components: {
    ConfigForm,
    UeChildrenConfig,
    GlobalForm
  },
  data () {
    return {
      activeName: 'curForm',
    }
  },
  computed: {
    ...mapState({
      activateItem: state => state.FormDesign.activateItem,
      formItemPropsForms: state => state.FormDesign.formItemPropsForms,
      // elFormItem 属性配置表单
      elFormItemConfig: state => state.FormDesign.elFormItemConfig
    }),
    activateItemKey () {
      return this.activateItem ? this.activateItem.key : ''
    },
    curFormItemPropsConfigForm () {
      return this.formItemPropsForms[this.activateItem.comp]
    },
    childConfig () {
      return this.curFormItemPropsConfigForm.childConfig
    }
  },
  watch: {
    activateItemKey () {
      if (!this.activateItemKey) {
        this.activeName = 'global'
      } else {
        this.activeName = 'curForm'
      }
    }
  },
  created () {
    this.activeName = 'global'
  },
  methods: {
    ...mapMutations({
      // 在vuex 的 mutation 中执行事件的命令
      updateFormItemConfig: 'FormDesign/UPDATE_FORM_ITEM_CONFIG'
    }),
    // 添加新子项
    handleAddNewChildInput (value) {
      this.updateFormItemConfig({
        fieldName: 'children',
        value,
        oldValue: [],
        formItemKey: this.activateItem.key
      })
    }
  }
}
</script>

<style lang="scss">
.eve-form-item-config-form-panel {
  height: 100%;
  width: 100%;
  overflow: auto;
  .form-item-config {
    height: calc(100vh - 175px);
    overflow: auto;
  }
  .el-tabs__header {
    margin-bottom: 5px !important;
  }
  .el-form--label-top {
    .el-form-item__content {
      // line-height: 20px !important;

    }
    .el-form-item__label {
      padding-bottom: 5px !important;
      line-height: 20px !important;
    }
  }
}
</style>