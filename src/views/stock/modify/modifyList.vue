<template>
    <div class="app-container order-info-padding">
            待开发
    </div>
  </template>
  
  <script>
    // import { getGoodssuiteList,editGoodssuite,addGoodssuite,disableGoodssuite,importGoodssuite,exportGoodssuite,getGoods,getSuitedetail } from "@/api/goods/goodssuite";
    export default {
      name: 'Goodssuite',
      data() {
        return {

        }
      },
      created() {
          this.jsHeight = window.innerHeight - $('.head-container').outerHeight() - $('.crud-opts').outerHeight() - 180
      },
      mounted() {
        //   this.loadData()
          // 设置表格高度
          this.jsHeight = window.innerHeight - $('.head-container').outerHeight() - $('.crud-opts').outerHeight() - 180
          // / 监听浏览器窗口变化，动态计算表格高度，
          window.onresize = () => {
          return (() => {
              this.jsHeight = window.innerHeight - $('.head-container').outerHeight() - $('.crud-opts').outerHeight() - 180
          })()
          }
      },
      activated() {
        this.$nextTick(() => {
          this.$refs.plTable.doLayout(); //解决表格错位
        });
      },
      methods: {

      }
    }
  </script>
  <style scoped>

  </style>
  
  