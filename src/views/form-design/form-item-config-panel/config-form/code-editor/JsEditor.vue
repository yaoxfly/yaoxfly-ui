<template>
  <div class="json-editor">
    <textarea ref="comment" />
    <textarea style="height: 300px" ref="textarea" />
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/eclipse.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/javascript-lint'
// eslint-disable-next-line import/no-webpack-loader-syntax
// require('script-loader!jslint')
require('codemirror/addon/hint/show-hint')
require('codemirror/addon/hint/javascript-hint')

export default {
  name: 'JsonEditor',
  /* eslint-disable vue/require-prop-types */
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'text/javascript'
    },
    comment: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      jsonEditor: null
    }
  },
  watch: {
    value (value) {
      const editorValue = this.jsonEditor.getValue()
      if (value !== editorValue) {
        this.jsonEditor.setValue(this.value)
      }
    },
    disabled () {
      this.jsonEditor.setOption('readOnly', this.disabled)
    }
  },
  mounted () {
    if (this.comment) {
      const comment = CodeMirror.fromTextArea(this.$refs.comment, {
        lineNumbers: true,
        mode: this.mode,
        gutters: ['CodeMirror-lint-markers'],
        theme: 'eclipse',
        lint: true,
        tabSize: 2,
        indentWithTabs: true,
        hintOptions: {
          completeSingle: false
        }
      })
      comment.setOption('readOnly', true)
      comment.setValue(this.comment)
    }
    // 'text/javascript'
    this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true,
      mode: this.mode,
      gutters: ['CodeMirror-lint-markers'],
      theme: 'eclipse',
      lint: true,
      tabSize: 2,
      indentWithTabs: true,
      hintOptions: {
        completeSingle: false
      }
    })
    this.jsonEditor.on('inputRead', () => {
      this.jsonEditor.showHint()
    })
    this.jsonEditor.setValue(this.value)
    this.jsonEditor.on('change', cm => {
      this.$emit('changed', cm.getValue())
      this.$emit('input', cm.getValue())
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
      height: auto;
      // height: 300px;
    }

    .CodeMirror-scroll {
      // min-height: 300px;
    }

    .cm-s-rubyblue span.cm-string {
      color: #F08047;
    }
  }
}
</style>
