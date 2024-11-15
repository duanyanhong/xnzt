<template>
  <div>
    <div>
      选择条件：
      <el-select v-model="selectName" filterable @change="getSearch" placeholder="请选择">
        <el-option
          v-for="item in dataTypeList"
          :key="item.englishName"
          :label="item.chineseName"
          :value="item.englishName">
        </el-option>
      </el-select>
      <el-button type="primary" style="margin-left: 10px;" icon="el-icon-circle-plus-outline"  size="mini"  @click="addSearch">新增</el-button>
    </div>
    <el-table
      :data="searchContentList"
      border
      height="480"
      :row-height="30"
      highlight-current-row
      @row-click="handleCurrentChange"
      style="width: 100%;margin-top: 30px;">
      <el-table-column
        label="筛选条件">
        <template slot-scope="scope">
          <!--新鸟单号(系统生成)-->
          <div v-if="scope.row.englishName=='xnCode'" class="search-input">
            {{scope.row.chineseName}}：
            <el-input
              v-model="searchData.xnCode"
              size="small"
              placeholder="输入新鸟单号"
              style="width: 350px;"
              clearable
            >
            <i  class="el-icon-edit el-input__icon"  slot="suffix"  @click="searchShow('xnCode','输入新鸟单号')"></i>
              <!-- <el-button slot="suffix" type="text" @click="searchShow('xnCode','输入新鸟单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button> -->
            </el-input>
          </div>
          <!--销售单号(系统生成)-->
          <div v-if="scope.row.englishName=='soCode'" class="search-input">
            {{scope.row.chineseName}}：
            <el-input
              v-model="searchData.soCode"
              size="small"
              placeholder="输入销售单号"
              style="width: 350px;"
              clearable
            >
            <i  class="el-icon-edit el-input__icon"  slot="suffix"  @click="searchShow('soCode','输入销售单号')"></i>
              <!-- <el-button slot="suffix" type="text" @click="searchShow('soCode','输入销售单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button> -->
            </el-input>
          </div>
          <!--货主-->
          <div v-if="scope.row.englishName=='ownerId'" class="search-input">
            {{scope.row.chineseName}}：
            <el-select
              v-model="searchData.ownerId"
              style="width: 350px"
              placeholder="请选择"
              multiple
              collapse-tags
            >
              <el-option
                v-for="item in optionArr.owners"
                :key="item.ownerId"
                :label="item.ownerName"
                :value="item.ownerId"
              />
            </el-select>
          </div>
          <!--店铺-->
          <div v-if="scope.row.englishName=='shopId'" class="search-input">
            {{scope.row.chineseName}}：
            <el-select
              v-model="searchData.shopId"
              style="width: 350px"
              placeholder="请选择"
              multiple
              collapse-tags
            >
              <el-option
                v-for="item in optionArr.shops"
                :key="item.shopId"
                :label="item.shopName"
                :value="item.shopId"
              />
            </el-select>
          </div>
          <!--网店订单号-->
          <div v-if="scope.row.englishName=='platformOrderCode'" class="search-input">
            {{scope.row.chineseName}}：
            <el-input
              v-model="searchData.platformOrderCode"
              size="small"
              placeholder="输入出库单号"
              style="width: 350px;"
              clearable
            >
            <i  class="el-icon-edit el-input__icon"  slot="suffix"  @click="searchShow('platformOrderCode','输入网店订单号')"></i>
              <!-- <el-button slot="suffix" type="text" @click="searchShow('deliveryOrderCode','输入出库单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button> -->
            </el-input>
          </div>
          <!--出库单号(上位传值)-->
          <div v-if="scope.row.englishName=='deliveryOrderCode'" class="search-input">
            {{scope.row.chineseName}}：
            <el-input
              v-model="searchData.deliveryOrderCode"
              size="small"
              placeholder="输入出库单号"
              style="width: 350px;"
              clearable
            >
            <i  class="el-icon-edit el-input__icon"  slot="suffix"  @click="searchShow('deliveryOrderCode','输入出库单号')"></i>
              <!-- <el-button slot="suffix" type="text" @click="searchShow('deliveryOrderCode','输入出库单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button> -->
            </el-input>
          </div>
          <!--ERP出库单号（ERP 分配）-->
          <div v-if="scope.row.englishName=='preDeliveryOrderCode'" class="search-input">
            {{scope.row.chineseName}}：
            <el-input
              v-model="searchData.preDeliveryOrderCode"
              size="small"
              placeholder="输入ERP原出库单号"
              style="width: 350px;"
              clearable
            >
              <i  class="el-icon-edit el-input__icon"  slot="suffix"  @click="searchShow('preDeliveryOrderCode','输入ERP原出库单号')"></i>
              <!-- <el-button slot="suffix" type="text" @click="searchShow('preDeliveryOrderCode','输入ERP原出库单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button> -->
            </el-input>
          </div>
          <!--原出库单号（WMS 分配）-->
          <div v-if="scope.row.englishName=='preDeliveryOrderId'" class="search-input">
            {{scope.row.chineseName}}：
            <el-input
              v-model="searchData.preDeliveryOrderId"
              size="small"
              placeholder="输入WMS原出库单号"
              style="width: 350px;"
              clearable
            >
            <i  class="el-icon-edit el-input__icon"  slot="suffix"  @click="searchShow('preDeliveryOrderId','输入WMS原出库单号')"></i>
              <!-- <el-button slot="suffix" type="text" @click="searchShow('preDeliveryOrderId','输入WMS原出库单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button> -->
            </el-input>
          </div>
           <!--订单来源-->
           <div v-if="scope.row.englishName=='orderSource'" class="search-input">
            {{scope.row.chineseName}}：
            <el-select
              v-model="searchData.orderSource"
              style="width: 350px"
              placeholder="请选择"
              multiple
              collapse-tags
            >
              <el-option
                v-for="item in optionArr.orderSource"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <!--出库单类型-->
          <!-- <div v-if="scope.row.englishName=='orderType'" class="search-input">
            {{scope.row.chineseName}}：
            <el-select
              v-model="searchData.orderType"
              style="width: 350px"
              placeholder="请选择"
              multiple
              collapse-tags
            >
              <el-option
                v-for="item in optionArr.ordersType"
                :key="item.orderType"
                :label="item.typeName"
                :value="item.orderType"
              />
            </el-select>
          </div> -->
           
          <!--仓库名称-->
          <div v-if="scope.row.englishName=='warehouseId'" class="search-input">
            {{scope.row.chineseName}}：
            <el-select
              v-model="searchData.warehouseId"
              style="width: 350px"
              placeholder="请选择"
              multiple
              collapse-tags
            >
              <el-option
                v-for="item in optionArr.warehouses"
                :key="item.warehouseId"
                :label="item.warehouseName"
                :value="item.warehouseId"
              />
            </el-select>
          </div>
          <!--逻辑仓库-->
          <div v-if="scope.row.englishName=='logicwarehouseId'" class="search-input">
            {{scope.row.chineseName}}：
            <el-select
              v-model="searchData.logicwarehouseId"
              style="width: 350px"
              placeholder="请选择"
              multiple
              collapse-tags
            >
              <el-option
                v-for="item in optionArr.logicwarehouses"
                :key="item.logicwarehouseId"
                :label="item.logicwarehouseName"
                :value="item.logicwarehouseId"
              />
            </el-select>
          </div>
          <!--来源平台名称-->
          <div v-if="scope.row.englishName=='sourcePlatformCode'" class="search-input">
            {{scope.row.chineseName}}：
            <el-select
              v-model="searchData.sourcePlatformCode"
              style="width: 350px"
              placeholder="请选择"
              multiple
              collapse-tags
            >
              <el-option
                v-for="item in optionArr.sourcePlatforms"
                :key="item.sourcePlatformCode"
                :label="item.sourcePlatformName"
                :value="item.sourcePlatformCode"
              />
            </el-select>
          </div>
          <!--发货单创建时间-->
          <div v-if="scope.row.englishName=='createTime'" class="search-input">
            {{scope.row.chineseName}}：
            <date-range-picker v-model="searchData.createTime" disabled :clearable="false" style="width: 350px !important;" class="date-item" />
          </div>
          <!--下单时间-->
          <div v-if="scope.row.englishName=='placeOrderTime'" class="search-input">
            {{scope.row.chineseName}}：
            <date-range-picker v-model="searchData.placeOrderTime" disabled :clearable="false" style="width: 350px !important;" class="date-item" />
          </div>
          <!--支付时间-->
          <div v-if="scope.row.englishName=='payTime'" class="search-input">
            {{scope.row.chineseName}}：
            <date-range-picker v-model="searchData.payTime" disabled :clearable="false" style="width: 350px !important;" class="date-item" />
          </div>
          <!--卖家名称-->
          <!-- <div v-if="scope.row.englishName=='sellerNick'" class="search-input">
            {{scope.row.chineseName}}：
            <el-input
              v-model="searchData.sellerNick"
              size="small"
              placeholder="输入卖家名称"
              style="width: 350px;"
              clearable
            >
            <i  class="el-icon-edit el-input__icon"  slot="suffix"  @click="searchShow('sellerNick','输入卖家名称')"></i>
            </el-input>
          </div> -->
          <!--买家昵称-->
          <!-- <div v-if="scope.row.englishName=='buyerNick'" class="search-input">
            {{scope.row.chineseName}}：
            <el-input
              v-model="searchData.buyerNick"
              size="small"
              placeholder="输入买家昵称"
              style="width: 350px;"
              clearable
            >
            <i  class="el-icon-edit el-input__icon"  slot="suffix"  @click="searchShow('buyerNick','输入买家昵称')"></i>
            </el-input>
          </div> -->
          <!--主运单号（马甲单号）-->
          <div v-if="scope.row.englishName=='vestNo'" class="search-input">
            {{scope.row.chineseName}}：
            <el-input
              v-model="searchData.vestNo"
              size="small"
              placeholder="输入马甲单号"
              style="width: 350px;"
              clearable
            >
            <i  class="el-icon-edit el-input__icon"  slot="suffix"  @click="searchShow('vestNo','输入主运单号')"></i>
              <!-- <el-button slot="suffix" type="text" @click="searchShow('vestNo','输入主运单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button> -->
            </el-input>
          </div>
          <!--物流编码-->
          <div v-if="scope.row.englishName=='logisticsCode'" class="search-input">
            {{scope.row.chineseName}}：
            <el-select
              v-model="searchData.logisticsCode"
              style="width: 350px"
              placeholder="请选择"
              multiple
              collapse-tags
            >
              <el-option
                v-for="item in optionArr.logistics"
                :key="item.logisticsCode"
                :label="item.logisticsName"
                :value="item.logisticsCode"
              />
            </el-select>
          </div>
          <!--配运单号-->
          <div v-if="scope.row.englishName=='expressCode'" class="search-input">
            {{scope.row.chineseName}}：
            <el-input
              v-model="searchData.expressCode"
              size="small"
              placeholder="输入配运单号"
              style="width: 350px;"
              clearable
            >
            <i  class="el-icon-edit el-input__icon"  slot="suffix"  @click="searchShow('expressCode','输入配运单号')"></i>
              <!-- <el-button slot="suffix" type="text" @click="searchShow('expressCode','输入配运单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button> -->
            </el-input>
          </div>
          <!--快递名称-->
          <div v-if="scope.row.englishName=='expressName'" class="search-input">
            {{scope.row.chineseName}}：
            <el-select
              v-model="searchData.expressName"
              style="width: 350px"
              placeholder="请选择"
              multiple
              collapse-tags
            >
              <el-option
                v-for="item in optionArr.expresses"
                :key="item.expressName"
                :label="item.expressName"
                :value="item.expressName"
              />
            </el-select>
          </div>
          <!--省-->
          <div v-if="scope.row.englishName=='provinceId'" class="search-input">
            {{scope.row.chineseName}}：
            <el-select
              v-model="searchData.provinceId"
              style="width: 350px"
              placeholder="请选择"
              multiple
              collapse-tags
            >
              <el-option
                v-for="item in optionArr.provinces"
                :key="item.provinceId"
                :label="item.provinceName"
                :value="item.provinceId"
              />
            </el-select>
          </div>
          <!--市-->
          <div v-if="scope.row.englishName=='cityId'" class="search-input">
            {{scope.row.chineseName}}：
            <el-select
              v-model="searchData.cityId"
              style="width: 350px"
              placeholder="请选择"
              multiple
              collapse-tags
            >
              <el-option
                v-for="item in optionArr.cities"
                :key="item.cityId"
                :label="item.cityName"
                :value="item.cityId"
              />
            </el-select>
          </div>
          <!--区/县-->
          <div v-if="scope.row.englishName=='areaId'" class="search-input">
            {{scope.row.chineseName}}：
            <el-select
              v-model="searchData.areaId"
              style="width: 350px"
              placeholder="请选择"
              multiple
              collapse-tags
            >
              <el-option
                v-for="item in optionArr.areas"
                :key="item.areaId"
                :label="item.areaName"
                :value="item.areaId"
              />
            </el-select>
          </div>
          <!--审核状态（订单状态）-->
          <div v-if="scope.row.englishName=='orderState'" class="search-input">
            {{scope.row.chineseName}}：
            <el-select
              v-model="searchData.orderState"
              style="width: 350px"
              placeholder="请选择"
              multiple
              collapse-tags
            >
              <el-option
                v-for="item in optionArr.ordersState"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              />
            </el-select>
          </div>
            <!--回传状态）-->
            <div v-if="scope.row.englishName=='returnState'" class="search-input">
            {{scope.row.chineseName}}：
            <el-select
              v-model="searchData.returnState"
              style="width: 350px"
              placeholder="请选择"
              multiple
              collapse-tags
            >
              <el-option
                v-for="item in optionArr.returnState"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              />
            </el-select>
          </div>
          <!--审核时间-->
          <div v-if="scope.row.englishName=='toOutTime'" class="search-input">
            {{scope.row.chineseName}}：
            <date-range-picker v-model="searchData.toOutTime" disabled :clearable="false" style="width: 350px !important;" class="date-item" />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-remove-outline" @click="addDel(scope.$index)">移除</el-button>
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
    <InputDialog :visible.sync="searchIsshow" :search-content.sync="searchContent" :title.sync="titlesContent" @confirmed="addSearchForm" />
  </div>
