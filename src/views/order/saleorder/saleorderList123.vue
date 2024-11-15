<template>
  <div class="app-container">
    <el-row :gutter="15">
      <el-col :span="21">
        <div style="border: 1px solid #DCDFE6;padding: 10px;border-radius: 10px;">
          <div class="head-container">
            <div>
              <!-- 搜索 -->
              <span class="filter-item time-title">创建时间:</span>
              <date-range-picker v-model="searchData.acceptTime" :clearable="false" style="width: 350px !important;margin-right: 10px;" class="date-item" />
              <template v-for="item in searchSetList">
                <!--销售单号(系统生成)-->
                <div v-if="item.englishName=='xnCode'" class="filter-item" >
                  <el-input
                    v-model="searchData.xnCode"
                    size="small"
                    placeholder="输入销售单号"
                    style="width: 180px;"
                    clearable
                  >
                    <el-button slot="suffix" type="text" @click="searchShow('xnCode','输入销售单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button>
                  </el-input>
                </div>
                <!--销售出库单号(系统生成)-->
                <div v-if="item.englishName=='soCode'" class="filter-item">
                  <el-input
                    v-model="searchData.soCode"
                    size="small"
                    placeholder="输入销售出库单号"
                    style="width: 180px;"
                    clearable
                  >
                    <el-button slot="suffix" type="text" @click="searchShow('soCode','输入销售出库单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button>
                  </el-input>
                </div>
                <!--货主-->
                <div v-if="item.englishName=='ownerId'" class="filter-item my-select">
                  <SelectToolbar style="width: 180px;display: inline-block;" placeholder="请选择货主"  v-model="searchData.ownerId" :filterable=false :isfilte=true :fiftervalue="searchData.ownerId" bindId="ownerId" bindName="ownerName" :fifteroptions="optionArr.owners" ></SelectToolbar>
                </div>
                <!--店铺-->
                <div v-if="item.englishName=='shopId'" class="filter-item my-select">
                  <SelectToolbar style="width: 180px;display: inline-block;" placeholder="请选择店铺"  v-model="searchData.shopId" :filterable=false :isfilte=true :fiftervalue="searchData.shopId" bindId="shopId" bindName="shopName" :fifteroptions="optionArr.shops" ></SelectToolbar>
                </div>
                <!--出库单号(上位传值)-->
                <div v-if="item.englishName=='deliveryOrderCode'" class="filter-item">
                  <el-input
                    v-model="searchData.deliveryOrderCode"
                    size="small"
                    placeholder="输入出库单号"
                    style="width: 180px;"
                    clearable
                  >
                    <el-button slot="suffix" type="text" @click="searchShow('deliveryOrderCode','输入出库单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button>
                  </el-input>
                </div>
                <!--ERP出库单号（ERP 分配）-->
                <div v-if="item.englishName=='preDeliveryOrderCode'" class="filter-item">
                  <el-input
                    v-model="searchData.preDeliveryOrderCode"
                    size="small"
                    placeholder="输入ERP原出库单号"
                    style="width: 180px;"
                    clearable
                  >
                    <el-button slot="suffix" type="text" @click="searchShow('preDeliveryOrderCode','输入ERP原出库单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button>
                  </el-input>
                </div>
                <!--原出库单号（WMS 分配）-->
                <div v-if="item.englishName=='preDeliveryOrderId'" class="filter-item">
                  <el-input
                    v-model="searchData.preDeliveryOrderId"
                    size="small"
                    placeholder="输入WMS原出库单号"
                    style="width: 180px;"
                    clearable
                  >
                    <el-button slot="suffix" type="text" @click="searchShow('preDeliveryOrderId','输入WMS原出库单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button>
                  </el-input>
                </div>
                <!--出库单类型-->
                <div v-if="item.englishName=='orderType'" class="filter-item my-select">
                  <el-select
                    v-model="searchData.orderType"
                    style="width: 180px"
                    placeholder="请选择出库单类型"
                    multiple
                    clearable
                  >
                    <el-option
                      v-for="item in optionArr.ordersType"
                      :key="item.orderType"
                      :label="item.typeName"
                      :value="item.orderType"
                    />
                  </el-select>
                </div>
                <!--仓库名称-->
                <div v-if="item.englishName=='warehouseId'" class="filter-item my-select">
                  <SelectToolbar style="width: 180px;display: inline-block;" placeholder="请选择仓库" v-model="searchData.warehouseId" :filterable=false :isfilte=true :fiftervalue="searchData.warehouseId" bindId="warehouseId" bindName="warehouseName" :fifteroptions="optionArr.warehouses" ></SelectToolbar>
                </div>
                <!--逻辑仓库-->
                <div v-if="item.englishName=='logicwarehouseId'" class="filter-item my-select">
                  <SelectToolbar style="width: 180px;display: inline-block;" placeholder="请选择逻辑仓库"  v-model="searchData.logicwarehouseId" :filterable=false :isfilte=true :fiftervalue="searchData.logicwarehouseId" bindId="logicwarehouseId" bindName="logicwarehouseName" :fifteroptions="optionArr.logicwarehouses" ></SelectToolbar>
                </div>
                <!--来源平台名称-->
                <div v-if="item.englishName=='sourcePlatformCode'" class="filter-item my-select">
                  <SelectToolbar style="width: 180px;display: inline-block;" placeholder="请选择来源平台"  v-model="searchData.sourcePlatformCode" :filterable=false :isfilte=true :fiftervalue="searchData.sourcePlatformCode" bindId="sourcePlatformCode" bindName="sourcePlatformName" :fifteroptions="optionArr.sourcePlatforms" ></SelectToolbar>
                </div>
                <!--发货单创建时间-->
                <div v-if="item.englishName=='createTime'" class="time-title-other">
                  <span class="filter-item" style="font-size: 10pt;margin-right: 1px;">{{item.chineseName}}:</span>
                  <date-range-picker v-model="searchData.createTime"  style="width: 350px !important;" class="date-item" />
                </div>
                <!--下单时间-->
                <div v-if="item.englishName=='placeOrderTime'" class="time-title-other">
                  <span class="filter-item" style="font-size: 10pt;margin-right: 1px;">{{item.chineseName}}:</span>
                  <date-range-picker v-model="searchData.placeOrderTime"   style="width: 350px !important;" class="date-item" />
                </div>
                <!--支付时间-->
                <div v-if="item.englishName=='payTime'" class="time-title-other">
                  <span class="filter-item" style="font-size: 10pt;margin-right: 1px;">{{item.chineseName}}:</span>
                  <date-range-picker v-model="searchData.payTime"   style="width: 350px !important;" class="date-item" />
                </div>
                <!--卖家名称-->
                <div v-if="item.englishName=='sellerNick'" class="filter-item">
                  <el-input
                    v-model="searchData.sellerNick"
                    size="small"
                    placeholder="输入卖家名称"
                    style="width: 180px;"
                    clearable
                  >
                    <el-button slot="suffix" type="text" @click="searchShow('sellerNick','输入卖家名称')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button>
                  </el-input>
                </div>
                <!--买家昵称-->
                <div v-if="item.englishName=='buyerNick'" class="filter-item">
                  <el-input
                    v-model="searchData.buyerNick"
                    size="small"
                    placeholder="输入买家昵称"
                    style="width: 180px;"
                    clearable
                  >
                    <el-button slot="suffix" type="text" @click="searchShow('buyerNick','输入买家昵称')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button>
                  </el-input>
                </div>
                <!--主运单号-->
                <div v-if="item.englishName=='vestNo'" class="filter-item">
                  <el-input
                    v-model="searchData.vestNo"
                    size="small"
                    placeholder="输入主运单号"
                    style="width: 180px;"
                    clearable
                  >
                    <el-button slot="suffix" type="text" @click="searchShow('vestNo','输入主运单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button>
                  </el-input>
                </div>
                <!--物流编码-->
                <div v-if="item.englishName=='logisticsCode'" class="filter-item my-select">
                  <SelectToolbar style="width: 180px;display: inline-block;" placeholder="请选择物流编码"  v-model="searchData.logisticsCode" :filterable=false :isfilte=true :fiftervalue="searchData.logisticsCode" bindId="logisticsCode" bindName="logisticsName" :fifteroptions="optionArr.logistics" ></SelectToolbar>
                </div>
                <!--物流名称-->
                <div v-if="item.englishName=='expressName'" class="filter-item my-select">
                  <el-select
                    v-model="searchData.expressName"
                    style="width: 180px"
                    placeholder="请选择物流名称"
                    multiple
                    clearable
                  >
                    <el-option
                      v-for="item in optionArr.expresses"
                      :key="item.expressName"
                      :label="item.expressName"
                      :value="item.expressName"
                    />
                  </el-select>
                </div>
                <!--配运单号-->
                <div v-if="item.englishName=='expressCode'" class="filter-item">
                  <el-input
                    v-model="searchData.expressCode"
                    size="small"
                    placeholder="输入配运单号"
                    style="width: 180px;"
                    clearable
                  >
                    <el-button slot="suffix" type="text" @click="searchShow('expressCode','输入配运单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button>
                  </el-input>
                </div>
                <!--省-->
                <div v-if="item.englishName=='provinceId'" class="filter-item my-select">
                  <SelectToolbar style="width: 180px;display: inline-block;" placeholder="请选择省"  v-model="searchData.provinceId" :filterable=false :isfilte=true :fiftervalue="searchData.provinceId" bindId="provinceId" bindName="provinceName" :fifteroptions="optionArr.provinces" ></SelectToolbar>
                </div>
                <!--市-->
                <div v-if="item.englishName=='cityId'" class="filter-item my-select">
                  <SelectToolbar style="width: 180px;display: inline-block;" placeholder="请选择市"  v-model="searchData.cityId" :filterable=false :isfilte=true :fiftervalue="searchData.cityId" bindId="cityId" bindName="cityName" :fifteroptions="optionArr.cities" ></SelectToolbar>
                </div>
                <!--区/县-->
                <div v-if="item.englishName=='areaId'" class="filter-item my-select">
                  <SelectToolbar style="width: 180px;display: inline-block;" placeholder="请选择区/县"  v-model="searchData.areaId" :filterable=false :isfilte=true :fiftervalue="searchData.areaId" bindId="areaId" bindName="areaName" :fifteroptions="optionArr.areas" ></SelectToolbar>
                </div>
                <!--审核状态-->
                <div v-if="item.englishName=='orderState'" class="filter-item my-select">
                  <el-select
                    v-model="searchData.orderState"
                    style="width: 180px"
                    placeholder="请选择审核状态"
                    multiple
                    clearable
                  >
                    <el-option
                      v-for="item in optionArr.ordersState"
                      :key="item.orderState"
                      :label="item.orderState"
                      :value="item.orderState"
                    />
                  </el-select>
                </div>
                <!--审核时间-->
                <div v-if="item.englishName=='examineTime'" class="time-title-other">
                  <span class="filter-item" style="font-size: 10pt;margin-right: 1px;">{{item.chineseName}}:</span>
                  <date-range-picker v-model="searchData.examineTime"   style="width: 350px !important;" class="date-item" />
                </div>
              </template>
              <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="search" >搜索</el-button>
            </div>
          </div>
          <div class="combined-crud">
            <el-button v-for="(item,i) in btnList" :style="item.style" :key="i" size="mini" @click="changeGroupId(item.groupId)" >{{item.groupName}}</el-button>
          </div>
        </div>
        <el-row :gutter="15" style="margin-bottom: 1px;" class="crud-opts">
          <!--用户数据-->
          <el-col :span="20">
            <span class="crud-opts-left" style="padding-right: 10px;" v-hasPermi="['Order:Saleorder:Lock']">
              <el-button class="filter-item" size="mini" type="danger"  icon="el-icon-lock" plain>锁定</el-button>
            </span>
            <span class="crud-opts-left" style="padding-right: 10px;" v-hasPermi="['Order:Saleorder:Unlock']">
              <el-button class="filter-item" size="mini" type="success"  icon="el-icon-unlock" plain>解锁</el-button>
            </span>
            <span class="crud-opts-left" style="padding-right: 10px;" v-hasPermi="['Order:Saleorder:Intercept']" >
              <el-button class="filter-item" size="mini" type="primary" icon="el-icon-s-promotion" plain>拦截</el-button>
            </span>
            <span class="crud-opts-left" style="padding-right: 10px;" v-hasPermi="['Order:Saleorder:Void']">
              <el-button class="filter-item" size="mini" type="warning"  icon="el-icon-remove-outline" plain>作废</el-button>
            </span>
            <span class="crud-opts-left" style="padding-right: 10px;" v-hasPermi="['Order:Saleorder:Delete']">
              <el-button class="filter-item" size="mini" type="warning"  icon="el-icon-delete" plain>删除</el-button>
            </span>
            <span class="crud-opts-left" style="padding-right: 10px;" v-hasPermi="['Order:Saleorder:Restore']">
              <el-button class="filter-item" size="mini" type="success"  icon="el-icon-refresh-left" plain>恢复</el-button>
            </span>
            <span class="crud-opts-left" style="padding-right: 10px;" v-hasPermi="['Order:Saleorder:Examine']">
              <el-button class="filter-item" size="mini" type="danger"  icon="el-icon-finished" plain>审核</el-button>
            </span>
            <span class="crud-opts-left" style="padding-right: 10px;" v-hasPermi="['Order:Saleorder:Processexamine']">
              <el-button class="filter-item" size="mini" type="danger"  icon="el-icon-place" plain>寻源审核</el-button>
            </span>
            <span class="crud-opts-left" style="padding-right: 10px;" v-hasPermi="['Order:Saleorder:Decrypto']" >
              <el-button class="filter-item" size="mini" type="primary" icon="el-icon-upload2" plain>导入解密</el-button>
            </span>
            <span class="crud-opts-left" style="padding-right: 10px;" v-hasPermi="['Order:Saleorder:Import']">
              <el-button class="filter-item" size="mini" type="primary"  icon="el-icon-upload2" plain>导入订单</el-button>
            </span>
            <span class="crud-opts-left" style="padding-right: 10px;" v-hasPermi="['Order:Saleorder:Export']">
              <el-button class="filter-item" size="mini" type="warning"  icon="el-icon-download" plain @click="exportSaleorder">导出订单</el-button>
            </span>
            <span class="crud-opts-left" style="padding-right: 10px;" v-hasPermi="['Order:Saleorder:Exportdetail']">
              <el-button class="filter-item" size="mini" type="warning"  icon="el-icon-download" plain @click="exportSaleorderDetail">导出明细</el-button>
            </span>
          </el-col>
          <el-col :span="2">
            <span >
              <el-button style="width:100%;" class="filter-item" size="mini" icon="el-icon-s-grid" @click="addRowShow">列设置</el-button>
            </span>
          </el-col>
          <el-col :span="2">
            <span >
              <el-button style="width:100%;" class="filter-item" size="mini" icon="el-icon-guide" @click="addSearchShow" >筛选设置</el-button>
            </span>
          </el-col>
        </el-row>
        <u-table
          ref="plTable"
          v-loading="loading"
          :data="dataList"
          :height="jsHeight"
          use-virtual
          :row-height="20"
          class="table-mini-td"
          stripe
          :header-cell-style="{background:'#f8f8f9', color:'#515a6e', fontSize:'12px',height:'10px',border:'none'}"
          :cell-style="{border:'none'}"
          @selection-change="handleSelectionChange"
          @row-click="addShowDetail"
          :row-class-name="tableRowClassName"
        >
          <u-table-column type="selection" width="40" />
          <template v-for="item in setViewfields">
            <template v-if="item.view">
              <u-table-column :show-overflow-tooltip="true" align="center" :label="item.chineseName" :width="item.fieldSize"  v-if="item.englishName=='marks'">
                <template slot-scope="scope">
                  <el-tag v-for="(item, index) in scope.row.marks" style="margin-left: 5px;"  :color="item.markColor" :key="index">
                    <span style="color:#fff;">{{ item.markName }}</span>
                  </el-tag>
                </template>
              </u-table-column>
              <u-table-column v-else :show-overflow-tooltip="true"  :prop="item.englishName" :width="item.fieldSize" :label="item.chineseName" />
            </template>
          </template>
        </u-table>
        <!--分页组件-->
        <pagination
          :limit.sync="searchData.limit"
          :page.sync="searchData.page"
          :total="total"
          :page-sizes.sync="pageSizes"
          @pagination="loadData"
        />
        <div style="text-align: center;font-size: 15px;">
          <span v-if="detailTableShow" class="top-curd-bottom" style="cursor:pointer;" @click="changeDetailShow">
            <i class="el-icon-caret-bottom"></i>
          </span>
          <span v-else class="top-curd-top" style="cursor:pointer;" @click="changeDetailShow"><i class="el-icon-caret-top"></i></span>
        </div>
        <div class="detail-table" v-if="detailTableShow">
          <el-tabs style="width: 98%;margin-left: 1%;">
            <el-tab-pane label="明细列表">
              <GoodsDetail :detailInfo="orderDetail.items"></GoodsDetail>
            </el-tab-pane>
            <el-tab-pane label="基本信息">
              <OrderInfo :detailInfo="orderDetail.base" :selectOrderId="selectOrderId" :logicwarehouses="logicwarehouses" :warehouses="optionArr.warehouses" :logistics="optionArr.logistics" :loadData="loadData"></OrderInfo>
            </el-tab-pane>
            <el-tab-pane label="收货信息">
              <AddressDetail :detailInfo="orderDetail.receiver"></AddressDetail>
            </el-tab-pane>
            <el-tab-pane label="备注信息">
              <RemarkDetail :detailInfo="orderDetail.remarks"></RemarkDetail>
            </el-tab-pane>
            <el-tab-pane label="统计信息">
              <TotalDetail :detailInfo="orderDetail.statistics"></TotalDetail>
            </el-tab-pane>
            <el-tab-pane label="作业流追踪">
              <ProcessTracing :stepsData="stepData" ></ProcessTracing>
            </el-tab-pane>
            <el-tab-pane label="发货包裹信息">发货包裹信息</el-tab-pane>
            <el-tab-pane  label="操作日志">
              <OperateLogs :detailInfo="orderDetail.operateLogs"></OperateLogs>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col class="combined" :style="{'height':combinedHeight+ 'px' }" :span="3">
        <Combined :btnList.sync="btnList" :loadData="loadData" :searchTypeList="searchTypeList" :optionArr="optionArr" ></Combined>
      </el-col>
    </el-row>
    <el-dialog append-to-body :close-on-click-modal="false" top="8vh" :visible.sync="formRowIsshow" title="列表字段设置" width="650px">
      <FieldSort :fieldList.sync="fieldList" :oldList="defaultViewfields"></FieldSort>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="formRowIsshow=false">取消</el-button>
        <el-button type="primary" v-debounce="addRowForm" >确认</el-button>
      </div>
    </el-dialog>
    <el-dialog append-to-body :close-on-click-modal="false" top="8vh" :visible.sync="formSearchIsshow" title="筛选设置" width="650px">
      <SearchSelect :searchTypeList="searchTypeList" :optionArr="optionArr" :searchContentList.sync="searchContentList"></SearchSelect>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="formSearchIsshow=false">取消</el-button>
        <el-button type="primary" v-debounce="addSetForm" >确认</el-button>
      </div>
    </el-dialog>
    <InputDialog :visible.sync="searchIsshow" :search-content.sync="searchContent" :title.sync="titlesContent" @confirmed="addSearchForm" />
  </div>
