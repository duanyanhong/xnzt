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
              v-model="searchData.lowCode"
              clearable
              size="small"
              placeholder="输入商品编码搜索"
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
<!--            <el-button-->
<!--              class="filter-item"-->
<!--              size="mini"-->
<!--              type="primary"-->
<!--              icon="el-icon-plus"-->
<!--              @click="addShow"-->
<!--              plain-->
<!--              v-hasPermi="['Goods:SiteGoods:Add']"-->
<!--            >-->
<!--              新增-->
<!--            </el-button>-->
            <el-button
              class="filter-item"
              size="mini"
              type="primary"
              icon="el-icon-refresh"
              plain
              v-hasPermi="['Goods:SiteGoods:Synch']"
            >
              同步
            </el-button>
            <!--右侧-->
            <slot name="right" />
          </span>
          <span class="crud-opts-left">
            <!--左侧插槽-->
            <slot name="left" />
            <el-upload
              class="inline-block"
              :show-file-list="false"
              :http-request="uploadSuccess"
              accept=".xlsx,.xls,.csv"
              action="#"
              v-hasPermi="['Goods:SiteGoods:Import']"
            >
              <el-button type="success" plain icon="el-icon-upload2" size="mini">导入</el-button>
            </el-upload>
          </span>
          <span class="crud-opts-left">
            <el-button
              class="filter-item"
              size="mini"
              type="warning"
              icon="el-icon-download"
              plain
              @click="downMyOrder"
              v-hasPermi="['Goods:SiteGoods:Export']"
            >导出</el-button>
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
          @selection-change="handleSelectionChange"
        >
          <u-table-column type="selection"  width="55"  />
          <u-table-column :show-overflow-tooltip="true" prop="logicwarehouseCode" label="逻辑仓编码" />
          <u-table-column :show-overflow-tooltip="true" prop="logicwarehouseName" label="逻辑仓名称" />
          <u-table-column :show-overflow-tooltip="true" prop="siteName" label="门店" />
          <u-table-column :show-overflow-tooltip="true" prop="ownerName" label="货主" />
          <u-table-column :show-overflow-tooltip="true" prop="itemName" label="商品名称" />
          <u-table-column :show-overflow-tooltip="true" prop="itemCode" label="商品编码" />
          <u-table-column :show-overflow-tooltip="true" prop="barCode" label="商品条码" />
          <u-table-column :show-overflow-tooltip="true" prop="lowCode" label="商品编码(下位)" />
          <u-table-column :show-overflow-tooltip="true" prop="className" label="商品类别" />
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
              <el-button v-hasPermi="['Goods:SiteGoods:Edit']" size="mini" type="text" style="width: 50px;" icon="el-icon-edit" @click="editStaff(scope.row)">修改</el-button>
              <el-popover v-hasPermi="['Goods:SiteGoods:Disable']" v-if="scope.row.disable=='否'" :ref="`popover-${scope.$index}`" placement="top" width="200">
                <p style="line-height:40px"><i class="el-icon-info" style="color:rgb(255,153,0)" /> 确定禁用吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[`popover-${scope.$index}`].doClose()">取消</el-button>
                  <el-button type="primary" size="mini" @click="editDisable(scope)">确定</el-button>
                </div>
                <el-button slot="reference" style="width: 50px;" type="text" icon="el-icon-lock" size="mini">禁用</el-button>
              </el-popover>
              <el-popover v-hasPermi="['Goods:SiteGoods:Disable']" v-if="scope.row.disable=='是'" :ref="`popover-${scope.$index}`" placement="top" width="200">
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
    <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="formIsshow" :title="titleContent" width="750px">
      <el-form ref="formData" :inline="true" :model="formData" :rules="rules" size="small" label-width="150px">
        <el-form-item label="逻辑仓" prop="logicwarehouseId">
          <el-select
            v-model="formData.logicwarehouseId"
            style="width: 180px"
            placeholder="请选择"
            filterable
            @change="getSite"
          >
            <el-option
              v-for="item in logicwarehouses"
              :key="item.logicwarehouseId"
              :label="item.logicwarehouseName"
              :value="item.logicwarehouseId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="门店" prop="siteId">
          <el-select
            v-model="formData.siteId"
            style="width: 180px"
            placeholder="请选择"
            filterable
          >
            <el-option
              v-for="item in sites"
              :key="item.siteId"
              :label="item.siteName"
              :value="item.siteId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="货主" prop="ownerId">
          <el-select
            v-model="formData.ownerId"
            style="width: 180px"
            placeholder="请选择"
            filterable
            @change="getGoods"
          >
            <el-option
              v-for="item in owners"
              :key="item.ownerId"
              :label="item.ownerName"
              :value="item.ownerId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商品" prop="goodsId">
          <el-select
            v-model="formData.goodsId"
            style="width: 180px"
            placeholder="请选择"
            filterable
          >
            <el-option
              v-for="item in goods"
              :key="item.goodsId"
              :label="item.itemName"
              :value="item.goodsId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商品编码(下位)" prop="lowCode">
          <el-input v-model="formData.lowCode" style="width: 180px" placeholder="请输入商品编码(下位)" />
        </el-form-item>
        <el-form-item label="类别" prop="className">
          <el-select
            v-model="formData.className"
            style="width: 180px"
            placeholder="请选择"
          >
            <el-option value="A类" label="A类" />
            <el-option value="B类" label="B类" />
            <el-option value="C类" label="C类" />
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
  import { getSitegoodsList,editSitegoods,addSitegoods,disableSitegoods,getSite,importSitegoods,exportSitegoods,getGoods } from "@/api/goods/sitegoods";
  export default {
    name: 'Sitegoods',
    data() {
      return {
        rules: {
          siteId: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          carrierId: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          className: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          goodsId: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          ownerId: [
            { required: true, message: '请选择', trigger: 'change' }
          ]
        },
        searchData: {
          lowCode: '',
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
          siteId: '',
          logicwarehouseId: '',
          goodsId: '',
          ownerId: '',
          className: '',
          lowCode: '',
          accessToken: sessionStorage.getItem('xn_token')
        },
        jsHeight: 500,
        editStatus: false,
        titleContent: '管理门店商品',
        sites: [],
        carriers: [],
        logicwarehouses:[],
        goods: [],
        owners: [],
        ids: []
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
        getSitegoodsList(this.searchData).then(res => {
          if(res){
            this.loading = false
            this.dataList = res.msgData.list.items
            this.total = res.msgData.list.total
            // this.carriers = res.msgData.carriers
            this.logicwarehouses = res.msgData.logicwarehouses
            this.owners = res.msgData.owners
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
        this.sites = []
        this.formIsshow = true
      },
      addForm() {
        this.$refs['formData'].validate((valid) => {
          if (valid) {
            var _this = this
            if (_this.editStatus) {
              editSitegoods(_this.formData).then(res => {
                if(res){
                  _this.formIsshow = false
                  _this.$modal.notifySuccess(res.errMsg)
                  _this.loadData()
                }
              })
            } else {
              addSitegoods(_this.formData).then(res => {
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
        console.log(row)
        if (this.$refs['formData'] !== undefined) {
          this.$refs['formData'].resetFields()
        }
        for(var key in this.formData){
          if(key!='accessToken'){
            this.formData[key]=row[key]
          }
        }
        
        this.sites = []
        const data1 = {logicwarehouseId: row.logicwarehouseId, accessToken: sessionStorage.getItem('xn_token')}
        getSite(data1).then(res => {
          if(res){
            this.sites = res.msgData.sites
          }
        })
        this.goods = []
        const data2 = {ownerId: this.formData.ownerId, accessToken: sessionStorage.getItem('xn_token')}
        getGoods(data2).then(res => {
          if(res){
            this.goods = res.msgData.goods
          }
        })
        this.editStatus = true
        this.formIsshow = true
      },
      editDisable(scope) {
        this.$refs[`popover-${scope.$index}`].doClose()
        const data = {id: scope.row.id, accessToken: sessionStorage.getItem('xn_token')}
        disableSitegoods(data).then(res => {
          if(res){
            this.$modal.notifySuccess(res.errMsg)
            this.loadData()
          }
        })
      },
      uploadSuccess(file){
        this.loading = true
        const param = new FormData()
        param.append('file', file.file)
        param.append('accessToken', sessionStorage.getItem('xn_token'))
        importSitegoods(param).then(res => {
          this.loading = false
          if(res){
            this.$modal.notifySuccess(res.errMsg)
            if (res.msgData.downloadUrl !== undefined && res.msgData.downloadUrl !== '') {
              window.location.href = res.msgData.downloadUrl
            }
            this.loadData()
          }
        })
      },
      downMyOrder() {
        this.loading = true
        exportSitegoods(this.searchData).then(res => {
          this.loading = false
          if(res){
            this.$modal.notifySuccess(res.errMsg)
            if (res.msgData.downloadUrl !== undefined && res.msgData.downloadUrl !== '') {
              window.location.href = res.msgData.downloadUrl
            }
            this.loadData()
          }
        })
      },
      getSite(){
        this.formData.siteId = ''
        this.sites = []
        const data = {logicwarehouseId: this.formData.logicwarehouseId, accessToken: sessionStorage.getItem('xn_token')}
        getSite(data).then(res => {
          if(res){
            this.sites = res.msgData.sites
          }
        })
      },
      getGoods(){
        this.formData.goodsId = ''
        this.goods = []
        const data = {ownerId: this.formData.ownerId, accessToken: sessionStorage.getItem('xn_token')}
        getGoods(data).then(res => {
          if(res){
            this.goods = res.msgData.goods
          }
        })
      }
    }
  }
</script>