</template>

<script>
  export default {
    props: {
      searchTypeList: {
        type: Array,
        required: []
      },
      searchContentList: {
        type: Array,
        required: []
      },
      optionArr: {
        type: Object,
        required: {}
      }
    },
    watch:{
      searchContentList:{
        handler(val){
          this.searchContentList = val
        }
      }
    },
    data() {
      return {
        searchData: {xnCode: '', soCode: '', ownerId: [], shopId: [],orderSource:[],platformOrderCode:'', deliveryOrderCode: '', preDeliveryOrderCode: '', preDeliveryOrderId: '',  warehouseId: [], logicwarehouseId: [], sourcePlatformCode: [], createTime: [], placeOrderTime: [], payTime: [], vestNo: '', logisticsCode: [], expressCode: '', expressName: '', provinceId: [], cityId: [], areaId: [], orderState: [], toOutTime: []},
        searchIsshow: false,
        searchContent: '',
        titlesContent: '',
        searchType: '',
        dataTypeList: this.searchTypeList,
        selectName: '',
        selectArr:[],
        selectIndex:'',
        toNumber:''
      }
    },
    mounted() {
      this.selectName = ''
      this.selectArr = []
    },
    methods: {
      addSearch(){
        if(this.selectName == ''){
          this.$modal.notifyWarning('请选择筛选条件！')
          return
        }
        if(this.searchContentList.findIndex(item => item.englishName=== this.selectName)!==-1){
          this.$modal.notifyWarning('该条件已添加！')
          return
        }
        this.searchContentList.push(this.selectArr)
      },
      addDel(index) {
        this.selectIndex=''
        this.searchContentList.splice(index, 1)
      },
      getSearch(val){
        for (let i = 0; i < this.searchTypeList.length; i++) {
          if(val==this.searchTypeList[i].englishName){
            this.selectArr=this.searchTypeList[i]
          }
        }
      },
      handleCurrentChange(row) {
        const index = this.searchContentList.indexOf(row)
        this.selectIndex = index;
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
      // 上移
      moveUp() {
        if(this.selectIndex === ''){
          this.$modal.notifyWarning('请选择一行！')
          return
        }
        if (this.selectIndex > 0) {
          const upDate = this.searchContentList[this.selectIndex - 1];
          this.searchContentList.splice(this.selectIndex - 1, 1);
          this.searchContentList.splice(this.selectIndex, 0, upDate);
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
        if (this.selectIndex + 1 === this.searchContentList.length) {
          this.$modal.notifyWarning('已经是最后一条，不可下移！')
        } else {
          const downDate = this.searchContentList[this.selectIndex + 1];
          this.searchContentList.splice(this.selectIndex + 1, 1);
          this.searchContentList.splice(this.selectIndex, 0, downDate);
          this.selectIndex = this.selectIndex + 1
        }
      },
      //转到
      moveTo(){
        if(this.selectIndex ===''){
          this.$modal.notifyWarning('请选择一行！')
          return
        }
        if(this.toNumber<1 || this.toNumber>this.searchContentList.length){
          this.$modal.notifyWarning('请输入正确的位置移动！')
          return
        }
        const toDate = this.searchContentList[this.selectIndex];
        this.searchContentList.splice(this.selectIndex , 1);
        this.searchContentList.splice(this.toNumber - 1, 0, toDate);
        this.selectIndex = this.toNumber - 1
      },
      //重置
      reset(){
        this.selectIndex = ''
        this.$emit('update:searchContentList', JSON.parse(JSON.stringify(this.searchTypeList)))
      }
    }
  }
</script>
<style scoped>
  .search-input{
    text-align: right;
    margin-right: 30px;
  }
</style>
