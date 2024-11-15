
<!--  订单管理-销售管理-销售订单 -->
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
                <!--新鸟单号(系统生成)-->
                <div v-if="item.englishName=='xnCode'" class="filter-item" >
                  <el-input
                    v-model="searchData.xnCode"
                    size="small"
                    placeholder="输入新鸟单号"
                    style="width: 180px;"
                    clearable
                  >
                     <i  class="el-icon-edit el-input__icon"  slot="suffix"  @click="searchShow('xnCode','输入新鸟单号')"></i>
                    <!-- <el-button slot="suffix" type="text" @click="searchShow('xnCode','输入新鸟单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button> -->
                  </el-input>
                </div>
                <!--销售单号(系统生成)-->
                <div v-if="item.englishName=='soCode'" class="filter-item">
                  <el-input
                    v-model="searchData.soCode"
                    size="small"
                    placeholder="输入销售单号"
                    style="width: 180px;"
                    clearable
                  >
                    <i  class="el-icon-edit el-input__icon"  slot="suffix"  @click="searchShow('soCode','输入销售单号')"></i>
                    <!-- <el-button slot="suffix" type="text" @click="searchShow('soCode','输入销售单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button> -->
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
                 <!--网店订单号-->
                 <div v-if="item.englishName=='platformOrderCode'" class="filter-item">
                  <el-input
                    v-model="searchData.platformOrderCode"
                    size="small"
                    placeholder="输入网店订单号"
                    style="width: 180px;"
                    clearable
                  >
                    <i  class="el-icon-edit el-input__icon"  slot="suffix"  @click="searchShow('platformOrderCode','输入网店订单号')"></i>
                    <!-- <el-button slot="suffix" type="text" @click="searchShow('soCode','输入销售单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button> -->
                  </el-input>
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
                    <i  class="el-icon-edit el-input__icon"  slot="suffix"  @click="searchShow('deliveryOrderCode','输入出库单号')"></i>
                    <!-- <el-button slot="suffix" type="text" @click="searchShow('deliveryOrderCode','输入出库单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button> -->
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
                    <i  class="el-icon-edit el-input__icon"  slot="suffix"  @click="searchShow('preDeliveryOrderCode','输入ERP原出库单号')"></i>
                    <!-- <el-button slot="suffix" type="text" @click="searchShow('preDeliveryOrderCode','输入ERP原出库单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button> -->
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
                    <i  class="el-icon-edit el-input__icon"  slot="suffix"  @click="searchShow('preDeliveryOrderId','输入WMS原出库单号')"></i>
                    <!-- <el-button slot="suffix" type="text" @click="searchShow('preDeliveryOrderId','输入WMS原出库单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button> -->
                  </el-input>
                </div>
                 <!--订单来源-->
                <div v-if="item.englishName=='orderSource'" class="filter-item my-select">
                  <SelectToolbar style="width: 180px;display: inline-block;" placeholder="请选择订单来源"  v-model="searchData.orderSource" :filterable=false :isfilte=true :fiftervalue="searchData.orderSource" bindId="value" bindName="label" :fifteroptions="optionArr.orderSource" ></SelectToolbar>
                </div>
                <!--出库单类型-->
                <!-- <div v-if="item.englishName=='orderType'" class="filter-item my-select">
                  <el-select
                    v-model="searchData.orderType"
                    style="width: 180px"
                    placeholder="请选择出库单类型"
                    multiple
                    clearable
                  >
                    <el-option
                      v-for="item in ordersType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div> -->
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
                <!-- <div v-if="item.englishName=='sellerNick'" class="filter-item">
                  <el-input
                    v-model="searchData.sellerNick"
                    size="small"
                    placeholder="输入卖家名称"
                    style="width: 180px;"
                    clearable
                  >
                   <i  class="el-icon-edit el-input__icon"  slot="suffix"  @click="searchShow('sellerNick','输入卖家名称')"></i>
                  </el-input>
                </div> -->
                <!--买家昵称-->
                <!-- <div v-if="item.englishName=='buyerNick'" class="filter-item">
                  <el-input
                    v-model="searchData.buyerNick"
                    size="small"
                    placeholder="输入买家昵称"
                    style="width: 180px;"
                    clearable
                  >
                     <i  class="el-icon-edit el-input__icon"  slot="suffix"  @click="searchShow('buyerNick','输入买家昵称')"></i>
                  </el-input>
                </div> -->
                <!--主运单号（马甲单号）-->
                <div v-if="item.englishName=='vestNo'" class="filter-item">
                  <el-input
                    v-model="searchData.vestNo"
                    size="small"
                    placeholder="输入主运单号"
                    style="width: 180px;"
                    clearable
                  >
                    <i  class="el-icon-edit el-input__icon"  slot="suffix"  @click="searchShow('vestNo','输入主运单号')"></i>
                    <!-- <el-button slot="suffix" type="text" @click="searchShow('vestNo','输入主运单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button> -->
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
                    <i  class="el-icon-edit el-input__icon"  slot="suffix"  @click="searchShow('expressCode','输入配运单号')"></i>
                    <!-- <el-button slot="suffix" type="text" @click="searchShow('expressCode','输入配运单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button> -->
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
                      v-for="item in ordersState"
                      :key="item.label"
                      :label="item.label"
                      :value="item.label"
                    />
                  </el-select>
                </div>
                <!--回传状态）-->
                <div v-if="item.englishName=='returnState'" class="filter-item my-select">
                  <el-select
                    v-model="searchData.returnState"
                    style="width: 180px"
                    placeholder="请选择回传状态"
                    clearable
                  >
                    <el-option
                      v-for="item in returnState"
                      :key="item.label"
                      :label="item.label"
                      :value="item.label"
                    />
                  </el-select>
                </div>
                <!--审核时间-->
                <div v-if="item.englishName=='toOutTime'" class="time-title-other">
                  <span class="filter-item" style="font-size: 10pt;margin-right: 1px;">{{item.chineseName}}:</span>
                  <date-range-picker v-model="searchData.toOutTime"   style="width: 350px !important;" class="date-item" />
                </div>
              </template>
              <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="search" >搜索</el-button>
            </div>
          </div>
          <div class="combined-crud">
            <el-button v-for="(item,i) in btnList" :style="item.style" :key="i" size="mini" @click="changeGroupId(item.groupId)" >{{item.groupName}}</el-button>
          </div>
        </div>
        <el-row :gutter="15" style="margin-bottom: 1px;" class="crud-opts">
          <el-col :span="20">
            <span class="crud-opts-left others" style="padding-right: 10px;" v-hasPermi="['Order:SaleOrder:Add']">
              <el-dropdown trigger="click" >
                <span class="el-dropdown-link">
                  <el-button type="primary" plain icon="el-icon-plus" size="mini">新增</el-button>
                </span>
                <template #dropdown>
                  <el-dropdown-menu >
                    <el-dropdown-item  v-for="item in options" :key="item.value" :label="item.label" :value="item.value"  >
                    <div class="flex items-center">
                        <el-upload v-if="item.value==2"  class="inline-block"  :show-file-list="false"  :http-request="uploadSuccess" accept=".xlsx,.xls,.csv"  action="#" >
                          <el-button type="primary" plain  size="mini">导入新增</el-button>
                        </el-upload>
                        <el-button v-if="item.value==1"  class="filter-item"  size="mini" type="primary"  plain  @click="addShow" >
                          手动新增
                        </el-button>
                    </div>
                   </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
     
            </span>
            <span class="crud-opts-left" style="padding-right: 10px;" v-hasPermi="['Order:SaleOrder:Toout']">
              <el-button class="filter-item" size="mini" type="success" @click="examineAllocation"  icon="el-icon-finished" plain>审核</el-button>
            </span>
            <span class="crud-opts-left" style="padding-right: 10px;" v-hasPermi="['Order:SaleOrder:Intercept']" >
              <el-button class="filter-item" size="mini" type="danger" icon="el-icon-s-promotion" @click="handleIntercept" plain>拦截</el-button>
            </span>
            <span class="crud-opts-left others" style="padding-right: 10px;" v-hasPermi="['Order:SaleOrder:Export']">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <el-button type="success" plain icon="el-icon-back" size="mini">回传</el-button>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item  v-for="item in optionsReturn" :key="item.value"  :label="item.label" :value="item.value" >
                      <div class="flex items-center">
                        <el-button  v-if="item.value==2" class="filter-item" size="mini" type="success" plain    >
                          出库回传ERP
                        </el-button>
                        <el-button  v-if="item.value==1"  class="filter-item" @click="handleReturn"  size="mini" type="success"  plain  >
                          出库回传平台
                        </el-button>
                      </div>
                   </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </span>
            <span class="crud-opts-left others" style="padding-right: 10px;" v-hasPermi="['Order:SaleOrder:Export']">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <el-button type="primary" plain icon="el-icon-upload2" size="mini">导出</el-button>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item  v-for="item in optionsExport" :key="item.value" :label="item.label" :value="item.value"  >
                      <div class="flex items-center">
                        <el-button  v-if="item.value==2"  class="filter-item" size="mini" type="primary" plain  @click="exportSaleorder"   >
                           导出订单
                        </el-button>
                        <el-button v-if="item.value==1"  class="filter-item" size="mini"  type="primary"  plain  @click="exportSaleorderDetail"  >
                          导出明细
                        </el-button>
                      </div>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </span>
            <span class="crud-opts-left" style="padding-right: 10px;" v-hasPermi="['Order:SaleOrder:Replace']">
              <el-button class="filter-item" size="mini" type="success" @click="handelReplace"  icon="el-icon-sort" plain>商品替换</el-button>
            </span>
            <span class="crud-opts-left" style="padding-right: 10px;" v-hasPermi="['Order:SaleOrder:Lock']">
              <el-button class="filter-item" size="mini" type="danger"  icon="el-icon-lock"  @click="handelLock"  plain>锁定</el-button>
            </span>
            <span class="crud-opts-left" style="padding-right: 10px;" v-hasPermi="['Order:SaleOrder:Unlock']">
              <el-button class="filter-item" size="mini" type="success" icon="el-icon-unlock" @click="handelUnLock" plain>解锁</el-button>
            </span>

            <span class="crud-opts-left" style="padding-right: 10px;" v-hasPermi="['Order:SaleOrder:Void']">
              <el-button class="filter-item" size="mini" type="info"  icon="el-icon-remove-outline" plain>作废</el-button>
            </span>
            <span class="crud-opts-left" style="padding-right: 10px;" v-hasPermi="['Order:SaleOrder:Restore']">
              <el-button class="filter-item" size="mini" type="warning"  icon="el-icon-refresh-left" plain>恢复</el-button>
            </span>
            <span class="crud-opts-left" style="padding-right: 10px;" v-hasPermi="['Order:SaleOrder:Delete']">
              <el-button class="filter-item" size="mini" type="danger"  icon="el-icon-delete" plain>删除</el-button>
            </span>
            <span class="crud-opts-left" style="padding-right: 10px;" v-hasPermi="['Order:SaleOrder:Processtoout']">
              <el-button class="filter-item" size="mini" type="success"  icon="el-icon-place" plain>寻源审核</el-button>
            </span>
            <span class="crud-opts-left" style="padding-right: 10px;" v-hasPermi="['Order:SaleOrder:Decrypto']" >
              <el-button class="filter-item" size="mini" type="primary" icon="el-icon-download" plain>导入解密</el-button>
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
        <splitpanes
          horizontal
          :style="[{height:splitpanesHeight+ 'px'},{border:'1px solid #DCDFE6'},{borderRadius:'5px'}]"
          @resize="onSizesChanged"
        >
        <!-- 订单数据 -->
          <pane class="splitpanes-top" min-size="35" :size="topSize">
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
                  <u-table-column :show-overflow-tooltip="true" align="center" :label="item.chineseName" :width="item.fieldSize"  v-else-if="item.englishName=='scheduleType'">
                    <template slot-scope="scope">
                      {{scope.row.scheduleType==1?'工作日':scope.row.scheduleType==2?'节假日':scope.row.scheduleType==101?'当日达':scope.row.scheduleType==102?'次晨达':scope.row.scheduleType==103?'次日达':scope.row.scheduleType==104?'预约达':''  }}
                    </template>
                  </u-table-column>
                  <u-table-column :show-overflow-tooltip="true" align="center" :label="item.chineseName" :width="item.fieldSize"  v-else-if="item.englishName=='deliveryType'">
                    <template slot-scope="scope">
                      {{scope.row.deliveryType=='PTPS'?'普通配送':scope.row.deliveryType=='LLPS'?'冷链配送':scope.row.deliveryType=='HBP'?'环保配':''  }}
                    </template>
                  </u-table-column>
                  <u-table-column v-else :show-overflow-tooltip="true"  align="center"  :prop="item.englishName" :width="item.fieldSize" :label="item.chineseName" />
                </template>
              </template>
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
          <!--明细详情  -->
          <pane class="splitpanes-bottom" min-size="20" v-if="detailTableShow"  :size="bottomSize">
            <div class="detail-table" v-if="detailTableShow">
              <el-tabs style="width: 98%;margin-left: 1%;">
                <el-tab-pane label="明细列表">
                  <GoodsDetail :style="[{height:tabpaneHeight+ 'px'}]" :detailInfo="orderDetail.items"></GoodsDetail>
                </el-tab-pane>
                <el-tab-pane label="基本信息">
                  <OrderInfo :style="[{height:tabpaneHeight+ 'px'}]" :detailInfo="orderDetail.base" :logicwarehousesNew='optionArr.logicwarehousesNew' :carriers="optionArr.carriers" :sites="optionArr.sites" :selectOrderId="selectOrderId" :logicwarehouses="logicwarehouses" :warehouses="optionArr.warehouses" :logistics="optionArr.logistics" :loadData="loadData"></OrderInfo>
                </el-tab-pane>
                <el-tab-pane label="收件信息">
                  <AddressDetail :style="[{height:tabpaneHeight+ 'px'}]" :selectOrderId="selectOrderId" :detailInfo="orderDetail.receiver" :provinces="optionArr.provinces" :loadData="loadData"></AddressDetail>
                </el-tab-pane>
                <el-tab-pane label="配送信息">
                  <Delivery :style="[{height:tabpaneHeight+ 'px'}]" :detailInfo="orderDetail.requirements"></Delivery>
                </el-tab-pane>
                <el-tab-pane label="备注信息">
                  <RemarkDetail :style="[{height:tabpaneHeight+ 'px'}]" :selectOrderId="selectOrderId" :detailInfo="orderDetail.remarks"  :loadData="loadData"></RemarkDetail>
                </el-tab-pane>
                <el-tab-pane label="统计信息">
                  <TotalDetail :style="[{height:tabpaneHeight+ 'px'}]" :detailInfo="orderDetail.statistics"></TotalDetail>
                </el-tab-pane>
                <el-tab-pane label="作业流追踪">
                  <ProcessTracing :style="[{height:tabpaneHeight+ 'px'}]" :stepsData="stepData" ></ProcessTracing>
                </el-tab-pane>
                <!-- <el-tab-pane label="发货包裹信息">发货包裹信息</el-tab-pane> -->
                <el-tab-pane  label="操作日志">
                  <OperateLogs :style="[{height:tabpaneHeight+ 'px'}]" :detailInfo="orderDetail.operateLogs"></OperateLogs>
                </el-tab-pane>
              </el-tabs>
            </div>
          </pane>
        </splitpanes>
      </el-col>
      <el-col class="combined" :style="{'height':combinedHeight+ 'px' }" :span="3">
        <Combined :btnList.sync="btnList" :loadData="loadData" :searchTypeList="searchTypeList" :optionArr="optionArr" ></Combined>
      </el-col>
    </el-row>


    <!--列表字段设置 -->
    <el-dialog append-to-body :close-on-click-modal="false" top="8vh" :visible.sync="formRowIsshow" title="列表字段设置" width="650px">
      <FieldSort :fieldList.sync="fieldList" :oldList="defaultViewfields"></FieldSort>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="formRowIsshow=false">取消</el-button>
        <el-button type="primary" v-debounce="addRowForm" >确认</el-button>
      </div>
    </el-dialog>

    <!--筛选条件设置 -->
    <el-dialog append-to-body :close-on-click-modal="false" top="8vh" :visible.sync="formSearchIsshow" title="筛选设置" width="650px">
      <SearchSelect :searchTypeList="searchTypeList" :optionArr="optionArr" :searchContentList.sync="searchContentList"></SearchSelect>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="formSearchIsshow=false">取消</el-button>
        <el-button type="primary" v-debounce="addSetForm" >确认</el-button>
      </div>
    </el-dialog>

    <!-- 新增 -->
    <el-dialog append-to-body top="5vh" :close-on-click-modal="false" :visible.sync="formList" title="新增" width="800px">
        <el-form ref="formData" :inline="true" :model="listFormData" :rules="rules" size="mini" label-width="100px">
            <el-form-item label="字段名称" prop="fieldName">
                <el-input v-model="listFormData.fieldName" style="width: 180px" placeholder="请输入字段名称" />
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="formList=false">取消</el-button>
            <el-button type="primary" v-debounce="handleSubmit" >确认</el-button>
        </div>
    </el-dialog>

    <!-- 锁定 -->
    <el-dialog append-to-body top="25vh" :close-on-click-modal="false" :visible.sync="lockVisable" title="锁定" width="500px">
        <el-form ref="formData" :inline="true"  size="mini" label-width="100px">
            <el-form-item label="原因" >
                <el-input v-model="lockCause" type="textarea" style="width: 260px" placeholder="请输入锁定原因" />
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="lockVisable=false">取消</el-button>
            <el-button type="primary" v-debounce="handleLock" >确认</el-button>
        </div>
    </el-dialog>
    
    <!-- 商品替换 -->
    <el-dialog append-to-body top="5vh" :close-on-click-modal="false" :visible.sync="replaceSync" title="商品替换" width="1500px">
      <div class="redio-box">
        <span>替换方式</span>
        <el-radio-group v-model="radios">
          <el-radio label="1" >1换1（原数量）</el-radio>
          <el-radio label="2">1换1（指定数量）</el-radio>
        </el-radio-group>
      </div>
        <div class="dialog-contanier">
            <div class="singel-box">
              <div class="sub_tit">待替换商品</div>
              <div class="drawer-box">
                <el-input
                v-model="leftItemCode"
                size="small"
                placeholder="输入商品编码"
                style="width: 200px;"
                class="order_input"
                clearable
              >
              </el-input>
              <el-input
                v-model="leftBarCode"
                size="small"
                placeholder="输入商品条码"
                style="width: 200px;"
                class="order_input"
                clearable
              >
              </el-input>
                
                <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="handelSearch(1)">查询</el-button>
            </div>
             <el-table :data="gridData">
              <el-table-column prop="" label="" width="55" >
                  <template #default="scope">
                    <el-checkbox v-model="scope.row.isRight"  size="large"  @change="handelChangeLeft(scope.row.itemCode,scope.$index)"/>
                  </template>
                </el-table-column>
                <el-table-column prop="barCode" label="商品条码"  ></el-table-column>
                <el-table-column prop="itemCode" label="商品编码" ></el-table-column>
                <el-table-column prop="itemName" label="商品名称"></el-table-column>
                <el-table-column prop="specsName" label="商品规格"></el-table-column>
                <el-table-column prop="ownerName" label="货主"></el-table-column>
                <el-table-column  label="数量" v-if="radios==2" >
                  <template #default="scope" >
                    <el-input  v-if="radios==2 && scope.row.isRight " v-model="numberEdit" @change="handleEdit(scope.$index,numberEdit )"></el-input>
                    <span v-else>1</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="singel-box">
              <div class="sub_tit">替换商品</div>
              <div class="drawer-box">
                <el-input
                v-model="rightItemCode"
                size="small"
                placeholder="输入商品编码"
                style="width: 200px;"
                class="order_input"
                clearable
              >
              </el-input>
              <el-input
                v-model="rightBarCode"
                size="small"
                placeholder="输入商品条码"
                style="width: 200px;"
                class="order_input"
                clearable
              >
              </el-input>
                
                <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="handelSearch(2)">查询</el-button>
            </div>
             <el-table :data="gridData2">
                <el-table-column prop="" label="" width="55" >
                  <template #default="scope">
                    <el-checkbox v-model="scope.row.isRight"  size="large"  @change="handelChangeRight(scope.row.itemCode,scope.$index)"/>
                  </template>
                </el-table-column>
                <el-table-column prop="barCode" label="商品条码"  ></el-table-column>
                <el-table-column prop="itemCode" label="商品编码" ></el-table-column>
                <el-table-column prop="itemName" label="商品名称"></el-table-column>
                <el-table-column prop="specsName" label="商品规格"></el-table-column>
                <el-table-column prop="ownerName" label="货主"></el-table-column>
                <el-table-column  label="数量" v-if="radios==2" >
                  <template #default="scope" >
                    <el-input  v-if="radios==2 && scope.row.isRight " v-model="numberEdit2" @change="handleEditGoods(scope.$index,numberEdit2 )"></el-input>
                    <span v-else>1</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="handelClose">取消</el-button>
            <el-button type="primary" v-debounce="handleSubmit" >确认</el-button>
        </div>
    </el-dialog>

    <!--  -->
    <InputDialog :visible.sync="searchIsshow" :search-content.sync="searchContent" :title.sync="titlesContent" @confirmed="addSearchForm" />
  </div>
