<template>
  <div class="eve-form-design-panel" v-if="!refreshPage">
    <el-form v-if="global" ref="form" style="height: 100%" :label-width="`${global.common.labelWidth}px`" :label-position="global.common.labelPosition">
      <vue-draggable 
        tag="div"
        class="form-items"
        :value="formItemConfigs"
        @input="handleInput"
        @change="handleFormItemsChange"
        v-bind="{ group: 'formDesign', ghostClass: 'ghost', animation: 100, handle: '.drag-widget' }">
        <form-config-item isConfig v-for="(formItem, listIdx) in formItemConfigs" parent-list-name="formItemConfigs" :list-index="listIdx" parent-is-top :key="formItem.key" :form-item="formItem"/>
      </vue-draggable>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import VueDraggable from 'vuedraggable'
import FormConfigItem from './FormConfigItem'
import { elFormItem, common } from '../common-config'

export default {
  components: {
    VueDraggable,
    FormConfigItem
  },
  computed: {
    ...mapState({
      formItemConfigs: state => state.FormDesign.formItemConfigs,
      global: state => state.FormDesign.global
    })
  },
  data () {
    return {
      refreshPage: false,
      elFormItem,
      common
    }
  },
  methods: {
    ...mapMutations({
      commitConfigsInput: 'FormDesign/COMMIT_FORM_ITEMS_CONFIGS',
      commitFormItemInit: 'FormDesign/COMMIT_FORM_ITEM_INIT'
    }),
    handleInput (value) {
      this.commitConfigsInput({ listName: 'formItemConfigs', valueList: value })
    },
    handleFormItemsChange (evt) {
      if (evt.added) {
        // 主要给新表单元素打标签
        // 添加新的配置项
        const newFormItem = evt.added.element
        this.commitFormItemInit({
          element: newFormItem,
          list: this.formItemConfigs,
          index: evt.added.newIndex,
          elFormItem: this.elFormItem,
          common: this.common
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.eve-form-design-panel {
  height: 100%;
  padding: 15px 4px;
  .form-items {
    height: 100%;
    // background: red;
  }
  // background: skyblue;
}
</style>