<template>
  <div>
    <el-select style="width: 100%;" v-model="orgData" size="mini" @visible-change="clearKey"  @change="sendMsg()" multiple :filterable="filterable" :collapse-tags="collapse" class="my-select" :placeholder="placeholder"   >
            <div slot="empty">
              <div  class="select_up">
                <el-button type="text" @click="selectAll">  <i class="el-icon-circle-check" /> 全选</el-button>
                <el-button type="text" @click="removeTag"> <i class="el-icon-close" />  清空</el-button>
                <el-button type="text" @click="selectReverse">  <i class="el-icon-copy-document" /> 反选</el-button>
                <el-input  size="mini"  placeholder="关键字"  clearable :validate-event=false  v-model="keyWord"  style="display: inline-block;width: 120px;margin-left: 10px;"> </el-input>
              </div>
              <div style="height: 45px;background: #fff;text-align: center;line-height: 45px;color: #aaacaf;margin-top: 30px;min-width: 310px !important;">
                无匹配数据
              </div>
            </div>
            <div class="select_up">
              <el-button type="text" @click="selectAll"> <i class="el-icon-circle-check" />  全选</el-button>
              <el-button type="text"@click="removeTag">  <i class="el-icon-close" />  清空</el-button>
              <el-button type="text" @click="selectReverse">   <i class="el-icon-copy-document" />  反选</el-button>
              <el-input  size="mini"  placeholder="关键字查询" v-if="isfilte" clearable :validate-event=false  style="display: inline-block;width: 120px;margin-left: 10px;"   v-model="keyWord"> </el-input>
            </div>
            <div class="select_list">
              <el-option v-for="item in fillist" :key="item[bindId]" :label="item[bindName]" :value="item[bindId]"></el-option>
            </div>
    </el-select>

  </div>
</template>
<script>
  export default {
    props: {
      fiftervalue: {
        type: Array,
        required: []
      },
      bindId: {
        type: String,
        default: ''
      },
      bindName: {
        type: String,
        default: ''
      },
      fifteroptions: {
        type: Array,
        required: []
      },
      placeholder: {
        type: String,
        default: '请选择'
      },
      collapse: {
        type: Boolean,
        default: true
      },
      filterable: {
        type: Boolean,
        default: true
      },
      isfilte:{
        type: Boolean,
        default: false
      }
    },
    watch: {
      //监听value变化（slect控件不是必要，暂时不明）
      fiftervalue(newValue, oldValue) {
        this.orgData = newValue;
      },
      keyWord:{
        immediate:true,//在框的值还没变化时执行如下函数显示出所有的情况
        handler(val){
          this.fillist = this.fifteroptions.filter((item)=>{
            return item[this.bindName].indexOf(val) !==-1
          })
        }
      },
      fifteroptions() {
        this.fillist = JSON.parse(JSON.stringify(this.fifteroptions))
      }
    },
    data() {
      return {
        orgData: this.fiftervalue,//选中数据
        keyWord: '',
        fillist: JSON.parse(JSON.stringify(this.fifteroptions))
      }
    },
    methods: {
      //用户列表----start
      //清空操作
      removeTag() {
        this.orgData = []
        this.sendMsg()
      },
      //全选操作
      selectAll(val) {
        var _this=this
        this.fillist.map(item => {
          if(!this.orgData.includes(item[_this.bindId])){
            this.orgData.push(item[_this.bindId])
          }
        })
        this.sendMsg()
      },
      //反选操作
      selectReverse(val) {
        var _this=this
        val = []
        this.fillist.map(item => {
          let index = this.orgData.indexOf(item[_this.bindId]);
          //判断现有选中数据是否包含如果不包含则进行反选数据
          if (index != -1) {
          } else {
            val.push(item[_this.bindId])
          }
        })
        this.orgData = val
        this.sendMsg()
      },
      //用户列表----end
      sendMsg(){
        console.log(this.orgData,33333333)
        //input是默认双向绑定事件，select控件也可以用input给父组件传递数据
        this.$emit('input',this.orgData)
      },
      clearKey(){+6
        this.keyWord = ''
      }
    }
  }
</script>
<style scoped>
  .el-select-dropdown__list {
    height: 100%;
    overflow: hidden;
  }
  .select_up {
    padding: 0 14px;
    font-size: 14px;
    position: absolute;
    z-index: 99999;
    background-color: #ecebeb;
    top: 0px;
    width: 100%;
    border-radius: 5px 5px 0 0;
    min-width: 310px !important;
  }

  .select_up button{
    width: 15%;
    color: #606266;
  }
  .select_up button:hover{
    color: #409EFF;
  }

  .select_list {
    margin-top: 28px;
    min-width: 310px !important;
  }
</style>
<style>
  .my-select .el-select__tags {
    flex-wrap: nowrap !important;
    overflow: hidden !important;
  }
  .el-input__validateIcon{
    display: none
  }
</style>
