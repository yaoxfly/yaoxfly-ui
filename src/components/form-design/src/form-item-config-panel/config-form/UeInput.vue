<template>
  <div class="ue-component-wrapper">
    <!-- 只有数值类型可以选 -->
    <el-checkbox v-if="autoNumber && type === 'Number'" :value="curValue === 'auto'" @input="handleAutoInput">自动适应</el-checkbox>
    <template v-if="!auto">
      <el-input-number
        v-if="type === 'Number'"
        v-model="curValue"
        style="width: 100%"
        size="small"
        :disabled="disabled || auto"
        :min="min"
        :max="max"
        :step="step"
        :precision="precision"
        :placeholder="placeholder"
        @blur="handleBlur"
      />
      <el-input
        v-else
        v-model="curValue"
        style="width: 100%"
        size="small"
        :disabled="disabled || auto"
        :type="type"
        :rows="rows"
        :maxlength="maxlength"
        :placeholder="placeholder"
        @blur="handleBlur"
      />
    </template>
  </div>
</template>

<script>
import VModelMixin from './v-model-mixin'

export default {
  name: 'UeInput',
  mixins: [
    VModelMixin
  ],
  props: {
    type: {
      type: String,
      default: String
    },
    min: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    rows: {
      type: Number,
      default: 3
    },
    step: {
      type: Number,
      default: 1
    },
    autoNumber: {
      type: Boolean,
      default: false
    },
    precision: {
      type: Number,
      default: 0
    },
    maxlength: {
      type: Number,
      default: 50
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  computed: {
    auto () {
      return this.curValue === 'auto'
    }
  },
  methods: {
    handleAutoInput () {
      if (this.curValue === 'auto') {
        this.curValue = null
      } else {
        this.curValue = 'auto'
      }
    },
    handleBlur () {
      this.$emit('blur', this.curValue)
    }
  }
}
</script>
