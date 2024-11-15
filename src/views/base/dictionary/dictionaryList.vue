<template>
    <div class="app-container">
      <el-row :gutter="20">
        <!--用户数据-->
        <el-col>
          <!--工具栏-->
          <div class="head-container">
            <div>
              <!-- 搜索 -->
              <el-input
                v-model="searchData.typeName"
                clearable
                size="small"
                placeholder="输入类型名称搜索"
                style="width: 200px;"
                class="filter-item"
              />
              <el-input
                v-model="searchData.typeNumber"
                clearable
                size="small"
                placeholder="输入类型编号搜索"
                style="width: 200px;"
                class="filter-item"
              />
              <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </div>
          </div>
          <div class="crud-opts">
            <span class="crud-opts-left">
              <!--左侧插槽-->
              <slot name="left" />
              <el-button
                class="filter-item"
                size="mini"
                type="primary"
                icon="el-icon-plus"
                @click="addShow"
                plain
                v-hasPermi="['Base:Dictionary:Add']"
              >
                新增
              </el-button>
              <!--右侧-->
              <slot name="right" />
            </span>
          </div>
          <div v-if="dataList && dataList.length" class="tips-chunk"><span class="el-icon-warning"></span>双击可查看数据字典明细</div>
          <u-table
            ref="plTable"
            v-loading="loading"
            :data="dataList"
            :height="jsHeight"
            use-virtual
            :row-height="50"
            stripe
            highlight-current-row
            :header-cell-style="{background:'#f8f8f9', color:'#515a6e', fontSize:'13px',height:'45px',border:'none'}"
            :cell-style="{border:'none'}"
            @row-dblclick='show'
          >
            <u-table-column :show-overflow-tooltip="true" prop="typeNumber" label="类型编号" />
            <u-table-column :show-overflow-tooltip="true" prop="typeName" label="类型名称" />
            <u-table-column :show-overflow-tooltip="true" prop="createTime" label="创建时间" />
            <u-table-column :show-overflow-tooltip="true" prop="userAccount" label="创建账号" />
            <u-table-column
              label="操作"
              align="center"
            >
              <template slot-scope="scope">
                <el-button v-hasPermi="['Base:Dictionary:Edit']" size="mini" type="text" style="width: 50px;" icon="el-icon-edit" @click="editStaff(scope.row)">修改</el-button>
                <el-popover v-hasPermi="['Base:Dictionary:Disable']"  v-if="scope.row.disable=='否'" :ref="`popover-${scope.$index}`" placement="top" width="200">
                  <p style="line-height:40px"><i class="el-icon-info" style="color:rgb(255,153,0)" /> 确定禁用吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="$refs[`popover-${scope.$index}`].doClose()">取消</el-button>
                    <el-button type="primary" size="mini" @click="editDisable(scope)">确定</el-button>
                  </div>
                  <el-button slot="reference" style="width: 50px;" type="text" icon="el-icon-lock" size="mini">禁用</el-button>
                </el-popover>
                <el-popover  v-hasPermi="['Base:Dictionary:Disable']"   v-if="scope.row.disable=='是'" :ref="`popover-${scope.$index}`" placement="top" width="200">
                  <p style="line-height:40px"><i class="el-icon-info" style="color:rgb(255,153,0)" /> 确定启用吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="$refs[`popover-${scope.$index}`].doClose()">取消</el-button>
                    <el-button type="primary" size="mini" @click="editDisable(scope)">确定</el-button>
                  </div>
                  <el-button slot="reference" style="width: 50px;" class="el-button--success" type="text" icon="el-icon-unlock" size="mini">启用</el-button>
                </el-popover>
              </template>
            </u-table-column>
          </u-table>
          <!--分页组件-->
          <pagination
            :limit.sync="searchData.limit"
            :page.sync="searchData.page"
            :total="total"
            :page-sizes.sync="pageSizes"
            @pagination="loadData"
          />
        </el-col>
      </el-row>
      <!--表单渲染-->
      <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="formIsshow" :title="titleContent" width="500px">
        <el-form ref="formData" :inline="true" :model="formData" :rules="rules" size="small" label-width="120px">
          <el-form-item label="类型编号" prop="typeNumber">
            <el-input v-model="formData.typeNumber" :disabled="editStatus" style="width: 250px" placeholder="请输入类型编号" />
          </el-form-item>
          <el-form-item label="类型名称" prop="typeName">
            <el-input v-model="formData.typeName" style="width: 250px" placeholder="请输入类型名称" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="formIsshow=false">取消</el-button>
          <el-button type="primary" v-debounce="addForm" >确认</el-button>
        </div>
      </el-dialog>

    <!-- 明细抽屉 -->
      <el-drawer
          title="字典明细"
          :visible.sync="listShow"
          direction="rtl"
          size="60%">
          <div class="drawer-box">
              <el-button class="filter-item"  v-hasPermi="['Base:Dictionary:Adddetail']"  size="mini" type="primary"  icon="el-icon-plus" plain @click="handleAdd" >新增</el-button>
              <el-button class="filter-item"  v-hasPermi="['Base:Dictionary:Deletedetail']" size="mini" type="danger" icon="el-icon-delete" plain @click="handleDel">删除</el-button>
              <!-- <el-button class="filter-item" size="mini" type="info" icon="el-icon-paperclip" plain @click="handleDefault">设为默认</el-button> -->
          </div>
            <div v-if="gridData && gridData.length" class="tips-chunk"><span class="el-icon-warning"></span>双击可编辑明细</div>
            <el-table :data="gridData" @row-dblclick='show2' @selection-change="handleSelectionChange">
                <el-table-column prop="" label="" width="55" type="selection"> </el-table-column>
                <el-table-column prop="fieldName" label="字段名称"  :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="expect" label="值条件" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="fieldValue" label="字段值" :show-overflow-tooltip="true"></el-table-column>
                <!-- <el-table-column prop="fieldType" label="字段类型" :show-overflow-tooltip="true"></el-table-column> -->
                <!-- <el-table-column prop="itemName" label="系统创建"></el-table-column>
                <el-table-column prop="itemName" label="默认"></el-table-column> -->
            </el-table>

        </el-drawer>
     <!--明细编辑弹窗-->
        <el-dialog append-to-body top="5vh" :close-on-click-modal="false" :visible.sync="formList" title="新增编辑明细" width="700px">
            <el-form ref="formDataList" :inline="true" :model="listFormData" :rules="rulesList" size="mini" label-width="100px">
               <el-form-item label="类型编号" >
                  <el-input v-model="detailNumber" :disabled="true" style="width: 180px" placeholder="请输入类型编号" />
                </el-form-item>
                <el-form-item label="类型名称">
                  <el-input v-model="detailName"  :disabled="true" style="width: 180px" placeholder="请输入类型名称" />
                </el-form-item>
                <el-form-item label="字段名称" prop="fieldName">
                    <el-input v-model="listFormData.fieldName" style="width: 180px" placeholder="请输入字段名称" />
                </el-form-item>
                <el-form-item label="值条件" prop="expect">
                    <el-select
                        v-model="listFormData.expect"
                        style="width: 180px"
                        placeholder="请选择值条件"
                    >
                        <el-option value="=" label="=" />
                        <el-option value="==" label="==" />
                        <el-option value=">" label=">" />
                        <el-option value="<" label="<" />
                        <el-option value=">=" label=">=" />
                        <el-option value="<=" label="<=" />
                        <el-option value="!=" label="!=" />
                        <el-option value="in" label="in" />
                    </el-select>
                </el-form-item>
                <el-form-item label="字段值" prop="fieldValue">
                    <el-input v-model="listFormData.fieldValue" style="width: 180px" placeholder="请输入字段值" />
                </el-form-item>
                <!-- <el-form-item label="字段类型" prop="fieldType">
                    <el-input v-model="listFormData.fieldType" style="width: 180px" placeholder="请输入字段类型" />
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="text" @click="formList=false">取消</el-button>
                <el-button type="primary" v-debounce="handleSubmit" >确认</el-button>
            </div>
        </el-dialog>
    </div>
  </template>
  
  <script>
  import { dictionaryList,addDictionary,editDictionary,disableDictionary ,dictionaryDetailList ,addDictionaryDetail ,editDictionaryDetail,deleteDictionaryDetail} from "@/api/base/dictionary";
