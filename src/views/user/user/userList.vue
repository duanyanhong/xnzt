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
              v-model="searchData.userAccount"
              clearable
              size="small"
              placeholder="输入账号搜索"
              style="width: 200px;"
              class="filter-item"
            />
            <el-input
              v-model="searchData.userName"
              clearable
              size="small"
              placeholder="输入用户名搜索"
              style="width: 200px;"
              class="filter-item"
            />
            <el-select
              v-model="searchData.roleId"
              clearable
              size="small"
              placeholder="角色"
              class="filter-item"
              style="width: 150px"
            >
              <el-option value="">全部</el-option>
              <el-option
                v-for="item in role"
                :key="item.id"
                :label="item.roleName"
                :value="item.id"
              />
            </el-select>
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
              v-hasPermi="['User:User:Add']"
            >
              新增
            </el-button>
            <!--右侧-->
            <slot name="right" />
          </span>
        </div>
        <u-table
          ref="plTable"
          v-loading="loading"
          :data="dataList"
          :height="jsHeight"
          use-virtual
          :row-height="50"
          stripe
          :header-cell-style="{background:'#f8f8f9', color:'#515a6e', fontSize:'13px',height:'45px',border:'none'}"
          :cell-style="{border:'none'}"
        >
          <u-table-column :show-overflow-tooltip="true" prop="userAccount" label="账号" />
          <u-table-column :show-overflow-tooltip="true" prop="userName" label="用户名" />
          <u-table-column :show-overflow-tooltip="true" prop="nickName" label="昵称" />
          <u-table-column :show-overflow-tooltip="true" prop="mobileNo" label="手机号" />
          <u-table-column :show-overflow-tooltip="true" prop="roleName" label="角色" />
          <u-table-column :show-overflow-tooltip="true" prop="companyName" label="公司" />
          <u-table-column :show-overflow-tooltip="true" prop="departmentName" label="部门" />
          <u-table-column :show-overflow-tooltip="true" prop="expireTime" label="到期时间" />
          <u-table-column label="锁定" width="100" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.lock == '是'" type="danger" >{{ scope.row.lock }}</el-tag>
              <el-tag v-else-if="scope.row.lock == '否'" type="success" >{{ scope.row.lock }}</el-tag>
            </template>
          </u-table-column>
          <u-table-column label="禁用" width="100" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.disable == '是'" type="danger" >{{ scope.row.disable }}</el-tag>
              <el-tag v-else-if="scope.row.disable == '否'" type="success" >{{ scope.row.disable }}</el-tag>
            </template>
          </u-table-column>
          <u-table-column
            label="操作"
            width="185"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button v-hasPermi="['User:User:Edit']" size="mini" type="text" style="width: 50px;" icon="el-icon-edit" @click="editStaff(scope.row)">修改</el-button>
              <el-popover v-hasPermi="['User:User:Disable']" v-if="scope.row.disable=='否'" :ref="`popover-${scope.$index}`" placement="top" width="200">
                <p style="line-height:40px"><i class="el-icon-info" style="color:rgb(255,153,0)" /> 确定禁用吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[`popover-${scope.$index}`].doClose()">取消</el-button>
                  <el-button type="primary" size="mini" @click="editDisable(scope)">确定</el-button>
                </div>
                <el-button slot="reference" style="width: 50px;" type="text" icon="el-icon-lock" size="mini">禁用</el-button>
              </el-popover>
              <el-popover v-hasPermi="['User:User:Disable']" v-if="scope.row.disable=='是'" :ref="`popover-${scope.$index}`" placement="top" width="200">
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
    <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="formIsshow" :title="titleContent" width="650px">
      <el-form ref="formData" :inline="true" :model="formData" :rules="rules" size="small" label-width="80px">
        <el-form-item label="账号" prop="userAccount">
          <el-input v-if="editStatus==true" style="width: 200px"  placeholder="请输入账号" v-model="formData.userAccount" disabled />
          <el-input v-if="editStatus==false" style="width: 200px" placeholder="请输入账号" v-model="formData.userAccount" />
        </el-form-item>
        <el-form-item v-if="editStatus==false" label="密码" prop="userPwd">
          <el-input v-model="formData.userPwd" style="width: 200px" auto-complete="new-password" placeholder="请输入密码" type="password" />
        </el-form-item>
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="formData.userName" style="width: 200px" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="formData.nickName" style="width: 200px" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="手机" prop="mobileNo">
          <el-input v-model="formData.mobileNo" style="width: 200px" placeholder="请输入手机" />
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select
            v-model="formData.roleId"
            style="width: 200px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in role"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="公司" prop="companyId">
          <el-select
            v-model="formData.companyId"
            style="width: 200px"
            placeholder="请选择"
            @change="getDepartment"
          >
            <el-option
              v-for="item in company"
              :key="item.companyId"
              :label="item.companyName"
              :value="item.companyId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="departmentId">
          <el-select
            v-model="formData.departmentId"
            style="width: 200px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in department"
              :key="item.departmentId"
              :label="item.departmentName"
              :value="item.departmentId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="到期时间" prop="expireTime">
          <el-date-picker
            v-model="formData.expireTime"
            style="width: 200px;"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item v-show="editStatus==true" label="是否锁定" prop="lock">
          <el-select
            v-model="formData.lock"
            style="width: 200px"
            placeholder="请选择"
          >
            <el-option value="是" label="是" />
            <el-option value="否" label="否" />
          </el-select>
        </el-form-item>
        <el-form-item v-show="editStatus==true" label="重置密码" prop="resetPwd">
          <el-select
            v-model="formData.resetPwd"
            style="width: 200px"
            placeholder="请选择"
          >
            <el-option value="是" label="是" />
            <el-option value="否" label="否" />
          </el-select>
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
import { getUserList,editUser,addUser,disableUser,getDepartment } from "@/api/user/user";
export default {
  name: 'User',
  data() {
    return {
      rules: {
        userAccount: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        userPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        mobileNo: [
          { required: true, trigger: 'blur', message: '请输入手机号' }
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        companyId: [
          { required: true, message: '请选择公司', trigger: 'change' }
        ],
        departmentId: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        expireTime: [
          { required: true, message: '请选择到期时间', trigger: 'change' }
        ]
      },
      searchData: {
        userAccount: '',
        roleId: '',
        userName: '',
        limit: 20,
        page: 1,
        accessToken:sessionStorage.getItem('xn_token')
      },
      pageSizes: [20, 50, 100],
      dataList: [],
      total: 0,
      loading: false,
      formIsshow: false,
      formData: {
        id: '',
        userAccount: '',
        userName: '',
        nickName: '',
        userPwd: '',
        mobileNo: '',
        roleId: '',
        resetPwd: '',
        lock: '',
        companyId:'',
        departmentId:'',
        expireTime: '',
        accessToken: sessionStorage.getItem('xn_token')
      },
      jsHeight: 500,
      editStatus: false,
      titleContent: '管理用户',
      company:[],
      department:[],
      role:[]
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
      getUserList(this.searchData).then(res => {
        if(res){
          this.loading = false
          this.dataList = res.msgData.list.items
          this.total = res.msgData.list.total
          this.company = res.msgData.company
          this.role = res.msgData.role
          this.jsHeight = window.innerHeight - $('.head-container').outerHeight() - $('.crud-opts').outerHeight() - 180
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
      this.department = []
      this.formData.departmentId = ''
      this.formData.companyId = ''
      this.formData.userAccount = ''
      this.formData.userName = ''
      this.formData.nickName = ''
      this.formData.mobileNo = ''
      this.formData.userPwd = ''
      this.formData.expireTime = ''
      this.formData.id = ''
      this.formData.roleId = ''
      this.formData.lock = '否'
      this.formData.resetPwd = '否'
      this.formIsshow = true
    },
    addForm() {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          var _this = this
          if (_this.editStatus) {
            editUser(_this.formData).then(res => {
              if(res){
                _this.formIsshow = false
                _this.$modal.notifySuccess(res.errMsg)
                _this.loadData()
              }
            })
          } else {
            addUser(_this.formData).then(res => {
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
      const data = {companyId:row.companyId,accessToken: sessionStorage.getItem('xn_token')}
      getDepartment(data).then(res => {
        if(res){
          this.department = res.msgData.departments
          this.formData.companyId = row.companyId
          this.formData.departmentId = row.departmentId
          this.formData.userAccount = row.userAccount
          this.formData.userName = row.userName
          this.formData.nickName = row.nickName
          this.formData.gender = row.gender
          this.formData.mobileNo = row.mobileNo
          this.formData.expireTime = row.expireTime
          this.formData.userPwd = row.userPwd
          this.formData.id = row.id
          this.formData.roleId = row.roleId
          this.formData.lock = row.lock
          this.formData.resetPwd = '否'
          this.editStatus = true
          this.formIsshow = true
        }
      })
    },
    editDisable(scope) {
      this.$refs[`popover-${scope.$index}`].doClose()
      const data = {id: scope.row.id, accessToken: sessionStorage.getItem('xn_token')}
      disableUser(data).then(res => {
        if(res){
          this.$modal.notifySuccess(res.errMsg)
          this.loadData()
        }
      })
    },
    getDepartment(){
      this.formData.departmentId = ''
      const data = {companyId:this.formData.companyId,accessToken: sessionStorage.getItem('xn_token')}
      getDepartment(data).then(res => {
        if(res){
          this.department = res.msgData.departments
        }
      })
    }
  }
}
</script>

