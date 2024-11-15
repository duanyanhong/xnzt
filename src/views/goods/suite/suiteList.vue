<template>
  <div class="app-container order-info-padding">
    <el-row :gutter="20">
      <!--用户数据-->
      <el-col>
        <!--工具栏-->
        <div class="head-container">
          <div>
            <!-- 搜索 -->
            <el-input
              v-model="searchData.itemCode"
              clearable
              size="small"
              placeholder="输入商品编码搜索"
              style="width: 200px;"
              class="filter-item"
            />
            <el-input
              v-model="searchData.itemName"
              clearable
              size="small"
              placeholder="输入商品名称搜索"
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
            <el-button
              class="filter-item"
              size="mini"
              type="primary"
              icon="el-icon-plus"
              plain
              @click="addShow"
              v-hasPermi="['Goods:Suite:Add']"
            >
              新增
            </el-button>
            <!--右侧-->
            <slot name="right" />
          </span>
          <span class="crud-opts-left">
            <el-button
              class="filter-item"
              size="mini"
              type="warning"
              icon="el-icon-download"
              plain
              @click="downMyOrder"
              v-hasPermi="['Goods:Suite:Export']"
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
        >
          <u-table-column label="货品标记" width="250"  align="center">
            <template slot-scope="scope">
              <el-tag v-for="(item, index) in scope.row.marksKey" style="margin-left: 5px;"  :color="item.markColor" :key="index">
                <span style="color:#fff;">{{ item.markName }}</span>
              </el-tag>
            </template>
          </u-table-column>
          <u-table-column :show-overflow-tooltip="true" prop="ownerName" label="货主"/>
<!--          <u-table-column :show-overflow-tooltip="true" prop="supplierName" label="供应商" />-->
          <u-table-column :show-overflow-tooltip="true" prop="logicwarehouseName" label="逻辑仓库" />
<!--          <u-table-column :show-overflow-tooltip="true" prop="brandName" label="品牌" />-->
          <u-table-column :show-overflow-tooltip="true" prop="familyName" label="商品分类" />
          <u-table-column :show-overflow-tooltip="true" prop="specsName" label="规格" />
          <u-table-column :show-overflow-tooltip="true" prop="itemCode" label="商品编码" />
          <u-table-column :show-overflow-tooltip="true" prop="itemId" label="商品编号" />
          <u-table-column :show-overflow-tooltip="true" prop="goodsCode" label="货号" />
          <u-table-column :show-overflow-tooltip="true" prop="itemName" label="商品名称" />
          <u-table-column :show-overflow-tooltip="true" prop="shortName" label="商品简称" />
          <u-table-column :show-overflow-tooltip="true" prop="englishName" label="英文名" />
          <u-table-column :show-overflow-tooltip="true" prop="barCode" label="条形码" />
          <u-table-column :show-overflow-tooltip="true" prop="itemCount" label="品类数" />
          <u-table-column :show-overflow-tooltip="true" prop="itemQtyCount" label="子件数" />
          <u-table-column :show-overflow-tooltip="true" prop="stockUnit"  label="计量单位" />
          <u-table-column :show-overflow-tooltip="true" prop="length"  label="长(厘米)" />
          <u-table-column :show-overflow-tooltip="true" prop="width" label="宽(厘米)" />
          <u-table-column :show-overflow-tooltip="true" prop="height" label="高(厘米)" />
          <u-table-column :show-overflow-tooltip="true" prop="volume" label="体积(CM³)" />
          <u-table-column :show-overflow-tooltip="true" prop="grossWeight" width="100" label="毛重(千克)" />
          <u-table-column :show-overflow-tooltip="true" prop="netWeight" width="100" label="净重(千克)" />
<!--          <u-table-column :show-overflow-tooltip="true" prop="color" label="颜色" />-->
<!--          <u-table-column :show-overflow-tooltip="true" prop="size" label="尺寸" />-->
          <u-table-column :show-overflow-tooltip="true" prop="title" label="商品标题" />
          <u-table-column :show-overflow-tooltip="true" prop="className" label="商品类别" />
<!--          <u-table-column :show-overflow-tooltip="true" prop="pricingCategory" label="计价货类" />-->
<!--          <u-table-column :show-overflow-tooltip="true" prop="safetyStock" label="安全库存" />-->
          <u-table-column :show-overflow-tooltip="true" prop="itemType" label="商品类型" />
          <u-table-column :show-overflow-tooltip="true" prop="suiteType" label="组套类型" />
<!--          <u-table-column :show-overflow-tooltip="true" prop="tagPrice" label="吊牌价" />-->
<!--          <u-table-column :show-overflow-tooltip="true" prop="retailPrice" label="零售价" />-->
<!--          <u-table-column :show-overflow-tooltip="true" prop="costPrice" label="成本价" />-->
<!--          <u-table-column :show-overflow-tooltip="true" prop="purchasePrice" label="采购价" />-->
<!--          <u-table-column :show-overflow-tooltip="true" prop="isSNMgmt" label="SN管理" />-->
          <u-table-column :show-overflow-tooltip="true" prop="isShelfLifeMgmt" width="100" label="效期管理" />