// import { get } from "jquery";
  export default {
    name: 'Process',
    data() {
      return {
        rulesList:{
            fieldName:[
             { required: true, message: '请输入字段名称', trigger: 'blur' }
            ], 
            fieldValue:[
             { required: true, message: '请输入字段值', trigger: 'blur' }
            ], 
            expect:[
             { required: true, message: '请选择类型编号', trigger: 'change' }
            ], 
        },
        rules: {
          typeNumber: [
            { required: true, message: '请输入类型编号', trigger: 'blur' }
          ],
          typeName: [
            { required: true, message: '请输入类型名称', trigger: 'blur' }
          ]
        },
        searchData: {
          typeNumber: '',
          typeName: '',
          limit: 20,
          page: 1,
          accessToken:sessionStorage.getItem('xn_token')
        },
        pageSizes: [20, 50, 100],
        dataList: [],
        gridData:[],
        total: 0,
        loading: false,
        formIsshow: false,
        listShow:false,
        formList:false,
        formData: {
          id: '',
          typeNumber: '',
          typeName: '',
          accessToken: sessionStorage.getItem('xn_token')
        },
        listFormData:{
            accessToken: sessionStorage.getItem('xn_token'),
            id:'',
            dictionaryId:'',
            fieldName:'',
            expect:'',
            fieldValue:'',
            // fieldType:''
        },
        jsHeight: 500,
        editStatus: false,
        editStatusList: false,
        titleContent: '管理数据字典',
        detailId:'',
        detailNumber:'',//主表的编号
        detailName:'', //主表的名称
        ids:[],
      }
    },
    created() {
          this.jsHeight = window.innerHeight - $('.head-container').outerHeight() - $('.crud-opts').outerHeight() - 180
    },
    mounted() {
        this.loadData()
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
      // 列表数据
      loadData() {
        this.loading = true
        dictionaryList(this.searchData).then(res => {
          if(res){
            this.loading = false
            this.dataList = res.msgData.list.items
            this.total = res.msgData.list.total
          }
        })
      },
    //   获取明细数据
      getListData() {

      },
      show(row) {
        console.log(row,'双击成功')
        this.gridData=[]
        this.detailId = row.id
        this.detailNumber = row.typeNumber
        this.detailName = row.typeName
        this.listShow = true
        this.getList()
       
      },
      show2(row) {
        console.log(row,'编辑')
        if (this.$refs['formDataList'] !== undefined) {
          this.$refs['formDataList'].resetFields()
        }
        for(var key in this.listFormData){
          if(key!='accessToken'){
            this.listFormData[key]=row[key]
          }
        }
        this.editStatusList = true
        this.formList = true
      },
      getList() {
        dictionaryDetailList({id:this.detailId,accessToken:sessionStorage.getItem('xn_token')}).then(res => {
            if(res){
                this.gridData = res.msgData.list

            }
        })
      },
      // 搜索
      search() {
        this.page = 1
        this.loadData()
      },
      // 勾选数据
      handleSelectionChange(value) {
        this.ids = []
        for (let k = 0; k < value.length; k++) {
          this.ids.push(value[k].id)
        }
      },
      // 添加用户
      addShow() {
        this.editStatus = false
        if (this.$refs['formData'] !== undefined) {
          this.$refs['formData'].resetFields()
        }
        for(var key in this.formData){
          if(key!='accessToken'){
            this.formData[key]=''
          }
        }
        this.formIsshow = true
      },
      addForm() {
        this.$refs['formData'].validate((valid) => {
          if (valid) {
            var _this = this
            if (_this.editStatus) {
             editDictionary(_this.formData).then(res => {
                if(res){
                  _this.formIsshow = false
                  _this.$modal.notifySuccess(res.errMsg)
                  _this.loadData()
                }
              })
            } else {
             addDictionary(_this.formData).then(res => {
                if(res){
                  _this.formIsshow = false
                  _this.$modal.notifySuccess(res.errMsg)
                  _this.loadData()
                }
              })
            }
          } else {
            return false
          }
        })
      },
      // 新增
      handleAdd() {
        this.editStatusList = false
        if (this.$refs['formDataList'] !== undefined) {
          this.$refs['formDataList'].resetFields()
        }
        for(var key in this.listFormData){
          if(key!='accessToken'){
            this.listFormData[key]=''
          }
        }
         this.formList = true
       },
      // 删除
       handleDel() {
        if(this.ids && !this.ids.length) {
            this.$message({
                message: '请勾选要删除的明细',
                type: 'error'
              });
              return
        }
        this.$confirm('确认点击删除?点击取消按钮将取消本次操作', '删除', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                deleteDictionaryDetail({
                    ids:JSON.parse(JSON.stringify(this.ids)),
                    dictionaryId:this.detailId,
                    accessToken:sessionStorage.getItem('xn_token')}).then(res => {
                if(res){
                  this.getList()
                  this.$modal.notifySuccess(res.errMsg)
                }
              })
            }).catch(() => {
            // this.$message({
            //     type: 'info',
            //     message: '已取消删除'
            // });          
            });

       },
    //    //设置默认
    //    handleDefault() {

    //    },
      editStaff(row) {
        if (this.$refs['formData'] !== undefined) {
          this.$refs['formData'].resetFields()
        }
        for(var key in this.formData){
          if(key!='accessToken'){
            this.formData[key]=row[key]
          }
        }
        this.editStatus = true
        this.formIsshow = true
      },
      handleSubmit() { 
        this.$refs['formDataList'].validate((valid) => {
          if (valid) {
            var _this = this
            if (_this.editStatusList) {
                this.listFormData.dictionaryId = this.detailId
                editDictionaryDetail(this.listFormData).then(res => {
                if(res){
                    this.$modal.notifySuccess(res.errMsg)
                    this.getList()
                    this.formList = false
                }
                })
            } else {
                this.listFormData.dictionaryId = this.detailId
                addDictionaryDetail(this.listFormData).then(res => {
                if(res){
                    this.$modal.notifySuccess(res.errMsg)
                    this.getList()
                    this.formList = false
                }
                })
            }
          } else {
            return false
          }
        })


      },
      editDisable(scope) {
        this.$refs[`popover-${scope.$index}`].doClose()
        const data = {id: scope.row.id, accessToken: sessionStorage.getItem('xn_token')}
        disableDictionary(data).then(res => {
          if(res){
            this.$modal.notifySuccess(res.errMsg)
            this.loadData()
          }
        })
      }
    }
  }
  </script>
  <style scoped lang="scss">
       ::v-deep .el-dialog__header {
    /* background: -webkit-gradient(linear, left top, left bottom, from(#1f2d3d), to(#426995)) !important;
    background: linear-gradient(180deg, #1f2d3d, #426995) !important; */
    border-bottom: 1px solid #eee;
  }
  ::v-deep .el-drawer {
    width: 40% !important;
    // padding-left: 30px;
  }

  .drawer-box {
    display: flex;
    align-items: center;
    margin: 0 0 20px 0;
    
  }
  .drawer-footer {
    display: flex;
    justify-content: flex-end;
    padding: 30px ;
   
  }
  ::v-deep .el-drawer__container .el-table {
    /* max-width: 700px !important; */
    max-height: 600px !important;
    overflow-y: scroll ;
  }

  /*滚动条整体样式,高宽分别对应横竖滚动条的尺寸*/
  .el-drawer__container .el-table::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  scrollbar-arrow-color:#898989;
}
/*滚动条里面小方块*/
.el-drawer__container .el-table::-webkit-scrollbar-thumb{
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: rgba(0,0,0,0.2);
  scrollbar-arrow-color:#898989;
}
/*滚动条里面轨道*/
  .el-drawer__container .el-table::-webkit-scrollbar-track{
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 0;
  background: rgba(0,0,0,0.1);
}

.tips-chunk {
    width: 100%;
    font-size: 12px;
    color: #f1b51d !important;
    span {
        margin-right: 5px;
        font-size: 14px;
    }
}

::v-deep .el-table__body-wrapper .el-table__row{
    cursor: pointer;
}

.base-chunk {
  font-size: 16px;
  font-weight: 700;
  color: #111;
  margin-bottom: 10px;
}
::v-deep .el-drawer__header span {
  font-size: 18px;
  font-weight: 700;
}
::v-deep .el-drawer__body {
  padding-left: 30px;
}
</style>
  