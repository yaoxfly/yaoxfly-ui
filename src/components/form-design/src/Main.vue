<template>
  <el-container class="eve-form-design-container">
    <el-header class="eve-form-design-header">
      <i class="el-icon-setting" style="margin-right: 5px"></i>
      <span>表单设计器</span>
    </el-header>
    <el-container class="eve-form-design-main-container">
      <el-aside width="280px" class="comps-panel-wrapper">
        <form-comps-panel/>
      </el-aside>
      <el-main>
        <form-design-panel/>
      </el-main>
      <el-aside width="280px" class="controll-panel-wrapper">
        <form-item-config-panel/>
      </el-aside>
    </el-container>
    <form-preview-dialog v-model="showPreviewDialog" :fullscreen="fullscreen"/>
    <json-preview-dialog v-model="showJsonDialog"/>
    <vue-preview-dialog v-model="previewVue"/>
    <el-footer class="eve-form-design-footer">
      <el-button size="small" @click="handleClickPreview" type="success">表单预览</el-button>
      <el-button size="small" @click="handleClickFullscreenPreview" type="success">表单全屏预览</el-button>
      <el-button size="small" @click="handleClickPreviewJson" type="info">JSON文件预览</el-button>
      <el-button size="small" @click="handleClickPreviewVue" type="info" plain>页面代码预览</el-button>
      <el-button size="small" @click="handleExportJson" type="info" plain>导出json配置</el-button>
      <file-importer @upload-parent="handleUploadJson"></file-importer>
      <el-button size="small" type="primary">保存</el-button>
      <el-button size="small" type="warning" plain>取消</el-button>
      <!-- <el-button size="small" @click="handleImportJson" type="info" plain>导入json配置</el-button> -->
    </el-footer>
  </el-container>
</template>

<script>
import FormCompsPanel from './form-comps-panel/FormCompsPanel'
import FormDesignPanel from './form-design-panel/FormDesignPanel'
import FormItemConfigPanel from './form-item-config-panel'
import formPreviewDialog from './form-preview-dialog'
import JsonPreviewDialog from './json-preview-dialog'
import VuePreviewDialog from './vue-preview-dialog'
import { mapMutations, mapState } from 'vuex'
import { downloadFileFromBlob } from './lib/utils'
import FileImporter from './file-importer'

export default {
  name: 'FormDesign',
  components: {
    FormCompsPanel,
    FormDesignPanel,
    FormItemConfigPanel,
    formPreviewDialog,
    JsonPreviewDialog,
    VuePreviewDialog,
    FileImporter
  },
  data () {
    return {
      showPreviewDialog: false,
      showJsonDialog: false,
      previewVue: false,
      fullscreen: false
    }
  },
  computed: {
    ...mapState({
      formItemConfigs: state => state.FormDesign.formItemConfigs,
      global: state => state.FormDesign.global
    })
  },
  methods: {
    ...mapMutations({
      setFormConfig: 'FormDesign/SET_FORM_CONFIG'
    }),
    handleClickPreview () {
      this.showPreviewDialog = true
      this.fullscreen = false
    },
    handleClickPreviewJson () {
      this.showJsonDialog = true
    },
    handleClickPreviewVue () {
      this.previewVue = true
    },
    handleExportJson () {
      try {
        downloadFileFromBlob(JSON.stringify({ global: this.global, formItemConfigs: this.formItemConfigs }), 'json')
      } catch (e) {
        console.error('文件导出 ', e)
      }
    },
    handleUploadJson (data) {
      this.setFormConfig(data)
    },
    handleClickFullscreenPreview () {
      this.fullscreen = true
      this.showPreviewDialog = true
    }
  }
}
</script>

<style lang="scss">
.eve-form-design-container {
  $HeaderFooterHeight: 50px;
  height: 100vh; 
  border: 1px solid #eee;
  .eve-form-design-header {
    height: $HeaderFooterHeight !important;
    font-size: 16px;
    color: #333;
    line-height: $HeaderFooterHeight;
    border-bottom: 1px solid #e8eaec;
  }
  .eve-form-design-main-container {
    height: calc(100vh - #{$HeaderFooterHeight + 2px} * 2);
    padding: 8px;
    .el-main {
      padding: 0 !important;
      border: 1px dashed #999;
      margin: 0 8px;

    }
  }
  .controll-panel-wrapper, .comps-panel-wrapper {
    border: 1px dashed #999;
    padding: 4px;
  }
  .eve-form-design-footer {
    text-align: center;
    line-height: $HeaderFooterHeight;
    border-top: 1px solid #e8eaec;
    height: $HeaderFooterHeight !important;
  }
  .ghost {
    opacity: 0.5;
    background: #409EFF;
    border: 2px solid #409EFF;
    outline-width: 0;
    box-sizing: border-box;
    font-size: 0;
    content: '';
    overflow: hidden;
    padding: 0;
  }
}
</style>
