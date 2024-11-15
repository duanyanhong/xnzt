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
              v-hasPermi="['User:Role:Add']"
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
          <u-table-column :show-overflow-tooltip="true" prop="roleName" label="角色名称" />
          <u-table-column label="是否禁用">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.disable == '是'" type="danger">{{ scope.row.disable }}</el-tag>
              <el-tag v-else-if="scope.row.disable == '否'" type="success">{{ scope.row.disable }}</el-tag>
            </template>
          </u-table-column>
          <u-table-column
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button v-hasPermi="['User:Role:Edit']" size="mini" type="text" style="width: 50px;" icon="el-icon-edit" @click="editStaff(scope.row)">修改</el-button>
              <el-popover v-hasPermi="['User:Role:Disable']" v-if="scope.row.disable=='否'" :ref="`popover-${scope.$index}`" placement="top" width="200">
                <p style="line-height:40px"><i class="el-icon-info" style="color:rgb(255,153,0)" /> 确定禁用吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[`popover-${scope.$index}`].doClose()">取消</el-button>
                  <el-button type="primary" size="mini" @click="editDisable(scope)">确定</el-button>
                </div>
                <el-button slot="reference" style="width: 50px;" type="text" icon="el-icon-lock" size="mini">禁用</el-button>
              </el-popover>
              <el-popover v-hasPermi="['User:Role:Disable']" v-if="scope.row.disable=='是'" :ref="`popover-${scope.$index}`" placement="top" width="200">
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
          :limit.sync="limit"
          :page.sync="page"
          :total="total"
          :page-sizes.sync="pageSizes"
          @pagination="loadData"
        />
      </el-col>
    </el-row>
    <!--表单渲染-->
    <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="formIsshow" :title="titleContent" width="600px">
      <el-form ref="formData" :inline="true" :model="formData" :rules="rules" size="small" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="formData.roleName" placeholder="请输入角色名称" style="width: 400px" />
        </el-form-item>
        <el-form-item>
          <div style="width: 280px;float: left;" class="lefts-menu">
            <div style="margin-left: 10px;font-weight: bold">菜单权限</div>
            <el-tree
              ref="tree"
              :data="menus"
              show-checkbox
              :default-checked-keys="defaultSelect"
              node-key="id"
              :default-expand-all="true"
              :expand-on-click-node="false"
              @check="currentChecked"
              @node-click="handleNodeClick"
              :style="{height: '350px',overflow:'auto'}"
            />
          </div>
          <div style="width: 220px;float: right;margin-left: 20px; ">
            <div style="font-weight: bold">按钮权限<span v-if="title!=''">({{title}})</span></div>
            <el-checkbox-group v-model="formData.buttonCode"  style="align-items:baseline;height:350px;overflow-y: auto;">
              <el-checkbox style="width: 180px !important;" v-for="(item,index) in buttons" :label="item.buttonCode" :key="item.buttonCode">{{item.buttonName}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="formIsshow=false">取消</el-button>
        <el-button type="primary" v-debounce="addForm">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getRoleList,disableRole,editRole,addRole,getButton } from "@/api/user/role";
  export default {
    name: 'Role',
    data() {
      return {
        rules: {
          roleName: [
            { required: true, message: '请输入角色名称', trigger: 'blur' }
          ],
          menuId: [
            { type: 'array', required: true, message: '请至少选择一个权限', trigger: 'change' }
          ]
        },
        dataList: [],
        total: 0,
        loading: false,
        formIsshow: false,
        formData: {
          id: '',
          roleName: '',
          menuId: [],
          buttonCode: [],
          accessToken: sessionStorage.getItem('xn_token')
        },
        jsHeight: 500,
        editStatus: false,
        titleContent: '管理角色',
        menus: [],
        buttons: [],
        defaultSelect: [],
        title:'',
        limit: 20,
        page: 1,
        pageSizes: [20, 50, 100]
      }
    },
    created() {
        this.jsHeight = window.innerHeight  - $('.crud-opts').outerHeight() - 180
    },
    mounted() {
        this.loadData()
        // 设置表格高度
        this.jsHeight = window.innerHeight - $('.crud-opts').outerHeight() - 180
        // / 监听浏览器窗口变化，动态计算表格高度，
        window.onresize = () => {
        return (() => {
            this.jsHeight = window.innerHeight  - $('.crud-opts').outerHeight() - 180
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
        const searchData = {page: this.page, limit: this.limit, accessToken: sessionStorage.getItem('xn_token')}
        getRoleList(searchData).then(res => {
          if(res){
            this.loading = false
            this.dataList = res.msgData.list.items
            this.total = res.msgData.list.total
            this.menus = res.msgData.menus
            this.jsHeight = window.innerHeight - $('.crud-opts').outerHeight() - 180
          }
        })
      },
      // 添加用户
      addShow() {
        this.editStatus = false
        if (this.$refs['formData'] !== undefined) {
          this.$refs['formData'].resetFields()
        }
        this.formData.roleName = ''
        if (this.$refs.tree !== undefined) {
          this.$refs.tree.setCheckedKeys([])
        }
        this.formData.menuId = []
        this.formData.buttonCode = []
        this.defaultSelect = []
        this.buttons = []
        this.title = ''
        this.formIsshow = true
      },
      addForm() {
        this.$refs['formData'].validate((valid) => {
          if (valid) {
            var _this = this
            if (_this.editStatus) {
              editRole(_this.formData).then(res => {
                if(res){
                  _this.formIsshow = false
                  _this.$modal.notifySuccess(res.errMsg)
                  _this.loadData()
                }
              })
            } else {
              addRole(_this.formData).then(res => {
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
        if (this.$refs.tree !== undefined) {
          this.$refs.tree.setCheckedKeys([])
        }
        this.formData.id = row.id
        this.formData.roleName = row.roleName
        this.defaultSelect = JSON.parse(JSON.stringify(row.menuIds))
        if (this.$refs.tree !== undefined) {
          this.$refs.tree.setCheckedKeys(JSON.parse(JSON.stringify(row.menuIds)))
        }
        this.formData.menuId =  JSON.parse(JSON.stringify(row.menuIds))
        this.formData.buttonCode = JSON.parse(JSON.stringify(row.buttonCodes))
        this.buttons = []
        this.title = ''
        this.editStatus = true
        this.formIsshow = true
      },
      editDisable(scope) {
        this.$refs[`popover-${scope.$index}`].doClose()
        const data = {id: scope.row.id, accessToken: sessionStorage.getItem('xn_token')}
        disableRole(data).then(res => {
          if(res){
            this.$modal.notifySuccess(res.errMsg)
            this.loadData()
          }
        })
      },
      currentChecked(node) {
        this.formData.menuId = this.$refs.tree.getCheckedKeys()
        const isCheck = this.$refs.tree.getCheckedNodes().indexOf(node) > -1
        //判断点击是否是一级分类
        this.menus.forEach((one) => {
          if(one.id==node.id)
          {
            this.getAllButton(one,isCheck)
            return
          }
          //判断点击是否是二级分类
          one.children.forEach((two) => {
            if(two.id==node.id)
            {
              this.getAllButton(two,isCheck)
              return
            }
            //判断点击是否是三级分类
            two.children.forEach((tree) => {
              if(tree.id==node.id)
              {
                this.getAllButton(tree,isCheck)
                return
              }
            })
          })
        })
      },
      getAllButton(data,isCheck){
        this.title = data.label
        this.buttons = []
        //点击一级分类
        if(data.component =='Layout')
        {
          //循环二级分类
          data.children.forEach((item) => {
            //判断二级有没有三级分类
            if(item.component=='ParentView')
            {
              //循环三级分类
              item.children.forEach((parent) => {
                this.setMenuButton(parent.id,isCheck,false)
              })
            }
            else
            {
              this.setMenuButton(item.id,isCheck,false)
            }
          })
        }
        //点击二级分类
        if(data.component =='ParentView')
        {
          //循环三级分类
          data.children.forEach((item) => {
            this.setMenuButton(item.id,isCheck,false)
          })
        }
        //点击三级分类
        if(data.component !='Layout' && data.component !='ParentView')
        {
          this.setMenuButton(data.id,isCheck,true)
        }
      },
      setMenuButton(menuId,isCheck,isReturn){
        const  data= {menuId:menuId, accessToken: sessionStorage.getItem('xn_token')}
        getButton(data).then(res => {
          if(res){
            res.msgData.buttons.forEach((item) => {
              if(isCheck){
                if(this.formData.buttonCode.indexOf(item.buttonCode) === -1){
                  this.formData.buttonCode.push(item.buttonCode)
                }
              }else{
                const index = this.formData.buttonCode.indexOf(item.buttonCode)
                if(index !== -1){
                  this.formData.buttonCode.splice(index,1)
                }
              }
            })
            if(isReturn)
            {
              this.buttons=res.msgData.buttons
            }
          }
        })
      },
      handleNodeClick(e) {
        this.title = e.label
        if(e.component !='Layout' && e.component !='ParentView'){
          const  data= {menuId:e.id, accessToken: sessionStorage.getItem('xn_token')}
          getButton(data).then(res => {
            if(res){
              this.buttons = res.msgData.buttons
            }
          })
        }else{
          this.buttons = []
        }
      }
    }
  }
</script>

