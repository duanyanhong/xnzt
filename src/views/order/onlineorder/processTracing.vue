<template>
  <div>
    <div class="custom_steps" v-for="(item, index) in allSteps" :key="index">
      <div class="mid_steps">
        <el-steps align-center space="12.5rem">
          <el-step v-for="(d, i) in item.topSteps" icon="el-icon-success" :key="i" :description="d.description" :title="d.title"  :status="d.state==1 ? 'finish' : ''">
          </el-step>
        </el-steps>
        <el-steps align-center style="justify-content: flex-end;" space="12.5rem">
          <el-step v-for="(d, i) in item.bottomSteps" icon="el-icon-success" :key="i" :description="d.description" :title="d.title"  :status="d.state==1 ? 'finish' : ''">
          </el-step>
        </el-steps>
<!--        <el-steps align-center finish-status="success">-->
<!--          <el-step-->
<!--            v-for="(d, i) in item.topSteps"-->
<!--            icon="el-icon-success"-->
<!--            :key="i"-->
<!--            :status="d.state==1 ? 'finish' : ''"-->
<!--          >-->
<!--            <div class="step_title" slot="title" :title="d.title">{{ d.title }}{{d.state}}</div>-->
<!--            <div class="step_description" slot="description">{{ d.description }}</div>-->
<!--          </el-step>-->
<!--        </el-steps>-->
<!--        <el-steps-->
<!--          align-center-->
<!--          space="9.375rem"-->
<!--          style="justify-content: flex-end;"-->
<!--          finish-status="success"-->
<!--        >-->
<!--          <el-step-->
<!--            v-for="(d, i) in item.bottomSteps"-->
<!--            icon="el-icon-success"-->
<!--            :title="d.title"-->
<!--            :description="d.description"-->
<!--            :key="i"-->
<!--            :status="d.state == 1 ? 'finish' : ''"-->
<!--          >-->
<!--            <div class="step_title" slot="title" :title="d.title">{{ d.title }}</div>-->
<!--            <div class="step_description" slot="description">{{ d.description }}</div>-->
<!--          </el-step>-->
<!--        </el-steps>-->
      </div>
      <div class="left_steps">
        <div
          class="circle"
          v-if="index > 0"
        ></div>
      </div>
      <div class="right_steps">
        <div
          :class="[item.bottomSteps[item.bottomSteps.length - 1].state == 1 ? 'finish' : '']"
          class="circle"
          v-if="item.bottomSteps.length > 0"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      stepsData: {
        type: Array
      }
    },
    data() {
      return {
        allSteps: [],
      };
    },
    watch:{
      detailInfo:{
        handler(){
          this._initStepsData()
        }
      }
    },
    mounted(){
      this._initStepsData()
    },
    methods: {
      // 初始化数据
      _initStepsData() {
        const stepsData = this.stepsData;
        this.allSteps = [];
        if (stepsData && stepsData.length > 0) {
          let num = Math.ceil(stepsData.length / 12);
          let flagNum = 0;
          for (let index = 0; index < num; index++) {
            flagNum = index * 12;
            this.allSteps.push({
              topSteps: stepsData.slice(index * 12, index * 12 + 6),
              bottomSteps: stepsData.slice(flagNum + 6, flagNum + 12).reverse(),
            });
          }
        }
      },
    },
  };
</script>

<style scoped>
  .custom_steps {
    position: relative;
    display: flex;
    justify-content: center;
  }
  .custom_steps .step_title {
    width: 9.375rem;
    height: 0.8333rem;
    font-size: 0.8333rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .custom_steps .step_description {
    height: 40px;
    font-size: 12px;
  }
  .custom_steps .mid_steps {
    width: calc(100% - 160px);
    position: relative;
    z-index: 2;
  }
  .custom_steps .left_steps {
    position: absolute;
    top: -4.9rem;
    left: 3.5625rem;
    width: 6.7708rem;
    margin-right: -2.6042rem;
    z-index: 1;
  }
  .custom_steps .left_steps .circle {
    width: 6.7708rem;
    height: 6.5375rem;
    border: 3px solid #c0c4cc;
    border-radius: 30% 0 0 30%;
    border-right: none;
  }
  .custom_steps .left_steps .circle.finish {
    border-color: #67c23a;
  }
  .custom_steps .right_steps {
    position: absolute;
    top: 1.3458rem;
    right: 1.1625rem;
    width: 9rem;
    /*margin-left: -2.6042rem;*/
    z-index: 1;
  }
  .custom_steps .right_steps .circle {
    width: 6.7708rem;
    height: 6.5375rem;
    border: 3px solid #c0c4cc;
    border-radius: 0 30% 30% 0;
    border-left: none;
  }
  .custom_steps .right_steps .circle.finish {
    border-color: #67c23a;
  }
  .custom_steps /deep/ .el-step__icon-inner {
    font-size: 1.875rem;
  }
  .custom_steps /deep/ .el-step__line {
    background: transparent;
    border-top: 3px solid;
  }
  .custom_steps /deep/ .el-step__line .el-step__line-inner {
    border-width: 0 !important;
  }
  .custom_steps .el-steps {
    height: 6.25rem;
  }
  .custom_steps /deep/ .el-step {
    position: relative;
    margin: 10px 0;
  }
  .custom_steps /deep/ .el-step .el-step__head.is-process {
    color: #c0c4cc;
    border-color: #c0c4cc;
  }
</style>
<style>
  .custom_steps .el-step__head.is-finish{
    color: #67c23a !important;
  }
  .custom_steps .el-step__title.is-finish{
    color: #767575;
  }
  .custom_steps .el-step__description.is-finish{
    color: #949597;
  }
  .custom_steps .el-step__title{
    line-height: 25px;
  }
</style>