</template>

<script>
  import { getSaleorderList,setViewfield,toOutorder,setSearchfield,getShop,unlockSaleorder,getLogicwarehouse,returnPlatform,lockSaleorder,
    interceptSaleorder, initShop,initLogicwarehouse,getItem,getCity,getArea,getOrderInfo,exportSaleorder,exportSaleorderDetail ,replaceSku,
  } from "@/api/order/saleorder";
  import Combined from "./combined";
  import SearchSelect from "./search";
  import GoodsDetail from "./goodsDetail";
  import OrderInfo from "./orderInfo";
  import AddressDetail from "./addressDetail";
  import Delivery from "./delivery";
  import RemarkDetail from "./remarkDetail";
  import TotalDetail from "./totalDetail";
  import OperateLogs from "./operateLogs";
  import ProcessTracing from "./processTracing";
  import { Splitpanes, Pane } from 'splitpanes'
  import 'splitpanes/dist/splitpanes.css'
// import { options } from "runjs";
  export default {
    name: 'Saleorder',
    components: { Combined,SearchSelect,GoodsDetail,OrderInfo,AddressDetail,Delivery,RemarkDetail,TotalDetail,OperateLogs,ProcessTracing,Splitpanes, Pane },
    data() {
      return{
        formRowIsshow:false,// 列表字段弹窗
        formSearchIsshow:false,//筛选条件设置弹窗
        fieldList:[], //列表字段设置数组
        setViewfields:[],
        defaultViewfields:[],
        formList:false,
        dataList:[],
        lockVisable:false,//锁定原因弹窗
        lockCause:'',//锁定原因
        listFormData:{
          fieldName:'',
        },
        searchMatchData:{ //搜索条件
          barCode:'',
          itemCode:'',
        },
        rules:[],
        btnList:[],
        searchTypeList:[],
        searchContentList: [],
        searchSetList: [],
        loading: false,
        replaceSync:false, //商品替换弹窗
        ids:[],
        pageSizes: [20, 50, 100],
        total: 0,
        jsHeight: 500,
        combinedHeight: 500,
        searchIsshow: false,
        searchContent: '',
        titlesContent: '',
        searchType: '',
        searchData: {
           xnCode: '',
           soCode: '', 
           ownerId: [], 
           shopId: [],
           orderSource:[], 
           deliveryOrderCode: '', 
           preDeliveryOrderCode: '', 
           preDeliveryOrderId: '', 
           orderType: [], 
           warehouseId: [], 
           logicwarehouseId: [], 
           sourcePlatformCode: [], 
           createTime: [], 
           placeOrderTime: [], 
           payTime: [], 
           sellerNick: '', 
           buyerNick: '', 
           vestNo: '', 
           logisticsCode: [], 
           logisticsName: [], 
           expressCode: '', 
           expressName: [], 
           provinceId: [], 
           cityId: [], 
           areaId: [], 
           orderState: [], 
           toOutTime: [], 
           page: 1, 
           acceptTime: [], 
           accessToken:sessionStorage.getItem('xn_token')
        },
        optionArr:{
          areas:[],
          cities:[],
          logicwarehouses:[],
          logicwarehousesNew:[],
          owners:[],
          orderSource:[],
          provinces:[],
          shops:[],
          returnState:[],
          warehouses:[],
          expresses:[],
          logistics:[],
          sourcePlatforms:[],
          carriers:[],
          sites:[]
        },
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
          statistics:{},
          requirements:{},

        },
        options: [{label:'手动新增',value:1},{label:'导入新增',value:2}],
        optionsExport: [{label:'导出订单',value:1},{label:'导出明细',value:2}],
        optionsReturn: [{label:'出库回传平台',value:1},{label:'出库回传ERP',value:2}],
        selectedOption: '',
        exportOption: '',
        logicwarehouses:[],
        ordersState:[  //订单状态
          {label:'待审核'},
          {label:'已审核'},
          {label:'已同步'},
          {label:'已接单'},
          {label:'已出库'},
          {label:'取消中'},
          {label:'拦截中'},
          {label:'已作废'},
        ],
        returnState:[ //回传状态
          {label:'已回传'},
          {label:'未回传'}
        ],
        orderSource:[ //订单来源
        {label:'ERP',value:1},
        {label:'OMS',value:2},
        {label:'JD',value:3},
        {label:'TB',value:4},
        {label:'PDD',value:5},
        {label:'KS',value:6},
        {label:'DY',value:7},
        {label:'MC',value:8},
        {label:'OL(线下Offline)',value:9},

        ],
        ordersType:[
          {label:'交易出库',value:'JYCK'},
          {label:'换货出库',value:'HHCK'},
          {label:'补发出库',value:'BFCK'},
          {label:'其他出库',value:'QTCK'},
        ],
        stepData: [
          // { title: "订单下载", description: "2024-04-13 10:25:07",state:1 },
          // { title: "系统接单", description: "",state:1 },
          // { title: "订单审核", description: "2024-04-13 10:30:22",state:1 },
          // { title: "出库单同步仓库", description: "2024-04-13 11:05:25",state:1 },
          // { title: "仓库接单", description: "",state:2 },
          // { title: "仓库拣货", description: "",state:2 },
          // { title: "已验货", description: "",state:2 },
          // { title: "仓库称重", description: "",state:2 },
          // { title: "商品出库", description: "",state:2 }

          { title: "平台订单下载", description: "2024-04-13 10:25:07",state:2 ,id:1},
          { title: "系统接单", description: "",state:2 ,id:2 },
          { title: "平台订单审核", description: "2024-04-13 10:30:22",state:2 ,id:3},
          { title: "销售单审核", description: "2024-04-13 11:05:25",state:2 ,id:4},
          { title: "出库单同步", description: "",state:2 ,id:5 },
          { title: "城配商/仓库接单", description: "",state:2 ,id:6},
          { title: "订单出库", description: "",state:2 ,id:7}
        ],
        topSize: 60,
        bottomSize: 40,
        splitpanesHeight:500,
        tabpaneHeight:150,
        gridData:[],  //订单商品
        gridData2:[], //商品主档商品
        leftItem:'', //替换商品左边勾选值
        rightGoods:'',//替换商品右边勾选值
        leftItemCode:'',//替换商品左边筛选商品编码
        leftBarCode:'',//替换商品左边筛选商品条码
        rightItemCode:'', //替换商品右边边筛选商品编码
        rightBarCode:'', //替换商品右边边筛选商品条码
        tempGridData:[],  //暂存订单商品数据
        tempGridData2:[],//暂存商品主档数据
        radios:'1',
        numberEdit:'1',
        numberEdit2:'1'
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
        this.optionArr.ordersState = this.ordersState
        this.optionArr.returnState = this.returnState
        this.optionArr.orderSource = this.orderSource
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
            this.optionArr.logicwarehousesNew =res.msgData.logicwarehouses
            this.optionArr.owners = res.msgData.owners
            this.optionArr.provinces = res.msgData.provinces
            this.optionArr.shops = res.msgData.shops
            this.optionArr.warehouses = res.msgData.warehouses
            this.optionArr.expresses = res.msgData.expresses
            this.optionArr.logistics = res.msgData.logistics
            this.optionArr.carriers = res.msgData.carriers
            this.optionArr.sites = res.msgData.sites
            // this.optionArr.ordersType = res.msgData.ordersType
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
    // 出库回传平台
    handleReturn() {
      if (this.ids.length < 1) {
        this.$message({title: '错误', message: '请选择要操作的数据', duration: 3000, type: 'warning'})
        return
      }
        this.$confirm('确认回传?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          returnPlatform({id:this.ids,accessToken: sessionStorage.getItem('xn_token')}).then(res => {
          if(res){
            this.$modal.notifySuccess(res.errMsg)
            this.loadData()
          }
        })
        }).catch(() => {
          
        });
    },
    // 锁定弹窗
    handelLock() {
      if (this.ids.length < 1) {
          this.$message({title: '错误', message: '请选择要操作的数据', duration: 3000, type: 'warning'})
          return
        }
        this.lockCause =''
        this.lockVisable = true
    },
    // 解锁
    handelUnLock() {
     if (this.ids.length < 1) {
        this.$message({title: '错误', message: '请选择要操作的数据', duration: 3000, type: 'warning'})
        return
      }
      this.$confirm('确认解锁?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          unlockSaleorder({id:this.ids,accessToken: sessionStorage.getItem('xn_token')}).then(res => {
          if(res){
            this.$modal.notifySuccess(res.errMsg)
            this.loadData()
          }
        })
        }).catch(() => {
          
        });
    },
    // 锁定
    handleLock() {  
      lockSaleorder({id:this.ids,accessToken: sessionStorage.getItem('xn_token'),lockCause:this.lockCause}).then(res => {
          if(res){
            this.$modal.notifySuccess(res.errMsg)
            this.lockVisable = false
            this.lockCause = ''
            this.loadData()
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
        console.log(value)
        this.ids = []
        for (let k = 0; k < value.length; k++) {
          this.ids.push(value[k].id)
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
      handelChangeLeft(el,index) {
        console.log(el)
         if(this.leftItem == el) {
            this.leftItem= ''
            this.gridData.forEach((item,key) =>{
              item.isRight = false
          })
            return 
          }
          this.leftItem= el
          this.gridData.forEach((item,key) =>{
              if (key != index) {
                item.isRight = false
              }else {
                item.isRight = true

              }
          })
      },
      // 匹配主导商品单选
      handelChangeRight(el, index) {
          console.log(el)
          if(this.rightGoods == el) {
            this.rightGoods= ''
            this.gridData2.forEach((item,key) =>{
              item.isRight = false
          })
            return 
          }
          this.rightGoods= el
          this.gridData2.forEach((item,key) =>{
              if (key != index) {
                item.isRight = false
              }else {
                item.isRight = true

              }
          })
        },
      // 拦截
      handleIntercept() {
        if (this.ids.length < 1) {
          this.$message({title: '错误', message: '请选择要操作的数据', duration: 3000, type: 'warning'})
          return
        }
        this.$confirm('确定要操作选中数据吗?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
          interceptSaleorder({id:this.ids,accessToken: sessionStorage.getItem('xn_token')}).then(res => {
            if(res){
              this.$modal.notifySuccess(res.errMsg)
              this.loadData()
            }
          })
        }).catch(() => {

        })
      },
      // 审核
      examineAllocation() {
        if (this.ids.length < 1) {
          this.$message({title: '错误', message: '请选择要操作的数据', duration: 3000, type: 'warning'})
          return
        }
        this.$confirm('确定要操作选中数据吗?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
          toOutorder({id:this.ids,accessToken: sessionStorage.getItem('xn_token')}).then(res => {
            if(res){
              this.$modal.notifySuccess(res.errMsg)
              this.loadData()
            }
          })
        }).catch(() => {

        })
      },
      // 商品替换
      handelReplace() {
        if (!this.ids.length) {
          this.$message({title: '错误', message: '请选择要操作的数据', duration: 3000, type: 'warning'})
          return
        }
         this.back()
         this.radios='1'
         this.replaceSync = true

      },
      back() {
        this.gridData = []
        this.gridData2 =[]
        getItem({accessToken: sessionStorage.getItem('xn_token'),id:this.ids}).then(res => {
          if(res){
            console.log(res)
            if( res.msgData.items  &&  res.msgData.items.length) {
              res.msgData.items.forEach(item =>{item['isRight'] = false})
            }
            if( res.msgData.goods  &&  res.msgData.goods.length) {
              res.msgData.goods.forEach(item =>{item['isRight'] = false})
            }
            this.gridData = res.msgData.items   
            this.gridData2 = res.msgData.goods
            this.tempGridData = res.msgData.items   
            this.tempGridData2 = res.msgData.goods   
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
        getOrderInfo({id:row.id,accessToken: sessionStorage.getItem('xn_token')}).then(res => {
          if(res){
            this.selectOrderId = row.id
            this.orderDetail.base = res.msgData.base
            this.orderDetail.items = res.msgData.items
            this.orderDetail.receiver = res.msgData.receiver
            this.orderDetail.operateLogs = res.msgData.operateLogs
            this.orderDetail.remarks = res.msgData.remarks
            this.orderDetail.statistics = res.msgData.statistics
            this.orderDetail.requirements  = res.msgData.requirement
            // this.orderDetail.track  = res.msgData.track
            if(res.msgData.track ) {
              var obj = res.msgData.track
              this.stepData.forEach((item,index) =>{
                if((item.id==1 && (obj.acceptTime && obj.acceptTime )) || 
                (item.id==2 && (obj.returnPlatformTime && obj.returnPlatformTime )) || 
                (item.id==3 && (obj.toSaleTime && obj.toSaleTime )) || 
                (item.id==4 && (obj.toOutTime && obj.toOutTime )) ||
                (item.id==5 && (obj.toDeliveryTime && obj.toDeliveryTime )) ||
                (item.id==6 && (obj.lowerAcceptTime && obj.lowerAcceptTime ))||
                (item.id==7 && (obj.lowerOutTime && obj.lowerOutTime ))) {
                  item.state = 1
                }
              })
             
            }
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
      this.splitpanesHeight = window.innerHeight - $('.head-container').outerHeight() - $('.crud-opts').outerHeight() - $('.combined-crud').outerHeight() -148
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
      this.orderDetail.requirement = {}
      this.orderDetail.carriers = []
    },

    handleEdit(index, row) {
      // 处理编辑逻辑，例如更新数据库等
      console.log(index, row)
      this.numberEdit = row
    },
    handleEditGoods(index, row) {
      console.log(index, row)
      this.numberEdit2 = row


    },
    handelClose() {
        this.replaceSync = false
        this.radios = '1'
        this.ids = []
        this.numberEdit = '1'
        this.numberEdit2 = '1'
    },
    // 导出订单
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
            // this.$modal.notifySuccess(res.errMsg)
            this.$message({title: '导出成功', message: res.errMsg, duration: 3000, type: 'success'})

            if (res.msgData.downloadUrl !== undefined && res.msgData.downloadUrl !== '') {
              window.location.href = res.msgData.downloadUrl
            }
            this.loadData()
          }
        })
      },
    // 导出明细
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
            // this.$modal.notifySuccess(res.errMsg)
            this.$message({title: '导出成功', message: res.errMsg, duration: 3000, type: 'success'})
            if (res.msgData.downloadUrl !== undefined && res.msgData.downloadUrl !== '') {
              window.location.href = res.msgData.downloadUrl
            }
            this.loadData()
          }
        })
      },
      addShow() {
        this.editStatus = false
        if (this.$refs['formData'] !== undefined) {
          this.$refs['formData'].resetFields()
        }
        for(var key in this.formData){
          if(key!='accessToken' && key!='allowSplit' && key!='allowSite' && key!='allowWarehouse' && key!='imgId' && key!='marks'){
            this.formData[key]=''
          }
          if(key=='allowSplit' || key=='allowSite' || key=='allowWarehouse'){
            this.formData[key]='否'
          }
        }
        this.formList = true
      },
      // 导入
      uploadSuccess(file){
        this.loading = true
        const param = new FormData()
        param.append('file', file.file)
        param.append('accessToken', sessionStorage.getItem('xn_token'))
        importOnlinegoods(param).then(res => {
          this.loading = false
          if(res){
              this.$message({
                message: res.errMsg,
                type: 'success'
              });
            if (res.msgData.downloadUrl !== undefined && res.msgData.downloadUrl !== '') {
              window.location.href = res.msgData.downloadUrl
            }
            this.loadData()
          }
        })
      },
      //前端做模糊筛选
      handelSearch(type) {
        if(type ==1) {
          let temp = []
          if(!this.leftItemCode && !this.leftBarCode) {
            this.gridData = this.tempGridData
            this.gridData2 = this.tempGridData2
          }
          if(this.leftItemCode) {
            if(this.leftBarCode) {
              this.gridData.forEach(item =>{
                if(item.itemCode == this.leftItemCode && item.barCode == this.leftBarCode) {
                  temp.push(item)
                }
              })
              this.gridData = temp
            }else  {
              this.gridData.forEach(item =>{
                if(item.itemCode == this.leftItemCode ) {
                  temp.push(item)
                }
              })
              this.gridData = temp
            }
          }else {
            if(this.leftBarCode) {
              this.gridData.forEach(item =>{
                if( item.barCode == this.leftBarCode) {
                  temp.push(item)
                }
              })
              this.gridData = temp
            }else {
              this.gridData = this.tempGridData
              this.gridData2 = this.tempGridData2
            }
          }
        }else if(type==2) {
          let temp = []
          if(!this.rightItemCode && !this.rightBarCode)  {
            this.gridData = this.tempGridData
            this.gridData2 = this.tempGridData2
          }
          if(this.rightItemCode) {
            if(this.rightBarCode) {
              this.gridData2.forEach(item =>{
                if(item.itemCode == this.rightItemCode && item.barCode == this.rightBarCode) {
                  temp.push(item)
                }
              })
              this.gridData2 = temp
            }else  {
              this.gridData2.forEach(item =>{
                if(item.itemCode == this.rightItemCode ) {
                  temp.push(item)
                }
              })
              this.gridData2 = temp
            }
          }else {
            if(this.rightBarCode) {
              this.gridData2.forEach(item =>{
                if( item.barCode == this.rightBarCode) {
                  temp.push(item)
                }
              })
              this.gridData2 = temp
            }else {
              this.gridData = this.tempGridData
              this.gridData2 = this.tempGridData2
            }
          }
        }
      },
      onSizesChanged(sizes) {
        this.topSize = sizes[0].size
        this.bottomSize = sizes[1].size
        setTimeout(() => {
          this.jsHeight = this.splitpanesHeight - $('.splitpanes-bottom').outerHeight() -35
          this.tabpaneHeight = $('.splitpanes-bottom').outerHeight() - 65
        }, 10)
      },
      // 替换商品保存
      handleSubmit() {
        // numberEdit
        let arr={},arr2={}
        if(!this.gridData.length) return
        if(!this.gridData2.length) return
        this.gridData.forEach(item =>{
            if(item.isRight) {
              arr['ownerId'] = item.ownerId
              arr['itemCode'] = item.itemCode
              arr['barCode'] = item.barCode
              arr['itemQty'] = this.numberEdit
            }
          })
          this.gridData2.forEach(item =>{
            if(item.isRight) {
              arr2['ownerId'] = item.ownerId
              arr2['ownerCode'] = item.ownerCode
              arr2['ownerName'] = item.ownerName
              arr2['itemId'] = item.itemId
              arr2['itemCode'] = item.itemCode
              arr2['itemName'] = item.itemName
              arr2['barCode'] = item.barCode
              arr2['goodsQty'] = this.numberEdit2
             
            }
          })
          if(!arr || !arr2) {
             this.$message({title: '错误', message: '请选择要替换的商品', duration: 3000, type: 'warning'})
              return
          }
        let param = {
          items:arr,
          goods:arr2,
          id:this.ids,
          accessToken:sessionStorage.getItem('xn_token')
        }
        replaceSku(param).then(res => {
          this.loading = false
          if(res){
              this.$message({
                message: res.errMsg,
                type: 'success'
              });
             this.handelClose()
            this.loadData()
          }
        })
      }
    }
  }
