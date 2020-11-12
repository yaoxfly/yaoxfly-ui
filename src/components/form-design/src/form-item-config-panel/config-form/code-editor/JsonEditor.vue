<template>
  <div class="json-editor">
    <textarea ref="textarea" />
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/eclipse.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'
import _ from 'lodash'
// eslint-disable-next-line import/no-webpack-loader-syntax
require('script-loader!jsonlint')

export default {
  name: 'JsonEditor',
  props: {
    value: {
      type: [Object, Array],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      jsonEditor: false
    }
  },
  watch: {
    value (value) {
      const editorValue = this.jsonEditor.getValue()
      const v = _.isString(value) ? value : JSON.stringify(value, null, 2)
      if (v !== editorValue) {
        this.jsonEditor.setValue(v)
      }
    },
    disabled () {
      this.jsonEditor.setOption('readOnly', this.disabled)
    }
  },
  mounted () {
    this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true,
      mode: 'application/json',
      gutters: ['CodeMirror-lint-markers'],
      theme: 'eclipse',
      lint: true
    })
    this.jsonEditor.setValue(_.isString(this.value) ? this.value : JSON.stringify(this.value, null, 2))
    this.jsonEditor.on('change', cm => {
      // this.$emit('changed', cm.getValue())
      this.$emit('input', JSON.parse(cm.getValue()))
    })
    this.jsonEditor.setOption('readOnly', this.disabled)
  },
  methods: {
    getValue () {
      return this.jsonEditor.getValue()
    }
  }
}
</script>

<style lang="scss" scoped>
.json-editor {
  position: relative;

  ::v-deep {
    .CodeMirror {
      // height: auto;
      height: 600px;
    }

    .CodeMirror-scroll {
      min-height: 300px;
    }

    .cm-s-rubyblue span.cm-string {
      color: #F08047;
    }
  }
}
</style>
