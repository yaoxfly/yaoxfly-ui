<template>
  <div>
    <el-form-item :label="minLabel" label-width="100px">
      <div style="padding: 0 5px;">
        <template v-if="inputType === 'ColorPicker'">
          <ue-color-picker no-wrapper-class :value="curValue[0]" @input="handleInput(0, $event)" />
        </template>
        <template v-else>
          <el-input-number
            v-if="type === 'Number'"
            :value="curValue[0]"
            style="width: 100%"
            size="small"
            :disabled="disabled"
            :min="6"
            :step="1"
            @input="handleInput(0, $event)"
          />
          <el-input
            v-else
            :value="curValue[0]"
            style="width: 100%"
            size="small"
            maxlength="50"
            @input="handleInput(0, $event)"
          />
        </template>
      </div>
    </el-form-item>
    <el-form-item
      :label="maxLabel"
      label-width="100px"
    >
      <div style="padding: 0 5px;">
        <template v-if="inputType === 'ColorPicker'">
          <ue-color-picker no-wrapper-class :value="curValue[1]" @input="handleInput(1, $event)" />
        </template>
        <template v-else>
          <el-input-number
            v-if="type === 'Number'"
            :value="curValue[1]"
            style="width: 100%"
            size="small"
            :disabled="disabled"
            :min="18"
            :step="1"
            @input="handleInput(1, $event)"
          />
          <el-input
            v-else
            :value="curValue[1]"
            style="width: 100%"
            size="small"
            maxlength="50"
            @input="handleInput(1, $event)"
          />
        </template>
      </div>
    </el-form-item>
  </div>
</template>

<script>
import UeColorPicker from '@/components/UeChartConfigForm/UeColorPicker'
import VModelMixin from './v-model-mixin'
import clonedeep from 'clonedeep'

export default {
  name: 'UeSizeRange',
  components: {
    UeColorPicker
  },
  mixins: [
    VModelMixin
  ],
  props: {
    minLabel: {
      type: String,
      default: '最小范围'
    },
    maxLabel: {
      type: String,
      default: '最大范围'
    },
    type: {
      type: String,
      default: 'String'
    },
    inputType: {
      type: String,
      default: 'Input'
    }
  },
  methods: {
    handleInput (index, value) {
      const newValue = clonedeep(this.curValue)
      newValue[index] = value
      this.$emit('input', newValue)
    }
  }
}
</script>
