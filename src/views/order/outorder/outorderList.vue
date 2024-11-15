
<!--  订单管理-平台订单-网店订单 -->
<template>
  <div class="app-container">
    <el-row >
      <el-col :span="24">
        <div style="border: 1px solid #DCDFE6;padding: 10px;border-radius: 10px;">
          <div class="head-container">
            <div>
               <!-- 搜索 -->
              <span class="filter-item time-title">创建时间:</span>
              <template v-if="isShowDate">
                <el-date-picker
                  v-model="searchData.acceptTime"
                  type="datetimerange"
                  value-format="yyyy-MM-dd hh:mm:ss"
                  style="width: 200px;"
                  :editable="false"
                  :clearable="false" 
                />
              </template>
              
              <!-- <date-range-picker  v-if="isShowDate" v-model="searchData.acceptTime" :clearable="false"  style="width: 350px !important;margin-right: 10px;" class="date-item" /> -->
                <date-picker  v-if="!isShowDate" v-model="searchData.acceptTime" :clearable="false" :pickerOptions="pickerOptions"  style="width: 350px !important;margin-right: 10px;" class="date-item" />
              <!--货主-->
                <div  class="filter-item my-select" style="margin-left: 10px;">
                  <SelectToolbar style="width: 180px;display: inline-block;" placeholder="请选择货主"  v-model="searchData.ownerId" :filterable=false :isfilte=true :fiftervalue="searchData.ownerId" bindId="ownerId" bindName="ownerName" :fifteroptions="optionArr.owners" ></SelectToolbar>
                </div>
                <!--店铺-->
                <div class="filter-item my-select">
                  <SelectToolbar style="width: 180px;display: inline-block;" placeholder="请选择店铺"  v-model="searchData.shopId" :filterable=false :isfilte=true :fiftervalue="searchData.shopId" bindId="shopId" bindName="shopName" :fifteroptions="optionArr.shops" ></SelectToolbar>
                </div>
   
                <el-select
                  v-model="searchData.orderState"
                  style="width: 180px"
                  placeholder="订单状态"
                  class="select-box"
                >
                    <el-option value="" >全部</el-option>
                    <el-option value="待审核" label="待审核" />
                    <el-option value="已审核" label="已审核" />
                </el-select>
                  <el-select
                      v-model="searchData.tradeState"
                      placeholder="交易状态"
                      class="select-box"
                      clearable
                      filterable
                      multiple
                      collapse-tags
                      style="margin-right: 10px;width: 180px;margin-left: 10px;"
                    >
                    <el-option value="正常单" label="正常单" />
                    <el-option value="取消单" label="取消单" />
                    <el-option value="拦截单" label="拦截单" />
                 </el-select>
                <div class="filter-item">
                  <el-input
                    v-model="searchData.bizOrderCode"
                    size="small"
                    placeholder="输入发货单号"
                    style="width: 180px;"
                    clearable
                    @change="handelBizchange"
                  >
                    <i  class="el-icon-edit el-input__icon"  slot="suffix"  @click="searchShow('bizOrderCode','输入发货单号')"></i>
                  </el-input>
                </div>
                <div class="filter-item">
                  <el-input
                    v-model="searchData.xnCode"
                    size="small"
                    placeholder="输入新鸟单号"
                    style="width: 180px;"
                    clearable
                    @change="handelXnchange"
                  >
                    <i  class="el-icon-edit el-input__icon"  slot="suffix"  @click="searchShow('xnCode','输入新鸟单号')"></i>
                  </el-input>
                </div>
            <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </div>
          </div>
        </div>
        <el-row  style="margin-bottom: 1px;" class="crud-opts">
          <!--用户数据-->
          <el-col :span="24">
            <span class="crud-opts-left">
            <!--左侧插槽-->
            <slot name="left" />
            <el-button
              class="filter-item"
              size="mini"
              type="success"
              icon="el-icon-refresh"
              @click="addShow"
              plain
              v-hasPermi="['Order:OnlineOrder:Synch']"
            >
              同步  
            </el-button>
          </span>
          <span class="crud-opts-left">
            <!--左侧插槽-->
            <slot name="left" />
            <el-button
              class="filter-item"
              size="mini"
              type="warning"
              icon="el-icon-download"
              @click="downMyOrder"
              plain
              v-hasPermi="['Order:OnlineOrder:Export']"
            >
              导出
            </el-button>
          </span>
          </el-col>
        </el-row>
        <splitpanes
          horizontal
          :style="[{height:splitpanesHeight+ 'px'},{border:'1px solid #DCDFE6'},{borderRadius:'5px'}]"
          @resize="onSizesChanged"
        >
          <pane class="splitpanes-top" min-size="35" :size="topSize">
            <u-table
                ref="plTable"
                v-loading="loading"
                :data="dataList"
                :height="jsHeight"
                use-virtual
                table-mini-td
                :row-height="20"
                align="center"
                stripe
                :header-cell-style="{background:'#f8f8f9', color:'#515a6e', fontSize:'13px',height:'45px',border:'none'}"
                :cell-style="{border:'none'}"
                @selection-change="handleSelectionChange"
                 @row-click="addShowDetail"
              >
                <u-table-column type="selection"  width="55"   />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="deliveryOrderCode" width="120" label="出库单号" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="soCode" width="120" label="销售订单" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="orderState" width="120" label="订单状态" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="orderSourse" width="120" label="订单来源" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="platformOrderCode" width="120" label="来源平台" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="ownerName" width="120" label="货主" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="shopName" width="120"  label="店铺" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="platformOrderCode" width="120" label="网店订单号" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="warehouseName" width="120" label="仓库名称" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="logicwarehouseName" width="120" label="库存地点名称" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="siteName" width="120" label="门店/站点名称" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="vestCode" width="120" label="马甲快递编码" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="vestNo" width="140" label="主运单号" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="logisticsCode" width="140" label="物流编码" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="logisticsName" width="120" label="物流名称" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="expressName" width="120" label="快递名称" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="expressCode" width="120" label="配运单号" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="shipType"   width="150" label="配送类型" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="appointDeliveryTime" width="120" label="系统单号（下位）" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="securityMobile" width="120" label="收件安全手机号" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="provinceName" width="120" label="收件省" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="cityName" width="120" label="收件市" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="areaName" width="120" label="收件区/县" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="receiverTown" width="120" label="收件街道" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="receiverAddress" width="120" label="收件地址" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="placeOrderTime" width="120" label="下单时间" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="payTime" width="120" label="支付时间" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="acceptTime" width="120" label="创建时间" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="toDeliveryTime" width="120" label="同步时间" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="lowerAcceptTime" width="120" label="接单时间" />
                <u-table-column :show-overflow-tooltip="true" align="center"  prop="lowerOutTime" width="120" label="出库时间" />
              </u-table>
            <pagination
              :limit.sync="searchData.limit"
              :page.sync="searchData.page"
              :total="total"
              :page-sizes.sync="pageSizes"
              @pagination="loadData"
            />
            <div style="text-align: center;font-size: 15px;">
              <span v-if="detailTableShow" class="top-curd-bottom" style="cursor:pointer;z-index: 9;position: absolute;" @click="changeDetailShow">
                <i class="el-icon-caret-bottom"></i>
              </span>
              <span v-else class="top-curd-top" style="cursor:pointer;z-index: 9;position: absolute;" @click="changeDetailShow"><i class="el-icon-caret-top"></i></span>
            </div>
          </pane>
          <pane class="splitpanes-bottom" min-size="20" v-if="detailTableShow"  :size="bottomSize">
            <div class="detail-table" v-if="detailTableShow">
              <el-tabs style="width: 98%;margin-left: 1%;">
                <el-tab-pane label="明细列表">
                  <GoodsDetail :style="[{height:tabpaneHeight+ 'px'}]" :detailInfo="orderDetail.items"></GoodsDetail>
                </el-tab-pane>
                <el-tab-pane label="基本信息">
                  <OrderInfo :style="[{height:tabpaneHeight+ 'px'}]" :detailInfo="orderDetail.base" :selectOrderId="selectOrderId" :logicwarehouses="logicwarehouses" :warehouses="optionArr.warehouses" :logistics="optionArr.logistics" :loadData="loadData"></OrderInfo>
                </el-tab-pane>
                <el-tab-pane label="收件信息">
                  <AddressDetail :style="[{height:tabpaneHeight+ 'px'}]" :detailInfo="orderDetail.receiver"></AddressDetail>
                </el-tab-pane>
                <el-tab-pane label="配送信息">
                  <RemarkDetail :style="[{height:tabpaneHeight+ 'px'}]" :detailInfo="orderDetail.requirements"></RemarkDetail>
                </el-tab-pane>
                <el-tab-pane  label="操作日志">
                  <OperateLogs :style="[{height:tabpaneHeight+ 'px'}]" :detailInfo="orderDetail.operateLogs"></OperateLogs>
                </el-tab-pane>
              </el-tabs>
            </div>
          </pane>
        </splitpanes>
      </el-col>

    </el-row>
  <!--表单渲染-->
  <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="formIsshow" :title="titleContent" width="500px">
      <el-form ref="formData" :inline="true" :model="formData" :rules="rules" size="small" label-width="120px">
        <el-form-item label="标记内容" prop="markName">
          <el-input v-model="formData.markName" style="width: 250px" placeholder="请输入标记内容" />
        </el-form-item>
        <el-form-item label="标记颜色" prop="markColor">
          <el-color-picker v-model="formData.markColor" style="width: 250px"></el-color-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="formIsshow=false">取消</el-button>
        <el-button type="primary" v-debounce="addForm" >确认</el-button>
      </div>
    </el-dialog>
    <InputDialog :visible.sync="searchIsshow" :search-content.sync="searchContent" :title.sync="titlesContent" @confirmed="addSearchForm" />

  </div>
