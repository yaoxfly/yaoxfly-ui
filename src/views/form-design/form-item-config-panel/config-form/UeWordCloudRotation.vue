<template>
  <div class="ue-component-wrapper">
    <el-switch
      :value="tempValue"
      size="small"
      :disabled="disabled"
      @input="handleInput"
    />
  </div>
</template>

<script>
import VModelMixin from './v-model-mixin'

export default {
  name: 'UeWordCloudRotation',
  mixins: [
    VModelMixin
  ],
  props: {
    trueValue: {
      type: [String, Object, Array, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Object, Array, Number, Boolean],
      default: true
    }
  },
  data () {
    return {
      tempValue: true
    }
  },
  created () {
    this.setTempValue(this.curValue)
  },
  methods: {
    setTempValue (value) {
      this.tempValue = JSON.stringify(value) === JSON.stringify(this.trueValue)
    },
    handleInput (value) {
      this.tempValue = value
      if (value) {
        this.$emit('input', this.trueValue)
      } else {
        this.$emit('input', this.falseValue)
      }
    }
  }
}
</script>
