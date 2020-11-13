<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FdDiv',
  props: {
    backfill: {
      type: Boolean,
      default: false
    },
    // api / table  接口回填/数据表回填
    mode: {
      type: String,
      default: ''
    },
    // 接口地址
    apiUrl: {
      type: String,
      default: ''
    },
    // 数据表名
    tableName: {
      type: String,
      default: ''
    },
    // 字段名称
    fieldNames: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    setRemoteData () {
      return new Promise(resolve => {
        const data = {}
        if (this.fieldNames.length > 0 && this.backfill) {
          // 对于不同的回填模式设置不同的回填逻辑
          // setTimeout(() => {
          //   this.fieldNames.forEach((fieldName, idx) => {
          //     data[fieldName] = `${idx}_d`
          //   })
          //   resolve(data)
          // }, 2000)
        } else {
          resolve(data)
        }
      })
    }
  },
  mounted () {
    if (this.fieldNames.length > 0 && this.backfill) {
      this.$emit('remote-data-setter', this)
    }
  }
}
</script>