<!--          <u-table-column :show-overflow-tooltip="true" prop="shelfLife" width="100" label="保质期" />-->
<!--          <u-table-column :show-overflow-tooltip="true" prop="shelfLifeUnit" width="100" label="保质期单位" />-->
<!--          <u-table-column :show-overflow-tooltip="true" prop="rejectLifecycle" label="禁收天数" />-->
<!--          <u-table-column :show-overflow-tooltip="true" prop="lockupLifecycle" label="禁售天数" />-->
<!--          <u-table-column :show-overflow-tooltip="true" prop="adventLifecycle" label="预警天数" />-->
<!--          <u-table-column :show-overflow-tooltip="true" prop="isBatchMgmt" label="批次管理" />-->
<!--          <u-table-column :show-overflow-tooltip="true" prop="packCode" label="包装代码" />-->
<!--          <u-table-column :show-overflow-tooltip="true" prop="originAddress" label="原产地" />-->
<!--          <u-table-column :show-overflow-tooltip="true" prop="isFragile" label="易碎品" />-->
<!--          <u-table-column :show-overflow-tooltip="true" prop="isHazardous" label="危险品" />-->
<!--          <u-table-column :show-overflow-tooltip="true" prop="isLiquid" label="是否液体" />-->
          <u-table-column :show-overflow-tooltip="true" prop="remark" label="备注" />
          <u-table-column :show-overflow-tooltip="true" prop="isValid" label="是否有效" />
          <u-table-column :show-overflow-tooltip="true" prop="isSku" label="是否sku" />
          <u-table-column :show-overflow-tooltip="true" prop="explains" label="货品说明" />
<!--          <u-table-column :show-overflow-tooltip="true" prop="minIndent" width="110" label="最小起订量" />-->
<!--          <u-table-column :show-overflow-tooltip="true" prop="purchaseCycle" width="120" label="采购周期(天)" />-->
<!--          <u-table-column :show-overflow-tooltip="true" prop="minPurchase" width="110" label="最小采购量" />-->
          <u-table-column :show-overflow-tooltip="true" prop="allowSplit" label="允许拆分" />
          <u-table-column :show-overflow-tooltip="true" prop="allowSite" label="允许店配" />
          <u-table-column :show-overflow-tooltip="true" prop="allowWarehouse" label="允许仓配" />
          <u-table-column :show-overflow-tooltip="true" prop="createTime" label="创建时间" />
          <u-table-column :show-overflow-tooltip="true" prop="updateTime" label="更新时间" />
          <u-table-column label="禁用" width="100" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.disable == '是'" type="danger" >{{ scope.row.disable }}</el-tag>
              <el-tag v-else-if="scope.row.disable == '否'" type="success" >{{ scope.row.disable }}</el-tag>
            </template>
          </u-table-column>
          <u-table-column
            label="操作"
            width="205"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button v-hasPermi="['Goods:Suite:Detail']" size="mini" type="text" style="width: 60px;" icon="el-icon-view" @click="getSuitedetail(scope.row)">组合明细</el-button>
              <el-button v-hasPermi="['Goods:Suite:Edit']" size="mini" type="text" style="width: 50px;" icon="el-icon-edit" @click="editStaff(scope.row)">修改</el-button>
              <el-popover v-hasPermi="['Goods:Suite:Disable']" v-if="scope.row.disable=='否'" :ref="`popover-${scope.$index}`" placement="top" width="200">
                <p style="line-height:40px"><i class="el-icon-info" style="color:rgb(255,153,0)" /> 确定禁用吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[`popover-${scope.$index}`].doClose()">取消</el-button>
                  <el-button type="primary" size="mini" @click="editDisable(scope)">确定</el-button>
                </div>
                <el-button slot="reference" style="width: 50px;" type="text" icon="el-icon-lock" size="mini">禁用</el-button>
              </el-popover>
              <el-popover v-hasPermi="['Goods:Suite:Disable']" v-if="scope.row.disable=='是'" :ref="`popover-${scope.$index}`" placement="top" width="200">
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
    <el-dialog append-to-body top="5vh" :close-on-click-modal="false" :visible.sync="formIsshow" :title="titleContent" width="1230px">
      <el-form ref="formData" :inline="true" :model="formData" :rules="rules" size="small" label-width="100px">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="基础信息" name="first" style="height:545px;overflow-y: auto;" >
            <el-form-item label="货主" prop="ownerId">
              <el-select
                v-model="formData.ownerId"
                style="width: 180px"
                placeholder="请选择"
                filterable
                @change="cleanGoods"
              >
                <el-option
                  v-for="item in owners"
                  :key="item.ownerId"
                  :label="item.ownerName"
                  :value="item.ownerId"
                />
              </el-select>
            </el-form-item>
<!--            <el-form-item label="供应商" prop="supplierId">-->
<!--              <el-select-->
<!--                v-model="formData.supplierId"-->
<!--                style="width: 180px"-->
<!--                placeholder="请选择"-->
<!--                filterable-->
<!--                clearable-->
<!--              >-->
<!--                <el-option-->
<!--                  v-for="item in suppliers"-->
<!--                  :key="item.supplierId"-->
<!--                  :label="item.supplierName"-->
<!--                  :value="item.supplierId"-->
<!--                />-->
<!--              </el-select>-->
<!--            </el-form-item>-->
            <el-form-item label="逻辑仓库" prop="logicwarehouseId">
              <el-select
                v-model="formData.logicwarehouseId"
                style="width: 180px"
                placeholder="请选择"
                filterable
                clearable
              >
                <el-option
                  v-for="item in logicwarehouses"
                  :key="item.logicwarehouseId"
                  :label="item.logicwarehouseName"
                  :value="item.logicwarehouseId"
                />
              </el-select>
            </el-form-item>
