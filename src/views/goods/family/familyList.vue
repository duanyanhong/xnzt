<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--用户数据-->
      <el-col>
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
              v-hasPermi="['Goods:Family:Add']"
            >
              新增
            </el-button>
            <el-button
                type="info"
                plain
                icon="el-icon-sort"
                size="mini"
                @click="toggleExpandAll"
              >展开/折叠
            </el-button>
            <!--右侧-->
            <slot name="right" />
          </span>
        </div>
        <u-table
          ref="plTable"
          v-if="refreshTable"
          v-loading="loading"
          :data="dataList"
          use-virtual
          row-key="id"
          :row-height="50"
          :default-expand-all="isExpandAll"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          stripe
          :header-cell-style="{background:'#f8f8f9', color:'#515a6e', fontSize:'13px',height:'45px',border:'none'}"
          :cell-style="{border:'none'}"
        >
          <u-table-column :show-overflow-tooltip="true" prop="familyName" label="分类名称" />
          <u-table-column :show-overflow-tooltip="true" prop="createTime" label="创建时间" />
          <u-table-column label="禁用"  align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.disable == '是'" type="danger" >{{ scope.row.disable }}</el-tag>
              <el-tag v-else-if="scope.row.disable == '否'" type="success" >{{ scope.row.disable }}</el-tag>
            </template>
          </u-table-column>
          <u-table-column
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button v-hasPermi="['Goods:Family:Edit']" size="mini" type="text" style="width: 50px;" icon="el-icon-edit" @click="editStaff(scope.row)">修改</el-button>
              <el-popover v-hasPermi="['Goods:Family:Disable']" v-if="scope.row.disable=='否'" :ref="`popover-${scope.$index}`" placement="top" width="200">
                <p style="line-height:40px"><i class="el-icon-info" style="color:rgb(255,153,0)" /> 确定禁用吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[`popover-${scope.$index}`].doClose()">取消</el-button>
                  <el-button type="primary" size="mini" @click="editDisable(scope)">确定</el-button>
                </div>
                <el-button slot="reference" style="width: 50px;" type="text" icon="el-icon-lock" size="mini">禁用</el-button>
              </el-popover>
              <el-popover v-hasPermi="['Goods:Family:Disable']" v-if="scope.row.disable=='是'" :ref="`popover-${scope.$index}`" placement="top" width="200">
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
      </el-col>
    </el-row>
    <!--表单渲染-->
    <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="formIsshow" :title="titleContent" width="500px">
      <el-form ref="formData" :inline="true" :model="formData" :rules="rules" size="small" label-width="120px">
        <el-form-item label="上级菜单" prop="familyPid">
          <el-select
            v-model="formData.familyPid"
            style="width: 250px"
            placeholder="请选择"
          >
            <el-option value="主类目">主类目</el-option>
            <el-option
              v-for="item in goodsfamily"
              :key="item.id"
              :label="item.familyName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" prop="familyName">
          <el-input v-model="formData.familyName" style="width: 250px" placeholder="请输入分类名称" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="formIsshow=false">取消</el-button>
        <el-button type="primary" v-debounce="addForm" >确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getGoodsfamilyList,editGoodsfamily,addGoodsfamily,disableGoodsfamily,getGoodsfamily } from "@/api/goods/goodsclass";
export default {
  name: 'Goodsfamily',
  data() {
    return {
      rules: {
        familyPid: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        familyName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      dataList: [],
      goodsfamily: [],
      loading: false,
      formIsshow: false,
      formData: {
        id: '',
        familyPid: '',
        familyName: '',
        accessToken: sessionStorage.getItem('xn_token')
      },
      isExpandAll: true,
      refreshTable:true,
      editStatus: false,
      titleContent: '管理商品分类'
    }
  },
  mounted() {
    this.loadData()
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
      const data = {accessToken: sessionStorage.getItem('xn_token')}
      getGoodsfamilyList(data).then(res => {
        if(res){
          this.loading = false
          this.dataList = res.msgData.goodsfamily
        }
      })
    },
    // 搜索
    search() {
      this.page = 1
      this.loadData()
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
      const data = {accessToken: sessionStorage.getItem('xn_token')}
      getGoodsfamily(data).then(res => {
        if(res){
          this.goodsfamily = res.msgData.goodsfamily
          this.formIsshow = true
        }
      })
    },
    addForm() {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          var _this = this
          if (_this.editStatus) {
            editGoodsfamily(_this.formData).then(res => {
              if(res){
                _this.formIsshow = false
                _this.$modal.notifySuccess(res.errMsg)
                _this.loadData()
              }
            })
          } else {
            addGoodsfamily(_this.formData).then(res => {
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
    editStaff(row) {
      if (this.$refs['formData'] !== undefined) {
        this.$refs['formData'].resetFields()
      }
      for(var key in this.formData){
        if(key!='accessToken'){
          this.formData[key]=row[key]
        }
        if(row.familyPid==0){
          this.formData.familyPid = '主类目'
        }
      }
      const data = {accessToken: sessionStorage.getItem('xn_token')}
      getGoodsfamily(data).then(res => {
        if(res){
          this.goodsfamily = res.msgData.goodsfamily
          this.editStatus = true
          this.formIsshow = true
        }
      })
    },
    toggleExpandAll() {
      this.refreshTable = false;
      this.isExpandAll = !this.isExpandAll;
      this.$nextTick(() => {
        this.refreshTable = true;
      });
    },
    editDisable(scope) {
      this.$refs[`popover-${scope.$index}`].doClose()
      const data = {id: scope.row.id, accessToken: sessionStorage.getItem('xn_token')}
      disableGoodsfamily(data).then(res => {
        if(res){
          this.$modal.notifySuccess(res.errMsg)
          this.loadData()
        }
      })
    }
  }
}
</script>

