<template>
  <div>
    <el-card shadow="never" style="border:none;" class="box-card">
      <div slot="header" class="clearfix">
        <span style="display: block;">组合查询</span>
        <div style="float: right;">
          <el-button icon="el-icon-circle-plus-outline" type="text" @click="addShow">新增</el-button>
          <el-button icon="el-icon-edit" type="text" @click="editStaff">修改</el-button>
          <el-button icon="el-icon-delete" type="text" @click="delAll">删除</el-button>
        </div>
      </div>
      <el-checkbox-group v-model="selectedIds">
        <el-checkbox style="display: inline-block;width: 100%;" v-for="item in dataList" :key="item.groupId" :label="item.groupId">{{item.groupName}}</el-checkbox>
      </el-checkbox-group>
    </el-card>
    <el-dialog append-to-body :close-on-click-modal="false" top="8vh" :visible.sync="formSearchIsshow" title="组合筛选" width="650px">
      <SearchSelect :searchTypeList="searchTypeList" :group-name.sync="groupName"  :select-type.sync="selectType" :optionArr="optionArr" :searchContentList.sync="searchContentList"></SearchSelect>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="formSearchIsshow=false">取消</el-button>
        <el-button type="primary" v-debounce="addForm" >确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { addGroupsearch,editGroupsearch,deleteGroupsearch } from "@/api/order/stockoutorder";
  import SearchSelect from "./zhSearch";
  export default {
    components: { SearchSelect },
    props: {
      btnList: {
        type: Array,
        required: []
      },
      searchTypeList: {
        type: Array,
        required: []
      },
      optionArr: {
        type: Object,
        required: {}
      },
      loadData: {
        type: Function,
        default: null
      }
    },
    data() {
      return {
        searchData: {},
        pageSizes: [20, 50, 100],
        dataList: this.btnList,
        total: 0,
        loading: false,
        formIsshow: false,
        formData: {
          id: '',
          markName: '',
          markColor: '',
          accessToken: sessionStorage.getItem('xn_token')
        },
        jsHeight: 500,
        editStatus: false,
        selectedIds: [],
        formSearchIsshow: false,
        searchContentList: [],
        groupName:'',
        selectType: ''
      }
    },
    watch:{
      btnList:{
        handler(val){
          this.dataList = val
        }
      }
    },
    methods: {
      // 添加
      addShow() {
        this.editStatus = false
        this.searchContentList = [{englishName:'acceptTime',chineseName:'创建时间',view:true,'type':'时',searchStr:''}]
        this.groupName = ''
        this.selectType = ''
        this.formSearchIsshow = true
      },
      addForm() {
        if(this.groupName == ''){
          this.$modal.notifyWarning('请输入组合名称！')
          return
        }
        if(this.searchContentList.length<1){
          this.$modal.notifyWarning('请添加组合条件！')
          return
        }
        for (let i = 0; i < this.searchContentList.length; i++) {
          const fiter= ['ownerId','shopId','orderType','warehouseId','logicwarehouseId','sourcePlatformCode','logisticsCode','expressName','provinceId','cityId','areaId','orderState']
          if(fiter.indexOf(this.searchContentList[i].englishName)!==-1){
            if(this.searchContentList[i].searchStr.length<1){
              this.$modal.notifyWarning(this.searchContentList[i].chineseName+'不能为空！')
              return
            }
          }
          if(this.searchContentList[i].searchStr==''){
            this.$modal.notifyWarning(this.searchContentList[i].chineseName+'不能为空！')
            return
          }
        }
        if(this.editStatus){
          const data = {groupId:this.selectedIds[0],groupName:this.groupName,groupSearch:this.searchContentList,accessToken: sessionStorage.getItem('xn_token')}
          editGroupsearch(data).then(res => {
            if(res){
              // for (let i = 0; i < this.dataList.length; i++) {
              //   if(this.dataList[i].groupId==this.selectedIds[0]){
              //     this.dataList[i].groupName = this.groupName
              //     this.dataList[i].groupSearch = this.searchContentList
              //   }
              // }
              this.$modal.notifySuccess(res.errMsg)
              this.formSearchIsshow = false
              this.selectedIds = []
              this.loadData()
            }
          })
        }else{
          const data = {groupName:this.groupName,groupSearch:this.searchContentList,accessToken: sessionStorage.getItem('xn_token')}
          addGroupsearch(data).then(res => {
            if(res){
              this.$modal.notifySuccess(res.errMsg)
              this.formSearchIsshow = false
              // this.dataList.push({groupId:res.msgData.groupId,groupName:this.groupName,groupSearch:this.searchContentList})
              this.loadData()
            }
          })
        }
      },
      editStaff() {
        if(this.selectedIds.length == 0){
          this.$modal.notifyWarning('请选择要修改的组合！')
          return
        }
        if(this.selectedIds.length > 1){
          this.$modal.notifyWarning('只能勾选一条数据进行修改！')
          return
        }
        for (let i = 0; i < this.dataList.length; i++) {
           if(this.dataList[i].groupId==this.selectedIds[0]){
             this.searchContentList = JSON.parse(JSON.stringify(this.dataList[i].groupSearch))
             this.groupName = JSON.parse(JSON.stringify(this.dataList[i].groupName))
           }
        }
        this.editStatus = true
        this.selectType = ''
        this.formSearchIsshow = true
      },
      delAll(){
        if(this.selectedIds.length == 0){
          this.$modal.notifyWarning('请选择要删除的组合！')
          return
        }
        const data = {groupId:this.selectedIds,accessToken: sessionStorage.getItem('xn_token')}
        deleteGroupsearch(data).then(res => {
          if(res){
            // for (let i = 0; i < this.selectedIds.length; i++) {
            //   this.dataList.map((item,index)=>{
            //     if(item.groupId==this.selectedIds[i])
            //       this.dataList.splice(index,1)
            //   })
            // }
            this.$modal.notifySuccess(res.errMsg)
            this.formSearchIsshow = false
            this.selectedIds = []
            this.loadData()
          }
        })
      }
    }
  }
</script>