<!--            <el-form-item label="品牌" prop="brandId">-->
<!--              <el-select-->
<!--                v-model="formData.brandId"-->
<!--                style="width: 180px"-->
<!--                placeholder="请选择"-->
<!--                filterable-->
<!--                clearable-->
<!--              >-->
<!--                <el-option-->
<!--                  v-for="item in brands"-->
<!--                  :key="item.brandId"-->
<!--                  :label="item.brandName"-->
<!--                  :value="item.brandId"-->
<!--                />-->
<!--              </el-select>-->
<!--            </el-form-item>-->
            <el-form-item label="商品分类" prop="familyId">
              <el-cascader
                placeholder="请选择"
                :options="families"
                v-model="familyIdArr"
                style="width: 180px"
                @change="setFamilyId"
                clearable
                filterable></el-cascader>
            </el-form-item>
            <el-form-item label="规格" prop="specsId">
              <el-select
                v-model="formData.specsId"
                style="width: 180px"
                placeholder="请选择"
                filterable
                clearable
              >
                <el-option
                  v-for="item in specs"
                  :key="item.specsId"
                  :label="item.specsName"
                  :value="item.specsId"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="商品编码" prop="itemCode">
              <el-input v-model="formData.itemCode" style="width: 180px" placeholder="请输入商品编码" />
            </el-form-item>
            <el-form-item label="商品编号" prop="itemId">
              <el-input v-model="formData.itemId" style="width: 180px" placeholder="请输入商品编号" />
            </el-form-item>
            <el-form-item label="货号" prop="goodsCode">
              <el-input v-model="formData.goodsCode" style="width: 180px" placeholder="请输入货号" />
            </el-form-item>
            <el-form-item label="商品名称" prop="itemName">
              <el-input v-model="formData.itemName" style="width: 180px" placeholder="请输入商品名称" />
            </el-form-item>
            <el-form-item label="商品简称" prop="shortName">
              <el-input v-model="formData.shortName" style="width: 180px" placeholder="请输入商品简称" />
            </el-form-item>
            <el-form-item label="英文名" prop="englishName">
              <el-input v-model="formData.englishName" style="width: 180px" placeholder="请输入英文名" />
            </el-form-item>
            <el-form-item label="条形码" prop="barCode">
              <el-input v-model="formData.barCode" style="width: 180px" placeholder="请输入条形码" />
            </el-form-item>
            <el-form-item label="计量单位" prop="stockUnit">
              <el-select
                v-model="formData.stockUnit"
                style="width: 180px"
                placeholder="请选择"
                filterable
                clearable
              >
                <el-option value="件" label="件" />
                <el-option value="箱" label="箱" />
                <el-option value="个" label="个" />
                <el-option value="瓶" label="瓶" />
                <el-option value="桶" label="桶" />
                <el-option value="提" label="提" />
                <el-option value="套" label="套" />
                <el-option value="包" label="包" />
                <el-option value="台" label="台" />
                <el-option value="袋" label="袋" />
                <el-option value="组" label="组" />
                <el-option value="罐" label="罐" />
              </el-select>
            </el-form-item>
            <el-form-item label="长 (厘米)" prop="length">
              <el-input v-model="formData.length" style="width: 180px" placeholder="请输入长 (厘米)" />
            </el-form-item>
            <el-form-item label="宽 (厘米)" prop="width">
              <el-input v-model="formData.width" style="width: 180px" placeholder="请输入宽 (厘米)" />
            </el-form-item>
            <el-form-item label="高 (厘米)" prop="height">
              <el-input v-model="formData.height" style="width: 180px" placeholder="请输入高 (厘米)" />
            </el-form-item>
            <el-form-item label="体积 (CM³)" prop="volume">
              <el-input v-model="formData.volume" style="width: 180px" placeholder="请输入体积 (CM³)" />
            </el-form-item>
            <el-form-item label="毛重 (千克)" prop="grossWeight">
              <el-input v-model="formData.grossWeight" style="width: 180px" placeholder="请输入毛重 (千克)" />
            </el-form-item>
            <el-form-item label="净重 (千克)" prop="netWeight">
              <el-input v-model="formData.netWeight" style="width: 180px" placeholder="请输入净重 (千克)" />
            </el-form-item>
<!--            <el-form-item label="颜色" prop="color">-->
<!--              <el-input v-model="formData.color" style="width: 180px" placeholder="请输入颜色" />-->
<!--            </el-form-item>-->
<!--            <el-form-item label="尺寸" prop="size">-->
<!--              <el-input v-model="formData.size" style="width: 180px" placeholder="请输入尺寸" />-->
<!--            </el-form-item>-->
            <el-form-item label="商品标题" prop="title">
              <el-input v-model="formData.title" style="width: 180px" placeholder="请输入商品标题" />
            </el-form-item>
            <el-form-item label="商品类别" prop="className">
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
<!--            <el-form-item label="计价货类" prop="pricingCategory">-->
<!--              <el-input v-model="formData.pricingCategory" style="width: 180px" placeholder="请输入计价货类" />-->
<!--            </el-form-item>-->
<!--            <el-form-item label="安全库存" prop="safetyStock">-->
<!--              <el-input v-model="formData.safetyStock" style="width: 180px" placeholder="请输入安全库存" />-->
<!--            </el-form-item>-->
            <el-form-item label="商品类型" prop="itemType">
              <el-select
                v-model="formData.itemType"
                style="width: 180px"
                clearable
                placeholder="请选择"
              >
                <el-option value="ZC" label="正常商品" />
                <el-option value="FX" label="分销商品" />
                <el-option value="ZH" label="组合商品" />
                <el-option value="ZP" label="赠品" />
                <el-option value="BC" label="包材" />
                <el-option value="HC" label="耗材" />
                <el-option value="FL" label="辅料" />
                <el-option value="XN" label="虚拟品" />
                <el-option value="FS" label="附属品" />
                <el-option value="CC" label="残次品" />
                <el-option value="OTHER" label="其它" />
              </el-select>
            </el-form-item>
            <el-form-item label="组套类型" prop="suiteType">
              <el-select
                v-model="formData.suiteType"
                style="width: 180px"
                placeholder="请选择"
              >
                <el-option value="虚拟组套" label="虚拟组套" />
              </el-select>
            </el-form-item>
