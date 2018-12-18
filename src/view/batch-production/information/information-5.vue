<template>
    <div class="information-1 clear-float">
        <div class="img">
            <img :src="data.report" @error="$method.imgError($event)" alt="">
        </div>
        <table class="table fs_20">
            <tr class="tr">
                <td class="td">检验单号</td>
                <td class="td" colspan="3">{{data.billCode}}</td>
            </tr>
            <tr class="tr">
                <td class="td">取样日期</td>
                <td class="td">{{data.sDate}}</td>
                <td class="td">取样人</td>
                <td class="td">{{data.sUser}}</td>
            </tr>
            <tr class="tr">
                <td class="td">收样日期</td>
                <td class="td">{{data.aDate}}</td>
                <td class="td">收样人</td>
                <td class="td">{{data.aUser}}</td>
            </tr>
            <tr class="tr">
                <td class="td">检验依据</td>
                <td class="td">{{data.tsBase}}</td>
                <td class="td">检验结果</td>
                <td class="td">{{data.tsResult}}</td>
            </tr>
            <tr class="tr">
                <td class="td">检测判定</td>
                <td class="td">{{data.tsJudge}}</td>
                <td class="td">检测人</td>
                <td class="td">{{data.inspector}}</td>
            </tr>
            <tr class="tr">
                <td class="td">批准人</td>
                <td class="td">{{data.approver}}</td>
                <td class="td">报告日期</td>
                <td class="td">{{data.reportDate}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
  export default {
    name: 'information-5',
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
          url: this.$api + 'produce/production/pd/batch/sampling/getByIdOrBatchPkId',
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
