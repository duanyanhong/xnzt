<template>
  <div>
    <el-table
      :data="fieldList"
      border
      height="520"
      highlight-current-row
      @row-click="handleCurrentChange"
      style="width: 100%">
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column
        prop="englishName"
        label="字段">
      </el-table-column>
      <el-table-column
        prop="chineseName"
        label="名称">
      </el-table-column>
      <el-table-column
        width="80"
        align="center"
        label="是否显示">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.view"></el-checkbox>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px;">
      <el-button
        size="mini"
        icon="el-icon-top"
        style="width: 100px;"
        @click="moveUp()"
      >
        上移
      </el-button>
      <el-button
        size="mini"
        icon="el-icon-bottom"
        style="width: 100px;"
        @click="moveDown()"
      >
        下移
      </el-button>
      <el-button
        size="mini"
        icon="el-icon-s-promotion"
        style="width: 100px;"
        @click="moveTo()"
      >
        移动至
      </el-button>
      <el-input v-model="toNumber" clearable style="width: 80px;margin-right: 10px;margin-left: 3px;" size="mini"></el-input>
      <el-button
        size="mini"
        icon="el-icon-refresh"
        style="width: 100px;"
        @click="reset"
      >
        重置
      </el-button>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      fieldList: {
        type: Array,
        required: []
      },
      oldList: {
        type: Array,
        required: []
      }
    },
    data() {
      return {
        selectIndex:'',
        toNumber:''
      }
    },
    watch:{
      fieldList:{
        handler(val){
          this.fieldList = val
        }
      }
    },
    methods: {
      // 上移
      moveUp() {
        if(this.selectIndex === ''){
          this.$modal.notifyWarning('请选择一行！')
          return
        }
        if (this.selectIndex > 0) {
          const upDate = this.fieldList[this.selectIndex - 1];
          this.fieldList.splice(this.selectIndex - 1, 1);
          this.fieldList.splice(this.selectIndex, 0, upDate);
          this.selectIndex = this.selectIndex - 1
        } else {
          this.$modal.notifyWarning('已经是第一条，不可上移！')
        }
      },
      // 下移
      moveDown() {
        if(this.selectIndex ===''){
          this.$modal.notifyWarning('请选择一行！')
          return
        }
        if (this.selectIndex + 1 === this.fieldList.length) {
          this.$modal.notifyWarning('已经是最后一条，不可下移！')
        } else {
          const downDate = this.fieldList[this.selectIndex + 1];
          this.fieldList.splice(this.selectIndex + 1, 1);
          this.fieldList.splice(this.selectIndex, 0, downDate);
          this.selectIndex = this.selectIndex + 1
        }
      },
      //转到
      moveTo(){
        if(this.selectIndex ===''){
          this.$modal.notifyWarning('请选择一行！')
          return
        }
        if(this.toNumber<1 || this.toNumber>this.fieldList.length){
          this.$modal.notifyWarning('请输入正确的位置移动！')
          return
        }
        const toDate = this.fieldList[this.selectIndex];
        this.fieldList.splice(this.selectIndex , 1);
        this.fieldList.splice(this.toNumber - 1, 0, toDate);
        this.selectIndex = this.toNumber - 1
      },
      handleCurrentChange(row) {
        const index = this.fieldList.indexOf(row)
        this.selectIndex = index;
      },
      //重置
      reset(){
        this.selectIndex = ''
        this.$emit('update:fieldList', JSON.parse(JSON.stringify(this.oldList)))
      }
    }
  }
</script>
<style scoped lang="scss">
  .el-select-dropdown__list {
    height: 100%;
    overflow: hidden;

  }
  .select_up {
    padding: 0 14px;
    font-size: 14px;
    position: absolute;
    z-index: 99999;
    background-color: #ecebeb;
    top: 0px;
    width: 100%;
    border-radius: 5px 5px 0 0;
  }

  .select_up button{
    width: 20%;
    color: #606266;
  }
  .select_up button:hover{
    color: #409EFF;
  }

  .select_list {
    margin-top: 25px;
  }
  ::v-deep .el-table__body tr.current-row>td {
    background-color: #f3e2d3 !important;
  }
</style>
