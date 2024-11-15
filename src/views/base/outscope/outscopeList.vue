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
              v-model="searchData.provinceName"
              clearable
              size="small"
              placeholder="输入省搜索"
              style="width: 200px;"
              class="order-input"
            />
            <el-input
              v-model="searchData.cityName"
              clearable
              size="small"
              placeholder="输入市搜索"
              style="width: 200px;"
              class="order-input"
            />
            <el-input
              v-model="searchData.areaName"
              clearable
              size="small"
              placeholder="输入区搜索"
              style="width: 200px;"
              class="order-input"
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
              icon="el-icon-connection"
              @click="addShow"
              plain
              v-hasPermi="['Base:OutScope:Match']"
            >
              映射
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
          @selection-change="handleSelectionChange"
        >
          <u-table-column type="selection"  width="55"  />
          <u-table-column :show-overflow-tooltip="true" prop="platformName" label="平台" />
          <u-table-column :show-overflow-tooltip="true" prop="provinceName" label="省" />
          <u-table-column :show-overflow-tooltip="true" prop="cityName" label="市" />
          <u-table-column :show-overflow-tooltip="true" prop="areaName" label="区" />
          <u-table-column
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-popover v-hasPermi="['Base:OutScope:Delete']"  :ref="`popovers-${scope.$index}`" placement="top" width="200">
                <p style="line-height:40px"><i class="el-icon-info" style="color:rgb(255,153,0)" /> 确定删除吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[`popovers-${scope.$index}`].doClose()">取消</el-button>
                  <el-button type="primary" size="mini" @click="deleteOutscope(scope)">确定</el-button>
                </div>
                <el-button slot="reference" style="width: 50px;" class="el-button--success" type="text" icon="el-icon-delete" size="mini">删除</el-button>
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
    <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="formIsshow" title="地址映射" width="500px">
      <el-form ref="formData" :inline="true" :model="formData" :rules="rules" size="small" label-width="120px">
        <el-form-item label="省份" prop="provinceId">
          <el-select
            v-model="formData.provinceId"
            style="width: 250px"
            placeholder="请选择"
            @change="getCity"
            filterable
          >
            <el-option
              v-for="item in provinces"
              :key="item.provinceId"
              :label="item.provinceName"
              :value="item.provinceId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="cityId">
          <el-select
            v-model="formData.cityId"
            style="width: 250px"
            placeholder="请选择"
            filterable
            @change="getArea"
          >
            <el-option
              v-for="item in citys"
              :key="item.cityId"
              :label="item.cityName"
              :value="item.cityId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="区域" prop="scopeAreaId">
          <el-select
            v-model="formData.scopeAreaId"
            style="width: 250px"
            placeholder="请选择"
            filterable
          >
            <el-option
              v-for="item in areas"
              :key="item.acopeAreaId"
              :label="item.areaName"
              :value="item.acopeAreaId"
            />
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
import { getOutscopeList,getProvince,getCity,getArea,outscopeMatch,deleteOutscope } from "@/api/base/outscope";
export default {
  name: 'Outscope',
  data() {
    return {
      rules: {
        provinceId: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        cityId: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        scopeAreaId: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      searchData: {
        provinceName: '',
        cityName: '',
        areaName: '',
        limit: 20,
        page: 1,
        accessToken:sessionStorage.getItem('xn_token')
      },
      pageSizes: [20, 50, 100],
      dataList: [],
      provinces: [],
      citys: [],
      areas: [],
      total: 0,
      loading: false,
      formIsshow: false,
      formData: {
        id: '',
        provinceId: '',
        cityId: '',
        scopeAreaId: '',
        accessToken: sessionStorage.getItem('xn_token')
      },
      jsHeight: 500,
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
      getOutscopeList(this.searchData).then(res => {
        if(res){
          this.loading = false
          this.dataList = res.msgData.list.items
          this.total = res.msgData.list.total
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
      if(this.ids.length<1){
        this.$modal.notifyWarning('请选择要操作数据！')
        return
      }
      if (this.$refs['formData'] !== undefined) {
        this.$refs['formData'].resetFields()
      }
      for(var key in this.formData){
        if(key!='accessToken'){
          this.formData[key]=''
        }
      }
      const data = {accessToken: sessionStorage.getItem('xn_token')}
      getProvince(data).then(res => {
        if(res){
          this.provinces = res.msgData.provinces
          this.citys = []
          this.areas = []
          this.formIsshow = true
        }
      })
    },
    addForm() {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          const data = {accessToken:sessionStorage.getItem('xn_token'),platformAreaId:this.ids,scopeAreaId:this.formData.scopeAreaId}
          var _this = this
          outscopeMatch(data).then(res => {
            if(res){
              _this.formIsshow = false
              _this.$modal.notifySuccess(res.errMsg)
              _this.loadData()
            }
          })
        } else {
          return false
        }
      })
    },
    getCity(){
      const data = {accessToken:sessionStorage.getItem('xn_token'),provinceId:this.formData.provinceId}
      this.formData.cityId=''
      this.formData.scopeAreaId=''
      getCity(data).then(res => {
        if(res){
          this.citys = res.msgData.cities
          this.areas = []
        }
      })
    },
    getArea(){
      const data = {accessToken:sessionStorage.getItem('xn_token'),cityId:this.formData.cityId}
      this.formData.scopeAreaId=''
      getArea(data).then(res => {
        if(res){
          this.areas = res.msgData.areas
        }
      })
    },
    deleteOutscope(scope) {
      this.$refs[`popovers-${scope.$index}`].doClose()
      const data = {id: scope.row.id, accessToken: sessionStorage.getItem('xn_token')}
      deleteOutscope(data).then(res => {
        if(res){
          this.$modal.notifySuccess(res.errMsg)
          this.loadData()
        }
      })
    }
  }
}
</script>

