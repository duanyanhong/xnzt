<template>
  <el-dialog append-to-body :close-on-click-modal="false" :visible="visible" :title="title" center width="500px" @close="close">
    <el-form :inline="true" size="small">
      <el-input v-model="content" placeholder="多个单号用逗号或换行隔开" resize="none" type="textarea" :autosize="{ minRows: 20, maxRows: 20}"  />
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确认</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'InputDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    searchContent: {
      type: String,
      default: ''
    }
  },
  computed: {
    content: {
      get() {
        return this.searchContent
      },
      set(value) {
        this.$emit('update:searchContent', value)
      }
    }
  },
  methods: {
    handleConfirm() {
      this.$emit('confirmed')
    },
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