<!--            <el-form-item label="吊牌价" prop="tagPrice">-->
<!--              <el-input v-model="formData.tagPrice" style="width: 180px" placeholder="请输入吊牌价" />-->
<!--            </el-form-item>-->
<!--            <el-form-item label="零售价" prop="retailPrice">-->
<!--              <el-input v-model="formData.retailPrice" style="width: 180px" placeholder="请输入零售价" />-->
<!--            </el-form-item>-->
<!--            <el-form-item label="成本价" prop="costPrice">-->
<!--              <el-input v-model="formData.costPrice" style="width: 180px" placeholder="请输入成本价" />-->
<!--            </el-form-item>-->
<!--            <el-form-item label="采购价" prop="purchasePrice">-->
<!--              <el-input v-model="formData.purchasePrice" style="width: 180px" placeholder="请输入采购价" />-->
<!--            </el-form-item>-->
<!--            <el-form-item label="SN管理" prop="isSNMgmt">-->
<!--              <el-select-->
<!--                v-model="formData.isSNMgmt"-->
<!--                style="width: 180px"-->
<!--                placeholder="请选择"-->
<!--              >-->
<!--                <el-option value="Y" label="Y" />-->
<!--                <el-option value="N" label="N" />-->
<!--              </el-select>-->
<!--            </el-form-item>-->
            <el-form-item label="效期管理" prop="isShelfLifeMgmt">
              <el-select
                v-model="formData.isShelfLifeMgmt"
                style="width: 180px"
                placeholder="请选择"
              >
                <el-option value="Y" label="Y" />
                <el-option value="N" label="N" />
              </el-select>
            </el-form-item>
            <el-form-item label="抛货" prop="isThrow">
              <el-select
                v-model="formData.isThrow"
                style="width: 180px"
                placeholder="请选择"
              >
                <el-option value="Y" label="Y" />
                <el-option value="N" label="N" />
              </el-select>
            </el-form-item>
<!--            <el-form-item label="保质期单位" prop="shelfLifeUnit">-->
<!--              <el-select-->
<!--                v-model="formData.shelfLifeUnit"-->
<!--                style="width: 180px"-->
<!--                placeholder="请选择"-->
<!--                clearable-->
<!--              >-->
<!--                <el-option value="小时" label="小时" />-->
<!--                <el-option value="天" label="天" />-->
<!--                <el-option value="周" label="周" />-->
<!--                <el-option value="月" label="月" />-->
<!--                <el-option value="年" label="年" />-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="保质期" prop="shelfLife">-->
<!--              <el-input v-model="formData.shelfLife" style="width: 180px" placeholder="请输入保质期" />-->
<!--            </el-form-item>-->
<!--            <el-form-item label="禁收天数" prop="rejectLifecycle">-->
<!--              <el-input v-model="formData.rejectLifecycle" style="width: 180px" placeholder="请输入禁收天数" />-->
<!--            </el-form-item>-->
<!--            <el-form-item label="禁售天数" prop="lockupLifecycle">-->
<!--              <el-input v-model="formData.lockupLifecycle" style="width: 180px" placeholder="请输入禁售天数" />-->
<!--            </el-form-item>-->
<!--            <el-form-item label="预警天数" prop="adventLifecycle">-->
<!--              <el-input v-model="formData.adventLifecycle" style="width: 180px" placeholder="请输入预警天数" />-->
<!--            </el-form-item>-->
<!--            <el-form-item label="批次管理" prop="isBatchMgmt">-->
<!--              <el-select-->
<!--                v-model="formData.isBatchMgmt"-->
<!--                style="width: 180px"-->
<!--                placeholder="请选择"-->
<!--                clearable-->
<!--              >-->
<!--                <el-option value="Y" label="Y" />-->
<!--                <el-option value="N" label="N" />-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="包装代码" prop="packCode">-->
<!--              <el-input v-model="formData.packCode" style="width: 180px" placeholder="请输入包装代码" />-->
<!--            </el-form-item>-->
<!--            <el-form-item label="原产地" prop="originAddress">-->
<!--              <el-input v-model="formData.originAddress" style="width: 180px" placeholder="请输入原产地" />-->
<!--            </el-form-item>-->
<!--            <el-form-item label="易碎品" prop="isFragile">-->
<!--              <el-select-->
<!--                v-model="formData.isFragile"-->
<!--                style="width: 180px"-->
<!--                placeholder="请选择"-->
<!--              >-->
<!--                <el-option value="Y" label="Y" />-->
<!--                <el-option value="N" label="N" />-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="危险品" prop="isHazardous">-->
<!--              <el-select-->
<!--                v-model="formData.isHazardous"-->
<!--                style="width: 180px"-->
<!--                placeholder="请选择"-->
<!--              >-->
<!--                <el-option value="Y" label="Y" />-->
<!--                <el-option value="N" label="N" />-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="是否液体" prop="isLiquid">-->
<!--              <el-select-->
<!--                v-model="formData.isLiquid"-->
<!--                style="width: 180px"-->
<!--                placeholder="请选择"-->
<!--              >-->
<!--                <el-option value="Y" label="Y" />-->
<!--                <el-option value="N" label="N" />-->
<!--              </el-select>-->
<!--            </el-form-item>-->
            <el-form-item label="货品标记" prop="marks">

              <el-select
                v-model="formData.marks"
                style="width: 180px"
                placeholder="请选择"
                filterable
                clearable
                multiple
                collapse-tags
              >
                <el-option
                  v-for="item in marks"
                  :key="item.markId"
                  :label="item.markName"
                  :value="item.markId"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="货品说明" prop="explains">
              <el-input v-model="formData.explains" style="width: 180px" placeholder="请输入货品说明" />
            </el-form-item>
