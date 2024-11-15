<template>
  <div>
    <div>
      <div class="demo-input-suffix">
        <span>组合名称：</span>
        <el-input
          placeholder="请输入组合名称"
          style="display: inline-block;width: 220px;margin-left: 3px;"
          v-model="content">
        </el-input>
      </div>
    </div>
    <div style="margin-top: 10px;">
      选择条件：
      <el-select v-model="selectName" filterable @change="getSearch" placeholder="请选择">
        <el-option
          v-for="item in dataTypeList"
          :key="item.englishName"
          :label="item.chineseName"
          :value="item.englishName">
        </el-option>
      </el-select>
      <el-button type="primary" style="margin-left: 10px;" icon="el-icon-circle-plus-outline" @click="addSearch">新增</el-button>
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
          <!--审核时间-->
          <div v-if="scope.row.englishName=='acceptTime'" class="search-input">
            {{scope.row.chineseName}}：
            <el-select
              v-model="scope.row.type"
              style="width: 70px;display: inline-block;"
              placeholder="请选择"
            >
              <el-option value="时" label="时" />
              <el-option value="天" label="天" />
              <el-option value="月" label="月" />
              <el-option value="年" label="年" />
            </el-select>
            <el-input v-model="scope.row.searchStr" style="display: inline-block;width: 280px;margin-left: 3px;" size="small" placeholder="请输入"></el-input>
          </div>
          <!--销售单号(系统生成)-->
          <div v-if="scope.row.englishName=='soCode'" class="search-input">
            {{scope.row.chineseName}}：
            <el-input
              v-model="scope.row.searchStr"
              size="small"
              placeholder="输入销售单号"
              style="width: 350px;"
              clearable
            >
              <el-button slot="suffix" type="text" @click="searchShow('soCode','输入销售单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button>
            </el-input>
          </div>
          <!--销售出库单号(系统生成)-->
          <div v-if="scope.row.englishName=='shCode'" class="search-input">
            {{scope.row.chineseName}}：
            <el-input
              v-model="scope.row.searchStr"
              size="small"
              placeholder="输入销售出库单号"
              style="width: 350px;"
              clearable
            >
              <el-button slot="suffix" type="text" @click="searchShow('shCode','输入销售出库单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button>
            </el-input>
          </div>
          <!--货主-->
          <div v-if="scope.row.englishName=='ownerId'" class="search-input">
            {{scope.row.chineseName}}：
            <SelectToolbar style="width: 350px;display: inline-block;"  v-model="scope.row.searchStr" :filterable=false :isfilte=true :fiftervalue="scope.row.searchStr" bindId="ownerId" bindName="ownerName" :fifteroptions="optionArr.owners" ></SelectToolbar>
          </div>
          <!--店铺-->
          <div v-if="scope.row.englishName=='shopId'" class="search-input">
            {{scope.row.chineseName}}：
            <SelectToolbar style="width: 350px;display: inline-block;"  v-model="scope.row.searchStr" :filterable=false :isfilte=true :fiftervalue="scope.row.searchStr" bindId="shopId" bindName="shopName" :fifteroptions="optionArr.shops" ></SelectToolbar>
          </div>
          <!--出库单号(上位传值)-->
          <div v-if="scope.row.englishName=='deliveryOrderCode'" class="search-input">
            {{scope.row.chineseName}}：
            <el-input
              v-model="scope.row.searchStr"
              size="small"
              placeholder="输入出库单号"
              style="width: 350px;"
              clearable
            >
              <el-button slot="suffix" type="text" @click="searchShow('deliveryOrderCode','输入出库单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button>
            </el-input>
          </div>
          <!--ERP出库单号（ERP 分配）-->
          <div v-if="scope.row.englishName=='preDeliveryOrderCode'" class="search-input">
            {{scope.row.chineseName}}：
            <el-input
              v-model="scope.row.searchStr"
              size="small"
              placeholder="输入ERP原出库单号"
              style="width: 350px;"
              clearable
            >
              <el-button slot="suffix" type="text" @click="searchShow('preDeliveryOrderCode','输入ERP原出库单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button>
            </el-input>
          </div>
          <!--原出库单号（WMS 分配）-->
          <div v-if="scope.row.englishName=='preDeliveryOrderId'" class="search-input">
            {{scope.row.chineseName}}：
            <el-input
              v-model="scope.row.searchStr"
              size="small"
              placeholder="输入WMS原出库单号"
              style="width: 350px;"
              clearable
            >
              <el-button slot="suffix" type="text" @click="searchShow('preDeliveryOrderId','输入WMS原出库单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button>
            </el-input>
          </div>
          <!--出库单类型-->
          <div v-if="scope.row.englishName=='orderType'" class="search-input">
            {{scope.row.chineseName}}：
            <el-select
              v-model="scope.row.searchStr"
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
          </div>
          <!--仓库名称-->
          <div v-if="scope.row.englishName=='warehouseId'" class="search-input">
            {{scope.row.chineseName}}：
            <SelectToolbar style="width: 350px;display: inline-block;"  v-model="scope.row.searchStr" :filterable=false :isfilte=true :fiftervalue="scope.row.searchStr" bindId="warehouseId" bindName="warehouseName" :fifteroptions="optionArr.warehouses" ></SelectToolbar>
          </div>
          <!--逻辑仓库-->
          <div v-if="scope.row.englishName=='logicwarehouseId'" class="search-input">
            {{scope.row.chineseName}}：
            <SelectToolbar style="width: 350px;display: inline-block;"  v-model="scope.row.searchStr" :filterable=false :isfilte=true :fiftervalue="scope.row.searchStr" bindId="logicwarehouseId" bindName="logicwarehouseName" :fifteroptions="optionArr.logicwarehouses" ></SelectToolbar>
          </div>
          <!--来源平台名称-->
          <div v-if="scope.row.englishName=='sourcePlatformCode'" class="search-input">
            {{scope.row.chineseName}}：
            <SelectToolbar style="width: 350px;display: inline-block;"  v-model="scope.row.searchStr" :filterable=false :isfilte=true :fiftervalue="scope.row.searchStr" bindId="sourcePlatformCode" bindName="sourcePlatformName" :fifteroptions="optionArr.sourcePlatforms" ></SelectToolbar>
          </div>
          <!--发货单创建时间-->
          <div v-if="scope.row.englishName=='createTime'" class="search-input">
            {{scope.row.chineseName}}：
            <el-select
              v-model="scope.row.type"
              style="width: 70px;display: inline-block;"
              placeholder="请选择"
            >
              <el-option value="时" label="时" />
              <el-option value="天" label="天" />
              <el-option value="月" label="月" />
              <el-option value="年" label="年" />
            </el-select>
            <el-input v-model="scope.row.searchStr" style="display: inline-block;width: 280px;margin-left: 3px;" size="small" placeholder="请输入"></el-input>
          </div>
          <!--下单时间-->
          <div v-if="scope.row.englishName=='placeOrderTime'" class="search-input">
            {{scope.row.chineseName}}：
            <el-select
              v-model="scope.row.type"
              style="width: 70px;display: inline-block;"
              placeholder="请选择"
            >
              <el-option value="时" label="时" />
              <el-option value="天" label="天" />
              <el-option value="月" label="月" />
              <el-option value="年" label="年" />
            </el-select>
            <el-input v-model="scope.row.searchStr" style="display: inline-block;width: 280px;margin-left: 3px;" size="small" placeholder="请输入"></el-input>
          </div>
          <!--支付时间-->
          <div v-if="scope.row.englishName=='payTime'" class="search-input">
            {{scope.row.chineseName}}：
            <el-select
              v-model="scope.row.type"
              style="width: 70px;display: inline-block;"
              placeholder="请选择"
            >
              <el-option value="时" label="时" />
              <el-option value="天" label="天" />
              <el-option value="月" label="月" />
              <el-option value="年" label="年" />
            </el-select>
            <el-input v-model="scope.row.searchStr" style="display: inline-block;width: 280px;margin-left: 3px;" size="small" placeholder="请输入"></el-input>
          </div>
          <!--卖家名称-->
          <div v-if="scope.row.englishName=='sellerNick'" class="search-input">
            {{scope.row.chineseName}}：
            <el-input
              v-model="scope.row.searchStr"
              size="small"
              placeholder="输入卖家名称"
              style="width: 350px;"
              clearable
            >
              <el-button slot="suffix" type="text" @click="searchShow('sellerNick','输入卖家名称')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button>
            </el-input>
          </div>
          <!--买家昵称-->
          <div v-if="scope.row.englishName=='buyerNick'" class="search-input">
            {{scope.row.chineseName}}：
            <el-input
              v-model="scope.row.searchStr"
              size="small"
              placeholder="输入买家昵称"
              style="width: 350px;"
              clearable
            >
              <el-button slot="suffix" type="text" @click="searchShow('buyerNick','输入买家昵称')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button>
            </el-input>
          </div>
          <!--主运单号-->
          <div v-if="scope.row.englishName=='vestNo'" class="search-input">
            {{scope.row.chineseName}}：
            <el-input
              v-model="scope.row.searchStr"
              size="small"
              placeholder="输入主运单号"
              style="width: 350px;"
              clearable
            >
              <el-button slot="suffix" type="text" @click="searchShow('vestNo','输入主运单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button>
            </el-input>
          </div>
          <!--物流编码-->
          <div v-if="scope.row.englishName=='logisticsCode'" class="search-input">
            {{scope.row.chineseName}}：
            <SelectToolbar style="width: 350px;display: inline-block;"  v-model="scope.row.searchStr" :filterable=false :isfilte=true :fiftervalue="scope.row.searchStr" bindId="logisticsCode" bindName="logisticsName" :fifteroptions="optionArr.logistics" ></SelectToolbar>
          </div>
          <!--配运单号-->
          <div v-if="scope.row.englishName=='expressCode'" class="search-input">
            {{scope.row.chineseName}}：
            <el-input
              v-model="scope.row.searchStr"
              size="small"
              placeholder="输入配运单号"
              style="width: 350px;"
              clearable
            >
              <el-button slot="suffix" type="text" @click="searchShow('expressCode','输入配运单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button>
            </el-input>
          </div>
          <!--物流名称-->
          <div v-if="scope.row.englishName=='expressName'" class="search-input">
            {{scope.row.chineseName}}：
            <el-select
              v-model="scope.row.searchStr"
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
            <SelectToolbar style="width: 350px;display: inline-block;"  v-model="scope.row.searchStr" :filterable=false :isfilte=true :fiftervalue="scope.row.searchStr" bindId="provinceId" bindName="provinceName" :fifteroptions="optionArr.provinces" ></SelectToolbar>
          </div>
          <!--市-->
          <div v-if="scope.row.englishName=='cityId'" class="search-input">
            {{scope.row.chineseName}}：
            <SelectToolbar style="width: 350px;display: inline-block;"  v-model="scope.row.searchStr" :filterable=false :isfilte=true :fiftervalue="scope.row.searchStr" bindId="cityId" bindName="cityName" :fifteroptions="optionArr.cities" ></SelectToolbar>
          </div>
          <!--区/县-->
          <div v-if="scope.row.englishName=='areaId'" class="search-input">
            {{scope.row.chineseName}}：
            <SelectToolbar style="width: 350px;display: inline-block;"  v-model="scope.row.searchStr" :filterable=false :isfilte=true :fiftervalue="scope.row.searchStr" bindId="areaId" bindName="areaName" :fifteroptions="optionArr.areas" ></SelectToolbar>
          </div>
          <!--审核状态-->
          <div v-if="scope.row.englishName=='orderState'" class="search-input">
            {{scope.row.chineseName}}：
            <el-select
              v-model="scope.row.searchStr"
              style="width: 350px"
              placeholder="请选择"
              multiple
              collapse-tags
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
          <div v-if="scope.row.englishName=='examineTime'" class="search-input">
            {{scope.row.chineseName}}：
            <el-select
              v-model="scope.row.type"
              style="width: 70px;display: inline-block;"
              placeholder="请选择"
            >
              <el-option value="时" label="时" />
              <el-option value="天" label="天" />
              <el-option value="月" label="月" />
              <el-option value="年" label="年" />
            </el-select>
            <el-input v-model="scope.row.searchStr" style="display: inline-block;width: 280px;margin-left: 3px;" size="small" placeholder="请输入"></el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          <el-button size="mini" v-if="scope.row.englishName!='acceptTime'" type="text" icon="el-icon-remove-outline" @click="addDel(scope.$index)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      },
      groupName:{
        type: String,
        default: ''
      },
      selectType:{
        type: String,
        default: ''
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
        searchData: {soCode: '', shCode: '', ownerId: [], shopId: [], deliveryOrderCode: '', preDeliveryOrderCode: '', preDeliveryOrderId: '', orderType: [], warehouseId: [], logicwarehouseId: [], sourcePlatformCode: [], createTime: '', placeOrderTime: '', payTime: '', sellerNick: '', buyerNick: '', vestNo: '', logisticsCode: [], expressCode: '', expressName: [], provinceId: [], cityId: [], areaId: [], orderState: [], examineTime: '', acceptTime: ''},
        searchIsshow: false,
        searchContent: '',
        titlesContent: '',
        searchType: '',
        dataTypeList: this.searchTypeList,
        selectArr:[],
        selectIndex:'',
        toNumber:''
      }
    },
    computed: {
      content: {
        get() {
          return this.groupName
        },
        set(value) {
          this.$emit('update:groupName', value)
        }
      },
      selectName: {
        get() {
          return this.selectType
        },
        set(value) {
          this.$emit('update:selectType', value)
        }
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
        let type = ''
        if(this.selectName == 'createTime' || this.selectName == 'placeOrderTime' || this.selectName == 'payTime' || this.selectName == 'examineTime'){
          type='时'
        }
        this.searchContentList.push(Object.assign({}, this.selectArr, { type: type ,searchStr:JSON.parse(JSON.stringify(this.searchData[this.selectName]))}))
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
        this.searchContentList.forEach((item,index)=>{
          if(item.englishName == type){
            this.searchContent = item.searchStr.replace(/,/g, '\n')
          }
        })
        this.searchType = type
        this.titlesContent = title
        this.searchIsshow = true
      },
      addSearchForm() {
        var _this=this
        this.searchContentList.forEach((item,index)=>{
          if(item.englishName == _this.searchType){
            item.searchStr = _this.searchContent.replace(/\n/g, ',').replace('，', ',')
          }
        })
        this.searchIsshow = false
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
