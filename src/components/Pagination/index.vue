<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :pager-count="pagerCount"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>

  export default {
    name: 'Pagination',
    props: {
      total: {
        required: true,
        type: Number
      },
      page: {
        type: Number,
        default: 1
      },
      limit: {
        type: Number,
        default: 20
      },
      pageSizes: {
        type: Array,
        default() {
          return [10, 20, 30, 50]
        }
      },
      pagerCount: {
        type: Number,
        default: 7
      },
      layout: {
        type: String,
        default: 'total, prev, pager, next, sizes'
      },
      background: {
        type: Boolean,
        default: false
      },
      autoScroll: {
        type: Boolean,
        default: true
      },
      hidden: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
      }
    },
    computed: {
      currentPage: {
        get() {
          return this.page
        },
        set(val) {
          this.$emit('update:page', val)
        }
      },
      pageSize: {
        get() {
          return this.limit
        },
        set(val) {
          this.$emit('update:limit', val)
        }
      }
    },
    methods: {
      handleSizeChange(val) {
        if (this.currentPage * val > this.total) {
          this.currentPage = 1
        }
        this.$emit('pagination', { page: this.currentPage, limit: val })
      },
      handleCurrentChange(val) {
        this.$emit('pagination', { page: val, limit: this.pageSize })
      }
    }
  }
</script>

<style scoped>
  .pagination-container {
    background: #fff;
    white-space: nowrap;
    padding: 2px 5px;
    color: #303133;
    font-weight: 700;
    margin-top: 1px;
    display: flex;
    justify-content: flex-end;
  }
  .pagination-container.hidden {
    display: none;
  }
</style>
