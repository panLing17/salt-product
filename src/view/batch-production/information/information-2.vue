<template>
    <div class="information-2">
        <table class="table fs_20">
            <tr class="tr">
                <td class="td">生产批号</td>
                <td class="td" colspan="3">{{currentDetail.batch}}</td>
            </tr>
            <tr class="tr">
                <td class="td">建单人</td>
                <td class="td">{{currentDetail.applicant}}</td>
                <td class="td">建单时间</td>
                <td class="td">{{currentDetail.applicantTime}}</td>
            </tr>
            <tr class="tr">
                <td class="td">计划产量</td>
                <td class="td">{{currentDetail.plans}}</td>
                <td class="td">实际产量</td>
                <td class="td">{{currentDetail.weight}}</td>
            </tr>
            <tr class="tr">
                <td class="td">审核人</td>
                <td class="td">{{currentDetail.auditor}}</td>
                <td class="td">审核时间</td>
                <td class="td">{{currentDetail.auditorTime}}</td>
            </tr>
            <tr class="tr">
                <td class="td">每托含量</td>
                <td class="td">{{currentDetail.tpRatio}}</td>
                <td class="td">状态</td>
                <td class="td">{{currentDetail.status}}</td>
            </tr>
            <tr class="tr">
                <td class="td">结批时间</td>
                <td class="td"></td>
                <td class="td">放行时间</td>
                <td class="td"></td>
            </tr>
        </table>
    </div>
</template>

<script>
  export default {
    name: 'information-2',
    props: {
      currentDetail: {
        type: Object
      }
    },
    created () {
      this.initData()
    },
    methods: {
      initData() {
        this.currentDetail.status = this.$method.queryDictionary.call(this, 950, this.currentDetail.status)
      }
    }
  }
</script>

<style scoped lang="stylus">
    .table
        .tr
            .td
                height 2.6em
</style>
