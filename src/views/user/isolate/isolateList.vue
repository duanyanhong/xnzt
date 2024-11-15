<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--工具栏-->
      <div class="head-container">
        <div style="margin-left: 10px;">
          <!-- 搜索 -->
          <el-input
            v-model="searchData.userId"
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
          <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </div>
      </div>
      <!--用户数据-->
      <el-col>
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
          <u-table-column
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button v-hasPermi="['User:Isolate:Edit']" size="mini" type="text" style="width: 50px;" icon="el-icon-coin" @click="editStaff(scope.row)">数据权限</el-button>
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
    <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="formIsshow" :title="titleContent" width="600px">
      <el-form ref="formData" :inline="true" :model="formData" :rules="rules" size="small" label-width="80px">
        <el-form-item label="物理仓" prop="warehouseId">
          <SelectToolbar style="width: 450px;" v-model="formData.warehouseId" :filterable=false :isfilte=true :fiftervalue="formData.warehouseId" bindId="warehouseId" bindName="warehouseName" :fifteroptions="storeArr" ></SelectToolbar>
        </el-form-item>
        <el-form-item label="逻辑仓" prop="logicWarehouseId">
          <SelectToolbar style="width: 450px;" v-model="formData.logicWarehouseId" :filterable=false :isfilte=true :fiftervalue="formData.logicWarehouseId" bindId="logicWarehouseId" bindName="logicWarehouseName" :fifteroptions="logicWarehouses" ></SelectToolbar>
        </el-form-item>
        <el-form-item label="货主权限" prop="ownerId">
          <SelectToolbar style="width: 450px;" v-model="formData.ownerId" :filterable=false :isfilte=true :fiftervalue="formData.ownerId" bindId="ownerId" bindName="ownerName" :fifteroptions="ownerArr" ></SelectToolbar>
        </el-form-item>
        <el-form-item label="店铺权限" prop="shopId">
          <SelectToolbar style="width: 450px;" v-model="formData.shopId" :filterable=false :isfilte=true :fiftervalue="formData.shopId" bindId="shopId" bindName="shopName" :fifteroptions="shopArr" ></SelectToolbar>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="formIsshow=false">取消</el-button>
        <el-button type="primary" @click="addForm('formData')">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getIsolateList,getLogicWarehouse,getShop,setIsolate } from "@/api/user/isolate";
export default {
  name: 'Isolate',
  data() {
    return {
      rules: {
        warehouseId: [
          { type: 'array', required: true, message: '请至少选择一个逻辑仓库', trigger: 'change' }
        ],
        ownerId: [
          { type: 'array', required: true, message: '请至少选择一个货主', trigger: 'change' }
        ],
        shopId: [
          { type: 'array', required: true, message: '请至少选择一个店铺', trigger: 'change' }
        ],
        logicWarehouseId: [
          { type: 'array', required: true, message: '请至少选择一个物理仓库', trigger: 'change' }
        ]
      },
      searchData: {
        userId: '',
        userName: '',
        limit: 20,
        page: 1,
        accessToken: sessionStorage.getItem('xn_token')
      },
      pageSizes: [20, 50, 100],
      dataList: [],
      storeArr: [],
      ownerArr: [],
      shopArr: [],
      logicWarehouses: [],
      all: false,
      total: 0,
      loading: false,
      formIsshow: false,
      formData: {
        userId: '',
        warehouseId: [],
        ownerId: [],
        shopId: [],
        logicWarehouseId: [],
        accessToken: sessionStorage.getItem('xn_token')
      },
      jsHeight: 500,
      editStatus: false,
      titleContent: '管理数据权限',
      checkStore:false,
      checkShop:false
    }
  },
  created() {
        this.jsHeight = window.innerHeight - $('.head-container').outerHeight() - 180
  },
  mounted() {
      this.loadData()
      // 设置表格高度
      this.jsHeight = window.innerHeight - $('.head-container').outerHeight()  - 180
      // / 监听浏览器窗口变化，动态计算表格高度，
      window.onresize = () => {
      return (() => {
          this.jsHeight = window.innerHeight - $('.head-container').outerHeight()  - 180
      })()
      }
  },
  activated() {
    this.$nextTick(() => {
      this.$refs.plTable.doLayout(); //解决表格错位
    });
  },
  watch: {
    'formData.warehouseId'() {
      if(this.checkStore){
        this.getLogicWarehouse()
      }
      this.checkStore = true
    },
    'formData.ownerId'() {
      if(this.checkShop){
        this.selOwner()
      }
      this.checkShop = true
    }
  },
  methods: {
    // 列表数据
    loadData() {
      this.loading = true
      getIsolateList(this.searchData).then(res => {
        if(res){
          this.loading = false
          this.dataList = res.msgData.list.items
          this.total = res.msgData.list.total
          this.storeArr = res.msgData.data.warehouses
          this.ownerArr = res.msgData.data.owners
          this.jsHeight = window.innerHeight - $('.head-container').outerHeight() - 160
        }
      })
    },
    // 搜索
    search() {
      this.page = 1
      this.loadData()
    },
    addForm(formData) {
      this.$refs[formData].validate((valid) => {
        if (valid) {
          setIsolate(this.formData).then(res => {
            if(res){
              this.formIsshow = false
              this.$modal.notifySuccess(res.errMsg)
            }
          })
        } else {
          return false
        }
      })
    },
    editStaff(row) {
      if (this.$refs['formData'] !== undefined) {
        this.$refs['formData'].resetFields()
      }
      this.formData.logicWarehouseId = JSON.parse(JSON.stringify(row.logicWarehouseId))
      this.formData.userId = JSON.parse(JSON.stringify(row.userId))
      this.formData.warehouseId = JSON.parse(JSON.stringify(row.warehouseId))
      this.formData.ownerId = JSON.parse(JSON.stringify(row.ownerId))
      this.formData.shopId = JSON.parse(JSON.stringify(row.shopId))
      this.editStatus = true
      this.formIsshow = true
      if(row.logicWarehouseId.length>0){
        this.checkStore = false
        this.checkShop = false
      }else{
        this.checkStore = true
        this.checkShop = true
      }
      if (this.formData.ownerId.length === 0) {
        this.shopArr = []
        return
      }
      if (this.formData.warehouseId.length === 0) {
        this.logicWarehouses = []
        return
      }
      getLogicWarehouse({warehouseId:this.formData.warehouseId,accessToken: sessionStorage.getItem('xn_token')}).then(res => {
        if(res){
          this.logicWarehouses=res.msgData.logicWarehouses
        }
      })
      getShop({ownerId:this.formData.ownerId,accessToken: sessionStorage.getItem('xn_token')}).then(res => {
        if(res){
          this.shopArr=res.msgData.shops
        }
      })
    },
    selOwner() {
      if (this.formData.ownerId.length === 0) {
        this.shopArr = []
        this.formData.shopId = []
        return
      }
      getShop({ownerId:this.formData.ownerId,accessToken: sessionStorage.getItem('xn_token')}).then(res => {
        if(res){
          this.formData.shopId = []
          this.shopArr=res.msgData.shops
        }
      })
    },
    getLogicWarehouse(){
      if (this.formData.warehouseId.length === 0) {
        this.logicWarehouses = []
        this.formData.logicWarehouseId = []
        return
      }
      getLogicWarehouse({warehouseId:this.formData.warehouseId,accessToken: sessionStorage.getItem('xn_token')}).then(res => {
        if(res){
          this.formData.logicWarehouseId = []
          this.logicWarehouses=res.msgData.logicWarehouses
        }
      })
    }
  }
}
</script>

