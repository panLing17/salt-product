<template>
    <div class="information-2">
        <table class="table fs_20">
            <tr class="tr">
                <td class="td">任务单号</td>
                <td class="td">车间单元产线名称</td>
                <td class="td">产线负责人</td>
                <td class="td">大箱完成量</td>
                <td class="td">小盒完成量</td>
                <td class="td">实际完成量</td>
                <td class="td">生产状态</td>
            </tr>
            <tr class="tr" v-for="(item, index) in data">
                <td class="td">{{item.taskCode}}</td>
                <td class="td">{{item.fullName}}</td>
                <td class="td">{{item.lineChage}}</td>
                <td class="td">{{item.boxCount}}</td>
                <td class="td">{{item.codeCount}}</td>
                <td class="td">{{item.weight}}</td>
                <td class="td">{{item.status}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
  export default {
    name: 'information-4',
    props: {
      currentDetail: {
        type: Object
      }
    },
    data() {
      return {
        data: []
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData() {
        this.$http({
          url: this.$api + 'produce/production/pd/batch/task/list',
          method: 'post',
          data: {
            reqParam: {
              batchPkId: this.currentDetail.pkId
            }
          }
        }).then(res => {
          if(res.data.retCode === 1) {
            res.data.retVal.forEach(item=>{
                item.status = this.$method.queryDictionary.call(this, 950, item.status)
            })
            this.data = res.data.retVal
          }
        })
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