</template>

<script>
  import { getSaleorderList,setViewfield,setSearchfield,getShop,getLogicwarehouse,initShop,initLogicwarehouse,initPca,getCity,getArea,getOrderInfo,exportSaleorder,exportSaleorderDetail } from "@/api/order/saleorder";
  import Combined from "./combined";
  import SearchSelect from "./search";
  import GoodsDetail from "./goodsDetail";
  import OrderInfo from "./orderInfo";
  import AddressDetail from "./addressDetail";
  import RemarkDetail from "./remarkDetail";
  import TotalDetail from "./totalDetail";
  import OperateLogs from "./operateLogs";
  import ProcessTracing from "./processTracing";
  export default {
    name: 'Saleorder',
    components: { Combined,SearchSelect,GoodsDetail,OrderInfo,AddressDetail,RemarkDetail,TotalDetail,OperateLogs,ProcessTracing },
    data() {
      return{
        formRowIsshow:false,
        formSearchIsshow:false,
        fieldList:[],
        setViewfields:[],
        defaultViewfields:[],
        dataList:[],
        btnList:[],
        searchTypeList:[],
        searchContentList: [],
        searchSetList: [],
        loading: false,
        ids:[],
        pageSizes: [20, 50, 100],
        total: 0,
        jsHeight: 500,
        combinedHeight: 500,
        searchIsshow: false,
        searchContent: '',
        titlesContent: '',
        searchType: '',
        searchData: {xnCode: '', soCode: '', ownerId: [], shopId: [], deliveryOrderCode: '', preDeliveryOrderCode: '', preDeliveryOrderId: '', orderType: [], warehouseId: [], logicwarehouseId: [], sourcePlatformCode: [], createTime: [], placeOrderTime: [], payTime: [], sellerNick: '', buyerNick: '', vestNo: '', logisticsCode: [], logisticsName: [], expressCode: '', expressName: [], provinceId: [], cityId: [], areaId: [], orderState: [], examineTime: [], page: 1, acceptTime: [], accessToken:sessionStorage.getItem('xn_token')},
        optionArr:{areas:[],cities:[],logicwarehouses:[],owners:[],provinces:[],shops:[],warehouses:[],expresses:[],logistics:[],ordersState:[],ordersType:[],sourcePlatforms:[]},
        defareas:[],
        defcities:[],
        defprovinces:[],
        groupId:'',
        detailTableShow:false,
        selectOrderId:0,
        orderDetail:{
          base:{},
          items:[],
          receiver:{},
          operateLogs:[],
          remarks:{},
          statistics:{}
        },
        logicwarehouses:[],
        stepData: [
          { title: "订单下载", description: "2024-04-13 10:25:07",state:1 },
          { title: "系统接单", description: "",state:1 },
          { title: "订单审核", description: "2024-04-13 10:30:22",state:1 },
          { title: "出库单同步仓库", description: "2024-04-13 11:05:25",state:1 },
          { title: "仓库接单", description: "",state:2 },
          { title: "仓库拣货", description: "",state:2 },
          { title: "已验货", description: "",state:2 },
          { title: "仓库称重", description: "",state:2 },
          { title: "商品出库", description: "",state:2 }
        ]
      }
    },
    watch:{
      'searchData.warehouseId'() {
          this.getLogicwarehouse()
      },
      'searchData.ownerId'() {
          this.getShop()
      },
      'searchData.provinceId'() {
          this.getCity()
      },
      'searchData.cityId'() {
        if(this.searchData.cityId.length>0){
          this.getArea()
        }else{
          this.searchData.areaId = []
          if(this.searchData.provinceId.length>0){
            this.optionArr.areas=[]
          }else{
            this.optionArr.areas = JSON.parse(JSON.stringify(this.defareas))
          }
        }
      }
    },
    mounted() {
      this.searchData.acceptTime = this.$commonApi.calculateTimeRange('pastWeek')
      this.loadData()
    },
    updated() {
      this.$refs.plTable.doLayout()
    },
    activated() {
      this.$nextTick(() => {
        this.$refs.plTable.doLayout()
      })
    },
    methods: {
      loadData() {
        this.loading = true
        const data = {accessToken: sessionStorage.getItem('xn_token')}
        for (let i = 0; i < this.searchSetList.length; i++) {
          let field = this.searchSetList[i].englishName
          let value = this.searchData[this.searchSetList[i].englishName]
          data[field] = value
        }
        data.groupId = this.groupId
        data.acceptTime = this.searchData.acceptTime
        getSaleorderList(data).then(res => {
          if(res){
            this.loading = false
            this.dataList = res.msgData.list.items
            this.total = res.msgData.list.total
            this.setViewfields = res.msgData.setViewfields
            this.defaultViewfields = res.msgData.defaultViewfields
            this.searchTypeList = res.msgData.defaultSearchfields
            this.searchSetList = res.msgData.setSearchfields
            this.btnList = res.msgData.setGroupsearches
            this.optionArr.areas = res.msgData.areas
            this.optionArr.cities = res.msgData.cities
            this.optionArr.logicwarehouses = res.msgData.logicwarehouses
            this.optionArr.owners = res.msgData.owners
            this.optionArr.provinces = res.msgData.provinces
            this.optionArr.shops = res.msgData.shops
            this.optionArr.warehouses = res.msgData.warehouses
            this.optionArr.expresses = res.msgData.expresses
            this.optionArr.logistics = res.msgData.logistics
            this.optionArr.ordersState = res.msgData.ordersState
            this.optionArr.ordersType = res.msgData.ordersType
            this.optionArr.sourcePlatforms = res.msgData.sourcePlatforms
            this.defareas = JSON.parse(JSON.stringify(res.msgData.areas))
            this.defcities = JSON.parse(JSON.stringify(res.msgData.cities))
            this.defprovinces = JSON.parse(JSON.stringify(res.msgData.provinces))
            for (let i = 0; i < this.btnList.length; i++) {
               if(this.btnList[i].groupId==this.groupId){
                 this.btnList[i].style = 'color: #409EFF;background: #ecf5ff;border-color: #b3d8ff;'
               }else{
                 this.btnList[i].style = ''
               }
            }
            setTimeout(() => {
              if(this.detailTableShow){
                this.changeHeight(1)
              }else{
                this.changeHeight(2)
              }
            }, 100)
          }
        })
      },
      // 搜索
      search() {
        this.groupId = ''
        this.selectOrderId = 0
        this.page = 1
        this.clearOrderDetail()
        this.loadData()
      },
      // 勾选数据
      handleSelectionChange(value) {
        this.ids = []
        for (let k = 0; k < value.length; k++) {
          this.ids.push(value[k])
        }
      },
      addRowForm(){
        const data = {viewField: this.fieldList, accessToken: sessionStorage.getItem('xn_token')}
        setViewfield(data).then(res => {
          if(res){
            this.$modal.notifySuccess(res.errMsg)
            this.formRowIsshow = false
            // this.setViewfields = this.fieldList
            this.loadData()

          }
        })
      },
      addRowShow(){
        this.fieldList = JSON.parse(JSON.stringify(this.setViewfields))
        this.formRowIsshow = true
      },
      addSearchShow(){
        this.searchContentList = JSON.parse(JSON.stringify(this.searchSetList))
        this.formSearchIsshow = true
      },
      addSetForm(){
        const data = {searchField: this.searchContentList, accessToken: sessionStorage.getItem('xn_token')}
        setSearchfield(data).then(res => {
          if(res){
            this.$modal.notifySuccess(res.errMsg)
            this.formSearchIsshow = false
            this.loadData()
          }
        })
      },
      searchShow(type, title) {
        this.searchContent = this.searchData[type].replace(/,/g, '\n')
        this.searchType = type
        this.titlesContent = title
        this.searchIsshow = true
      },
      addSearchForm() {
        this.searchData[this.searchType] = this.searchContent.replace(/\n/g, ',').replace('，', ',')
        this.searchIsshow = false
      },
      getLogicwarehouse(){
        if (this.searchData.warehouseId.length === 0) {
          initLogicwarehouse({accessToken: sessionStorage.getItem('xn_token')}).then(res => {
            if(res){
              this.searchData.logicwarehouseId = []
              this.optionArr.logicwarehouses=res.msgData.logicwarehouses
            }
          })
          return
        }
        getLogicwarehouse({warehouseId:this.searchData.warehouseId,accessToken: sessionStorage.getItem('xn_token')}).then(res => {
          if(res){
            this.searchData.logicwarehouseId = []
            this.optionArr.logicwarehouses=res.msgData.logicwarehouses
          }
        })
      },
      getShop() {
        if (this.searchData.ownerId.length === 0) {
          initShop({accessToken: sessionStorage.getItem('xn_token')}).then(res => {
            if(res){
              this.searchData.shopId = []
              this.optionArr.shops=res.msgData.shops
            }
          })
          return
        }
        getShop({ownerId:this.searchData.ownerId,accessToken: sessionStorage.getItem('xn_token')}).then(res => {
          if(res){
            this.searchData.shopId = []
            this.optionArr.shops=res.msgData.shops
          }
        })
      },
      getCity() {
        if (this.searchData.provinceId.length === 0) {
          this.searchData.cityId = []
          this.optionArr.cities=JSON.parse(JSON.stringify(this.defcities))
          this.searchData.areaId = []
          this.optionArr.areas=JSON.parse(JSON.stringify(this.defareas))
          return
        }
        getCity({provinceId:this.searchData.provinceId,accessToken: sessionStorage.getItem('xn_token')}).then(res => {
          if(res){
            this.searchData.cityId = []
            this.optionArr.cities=res.msgData.cities
          }
        })
      },
      getArea() {
        getArea({cityId:this.searchData.cityId,accessToken: sessionStorage.getItem('xn_token')}).then(res => {
          if(res){
            this.searchData.areaId = []
            this.optionArr.areas=res.msgData.areas
          }
        })
      },
      changeGroupId(groupId){
        this.groupId = groupId
        this.selectOrderId = 0
        this.clearOrderDetail()
        this.loadData()
      },
      addShowDetail(row){
        this.clearOrderDetail()
        getLogicwarehouse({warehouseId:[row.warehouseId],accessToken: sessionStorage.getItem('xn_token')}).then(res => {
          if(res){
            this.logicwarehouses=res.msgData.logicwarehouses
          }
        })
        getOrderInfo({saleorderId:row.id,accessToken: sessionStorage.getItem('xn_token')}).then(res => {
          if(res){
            this.selectOrderId = row.id
            this.orderDetail.base = res.msgData.base
            this.orderDetail.items = res.msgData.items
            this.orderDetail.receiver = res.msgData.receiver
            this.orderDetail.operateLogs = res.msgData.operateLogs
            this.orderDetail.remarks = res.msgData.remarks
            this.orderDetail.statistics = res.msgData.statistics
            this.detailTableShow = true
            this.changeHeight(1)
          }
        })
      },
      changeDetailShow(){
        if(this.detailTableShow){
          this.changeHeight(2)
        }else{
          this.changeHeight(1)
        }
        this.detailTableShow = !this.detailTableShow
      },
      changeHeight(type){
        if(type==1){
          this.jsHeight = window.innerHeight - $('.head-container').outerHeight() - $('.crud-opts').outerHeight() - $('.combined-crud').outerHeight() - 402
        }else{
          this.jsHeight = window.innerHeight - $('.head-container').outerHeight() - $('.crud-opts').outerHeight() - $('.combined-crud').outerHeight() - 191
        }
        this.combinedHeight = window.innerHeight -125
      },
      tableRowClassName({row}) {
        if (row.id == this.selectOrderId) {
          return 'current-row';
        }
        return '';
      },
      clearOrderDetail(){
        this.orderDetail.base = {}
        this.orderDetail.items = []
        this.orderDetail.operateLogs = []
        this.orderDetail.receiver = {}
        this.orderDetail.remarks = {}
        this.orderDetail.statistics = {}
      },
      exportSaleorder() {
        this.loading = true
        const data = {accessToken: sessionStorage.getItem('xn_token')}
        for (let i = 0; i < this.searchSetList.length; i++) {
          let field = this.searchSetList[i].englishName
          let value = this.searchData[this.searchSetList[i].englishName]
          data[field] = value
        }
        data.groupId = this.groupId
        data.acceptTime = this.searchData.acceptTime
        exportSaleorder(data).then(res => {
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
      exportSaleorderDetail() {
        this.loading = true
        const data = {accessToken: sessionStorage.getItem('xn_token')}
        for (let i = 0; i < this.searchSetList.length; i++) {
          let field = this.searchSetList[i].englishName
          let value = this.searchData[this.searchSetList[i].englishName]
          data[field] = value
        }
        data.groupId = this.groupId
        data.acceptTime = this.searchData.acceptTime
        exportSaleorderDetail(data).then(res => {
          this.loading = false
          if(res){
            this.$modal.notifySuccess(res.errMsg)
            if (res.msgData.downloadUrl !== undefined && res.msgData.downloadUrl !== '') {
              window.location.href = res.msgData.downloadUrl
            }
            this.loadData()
          }
        })
      }
    }
  }
</script>
<style scoped>
  .combined{
    border: 1px solid #EBEEF5;
    border-radius: 5px;
    padding: 0 !important;
  }
  ::v-deep .el-table__body tr.current-row>td {
    background-color: #f3e2d3 !important;
  }
  .time-title{
    font-size: 10pt;
    margin-right: 1px;
    color: #606266;
  }
  .time-title-other{
    display: inline-block;
    margin-right: 10px;
    color: #606266;
  }
  .pagination-container{
    padding: 0 !important;
    height: 10px;
  }
  .top-curd-top{
    width: 70px;
    height: 12px;
    background: #c0ccda;
    display: inline-block;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .top-curd-bottom{
    width: 70px;
    height: 12px;
    background: #c0ccda;
    display: inline-block;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  .top-curd-top i{
    color: #fff;
    position: relative;
    top:-5px;
  }
  .top-curd-bottom i{
    position: relative;
    top:-5px;
    color: #fff;
  }
  .detail-table{
    height: 220px;
    border: 1px solid #DCDFE6;
    overflow-y: auto;
    border-radius: 5px;
    margin-top: -10px;
  }
  .detail-table .el-tabs{
    margin-bottom: 2px !important;
  }
</style>
<style>
  .my-select .el-select__tags {
    flex-wrap: nowrap !important;
    overflow: hidden !important;
  }
  .plTableBox .el-table--small td, .plTableBox .el-table--small th{
    padding: 3px 0 !important;
  }
  .detail-table .el-tab-pane {
    height: 162px;
    overflow-y: auto;
  }
</style>

