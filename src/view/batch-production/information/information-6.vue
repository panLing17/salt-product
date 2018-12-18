<template>
    <div class="information-1 clear-float">
        <div class="img">
            <img :src="data.report" @error="$method.imgError($event)" alt="">
        </div>
        <table class="table fs_20">
            <tr class="tr">
                <td class="td">检验单号</td>
                <td class="td">{{data.billCode}}</td>
                <td class="td">报告日期</td>
                <td class="td">{{data.reportDate}}</td>
            </tr>
            <tr class="tr">
                <td class="td">检测依据</td>
                <td class="td">{{data.tsBase}}</td>
                <td class="td">检验方法</td>
                <td class="td">{{data.tsMethod}}</td>
            </tr>
            <tr class="tr">
                <td class="td">检验设备</td>
                <td class="td">{{data.tsEqm}}</td>
                <td class="td">检验结果</td>
                <td class="td">{{data.tsResult}}</td>
            </tr>
            <tr class="tr">
                <td class="td">监测判定</td>
                <td class="td">{{data.tsJudge}}</td>
                <td class="td">检验人</td>
                <td class="td">{{data.inspector}}</td>
            </tr>
            <tr class="tr">
                <td class="td">审核人</td>
                <td class="td">{{data.reviewer}}</td>
                <td class="td">批准人</td>
                <td class="td">{{data.approver}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
  export default {
    name: 'information-6',
    props: {
      currentDetail: {
        type: Object
      }
    },
    data() {
      return {
        data: {}
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData() {
        this.$http({
          url: this.$api + 'produce/production/pd/batch/inspect/getByIdOrBatchPkId',
          method: 'post',
          data: {
            reqParam: {
              batchPkId: this.currentDetail.pkId
            }
          }
        }).then(res => {
          if(res.data.retCode === 1) {
            this.data = res.data.retVal?res.data.retVal:{}
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
    .information-1
        .img
            float left
            width 24.6%
            height 0
            padding-bottom 24.6%
            position relative
            bakcground-color #E3E3E3
            font-size 0
            img
                position absolute
                width 100%
                height 100%
        .table
            float right
            width 75%
            .tr
                .td
                    height 3em
</style>