<!--            <el-form-item label="最小起订量" prop="minIndent">-->
<!--              <el-input v-model="formData.minIndent" style="width: 180px" placeholder="请输入最小起订量" />-->
<!--            </el-form-item>-->
<!--            <el-form-item label="采购周期" prop="purchaseCycle">-->
<!--              <el-input v-model="formData.purchaseCycle" style="width: 180px" placeholder="请输入采购周期（天）" />-->
<!--            </el-form-item>-->
<!--            <el-form-item label="最小采购量" prop="minPurchase">-->
<!--              <el-input v-model="formData.minPurchase" style="width: 180px" placeholder="请输入最小采购量" />-->
<!--            </el-form-item>-->
            <el-form-item label="备注" prop="remark">
              <el-input v-model="formData.remark" style="width: 180px" placeholder="请输入备注" />
            </el-form-item>
            <el-form-item label="是否有效" prop="isValid">
              <el-select
                v-model="formData.isValid"
                style="width: 180px"
                placeholder="请选择"
              >
                <el-option value="Y" label="Y" />
                <el-option value="N" label="N" />
              </el-select>
            </el-form-item>
            <el-form-item label="是否sku" prop="isSku">
              <el-select
                v-model="formData.isSku"
                style="width: 180px"
                placeholder="请选择"
              >
                <el-option value="Y" label="Y" />
                <el-option value="N" label="N" />
              </el-select>
            </el-form-item>
            <el-form-item label="允许拆分" prop="allowSplit">
              <el-select
                v-model="formData.allowSplit"
                style="width: 180px"
                placeholder="请选择"
              >
                <el-option value="是" label="是" />
                <el-option value="否" label="否" />
              </el-select>
            </el-form-item>
            <el-form-item label="允许店配" prop="allowSite">
              <el-select
                v-model="formData.allowSite"
                style="width: 180px"
                placeholder="请选择"
              >
                <el-option value="是" label="是" />
                <el-option value="否" label="否" />
              </el-select>
            </el-form-item>
            <el-form-item label="允许仓配" prop="allowWarehouse">
              <el-select
                v-model="formData.allowWarehouse"
                style="width: 180px"
                placeholder="请选择"
              >
                <el-option value="是" label="是" />
                <el-option value="否" label="否" />
              </el-select>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="图片上传" name="second" style="height:545px;overflow-y: auto;">
            <el-form-item style="margin-left: 50px;text-align: center;">
              <div style="height: 50px;line-height: 50px">主</div>
              <el-upload
                class="avatar-uploader"
                action="/xnkj/goods/suite/uploadImg"
                :data="{imgType:'主',accessToken:searchData.accessToken}"
                :show-file-list="false"
                :multiple="false"
                :on-success="handleAvatarSuccess">
                <img v-if="imageMain.imgUrl" :src="imageMain.imgUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <i class="el-icon-error" @click="delImg('imageMain')" v-if="imageMain.imgUrl"></i>
            </el-form-item>
            <el-form-item style="margin-left: 50px;text-align: center;">
              <div style="height: 50px;line-height: 50px">上</div>
              <el-upload
                class="avatar-uploader"
                action="/xnkj/goods/goodssuite/uploadImg"
                :data="{imgType:'上',accessToken:searchData.accessToken}"
                :show-file-list="false"
                :multiple="false"
                :on-success="handleAvatarSuccess">
                <img v-if="imageTop.imgUrl" :src="imageTop.imgUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <i class="el-icon-error" @click="delImg('imageTop')" v-if="imageTop.imgUrl"></i>
            </el-form-item>
            <el-form-item style="margin-left: 50px;text-align: center;">
              <div style="height: 50px;line-height: 50px">下</div>
              <el-upload
                class="avatar-uploader"
                action="/xnkj/goods/goodssuite/uploadImg"
                :data="{imgType:'下',accessToken:searchData.accessToken}"
                :show-file-list="false"
                :multiple="false"
                :on-success="handleAvatarSuccess">
                <img v-if="imageBottom.imgUrl" :src="imageBottom.imgUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <i class="el-icon-error" @click="delImg('imageBottom')" v-if="imageBottom.imgUrl"></i>
            </el-form-item>
            <el-form-item style="margin-left: 50px;text-align: center;">
              <div style="height: 50px;line-height: 50px">左</div>
              <el-upload
                class="avatar-uploader"
                action="/xnkj/goods/goodssuite/uploadImg"
                :data="{imgType:'左',accessToken:searchData.accessToken}"
                :show-file-list="false"
                :multiple="false"
                :on-success="handleAvatarSuccess">
                <img v-if="imageLeft.imgUrl" :src="imageLeft.imgUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <i class="el-icon-error" @click="delImg('imageLeft')" v-if="imageLeft.imgUrl"></i>
            </el-form-item>
            <el-form-item style="margin-left: 50px;text-align: center;">
              <div style="height: 50px;line-height: 50px">右</div>
              <el-upload
                class="avatar-uploader"
                action="/xnkj/goods/goodssuite/uploadImg"
                :data="{imgType:'右',accessToken:searchData.accessToken}"
                :show-file-list="false"
                :multiple="false"
                :on-success="handleAvatarSuccess">
                <img v-if="imageRight.imgUrl" :src="imageRight.imgUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <i class="el-icon-error" @click="delImg('imageRight')" v-if="imageRight.imgUrl"></i>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="组合商品" name="three" style="height:545px;overflow-y: auto;">
            <div>
              <!-- 搜索 -->
              <el-input
                v-model="searchStr"
                clearable
                size="small"
                placeholder="输入搜索内容"
                style="width: 200px;"
                class="filter-item"
              />
                <el-select
                  v-model="goodSeach.brandId"
                  style="width: 180px;margin-left: 10px;"
                  placeholder="请选择品牌"
                  filterable
                  clearable
                >
                  <el-option
                    v-for="item in brands"
                    :key="item.brandId"
                    :label="item.brandName"
                    :value="item.brandId"
                  />
                </el-select>
                <el-cascader
                  placeholder="请选择商品分类"
                  :options="families"
                  v-model="goodSeach.familyIdArr"
                  style="width: 180px;margin-left: 10px;"
                  @change="setGoodFamilyId"
                  clearable
                  filterable></el-cascader>
              <el-button class="filter-item" style="margin-left: 10px;" size="mini" type="success" icon="el-icon-search" @click="getGoods">搜索</el-button>
              <el-button class="filter-item" style="margin-left: 10px;" size="mini" type="primary" icon="el-icon-plus" @click="addAllGoods">批量添加</el-button>
            </div>
            <el-table
              :data="goodSeachData"
              border
              height="200"
              @selection-change="handleSelectionChange"
              style="width: 100%;margin-top: 20px;">
              <el-table-column type="selection"  width="55"  />
              <el-table-column
                prop="itemName"
                label="商品名称">
              </el-table-column>
              <el-table-column
                prop="itemCode"
                label="商品编码">
              </el-table-column>
              <el-table-column
                prop="barCode"
                label="条形码">
              </el-table-column>
              <el-table-column
                prop="brandName"
                label="品牌">
              </el-table-column>
              <el-table-column
                prop="familyName"
                label="分类">
              </el-table-column>
              <el-table-column
                label="数量"
                align="center"
                width="105"
              >
                <template v-slot="scope">
                  <el-input v-model="scope.row.goodsQty"  placeholder="请输入" />
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                align="center"
                width="80"
              >
                <template slot-scope="scope">
                  <el-button size="mini" type="text" icon="el-icon-plus" @click="addGoods(scope.row)">添加</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin-top: 20px;color: red;">已选商品</div>
            <el-table
              :data="goodData"
              border
              height="250"
              style="width: 100%;">
              <el-table-column
                prop="itemName"
                label="商品名称">
              </el-table-column>
              <el-table-column
                prop="itemCode"
                label="商品编码">
              </el-table-column>
              <el-table-column
                prop="barCode"
                label="条形码">
              </el-table-column>
              <el-table-column
                prop="brandName"
                label="品牌">
              </el-table-column>
              <el-table-column
                prop="familyName"
                label="分类">
              </el-table-column>
              <el-table-column
                label="数量"
                align="center"
                width="105"
              >
                <template v-slot="scope">
                  <el-input v-model="scope.row.goodsQty" @input="getWeight"  placeholder="请输入" />
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                align="center"
                width="80"
              >
                <template slot-scope="scope">
                  <el-button size="mini" type="text" icon="el-icon-delete" @click="addDel(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="formIsshow=false">取消</el-button>
        <el-button type="primary" v-debounce="addForm" >确认</el-button>
      </div>
    </el-dialog>
    <el-dialog title="组合商品明细" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column
          prop="itemName"
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="itemCode"
          label="商品编码">
        </el-table-column>
        <el-table-column
          prop="barCode"
          label="条形码">
        </el-table-column>
        <el-table-column
          prop="brandName"
          label="品牌">
        </el-table-column>
        <el-table-column
          prop="familyName"
          label="分类">
        </el-table-column>
        <el-table-column
          label="数量"
          prop="goodsQty"
        >
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import { getGoodssuiteList,editGoodssuite,addGoodssuite,disableGoodssuite,importGoodssuite,exportGoodssuite,getGoods,getSuitedetail } from "@/api/goods/goodssuite";
  export default {
    name: 'suiteList',
    data() {
      return {
        rules: {
          itemCode: [
            { required: true, message: '请输入商品编码', trigger: 'blur' }
          ],
          itemId: [
            { required: true, message: '请输入商品编号', trigger: 'blur' }
          ],
          itemName: [
            { required: true, message: '请输入商品名称', trigger: 'blur' }
          ],
          barCode: [
            { required: true, message: '请输入商品条码', trigger: 'blur' }
          ],
          ownerId: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          suiteType: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          className: [
            { required: true, message: '请选择', trigger: 'change' }
          ]
        },
        searchData: {
          itemCode: '',
          itemName: '',
          limit: 20,
          page: 1,
          accessToken:sessionStorage.getItem('xn_token')
        },
        pageSizes: [20, 50, 100],
        dataList: [],
        total: 0,
        loading: false,
        formIsshow: false,
        formData: {id: '', ownerId: '', supplierId: '', logicwarehouseId: '', brandId: '', familyId: '', specsId: '', itemCode: '', itemId: '', goodsCode: '', itemName: '', shortName:'', englishName:'', barCode: '', stockUnit: '', length: '', width:'', height: '', volume: '', grossWeight:'', netWeight: '', color: '', size: '', title: '', pricingCategory: '', safetyStock: '', itemType: '', tagPrice: '', retailPrice: '', costPrice: '', purchasePrice: '', isSNMgmt: 'N', isShelfLifeMgmt: 'Y', shelfLifeUnit: '', shelfLife: '', rejectLifecycle: '', lockupLifecycle: '', adventLifecycle: '', isBatchMgmt: '', packCode: '', originAddress: '', isFragile: 'N', isHazardous: 'N', isLiquid: 'N', remark: '', isValid: 'N', marks: [], explains: '', minIndent: '', purchaseCycle: '', minPurchase: '', isSku: 'N', allowSplit: '否', allowSite: '否', allowWarehouse: '否', imgId: [], suitedetails: [],suiteType: '',isThrow: 'N',className: '', accessToken: sessionStorage.getItem('xn_token')
        },
        jsHeight: 500,
        editStatus: false,
        titleContent: '管理商品',
        owners:[],
        brands:[],
        families:[],
        specs:[],
        marks: [],
        suppliers:[],
        logicwarehouses:[],
        familyIdArr: [],
        activeName: 'first',
        imageMain: {imgId:'',imgUrl:''},
        imageTop: {imgId:'',imgUrl:''},
        imageBottom: {imgId:'',imgUrl:''},
        imageRight: {imgId:'',imgUrl:''},
        imageLeft:{imgId:'',imgUrl:''},
        searchStr:'',
        goodData:[],
        goodSeachData:[],
        dialogTableVisible:false,
        gridData: [],
        goodSeach:{
          brandId:'',
          familyIdArr:[],
          familyId:''
        },
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
        getGoodssuiteList(this.searchData).then(res => {
          if(res){
            this.loading = false
            this.dataList = res.msgData.list.items
            this.total = res.msgData.list.total
            this.brands = res.msgData.brands
            this.families = res.msgData.families
            this.owners = res.msgData.owners
            this.specs = res.msgData.specs
            this.suppliers = res.msgData.suppliers
            this.marks = res.msgData.marks
            this.logicwarehouses = res.msgData.logicwarehouses
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
          this.ids.push(value[k])
        }
      },
      // 添加用户
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
        this.formData.suiteType = '虚拟组套'
        this.formData.isValid = 'N'
        this.formData.isSku = 'N'
        this.formData.isThrow = 'N'
        this.formData.isShelfLifeMgmt = 'Y'
        this.formData.imgId = []
        this.formData.marks = []
        this.formData.suitedetails = []
        this.imageMain.imgId=''
        this.imageMain.imgUrl=''
        this.imageTop.imgId=''
        this.imageTop.imgUrl=''
        this.imageBottom.imgId=''
        this.imageBottom.imgUrl=''
        this.imageRight.imgId=''
        this.imageRight.imgUrl=''
        this.imageLeft.imgId=''
        this.imageLeft.imgUrl=''
        this.activeName = 'first'
        this.familyIdArr = []
        this.goodData = []
        this.goodSeachData = []
        this.goodSeach.brandId = ''
        this.goodSeach.familyIdArr = []
        this.goodSeach.familyId = ''
        this.ids = []
        this.searchStr = ''
        this.formIsshow = true
      },
      addForm() {
        this.$refs['formData'].validate((valid) => {
          if (valid) {
            var _this = this
            const imgId = []
            if(_this.imageMain.imgId!=''){
              imgId.push(_this.imageMain.imgId)
            }
            if(_this.imageTop.imgId!=''){
              imgId.push(_this.imageTop.imgId)
            }
            if(_this.imageBottom.imgId!=''){
              imgId.push(_this.imageBottom.imgId)
            }
            if(_this.imageRight.imgId!=''){
              imgId.push(_this.imageRight.imgId)
            }
            if(_this.imageLeft.imgId!=''){
              imgId.push(_this.imageLeft.imgId)
            }
            _this.formData.imgId = imgId
            if( _this.goodData.length<1){
              this.$modal.notifyWarning('请选择组合商品!')
              return
            }
            _this.formData.suitedetails = _this.goodData
            if (_this.editStatus) {
              editGoodssuite(_this.formData).then(res => {
                if(res){
                  _this.formIsshow = false
                  _this.$modal.notifySuccess(res.errMsg)
                  _this.loadData()
                }
              })
            } else {
              addGoodssuite(_this.formData).then(res => {
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
        this.imageMain.imgId=''
        this.imageMain.imgUrl=''
        this.imageTop.imgId=''
        this.imageTop.imgUrl=''
        this.imageBottom.imgId=''
        this.imageBottom.imgUrl=''
        this.imageRight.imgId=''
        this.imageRight.imgUrl=''
        this.imageLeft.imgId=''
        this.imageLeft.imgUrl=''
        for (var i = 0; i < row.images.length; i++) {
          if(row.images[i].imgType=='主'){
            this.imageMain.imgId=row.images[i].imgId
            this.imageMain.imgUrl=row.images[i].imgUrl
          }
          if(row.images[i].imgType=='上'){
            this.imageTop.imgId=row.images[i].imgId
            this.imageTop.imgUrl=row.images[i].imgUrl
          }
          if(row.images[i].imgType=='下'){
            this.imageBottom.imgId=row.images[i].imgId
            this.imageBottom.imgUrl=row.images[i].imgUrl
          }
          if(row.images[i].imgType=='右'){
            this.imageRight.imgId=row.images[i].imgId
            this.imageRight.imgUrl=row.images[i].imgUrl
          }
          if(row.images[i].imgType=='左'){
            this.imageLeft.imgId=row.images[i].imgId
            this.imageLeft.imgUrl=row.images[i].imgUrl
          }
        }
        this.activeName = 'first'
        this.familyIdArr = row.families
        this.goodSeachData = []
        this.searchStr = ''
        this.goodSeach.brandId = ''
        this.goodSeach.familyIdArr = []
        this.goodSeach.familyId = ''
        const data = {accessToken:sessionStorage.getItem('xn_token'),goodsPid:row.id}
        getSuitedetail(data).then(res => {
          if(res){
            this.goodData = res.msgData.suitedetails
            this.editStatus = true
            this.formIsshow = true
          }
        })
      },
      uploadSuccess(file){
        this.loading = true
        const param = new FormData()
        param.append('file', file.file)
        param.append('accessToken', sessionStorage.getItem('xn_token'))
        importGoodssuite(param).then(res => {
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
        exportGoodssuite(this.searchData).then(res => {
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
      editDisable(scope) {
        this.$refs[`popover-${scope.$index}`].doClose()
        const data = {id: scope.row.id, accessToken: sessionStorage.getItem('xn_token')}
        disableGoodssuite(data).then(res => {
          if(res){
            this.$modal.notifySuccess(res.errMsg)
            this.loadData()
          }
        })
      },
      setFamilyId(res){
        this.formData.familyId = res[1]
      },
      setGoodFamilyId(res){
        this.goodSeach.familyId = res[1]
      },
      handleAvatarSuccess(res, file) {
        if(res.msgData.imgType=='主'){
          this.imageMain.imgUrl = URL.createObjectURL(file.raw)
          this.imageMain.imgId = res.msgData.imgId
        }
        if(res.msgData.imgType=='上'){
          this.imageTop.imgUrl = URL.createObjectURL(file.raw)
          this.imageTop.imgId = res.msgData.imgId
        }
        if(res.msgData.imgType=='下'){
          this.imageBottom.imgUrl = URL.createObjectURL(file.raw)
          this.imageBottom.imgId = res.msgData.imgId
        }
        if(res.msgData.imgType=='右'){
          this.imageRight.imgUrl = URL.createObjectURL(file.raw)
          this.imageRight.imgId = res.msgData.imgId
        }
        if(res.msgData.imgType=='左'){
          this.imageLeft.imgUrl = URL.createObjectURL(file.raw)
          this.imageLeft.imgId = res.msgData.imgId
        }
      },
      addGoods(row){
        if(this.goodData.findIndex(item => item.goodsId=== row.goodsId)!==-1){
          this.$modal.notifyWarning('商品已添加!')
        }else{
          this.goodData.push(JSON.parse(JSON.stringify(row)))
          this.getWeight()
        }
      },
      addAllGoods(){
        if(this.ids.length<1){
          this.$modal.notifyWarning('请选择要操作数据！')
          return
        }
        for (let i = 0; i < this.ids.length; i++) {
           if(this.goodData.findIndex(item => item.goodsId=== this.ids[i].goodsId)===-1){
             this.goodData.push(JSON.parse(JSON.stringify(this.ids[i])))
           }
        }
        this.getWeight()
        // if(this.goodData.findIndex(item => item.goodsId=== row.goodsId)!==-1){
        //   this.$modal.notifyWarning('商品已添加!')
        // }else{
        //   this.goodData.push(JSON.parse(JSON.stringify(row)))
        //   this.getWeight()
        // }
      },
      addDel(index) {
        this.goodData.splice(index, 1)
        this.getWeight()
      },
      getGoods(){
        if(this.formData.ownerId==''){
          this.$modal.notifyWarning('请选择货主!')
          return
        }
        const data = {accessToken:sessionStorage.getItem('xn_token'),ownerId:this.formData.ownerId,searchStr:this.searchStr,brandId:this.goodSeach.brandId,familyId:this.goodSeach.familyId}
        getGoods(data).then(res => {
          if(res){
            this.goodSeachData = []
            for (let i = 0; i < res.msgData.goods.length; i++) {
              this.goodSeachData.push(Object.assign({}, res.msgData.goods[i], { goodsQty: 1 }))
            }
          }
        })
      },
      delImg(type) {
        this[type].imgUrl=''
        this[type].imgId=''
      },
      cleanGoods(){
        this.goodData = []
        this.goodSeachData = []
        this.searchStr = ''
      },
      getSuitedetail(row){
        const data = {accessToken:sessionStorage.getItem('xn_token'),goodsPid:row.id}
        getSuitedetail(data).then(res => {
          if(res){
            this.dialogTableVisible = true
            this.gridData = res.msgData.suitedetails
          }
        })
      },
      getWeight(){
        let grossWeight = 0
        let netWeight = 0
        for (var i = 0; i < this.goodData.length; i++) {
          grossWeight+=this.goodData[i].grossWeight * this.goodData[i].goodsQty
          netWeight+=this.goodData[i].grossWeight * this.goodData[i].goodsQty
        }
        this.formData.grossWeight = grossWeight
        this.formData.netWeight = netWeight
      }
    }
  }
</script>
<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
    border: 1px dashed #d9d9d9;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
</style>

