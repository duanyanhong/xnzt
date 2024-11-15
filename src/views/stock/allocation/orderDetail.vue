<template>
  <div style="height: 650px;max-height: 650px;">
    <div>
      <div style="font-weight: bold;font-size: 15pt;height: 40px;line-height: 40px;">
        基础信息
      </div>
      <div style="border-bottom: 1px solid #ccc;margin-bottom: 10px;"></div>
      <el-form ref="formData" :inline="true"  size="small" label-width="100px">
        <el-form-item label="调拨订单">
          <el-input v-model="detailData.allocationOrderCode" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="调拨类型">
          <el-input v-model="detailData.allocationType" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="订单状态">
          <el-input v-model="detailData.orderState" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="来源平台">
          <el-input v-model="detailData.sourcePlatformCode" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="货主">
          <el-input v-model="detailData.ownerName" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="原逻辑仓库">
          <el-input v-model="detailData.fromLogicwarehouseName" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="目标逻辑仓库">
          <el-input v-model="detailData.toLogicwarehouseName" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="异常类型">
          <el-input v-model="detailData.exceptionType" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="异常描述">
          <el-input v-model="detailData.exceptionDesc" style="width: 220px" disabled />
        </el-form-item>
      </el-form>
    </div>
    <div>
      <div style="font-weight: bold;font-size: 15pt;height: 40px;line-height: 40px;">
        统计信息
      </div>
      <div style="border-bottom: 1px solid #ccc;margin-bottom: 10px;"></div>
      <el-form ref="formData" :inline="true"  size="small" label-width="100px">
        <el-form-item label="总行数">
          <el-input v-model="total.count" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="总数量">
          <el-input v-model="total.sum" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="总重量">
          <el-input v-model="total.weight" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="总体积">
          <el-input v-model="total.volume" style="width: 220px" disabled />
        </el-form-item>
      </el-form>
      <div style="margin-bottom: 10px;">
        <el-button
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="addDetailInfoShow"
          plain
          v-hasPermi="['Stock:Allocation:AddDetail']"
        >
          新增明细
        </el-button>
        <el-button
          class="filter-item"
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="delDetailInfo"
          plain
          v-hasPermi="['Stock:Allocation:RemoveDetail']"
        >
          删除明细
        </el-button>
      </div>
      <el-table
        :data="detailInfo"
        border
        height="300"
        :row-height="10"
        @selection-change="handleSelectionChange"
        style="width: 100%;overflow-y: auto;">
        <el-table-column type="selection"  width="55"  />
        <el-table-column :show-overflow-tooltip="true" prop="skuCode"  label="商品编码"/>
        <el-table-column :show-overflow-tooltip="true" prop="skuName"  label="商品名称"/>
        <el-table-column :show-overflow-tooltip="true" prop="skuState" label="库存状态"/>
        <el-table-column :show-overflow-tooltip="true" prop="planQty" label="请求数量"/>
        <el-table-column :show-overflow-tooltip="true" prop="stockUnit" label="单位"/>
        <el-table-column :show-overflow-tooltip="true" prop="totalWeight" label="总重量"/>
        <el-table-column :show-overflow-tooltip="true" prop="totalVolume" label="总体积"/>
        <el-table-column :show-overflow-tooltip="true" prop="lotNo" label="批号"/>
        <el-table-column :show-overflow-tooltip="true" prop="batchNo" label="批次"/>
        <el-table-column :show-overflow-tooltip="true" prop="productDate" label="生产日期"/>
        <el-table-column :show-overflow-tooltip="true" prop="expireDate" label="失效日期"/>
        <el-table-column :show-overflow-tooltip="true" prop="shelfLife" label="保质期"/>
        <el-table-column :show-overflow-tooltip="true" prop="shelfLifeUnit" label="保质期单位"/>
      </el-table>
    </div>
    <InputDialog :visible.sync="searchIsshow" :search-content.sync="searchContent" :title.sync="titlesContent" @confirmed="addSearchForm" />
    <el-dialog append-to-body :close-on-click-modal="false" top="8vh" :visible.sync="isFormDetailShow" class="custom-dialog" center  title="批量新增" width="80%">
      <div style="height: 650px;max-height: 650px;">
        <div class="head-container">
          <div  class="filter-item">
            <el-input
              v-model="searchDetailData.skuCode"
              size="small"
              placeholder="输入商品编码"
              style="width: 200px;"
              clearable
            >
              <el-button slot="suffix" type="text" @click="searchShow('skuCode','输入商品编码')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button>
            </el-input>
          </div>
          <div  class="filter-item">
            <el-input
              v-model="searchDetailData.barCode"
              size="small"
              placeholder="输入商品条码"
              style="width: 200px;"
              clearable
            >
              <el-button slot="suffix" type="text" @click="searchShow('barCode','输入商品条码')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button>
            </el-input>
          </div>
          <div  class="filter-item">
            <el-input
              v-model="searchDetailData.skuName"
              size="small"
              placeholder="输入商品名称"
              style="width: 200px;"
              clearable
            >
              <el-button slot="suffix" type="text" @click="searchShow('skuName','输入商品名称')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button>
            </el-input>
          </div>
          <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="searchDetail">搜索</el-button>
        </div>
        <el-table
          :data="stockDataList"
          v-loading="loadingStock"
          border
          height="300"
          :row-height="10"
          style="width: 100%;overflow-y: auto;">
          <el-table-column :show-overflow-tooltip="true" prop="skuCode"  label="商品编码"/>
          <el-table-column :show-overflow-tooltip="true" prop="skuName"  label="商品名称"/>
          <el-table-column :show-overflow-tooltip="true" prop="usableQty" label="可用数量"/>
          <el-table-column :show-overflow-tooltip="true" prop="inWarehouseQty" label="在库数量"/>
          <el-table-column :show-overflow-tooltip="true" prop="assignQty" label="分配数量"/>
          <el-table-column :show-overflow-tooltip="true" prop="lockedQty" label="锁定数量"/>
          <el-table-column :show-overflow-tooltip="true" prop="inTransitQty" label="在途数量"/>
          <el-table-column
            align="center"
            width="160"
            label="请求数量">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.planQty"  controls-position="right" :min="1" ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="skuState" label="库存状态"/>
          <el-table-column :show-overflow-tooltip="true" prop="lotNo" label="批号"/>
          <el-table-column :show-overflow-tooltip="true" prop="batchNo" label="批次"/>
          <el-table-column :show-overflow-tooltip="true" prop="productDate" label="生产日期"/>
          <el-table-column :show-overflow-tooltip="true" prop="expireDate" label="失效日期"/>
          <el-table-column :show-overflow-tooltip="true" prop="shelfLife" label="保质期"/>
          <el-table-column :show-overflow-tooltip="true" prop="shelfLifeUnit" label="保质期单位"/>
          <el-table-column
            label="操作"
            align="center"
            width="80"
          >
            <template slot-scope="scope">
              <el-button size="mini"  type="text" icon="el-icon-circle-plus-outline" @click="addStock(scope.row)">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div>
          已选明细
        </div>
        <el-table
          :data="selectData"
          border
          height="300"
          :row-height="10"
          style="width: 100%;overflow-y: auto;">
          <el-table-column :show-overflow-tooltip="true" prop="skuCode"  label="商品编码"/>
          <el-table-column :show-overflow-tooltip="true" prop="skuName"  label="商品名称"/>
          <el-table-column :show-overflow-tooltip="true" prop="skuState" label="库存状态"/>
          <el-table-column :show-overflow-tooltip="true" prop="planQty" label="请求数量"/>
          <el-table-column :show-overflow-tooltip="true" prop="stockUnit" label="单位"/>
          <el-table-column :show-overflow-tooltip="true" prop="lotNo" label="批号"/>
          <el-table-column :show-overflow-tooltip="true" prop="batchNo" label="批次"/>
          <el-table-column :show-overflow-tooltip="true" prop="productDate" label="生产日期"/>
          <el-table-column :show-overflow-tooltip="true" prop="expireDate" label="失效日期"/>
          <el-table-column :show-overflow-tooltip="true" prop="shelfLife" label="保质期"/>
          <el-table-column :show-overflow-tooltip="true" prop="shelfLifeUnit" label="保质期单位"/>
          <el-table-column
            label="操作"
            align="center"
            width="80"
          >
            <template slot-scope="scope">
              <el-button size="mini"  type="text" icon="el-icon-remove-outline" @click="addDel(scope.$index)">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button type="primary"  v-debounce="addStockForm" >确认</el-button>
        <el-button type="primary" @click="isFormDetailShow=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getStock } from "@/api/stock/allocationorder";
  export default {
    props: {
      detailData: {
        type: Object,
        required: {}
      },
      detailInfo: {
        type: Array
      }
    },
    data() {
      return {
        total:{
          count:'',
          sum:'',
          weight:'',
          volume:''
        },
        ids:[],
        isFormDetailShow:false,
        searchIsshow: false,
        searchContent: '',
        titlesContent: '',
        searchType: '',
        searchDetailData:{
          skuCode:'',
          barCode:'',
          skuName:'',
          accessToken:sessionStorage.getItem('xn_token'),
          ownerId:'',
          fromLogicwarehouseId:''
        },
        stockDataList:[],
        selectData: [],
        loadingStock:false
      }
    },
    watch:{
      detailInfo:{
        handler(val){
          this.getTotal()
        }
      }
    },
    activated(){
    },
    mounted() {
      this.getTotal()
    },
    methods: {
      // 勾选数据
      handleSelectionChange(value) {
        this.ids = []
        for (let k = 0; k < value.length; k++) {
          this.ids.push(value[k])
        }
      },
      getTotal(){
        this.total.count = this.detailInfo.length
        this.total.sum = 0
        this.total.weight = 0
        this.total.volume = 0
        for (let k = 0; k < this.detailInfo.length; k++) {
          this.total.sum=this.total.sum+this.detailInfo[k].planQty
          this.total.weight=this.total.weight+this.detailInfo[k].totalWeight
          this.total.volume=this.total.volume+this.detailInfo[k].totalVolume
        }
        this.total.weight = this.total.weight.toFixed(2)
        this.total.volume = this.total.volume.toFixed(2)
      },
      delDetailInfo(){
        if(this.ids.length<1){
          this.$modal.notifyWarning('请选择要操作数据！')
          return
        }
        let newData = this.detailInfo.filter(
          (a) => !this.ids.some((b) => a.uniqueId === b.uniqueId)
        )
        this.$emit('update:detailInfo', newData)
      },
      addDetailInfoShow(){
        for(var key in this.searchDetailData){
          if(key!='accessToken'&&key!='ownerId'&&key!='fromLogicwarehouseId'){
            this.searchDetailData[key]=''
          }
        }
        this.isFormDetailShow = true
        this.stockDataList = []
        this.selectData = []
      },
      searchShow(type, title) {
        this.searchContent = this.searchDetailData[type].replace(/,/g, '\n')
        this.searchType = type
        this.titlesContent = title
        this.searchIsshow = true
      },
      addSearchForm() {
        this.searchDetailData[this.searchType] = this.searchContent.replace(/\n/g, ',').replace('，', ',')
        this.searchIsshow = false
      },
      searchDetail(){
        this.loadingStock = true
        this.searchDetailData.ownerId = this.detailData.ownerId
        this.searchDetailData.fromLogicwarehouseId = this.detailData.fromLogicwarehouseId
        getStock(this.searchDetailData).then(res => {
          this.stockDataList = res.msgData.items
          this.loadingStock = false
        })
      },
      addStock(row){
        if(row.planQty==undefined || row.planQty<1){
          this.$modal.notifyWarning('请选择录入请求数量！')
          return
        }
        var sindex = this.selectData.findIndex(obj => {
          return obj.skuCode === row.skuCode && obj.skuState === row.skuState && obj.batchNo === row.batchNo;
        });
        if(sindex==-1){
          this.selectData.push(JSON.parse(JSON.stringify(row)))
        }else{
          this.selectData[sindex].planQty+=row.planQty
        }
      },
      addDel(index) {
        this.selectData.splice(index, 1)
      },
      addStockForm(){
        if(this.selectData.length<1){
          this.$modal.notifyWarning('请添加明细！')
          return
        }
        for (let i = 0; i < this.selectData.length; i++) {
          var str = this.selectData[i].skuCode+this.selectData[i].skuState+this.selectData[i].batchNo
          var uniqueId=btoa(unescape(encodeURIComponent(str)))
          var dindex = this.detailInfo.findIndex(obj => {
            return obj.skuCode === this.selectData[i].skuCode && obj.skuState === this.selectData[i].skuState && obj.batchNo === this.selectData[i].batchNo;
          });
          var totalVolume = this.selectData[i].planQty * this.selectData[i].singleVolume
          var totalWeight = this.selectData[i].planQty * this.selectData[i].singleGrossWeight
          if(dindex==-1){
            this.total.count +=1
            var child = {uniqueId:uniqueId,logicwarehouseId:this.detailData.fromLogicwarehouseId,barCode:this.selectData[i].barCode,skuCode:this.selectData[i].skuCode,skuName:this.selectData[i].skuName,skuState:this.selectData[i].skuState,planQty:this.selectData[i].planQty,stockUnit:this.selectData[i].stockUnit,totalWeight:totalWeight,totalVolume:totalVolume,lotNo:this.selectData[i].lotNo,batchNo:this.selectData[i].batchNo,productDate:this.selectData[i].productDate,expireDate:this.selectData[i].expireDate,shelfLife:this.selectData[i].shelfLife,shelfLifeUnit:this.selectData[i].shelfLifeUnit}
            this.detailInfo.push(child)
          }else{
            this.detailInfo[dindex].planQty+=this.selectData[i].planQty
            this.detailInfo[dindex].totalVolume+=totalVolume
            this.detailInfo[dindex].totalWeight+=totalWeight
          }
        }
        this.getTotal()
        this.isFormDetailShow = false
      }
    }
  }
</script>
<style>
  .custom-dialog .el-dialog__header {
    background-color: #81D3F8;
  }
</style>
