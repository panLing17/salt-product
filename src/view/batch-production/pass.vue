<template>
    <transition name="fade">
        <div class="mask" v-if="maskShow">
            <div class="mask-scroll">
                <div class="mask-content-wrap fs_20">
                <div class="mask-title-wrap">
                    <div class="mask-title fs_22">
                        放行
                        <div class="close" @click="hide">
                            <i class="iconfont icon-guanbi"></i>
                        </div>
                    </div>
                </div>
                <div class="mask-content">
                    <div class="title">生产情况统计</div>
                    <table class="mask-table">
                        <tr>
                            <td class="center">车间产线完整名称</td>
                            <td class="center">负责人</td>
                            <td class="center">生产总重量</td>
                        </tr>
                        <tr v-for="(item, index) in data">
                            <td class="center">{{item.fullName}}</td>
                            <td class="center">{{item.lineChage}}</td>
                            <td class="center">{{item.weight}}{{item.unit}}</td>
                        </tr>
                    </table>
                    <div class="title">检验信息</div>
                    <table class="mask-table">
                        <tr>
                            <td>检验单号</td>
                            <td colspan="3">{{report.billCode}}</td>
                        </tr>
                        <tr>
                            <td>检测依据</td>
                            <td>{{report.tsBase}}</td>
                            <td>检验方法</td>
                            <td>{{report.tsMethod}}</td>
                        </tr>
                        <tr>
                            <td>检验设备</td>
                            <td>{{report.tsEqm}}</td>
                            <td>检验结果</td>
                            <td>{{report.tsResult}}</td>
                        </tr>
                        <tr>
                            <td>检测判定</td>
                            <td>{{report.tsJudge}}</td>
                            <td>检测人</td>
                            <td>{{report.inspector}}</td>
                        </tr>
                        <tr>
                            <td>审核人</td>
                            <td>{{report.reviewer}}</td>
                            <td>批准人</td>
                            <td>{{report.approver}}</td>
                        </tr>
                        <tr>
                            <td>报告日期</td>
                            <td colspan="3">{{report.reportDate}}</td>
                        </tr>
                    </table>
                </div>
                <div class="mask-btn-wrap fs_20">
                    <l-button buttonText="返回" style="margin-right: .5em" @button-click="hide"></l-button>
                    <l-button buttonText="放行" @button-click="right"></l-button>
                </div>
            </div>
            </div>
        </div>
    </transition>
</template>

<script>
  export default {
    name: 'pass',
    props: {
      detailData: {
        type: Object
      }
    },
    data() {
      return {
        maskShow: false,
        data: [],
        report: {}
      }
    },
    watch: {
      maskShow(newVal) {
        if(newVal) {
          this.getInfo()
          this.getReport()
        }
      }
    },
    methods: {
      show() {
        this.maskShow = true
      },
      hide() {
        this.maskShow = false
      },
      getInfo() {
        this.$http({
          url: this.$api + 'produce/production/pd/batch/task/list',
          method: 'post',
          data: {
            reqParam: {
              batchPkId: this.detailData.pkId
            }
          }
        }).then(res=>{
          if(res.data.retCode === 1){
            this.data = res.data.retVal
          }
        })
      },
      getReport() {
        this.$http({
          url: this.$api + 'produce/production/pd/batch/inspect/getByIdOrBatchPkId',
          method: 'post',
          data: {
            reqParam: {
              batchPkId: this.detailData.pkId
            }
          }
        }).then(res => {
          if(res.data.retCode === 1) {
            this.report = res.data.retVal?res.data.retVal:{}
          }
        })
      },
      right() {
        this.$http({
          url: this.$api + 'produce/production/pd/batch/finish',
          method: 'post',
          data: {
            reqParam: {
              pkId: this.detailData.pkId,
              status: 94015
            }
          }
        }).then(res => {
          if(res.data.retCode === 1) {
            this.$parent.getData()
            this.$message.success('放行成功')
            this.hide()
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
    .mask-content-wrap
        width 74.8%
        top 8%
        .mask-content
            overflow auto
            .title
                font-weight bold
                line-height 2em
                padding-top .5em
            .mask-table
                td
                    height 2em
                    &.center
                        text-align center
                        padding-left 0
        .mask-btn-wrap
            margin 0 auto
            padding 1em 0
</style>