</template>

<script>
  import { getOnlineorderList,exportOnlineorder,synchOnlineorder,toSaleorder , getOrderInfo ,returnPlatformTime } from "@/api/order/onlineorder";

  import GoodsDetail from "./goodsDetail";
  import OrderInfo from "./orderInfo";
  import AddressDetail from "./addressDetail";
  import RemarkDetail from "./remarkDetail";
  import OperateLogs from "./operateLogs";
  import datePicker from "./DatePicker.vue";
  import { Splitpanes, Pane } from 'splitpanes'
  import 'splitpanes/dist/splitpanes.css'
  export default {
    name: 'Onlineorder',
    components: { GoodsDetail,OrderInfo,AddressDetail,RemarkDetail,OperateLogs,Splitpanes, Pane  ,datePicker},
    data() {
      return {
        rules: {
          markName: [
            { required: true, message: '请输入标记内容', trigger: 'blur' }
          ],
          markColor: [
            { required: true, message: '请选择标记颜色', trigger: 'change' }
          ]
        },
        ids:[],
        isShowDate:false,
        searchData: {
          markName: '',
          tradeState:'',
          orderState:'',
          ownerId:[],
          shopId:[],
          tradeState:[],
          xnCode:'',
          acceptTime:[],
          // expireTimeOption: '',
          // orderState: [],
          bizOrderCode:'',
          markColor: '#409EFF',
          limit: 20,
          page: 1,
          accessToken:sessionStorage.getItem('xn_token')
        },
        pageSizes: [20, 50, 100],
        dataList: [],
        total: 0,
        disabledDate:'',
        loading: false,
        formIsshow: false,
        detailTableShow:false,//明细是否展开
        formData: {
          id: '',
          markName: '',
          markColor: '',
          accessToken: sessionStorage.getItem('xn_token')
        },
       
        pickerOptions: {
          disabledDate(date ) {
            let now = Date.now() 
            let limitDays = 31 * 24 * 60 * 60 * 1000 // 30天的毫秒数
            let ts = date.getTime() //过滤的日期
            if ((ts <= now && ts > now - limitDays) ) return false // 启用
            return true // 禁用

            // let tempTime = 3600 * 1000 * 24 * 30;
            // let timer = new Date(new Date() - 8.64e7).getTime(); //转换时间戳(当前选中的日期)；
            // let maxTime = timer - tempTime; //前三十天可选
            // return time.getTime() > new Date() - 8.64e6  || time.getTime() < maxTime;

            // var time = new Date() ;
            // time.setDate(time.getDate() + 1);
            // var tomorrowTimestamp = Math.floor(time.getTime()) ;
            // let limitDays = 31 * 24 * 60 * 60 * 1000 // 30天的毫秒数- 8.64e6 
            // let ts = date.getTime() //过滤的日期
            // if ((ts  <= tomorrowTimestamp  && ts > tomorrowTimestamp - limitDays ) ) return false // 启用
            // return true // 禁用
          }
        },
        optionArr:{logicwarehouses:[],owners:[],shops:[],warehouses:[],logistics:[]},
        orderDetail:{
          base:{},
          items:[],
          receiver:{},
          operateLogs:[],
          requirements:{},
          statistics:{}
        },
        shortcuts:[
        {
            text: '今天',
            onClick(picker) {
              const startTime = new Date(new Date().setHours(0, 0, 0))
              const endTime = new Date(new Date().setHours(23, 59, 59))
              picker.$emit('pick', [startTime, endTime])
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const startTime = new Date(new Date().daysAgo(1).setHours(0, 0, 0))
              const endTime = new Date(new Date().daysAgo(1).setHours(23, 59, 59))
              picker.$emit('pick', [startTime, endTime])
            }
          },
          {
            text: '最近一周',
            onClick(picker) { 
              const startTime = new Date(new Date().daysAgo(7).setHours(0, 0, 0))
              const endTime = new Date(new Date().setHours(23, 59, 59))
              picker.$emit('pick', [startTime, endTime])
            }
          },
          {
            text: '最近30天',
            onClick(picker) {
              const startTime = new Date(new Date().daysAgo(30).setHours(0, 0, 0))
              const endTime = new Date(new Date().setHours(23, 59, 59))
              picker.$emit('pick', [startTime, endTime])
            }
          },
          {
            text: '这个月',
            onClick(picker) {
            const startTime = new Date(new Date().monthBegin().setHours(0, 0, 0))
            const endTime = new Date(new Date().setHours(23, 59, 59))
            picker.$emit('pick', [startTime, endTime])
          }
          },
          {
            text: '本季度',
            onClick(picker) {
              const startTime = new Date(new Date().quarterBegin().setHours(0, 0, 0))
              const endTime = new Date(new Date().setHours(23, 59, 59))
              picker.$emit('pick', [startTime, endTime])
            }
          },
        ],
        searchContent: '',
        titlesContent: '',
        searchType: '',
        searchIsshow:false,
        logicwarehouses:[],
        selectOrderId:0,
        jsHeight: 604,
        topSize: 60,
        bottomSize: 40,
        splitpanesHeight:640,
        tabpaneHeight:150,
        editStatus: false,
        titleContent: '管理商品标记'
      }
    },
    mounted() {
      this.getNow()
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
        getOnlineorderList({ 
          page: this.page, 
          limit: this.limit,
          orderState:this.searchData.orderState,
          shopId:this.searchData.shopId,
          tradeState:this.searchData.tradeState,
          ownerId:this.searchData.ownerId,
          xnCode:this.searchData.xnCode, 
          bizOrderCode: this.searchData.bizOrderCode, 
          acceptTime: this.searchData.acceptTime, 
          accessToken: sessionStorage.getItem('xn_token') 
        }).then(res => {
          if(res){
            this.loading = false
            this.dataList = res.msgData.list.items
            this.total = res.msgData.list.total
            this.optionArr.logicwarehouses = res.msgData.logicwarehouses
            this.optionArr.owners = res.msgData.owners
            this.optionArr.shops = res.msgData.shops
            this.optionArr.warehouses = res.msgData.warehouses
            this.optionArr.logistics = res.msgData.logistics

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
      formatWeek() {
        const end = new Date();
        // 一周的某一天
        const week = end.getDay();
        //一天的毫秒数
        const millisecond = 1000 * 60 * 60 * 24;
        //减去的天数
        const minusDay = week != 0 ? week - 1 : 6;
        //本周
        const monday = new Date(end.getTime() - minusDay * millisecond);
        const start = new Date(monday);
        return [start, end];
      },
      getNow() {
        // 获取当前日期对象
        var currentDate = new Date()
          var sevenDaysAgo = new Date()
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
          var currentFormatted = currentDate.getFullYear() + '-' + addLeadingZero(currentDate.getMonth() + 1) + '-' + addLeadingZero(currentDate.getDate()) + ' ' + '23:59:59'
          var sevenDaysAgoFormatted = sevenDaysAgo.getFullYear() + '-' + addLeadingZero(sevenDaysAgo.getMonth() + 1) + '-' + addLeadingZero(sevenDaysAgo.getDate()) + ' ' + '00:00:00'
          function addLeadingZero(number) {
            return number < 10 ? '0' + number : number
          }
          this.searchData.acceptTime = [sevenDaysAgoFormatted, currentFormatted]
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
        this.splitpanesHeight = window.innerHeight - $('.head-container').outerHeight() - $('.crud-opts').outerHeight()  -148
        console.log(this.splitpanesHeight)
        if(type==1){
          setTimeout(() => {
            this.jsHeight = this.splitpanesHeight - $('.splitpanes-bottom').outerHeight() -36
            this.tabpaneHeight = $('.splitpanes-bottom').outerHeight() - 65
          }, 250)
        }else{
          setTimeout(() => {
            this.jsHeight = this.splitpanesHeight -36
            this.tabpaneHeight = $('.splitpanes-bottom').outerHeight() - 65
          }, 50)
        }
        this.combinedHeight = window.innerHeight -125
      },
      handelBizchange(e) {
        console.log(e)
        if(e !='') {
          this.isShowDate = true
        }else {
          if(this.searchData.bizOrderCode == '') {
            this.isShowDate = false
            this.getNow()
          }else {
            this.isShowDate = true

          }
        }
      },

      handelXnchange(e) {
        console.log(e)
        if(e !='') {
          this.isShowDate = true
         
        }else {
          if(this.searchData.xnCode == '') {
            this.isShowDate = false
            this.getNow()
          }else {
            this.isShowDate = true

          }
        }

      },
      // 搜索
      search() {
        this.groupId = ''
        this.selectOrderId = 0
        this.page = 1
        this.clearOrderDetail()
        this.loadData()
      },
      addSearchForm() {
        this.searchData[this.searchType] = this.searchContent.replace(/\n/g, ',').replace('，', ',')
        this.searchIsshow = false
      },
      // 勾选数据
      handleSelectionChange(value) {
        this.ids = []
        for (let k = 0; k < value.length; k++) {
          this.ids.push(value[k].id)
        }
      },
      searchShow(type, title) {
        this.searchContent = this.searchData[type].replace(/,/g, '\n')
        this.searchType = type
        this.titlesContent = title
        this.searchIsshow = true
      },
      onSizesChanged(sizes) {
        this.topSize = sizes[0].size
        this.bottomSize = sizes[1].size
        setTimeout(() => {
          this.jsHeight = this.splitpanesHeight - $('.splitpanes-bottom').outerHeight() -35
          this.tabpaneHeight = $('.splitpanes-bottom').outerHeight() - 65
        }, 10)
      },
      addShowDetail(row){
        this.clearOrderDetail()
        // getLogicwarehouse({warehouseId:[row.warehouseId],accessToken: sessionStorage.getItem('xn_token')}).then(res => {
        //   if(res){
        //     this.logicwarehouses=res.msgData.logicwarehouses
        //   }
        // })
        getOrderInfo({id:row.id,accessToken: sessionStorage.getItem('xn_token')}).then(res => {
          if(res){
            this.selectOrderId = row.id
            this.orderDetail.base = res.msgData.base
            this.orderDetail.items = res.msgData.items
            this.orderDetail.receiver = res.msgData.receiver
            this.orderDetail.operateLogs = res.msgData.operateLogs
            this.orderDetail.requirements = res.msgData.requirements
            this.orderDetail.statistics = res.msgData.statistics
            this.detailTableShow = true
            this.changeHeight(1)
          }
        })
      },
      clearOrderDetail(){
        this.orderDetail.base = {}
        this.orderDetail.items = []
        this.orderDetail.operateLogs = []
        this.orderDetail.receiver = {}
        this.orderDetail.requirements = {}
        this.orderDetail.statistics = {}
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
          this.formData.markColor = '#409EFF'
        }
        this.formIsshow = true
      },
      addForm() {
        this.$refs['formData'].validate((valid) => {
          if (valid) {
            var _this = this
            if (_this.editStatus) {
              editGoodsmark(_this.formData).then(res => {
                if(res){
                  _this.formIsshow = false
                  _this.$modal.notifySuccess(res.errMsg)
                  _this.loadData()
                }
              })
            } else {
              addGoodsmark(_this.formData).then(res => {
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
        }
        this.editStatus = true
        this.formIsshow = true
      },
      downMyOrder() {
        this.loading = true
        exportOnlineorder(this.searchData).then(res => {
          this.loading = false
          if(res){
            this.$message({
                message: '导出成功',
                type: 'success'
              });
            if (res.msgData.downloadUrl !== undefined && res.msgData.downloadUrl !== '') {
              window.location.href = res.msgData.downloadUrl
            }
            this.loadData()
          }
        })
      },
      editDisable(scope) {
        this.$refs[`popover-${scope.$index}`].doClose()
        const data = {id: scope.row.id, accessToken: sessionStorage.getItem('xn_token')}
        disableGoodsmark(data).then(res => {
          if(res){
            this.$message({
                message: res.errMsg,
                type: 'success'
              });
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
    height: 100%;
  }
  .detail-table .el-tabs{
    /* margin-bottom: 2px !important; */
  }
  ::v-deep .head-container div {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    row-gap: 10px;
    font-size: 13px;
    
  }
  ::v-deep .filter-item {
    margin-bottom: 0;
  }
  ::v-deep .head-container .date-item {
    margin-bottom: 0;
  }
  ::v-deep .select-box input {
    height: 30.5px;
  }
  ::v-deep .el-date-editor {
    width: 350px !important;
  }
  ::v-deep .el-table-column--selection {
    width: 55px !important;
  }
  ::v-deep .el-table__body-wrapper .el-table__row{
    cursor: pointer;
}
::v-deep .el-picker-panel__footer  {
  display: none ;
}

</style>
<style>
  .my-select .el-select__tags {
    flex-wrap: nowrap !important;
    overflow: hidden !important;
  }
  .plTableBox .el-table--small td, .plTableBox .el-table--small th{
    /* padding: 3px 0 !important; */
  }
  .detail-table .el-tab-pane {
    overflow-y: auto;
  }
  splitpanes {background-color: #f8f8f8;}
  .splitpanes__splitter {
    background-color: #ccc;
    position: relative;
  }
  .splitpanes__splitter:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    transition: opacity 0.4s;
    opacity: 0;
    z-index: 1;
    cursor : n-resize;
  }
  .splitpanes__splitter:hover:before {
    opacity: 1;
  }
  .splitpanes--vertical > .splitpanes__splitter:before {
    left: -30px;
    right: -30px;
    height: 100%;
  }
  .splitpanes--horizontal > .splitpanes__splitter:before {
    top: -10px;
    bottom: -10px;
    width: 100%;
  }
</style>


