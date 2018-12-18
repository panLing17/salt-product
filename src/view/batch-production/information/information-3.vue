<template>
    <div class="information-2">
        <table class="table fs_20">
            <tr class="tr">
                <td class="td">类型</td>
                <td class="td">物料名称</td>
                <td class="td">企业名称</td>
                <td class="td">出厂批号</td>
                <td class="td">投入量</td>
                <td class="td">投料点</td>
                <td class="td">操作人</td>
                <td class="td">投料时间</td>
            </tr>
            <tr class="tr" v-for="(item, index) in data">
                <td class="td">{{item.masterType}}</td>
                <td class="td">{{item.mName}}</td>
                <td class="td">{{item.fName}}</td>
                <td class="td">{{item.batchNo}}</td>
                <td class="td">{{item.amount}}</td>
                <td class="td">{{item.place}}</td>
                <td class="td">{{item.feedUser}}</td>
                <td class="td">{{item.feedTime}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
  export default {
    name: 'information-3',
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
          url: this.$api + 'produce/production/pd/batch/feed/list',
          method: 'post',
          data: {
            reqParam: {
              batchPkId: this.currentDetail.pkId
            }
          }
        }).then(res => {
          if(res.data.retCode === 1) {
            res.data.retVal.forEach(item=>{
              item.masterType = this.$method.queryDictionary.call(this, 130, item.masterType)
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