</script>
<style scoped lang="scss">
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
    padding-bottom: 10px;
  }
  .detail-table .el-tabs{
    margin-bottom: 2px !important;
  }
  ::v-deep .el-input--small{
    font-size: 12px !important;
  }
  ::v-deep .head-container .filter-item input {
    font-size: 13px;
}
::v-deep .el-table__body-wrapper .el-table__row{
    cursor: pointer;
}
::v-deep .add-others {
  width: 97px;
  height: 28px;


  .el-input__inner {
    color: #409EFF;
    background: #ecf5ff;
    border-color: #b3d8ff;
    padding-right: 8px;
    text-align: center;
  }
  .el-icon-arrow-up:before {
    content: '';
  }
}
::v-deep .back-others {
  .el-input__inner{
    color: #67C23A;
    background: #f0f9eb;
    border-color: #c2e7b0;
    &::before {
      content: "";
    } 
  }
}
::v-deep .add-others input::-webkit-input-placeholder {   
    color: #409EFF;   
}
::v-deep .back-others input::-webkit-input-placeholder {   
    color: #67C23A;  

}
.dialog-contanier {
  display: flex;
  // align-items: center;
  justify-content: space-between;
  .singel-box {
    flex: 0 0 48%;
    max-height: 500px;
    overflow-y: scroll;
    
    .sub_tit {
      font-size: 16px;
      font-weight: 700;
      color: #606266;
      margin-bottom: 10px;
    }

    .drawer-box {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      .el-input {
        margin-right: 10px;
      }
    }
  }
}
.redio-box {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
  span {
    display: inline-block;
    margin-right: 10px;
  }
}
::v-deep .el-dropdown-menu__item {
  margin-bottom: 10px
}
::v-deep .el-popper{
  left: 188px;
}
</style>
<style >
  .my-select .el-select__tags {
    flex-wrap: nowrap !important;
    overflow: hidden !important;
  }
  .plTableBox .el-table--small td, .plTableBox .el-table--small th{
    padding: 3px 0 !important;
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

  .new-box  {
    position: relative;
  }
  .dropdown{
    position: absolute;
    background-color: #fff;
    box-shadow: 0 6px 12px rgba(0,0,0,0.175);
    padding: 4px;
    user-select: none;
    z-index: 100;
    width: 80px;
    font-size: 14px;
    color: #666;
  
}
.dropdown ul  {
  list-style: none;
  padding: 0;
  margin: 0;
}
.dropdown li {
  text-align: center;
}
.dropdown li:hover{
  cursor: pointer;
  background-color: #f0f0f0;
}

</style>

