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
              v-model="searchData.examineCode"
              clearable
              size="small"
              placeholder="输入流程编码搜索"
              style="width: 200px;"
              class="filter-item"
            />
            <el-input
              v-model="searchData.examineName"
              clearable
              size="small"
              placeholder="输入流程名称搜索"
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
              @click="addShow"
              plain
              v-hasPermi="['Base:Examine:Add']"
            >
              新增
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
        >
          <u-table-column :show-overflow-tooltip="true" prop="examineCode" label="流程编码" />
          <u-table-column :show-overflow-tooltip="true" prop="examineName" label="流程名称" />
          <u-table-column :show-overflow-tooltip="true" prop="examineQueue" label="流程节点" />
          <u-table-column label="禁用" width="100" align="center">
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
              <el-button v-hasPermi="['Base:Examine:Edit']" size="mini" type="text" style="width: 50px;" icon="el-icon-edit" @click="editStaff(scope.row)">修改</el-button>
              <el-popover v-hasPermi="['Base:Examine:Disable']" v-if="scope.row.disable=='否'" :ref="`popover-${scope.$index}`" placement="top" width="200">
                <p style="line-height:40px"><i class="el-icon-info" style="color:rgb(255,153,0)" /> 确定禁用吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[`popover-${scope.$index}`].doClose()">取消</el-button>
                  <el-button type="primary" size="mini" @click="editDisable(scope)">确定</el-button>
                </div>
                <el-button slot="reference" style="width: 50px;" type="text" icon="el-icon-lock" size="mini">禁用</el-button>
              </el-popover>
              <el-popover v-hasPermi="['Base:Examine:Disable']" v-if="scope.row.disable=='是'" :ref="`popover-${scope.$index}`" placement="top" width="200">
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
    <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="formIsshow" :title="titleContent" width="600px">
      <el-form ref="formData" :inline="true" :model="formData" :rules="rules" size="small" label-width="80px">
        <el-form-item label="流程编码" prop="examineCode">
          <el-input v-model="formData.examineCode" style="width: 250px" placeholder="请输入流程编码" />
        </el-form-item>
        <el-form-item label="流程名称" prop="examineName">
          <el-input v-model="formData.examineName" style="width: 250px" placeholder="请输入流程名称" />
        </el-form-item>
      </el-form>
      <el-tabs type="border-card">
        <el-tab-pane label="审单流程">
          <div>
            <el-button
              class="filter-item"
              size="mini"
              type="primary"
              icon="el-icon-plus"
              @click="addShowExamine"
            >
              添加节点
            </el-button>
          </div>
          <el-table
            :data="formData.process"
            max-height="350"
            border
            style="width: 100%;margin-top: 20px;">
            <el-table-column
              label="审单节点"
              width="270"
              align="center"
            >
              <template v-slot="scope">
                <el-select v-model="scope.row.processId" @change="changeRrocess(scope.row,scope.$index)">
                  <el-option v-for="item in processList" :key="item.processId" :label="item.processName" :value="item.processId" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              label="排序"
              align="center"
            >
              <template v-slot="scope">
                <el-input v-model="scope.row.processSort" disabled="disabled" placeholder="请输入" />
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
            >
              <template slot-scope="scope">
                <el-button size="mini" type="text" icon="el-icon-delete" @click="addDel(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="formIsshow=false">取消</el-button>
        <el-button type="primary" v-debounce="addForm" >确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getExamineList,editExamine,addExamine,disableExamine } from "@/api/base/examine";
export default {
  name: 'Examine',
  data() {
    return {
      rules: {
        examineCode: [
          { required: true, message: '请输入流程编码', trigger: 'blur' }
        ],
        examineName: [
          { required: true, message: '请输入流程名称', trigger: 'blur' }
        ]
      },
      searchData: {
        examineCode: '',
        examineName: '',
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
        examineCode: '',
        examineName: '',
        process:[],
        accessToken: sessionStorage.getItem('xn_token')
      },
      jsHeight: 500,
      editStatus: false,
      titleContent: '管理审单流程',
      ownerList: [],
      processList: []
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
      getExamineList(this.searchData).then(res => {
        if(res){
          this.loading = false
          this.dataList = res.msgData.list.items
          this.total = res.msgData.list.total
          this.processList = res.msgData.process
        }
      })
    },
    // 搜索
    search() {
      this.page = 1
      this.loadData()
    },
    // 添加用户
    addShow() {
      this.editStatus = false
      if (this.$refs['formData'] !== undefined) {
        this.$refs['formData'].resetFields()
      }
      for(var key in this.formData){
        if(key!='accessToken' &&  key!='process'){
          this.formData[key]=''
        }
      }
      this.formData.process=[]
      this.formIsshow = true
    },
    addForm() {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          var _this = this
          if(_this.formData.process.length<1){
            this.$modal.notifyWarning('请添加流程节点！')
            return
          }
          for (let i = 0; i < _this.formData.process.length; i++) {
            if(_this.formData.process[i].processId==''){
                _this.$modal.notifyWarning('流程节点不能为空！')
                return
            }
          }
          const check = _this.duplicates(_this.formData.process);
          if(check.length>0){
            _this.$modal.notifyWarning('流程节点不能重复！')
            return
          }
          if (_this.editStatus) {
            editExamine(_this.formData).then(res => {
              if(res){
                _this.formIsshow = false
                _this.$modal.notifySuccess(res.errMsg)
                _this.loadData()
              }
            })
          } else {
            addExamine(_this.formData).then(res => {
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
    duplicates(arr){
      // 过滤掉重复项后的原数据
      let notRepeating = new Set();
      // 存放重复出现过的数据
      let Repeat = new Set();
      // 遍历原数组
      arr.forEach((item) => {
        if (notRepeating.has(item.processId)) {
          // 若notRepeating中已经含有该元素，则存到Repeat中
          Repeat.add(item.processId);
        } else {
          notRepeating.add(item.processId);
        }
      });
      return Array.from(Repeat);//判断数组长度是否大于0即可知道是否重复
    },
    editStaff(row) {
      if (this.$refs['formData'] !== undefined) {
        this.$refs['formData'].resetFields()
      }
      for(var key in this.formData){
        if(key!='accessToken'){
          this.formData[key]=JSON.parse(JSON.stringify(row[key]))
        }
      }
      this.editStatus = true
      this.formIsshow = true
    },
    editDisable(scope) {
      this.$refs[`popover-${scope.$index}`].doClose()
      const data = {id: scope.row.id, accessToken: sessionStorage.getItem('xn_token')}
      disableExamine(data).then(res => {
        if(res){
          this.$modal.notifySuccess(res.errMsg)
          this.loadData()
        }
      })
    },
    addShowExamine(){
      this.formData.process.push({ processId: '', processSort: '' })
      for (let i = 0; i < this.formData.process.length; i++) {
        this.formData.process[i]['processSort']=i+1;
      }
    },
    addDel(index) {
      this.formData.process.splice(index, 1)
      for (let i = 0; i < this.formData.process.length; i++) {
        this.formData.process[i]['processSort']=i+1;
      }
    },
    changeRrocess(){

    }
  }
}
</script>

