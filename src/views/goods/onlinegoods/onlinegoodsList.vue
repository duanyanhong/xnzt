<template>
    <div class="app-container order-info-padding">
      <el-row :gutter="20">
        <!--用户数据-->
        <el-col>
          <!--工具栏-->
          <div class="head-container">
            <div>
            <el-select
                v-model="searchData.matchState"
                style="width: 180px"
                placeholder="筛选状态"
                class="select-box"
            >
                <el-option value="" >全部</el-option>
                <el-option value="已匹配" label="已匹配" />
                <el-option value="未匹配" label="未匹配" />
            </el-select>
              <!-- 搜索 -->
              <el-select
                  v-model="searchData.ownerId"
                  clearable
                  size="small"
                  placeholder="货主"
                  class="filter-item"
                  style="width: 250px"
                  filterable
                  multiple
                  collapse-tags
                >
                <el-option
                  v-for="item in ownersName"
                  :key="item.ownerId"
                  :label="item.ownerName"
                  :value="item.ownerId"
                />
              </el-select>
              <el-select
                  v-model="searchData.channelName"
                  clearable
                  size="small"
                  placeholder="销售渠道"
                  class="filter-item"
                  style="width: 250px"
                  filterable
                  multiple
                  collapse-tags
                >
                <el-option
                  v-for="item in shops"
                  :key="item.shopId"
                  :label="item.shopName"
                  :value="item.shopId"
                />
              </el-select>
              <el-input
                v-model="searchData.onlineCode"
                size="small"
                placeholder="输入商品编码（网店）"
                style="width: 200px;"
                class="order_input"
                clearable
              >
              <i  class="el-icon-edit el-input__icon"  slot="suffix"  @click="searchShow('onlineCode')"></i>
                <!-- <el-button slot="suffix" type="text" @click="searchShow('onlineCode')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button> -->
              </el-input>
              <el-input
                v-model="searchData.onlineSpecsCode"
                size="small"
                placeholder="输入规格编码（网店）"
                style="width: 200px;"
                class="order_input"
                clearable
              >
                <i  class="el-icon-edit el-input__icon"  slot="suffix"  @click="searchShow('onlineSpecsCode')"></i>
                <!-- <el-button slot="suffix" type="text" @click="searchShow('onlineSpecsCode')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button> -->
              </el-input>
              <el-input
                v-model="searchData.itemCode"
                size="small"
                placeholder="输入商品编码（系统）"
                style="width: 200px;"
                class="order_input"
                clearable
              > 
               <i  class="el-icon-edit el-input__icon"  slot="suffix"  @click="searchShow('itemCode')"></i>
                <!-- <el-button slot="suffix" type="text" @click="searchShow('itemCode')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button> -->
              </el-input>
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
              v-hasPermi="['Goods:OnlineGoods:Add']"
            >
              新增
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
              v-hasPermi="['Goods:OnlineGoods:Import']"
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
                v-hasPermi="['Goods:OnlineGoods:Export']"
              >导出</el-button>
            </span>
          <span class="crud-opts-left">
            <el-button
              class="filter-item test-color"
              size="mini"
              type="primary"
              icon="el-icon-refresh"
              plain
              @click="getSuitedetail"
              v-hasPermi="['Goods:OnlineGoods:Synch']"
            >同步</el-button>
          </span>
          <span class="crud-opts-left">
            <el-button
              class="filter-item"
              size="mini"
              type="success"
              icon="el-icon-star-on"
              plain
              @click="handleMark"
             v-hasPermi="['Goods:OnlineGoods:Mark']"
            >标记</el-button>
          </span>
          <span class="crud-opts-left">
            <el-button
              class="filter-item"
              size="mini"
              type="info"
              icon="el-icon-sort"
              plain
              @click="handleMatch"
              v-hasPermi="['Goods:OnlineGoods:Match']"
            >匹配</el-button>
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
            <u-table-column type="selection" width="55"  />
            <u-table-column label="货品标记" min-width="250"  align="center">
            <template slot-scope="scope">
                <el-tag v-for="(item, index) in scope.row.onlineMark" style="margin-left: 5px;"  :color="item.markColor" :key="index">
                  <span style="color:#fff;">{{ item.markName }}</span>
                </el-tag>
            </template>
          </u-table-column>
            <u-table-column :show-overflow-tooltip="true" prop="ownerName" align="center"  width="150"  label="货主"/>
            <u-table-column :show-overflow-tooltip="true" prop="channelName" align="center" width="150"  label="销售渠道" />
            <u-table-column :show-overflow-tooltip="true" prop="onlineCode" align="center" width="150" label="商品编码（网店）" />
            <u-table-column :show-overflow-tooltip="true" prop="onlineName" align="center" width="150"  label="商品名称（网店）" />
            <u-table-column :show-overflow-tooltip="true" prop="onlineSpecs" align="center" width="150" label="商品规格（网店）" />
            <u-table-column :show-overflow-tooltip="true" prop="onlineSpecsCode" align="center" width="150" label="规格编码（网店）" />
            <u-table-column :show-overflow-tooltip="true" prop="onlineId" align="center" width="150" label="平台商品Id（网店）" />
            <u-table-column :show-overflow-tooltip="true" prop="onlineSpecsId" align="center" width="150" label="平台规格Id（网店）" />
            <!-- <u-table-column :show-overflow-tooltip="true" prop="partnerCode" width="150" label="常态合作编码（网店）" /> -->
            <u-table-column :show-overflow-tooltip="true" prop="onlineWarehouseCode" align="center" width="150" label="仓库编码（网店）" />
            <u-table-column :show-overflow-tooltip="true" prop="onlinePrice" align="center" width="150" label="商品价格（网店）" />
            <!-- <u-table-column :show-overflow-tooltip="true" prop="onlineQty" width="150" label="商品数量（网店）" /> -->
            <u-table-column :show-overflow-tooltip="true" prop="specsPrice" align="center" width="150" label="规格价格（网店）" />
            <u-table-column :show-overflow-tooltip="true" prop="onlineSpecsQty" align="center" width="150" label="规格数量（网店）" />
            <u-table-column :show-overflow-tooltip="true" prop="matchState" align="center" label="匹配状态" />
            <u-table-column :show-overflow-tooltip="true" prop="itemCode" align="center" width="150" label="商品编码（系统）" />
            <u-table-column :show-overflow-tooltip="true" prop="itemName" align="center" width="150" label="商品名称（系统）" />
            <u-table-column :show-overflow-tooltip="true" prop="barCode" align="center" width="150" label="商品条码（系统）" />
            <u-table-column :show-overflow-tooltip="true" prop="specsName" align="center" width="150" label="商品规格（系统）" />
            <u-table-column :show-overflow-tooltip="true" prop="updateTime" align="center"  width="150" label="修改时间" />
            <u-table-column :show-overflow-tooltip="true" prop="matchType" align="center" label="匹配方式" />
            <!-- <u-table-column :show-overflow-tooltip="true" prop="onlineDesc" align="center" label="商品标记" /> -->
            <u-table-column :show-overflow-tooltip="true" prop="onlineState" align="center"  label="商品状态" />
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
      <!-- 主页编辑文本弹窗 -->
      <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="searchIsshow" :title="titlesContent" center width="500px">
        <el-input v-model="searchContent" placeholder="多个编码用逗号或换行隔开" resize="none" type="textarea" :autosize="{ minRows: 10, maxRows: 20}" />
        <div slot="footer" class="dialog-footer">
          <el-button @click="searchIsshow=false">取消</el-button>
          <el-button type="primary" @click="addSearchForm">确认</el-button>
        </div>
      </el-dialog>
      <!-- 匹配弹窗编辑文本 -->
      <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="searchIsshowMatch" :title="titlesContent" center width="500px">
          <el-input v-model="searchContentMatch" placeholder="多个编码用逗号或换行隔开" resize="none" type="textarea" :autosize="{ minRows: 10, maxRows: 20}" />
        <div slot="footer" class="dialog-footer">
          <el-button @click="searchIsshowMatch=false">取消</el-button>
          <el-button type="primary" @click="addSearchFormMatch">确认</el-button>
        </div>
      </el-dialog>
        <!-- 商品标记 -->
        <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="markIsshow" title="商品标记" center width="500px">
          <div style="width: 100%; display: flex;justify-content: center;align-items: center;">
             <div style="margin-right: 10px;">货品商品：</div>
            <el-select
              v-model="marks"
              clearable
              size="small"
              placeholder="标记"
              class="filter-item"
              style="width: 250px"
              filterable
              multiple
              collapse-tags
            >
            <el-option
              v-for="item in markList"
              :key="item.markId"
              :label="item.markName"
              :value="item.markId"
            />
          </el-select>   
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="markIsshow=false">取消</el-button>
            <el-button type="primary" @click="handleSubmit">确认</el-button>
          </div>
      </el-dialog>

      <!-- 主导商品抽屉 -->
      <el-drawer
          title=""
          :visible.sync="guidingTable"
          direction="rtl"
          size="50%">
          <div class="drawer-box">
              <el-input
                v-model="searchMatchData.itemCode"
                size="small"
                placeholder="输入商品编码"
                style="width: 200px;"
                class="order_input"
                clearable
              >
                <i  class="el-icon-edit el-input__icon"  slot="suffix"  @click="searchShow('onlineCode')"></i>
                <!-- <el-button slot="suffix" type="text" @click="handelSearchShow('itemCode')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button> -->
              </el-input>
              <el-input
                v-model="searchMatchData.barCode"
                size="small"
                placeholder="输入商品条码"
                style="width: 200px;"
                class="order_input"
                clearable
              >
                <i  class="el-icon-edit el-input__icon"  slot="suffix"  @click="searchShow('onlineCode')"></i>
                <!-- <el-button slot="suffix" type="text" @click="handelSearchShow('barCode')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button> -->
              </el-input>
              <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="handelSearch">查询</el-button>
          </div>
          <el-table :data="gridData">
            <el-table-column prop="" label="" width="55" >
                <template #default="scope">
                  <el-checkbox v-model="scope.row.isRight"  size="large"  @change="handelChange(scope.row.goodsId,scope.$index)"/>
                </template>
              </el-table-column>
              <el-table-column prop="barCode" label="商品条码"  ></el-table-column>
              <el-table-column prop="itemCode" label="商品编码" ></el-table-column>
              <el-table-column prop="itemName" label="商品名称"></el-table-column>
            </el-table>
            <pagination
            :limit.sync="searchMatchData.limitMatch"
            :page.sync="searchMatchData.pageMatch"
            :total="totalMatch"
            :page-sizes.sync="pageSizeMatch"
            @pagination="getGuildgoods"
          />
            <div  class="drawer-footer">
              <!-- <el-button @click="guidingTable=false">取消</el-button> -->
              <el-button type="primary" @click="submitMatch" icon="el-icon-sort" >匹配</el-button>
            </div>
        </el-drawer>
    </div>
  </template>
  
  <script>
    import { getOnlinegoosList,importOnlinegoods,exportGoodonline,getSuitedetail , getguildgoosList ,matchOnlinegoods ,markOnlinegoods} from "@/api/goods/gooddsOnlie";
    export default {
      name: 'Onlinegoods',
      data() {
        return {
          searchData: {  //主页表单查询条件（网店商品列表）
            ownerId: [],  //户主id 多选
            matchState: '',
            itemCode:'',
            channelName:'',
            onlineCode:'',
            onlineSpecsCode:'',
            onlineState:'',
            limit: 20,
            page: 1,
            accessToken:sessionStorage.getItem('xn_token')
          },
          searchMatchData:{  // 主导商品查询条件
            itemCode:'',
            barCode:'',
            limitMatch:100,
            pageMatch:1,
        
          },
          markList:[],
          marks:[],
          pageSizes: [20, 50, 100],
          dataList: [],  // 网店商品列表集合
          total: 0,
          totalMatch:0,
          pageSizeMatch:[100],
          markIsshow:false,
          loading: false,
          formIsshow: false,  // 添加弹窗（暂无）
          formData: {id: '', match:'',ownerId: '', supplierId: '', logicwarehouseId: '', brandId: '', familyId: '', specsId: '', itemCode: '', itemId: '', goodsCode: '', itemName: '', shortName:'', englishName:'', barCode: '', stockUnit: '', length: '', width:'', height: '', volume: '', grossWeight:'', netWeight: '', color: '', size: '', title: '', pricingCategory: '', safetyStock: '', itemType: '', tagPrice: '', retailPrice: '', costPrice: '', purchasePrice: '', isSNMgmt: 'N', isShelfLifeMgmt: 'Y', shelfLifeUnit: '', shelfLife: '', rejectLifecycle: '', lockupLifecycle: '', adventLifecycle: '', isBatchMgmt: '', packCode: '', originAddress: '', isFragile: 'N', isHazardous: 'N', isLiquid: 'N', remark: '', isValid: 'N', marks: [], explains: '', minIndent: '', purchaseCycle: '', minPurchase: '', isSku: 'N', allowSplit: '否', allowSite: '否', allowWarehouse: '否', imgId: [], suitedetails: [],suiteType: '',isThrow: 'N',className: '', accessToken: sessionStorage.getItem('xn_token')
          },  // 添加编辑数据对象（暂无）
          jsHeight: 500, // 表格高度
          editStatus: false, // 是否是编辑状态
          searchIsshow:false, //主页编辑文本弹窗
          searchIsshowMatch:false, //匹配弹窗编辑文本
          shops:[], // 销售渠道-店铺
          guidingTable:false, // 主导商品匹配弹窗
          gridData: [  // 主导商品数据
          ],
          ownersName:[], // 货主集合
          titlesContent: '', //文本弹窗title
          searchContent:'', // 文本内容
          searchContentMatch:'',// 匹配弹窗文本内容
          matchData:'', //匹配主导商品id
          ids: [],  // 匹配网店商品集合
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
          getOnlinegoosList({
            page: this.page,
            limit: this.limit,
            ownerId:this.searchData.ownerId,
            matchState: this.searchData.matchState,
            channelName:this.searchData.channelName,
            onlineCode:this.searchData.onlineCode,
            onlineSpecsCode:this.searchData.onlineSpecsCode,
            itemCode:this.searchData.itemCode,
            onlineState:this.searchData.onlineState,
            limit: 20,
            page: 1,
            accessToken:sessionStorage.getItem('xn_token')
          }).then(res => {
            if(res){
              this.loading = false
              this.dataList = res.msgData.list.items
              this.markList = res.msgData.marks  
              this.total = res.msgData.list.total
              this.ownersName = res.msgData.owners
              this.shops = res.msgData.shops
            }
          })
        },
        // 搜索
        search() {
          this.page = 1
          this.loadData()
        },
        // 勾选数据
        handleSelectionChange(arr) {
          console.log(arr)
          this.ids = []
          for (let k = 0; k < arr.length; k++) {
            this.ids.push(arr[k].id)
          }
          console.log(this.ids)
        },
        // 匹配
        handleMatch(event){
          if(this.ids && !this.ids.length) {
            this.$message.warning('请勾选要进行匹配的对象');
            return
          }
          let target = event.target;
          if(target.nodeName == "SPAN"){
            target = event.target.parentNode;
          }
          target.blur();
          this.getGuildgoods()
          this.searchMatchData.itemCode=''
          this.searchMatchData.barCode=''
          setTimeout(()=>{
            this.guidingTable = true
          },300)
        },
        
        handleMark() {
          this.marks =[]
          if(!this.ids.length ) {
            this.$message.warning('请勾选要标记的对象');
            return
          }
          if(this.ids.length > 1) {
            this.markIsshow =true

          }else {
            this.ids.forEach((it) =>{
              this.dataList.forEach(item => {
                if(it == item.id) {
                  this.marks  = item.markId
                }
               })
            })
            this.markIsshow =true
            
          }
        
        },
        // 获取主导商品列表
        getGuildgoods() {
          getguildgoosList({
            ownerId:this.searchData.ownerId,
            itemCode: this.searchMatchData.itemCode,
            barCode: this.searchMatchData.barCode,
            limit: 20,
            page: 1,
            accessToken:sessionStorage.getItem('xn_token')
          }).then(res => {
            if(res){
               if(res.msgData.goods && res.msgData.goods.length) {
                res.msgData.goods.forEach(item =>{
                  item['isRight']  = false
                })
               }
              this.gridData = res.msgData.goods
              this.totalMatch = res.msgData.total || res.msgData.goods.length
            }
          })
        },
        // 根据条件查询主导商品
        handelSearch() {
          this.getGuildgoods()
          
        },
        // 确认匹配
        submitMatch(){
          if(!this.ids.length || this.matchData =='' ) {
            this.$message.error('请选择网店商品或主导商品');
            return
          }
          matchOnlinegoods({
            id : JSON.parse(JSON.stringify(this.ids)),
            goodsId : this.matchData ,
            accessToken:sessionStorage.getItem('xn_token')
          }).then(res => {
            if(res){
              this.$message({
                  message: res.errMsg,
                  type: 'success'
              });
              this.guidingTable = false
              this.ids = []
              this.matchData=''
              this.loadData()
            }
          })
        },
        // 添加（暂无）
        addShow() {
          // this.editStatus = false
          // if (this.$refs['formData'] !== undefined) {
          //   this.$refs['formData'].resetFields()
          // }
          // for(var key in this.formData){
          //   if(key!='accessToken' && key!='allowSplit' && key!='allowSite' && key!='allowWarehouse' && key!='imgId' && key!='marks'){
          //     this.formData[key]=''
          //   }
          //   if(key=='allowSplit' || key=='allowSite' || key=='allowWarehouse'){
          //     this.formData[key]='否'
          //   }
          // }
          // this.formData.suiteType = '虚拟组套'
          // this.formIsshow = true
        },
        handleSubmit() {
          markOnlinegoods({
            id : JSON.parse(JSON.stringify(this.ids)),
            onlineMark : this.marks ,
            accessToken:sessionStorage.getItem('xn_token')
          }).then(res => {
            if(res){
              this.$message({
                  message: res.errMsg,
                  type: 'success'
              });
              this.ids = []
              this.marks=[]
              this.markIsshow = false
              this.loadData()
            }
          })
        },
        // 匹配弹窗-主导商品条件筛选多文本
        handelSearchShow(type) {
          if (type === 'itemCode') {
            this.titlesContent = '输入商品编码'
            this.searchContentMatch = this.searchMatchData.itemCode.replace(/,/g, '\n')
          }
          if(type == 'barCode') {
            this.titlesContent = '输入商品条码'
            this.searchContentMatch = this.searchMatchData.barCode.replace(/,/g, '\n')
          }
          this.searchIsshowMatch = true
        },
        // 确认保存主导商品多文本搜索条件
        addSearchFormMatch() {
          if (this.titlesContent === '输入商品编码') {
            this.searchMatchData.itemCode = this.searchContentMatch.replace(/\n/g, ',').replace('，', ',')
          }
          if (this.titlesContent === '输入商品条码') {
            this.searchMatchData.barCode = this.searchContentMatch.replace(/\n/g, ',').replace('，', ',')
          }
          this.searchIsshowMatch = false
        },
        // 主页网店商品查询多文本
        searchShow(type) {
          if (type === 'onlineCode') {
            this.titlesContent = '输入商品编码（网店）'
            this.searchContent = this.searchData.onlineCode.replace(/,/g, '\n')
          }
          if(type == 'onlineSpecsCode') {
            this.titlesContent = '输入规格编码（网店）'
            this.searchContent = this.searchData.onlineSpecsCode.replace(/,/g, '\n')
          }
          if(type == 'itemCode') {
            this.titlesContent = '输入商品编码（系统）'
            this.searchContent = this.searchData.itemCode.replace(/,/g, '\n')

          }
          this.searchIsshow = true
        },
        // 主页网店商品查询条件多文本确认保存
        addSearchForm() {
          if (this.titlesContent === '输入商品编码（网店）') {
            this.searchData.onlineCode = this.searchContent.replace(/\n/g, ',').replace('，', ',')
          }
          if (this.titlesContent === '输入规格编码（网店）') {
            this.searchData.onlineSpecsCode = this.searchContent.replace(/\n/g, ',').replace('，', ',')
          }
          if (this.titlesContent === '输入商品编码（系统）') {
            this.searchData.itemCode = this.searchContent.replace(/\n/g, ',').replace('，', ',')
          }
          this.searchIsshow = false
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
        // 导出
        downMyOrder() {
          this.loading = true
          exportGoodonline(this.searchData).then(res => {
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
        // 匹配主导商品单选
        handelChange(el, index) {
          console.log(el)
          if(this.matchData == el) {
            this.matchData= ''
            this.gridData.forEach((item,key) =>{
              if (key == index) {
                item.isRight = false
              }
          })
            return 
          }
          this.matchData= el
          this.gridData.forEach((item,key) =>{
              if (key != index) {
                item.isRight = false
              }
          })
        },
        // 同步
        getSuitedetail(row){
        //   const data = {accessToken:sessionStorage.getItem('xn_token'),goodsPid:row.id}
        //   getSuitedetail(data).then(res => {
        //     if(res){
        //       this.dialogTableVisible = true
        //       this.gridData = res.msgData.suitedetails
        //     }
        //   })
        },
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

    ::v-deep .matchDialog .el-dialog {
        width: 80% ;

    }
    ::v-deep .el-dialog .el-row {
        display: flex;
        justify-content: space-around
    }
    /* ::v-deep .matchDialog .el-dialog__body {
       min-height: 500px;

    } */

    .filter-item {
       margin: 0;
       margin-right: 10px;
    }
    .head-container div {
      display: flex;
      align-items: center;
    }

    .order_input{
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
    }
  ::v-deep .el-table__empty-block {
    min-height: 300px;
  }
  .select-box {
    margin-right: 10px;
  }

  ::v-deep .el-dialog__header {
    /* background: -webkit-gradient(linear, left top, left bottom, from(#1f2d3d), to(#426995)) !important;
    background: linear-gradient(180deg, #1f2d3d, #426995) !important; */
    border-bottom: 1px solid #eee;
  }
  ::v-deep .el-drawer {
    width: 40% !important;
    padding-left: 30px;
  }

  .drawer-box {
    display: flex;
    align-items: center;
    margin: 0 0 20px 0;
    
  }
  .drawer-footer {
    display: flex;
    justify-content: flex-end;
    padding: 30px ;
   
  }
  ::v-deep .el-drawer__container .el-table {
    /* max-width: 700px !important; */
    max-height: 600px !important;
    overflow-y: scroll ;
  }

  /*滚动条整体样式,高宽分别对应横竖滚动条的尺寸*/
  .el-drawer__container .el-table::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  scrollbar-arrow-color:#898989;
}
/*滚动条里面小方块*/
.el-drawer__container .el-table::-webkit-scrollbar-thumb{
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: rgba(0,0,0,0.2);
  scrollbar-arrow-color:#898989;
}
/*滚动条里面轨道*/
  .el-drawer__container .el-table::-webkit-scrollbar-track{
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 0;
  background: rgba(0,0,0,0.1);
}

::v-deep  .head-container .filter-item input {
  height: 32px !important ;
}
  </style>
  
  