<template>
    <div class="step3 fs_20">
        <table class="table">
            <tr class="tr">
                <td class="td">产品名称</td>
                <td class="td">{{batchInfo.productName}}</td>
                <td class="td">生产批号</td>
                <td class="td">{{batchInfo.batch}}</td>
                <td class="td">计划产量</td>
                <td class="td">{{batchInfo.plans}}{{batchInfo.unit}}</td>
                <td class="td">每托含量</td>
                <td class="td">{{batchInfo.tpRatio}}{{batchInfo.unit}}</td>
            </tr>
        </table>
        <div class="title fs_22">
            生产任务列表
            <div class="table-button-single fs_18" @click="addShowFn">
                <i class="iconfont icon-xinz fs_16"></i>
                <span>新增生产任务</span>
            </div>
        </div>
        <div class="table-wrap">
            <table class="table-header">
                <colgroup width="7%"></colgroup>
                <colgroup width="20%"></colgroup>
                <colgroup width="25%"></colgroup>
                <colgroup width="10%"></colgroup>
                <colgroup width="10%"></colgroup>
                <colgroup width="10%"></colgroup>
                <colgroup width="8%"></colgroup>
                <colgroup width="10%"></colgroup>
                <tr class="tr">
                    <th class="th" @click="allChangeFn">
                        <i class="iconfont"
                           :class="{'icon-dianxuan-1': !allChange, 'icon-dianxuan-': allChange}"
                           :style="{color: allChange?'#5F7FD9':'#707070'}"
                        ></i>
                    </th>
                    <th class="th">任务单号</th>
                    <th class="th">车间产线名称</th>
                    <th class="th">产线负责人</th>
                    <th class="th">小盒完成量</th>
                    <th class="th">大箱完成量</th>
                    <th class="th">实际产量</th>
                    <th class="th">状态</th>
                </tr>
            </table>
            <table class="table">
                <colgroup width="7%"></colgroup>
                <colgroup width="20%"></colgroup>
                <colgroup width="25%"></colgroup>
                <colgroup width="10%"></colgroup>
                <colgroup width="10%"></colgroup>
                <colgroup width="10%"></colgroup>
                <colgroup width="8%"></colgroup>
                <colgroup width="10%"></colgroup>
                <tr class="tr" v-for="(item, index) in data" :key="index">
                    <td class="td btn-wrap center" @click="itemChange(index)">
                        <i class="iconfont"
                           :class="{'icon-dianxuan-1': !item.selected, 'icon-dianxuan-': item.selected}"
                           :style="{color: item.selected?'#5F7FD9':'#707070'}"
                        ></i>
                    </td>
                    <td class="td">{{item.taskCode}}</td>
                    <td class="td">{{item.fullName}}</td>
                    <td class="td">{{item.lineChage}}</td>
                    <td class="td">{{item.codeCount}}</td>
                    <td class="td">{{item.boxCount}}</td>
                    <td class="td">{{item.weight}}</td>
                    <td class="td">{{item.status}}</td>
                </tr>
            </table>
        </div>
        <div class="btn-wrap clear-float">
            <div class="table-button-single" style="margin-left: .5em" @click="right">确定</div>
            <div class="table-button-single" @click="$router.go(-1)">上一步</div>
            <div class="table-button-single" style="margin-right: .5em" @click="del">批量删除</div>
        </div>
        <add ref="add"></add>
    </div>
</template>

<script>
  import Add from './step3-add'
  export default {
    name: 'step2',
    data() {
      return {
        allChange: false,
        batchInfo: {},
        data: []
      }
    },
    created() {
      this.batchInfo = JSON.parse(sessionStorage.getItem('currentDetail'))
      this.getData()
    },
    methods: {
      getData() {
        this.$http({
          url: this.$api + 'produce/production/pd/batch/task/list',
          method: 'post',
          data: {
            reqParam: {
              batchPkId: this.batchInfo.pkId
            }
          }
        }).then(res=>{
          if(res.data.retCode === 1) {
            res.data.retVal.forEach(item => {
              item.selected = false
              item.status = this.$method.queryDictionary.call(this, 950, item.status)
            })
            this.data = res.data.retVal
            if(this.data.length===0) {
              this.allChange = false
            }
          }
        })
      },
      allChangeFn() {
        this.allChange = !this.allChange
        this.data.forEach(item=>{
          item.selected = this.allChange
        })
      },
      itemChange(index) {
        let count = 0
        this.data.forEach((item, i) => {
          if(index === i) {
            item.selected = !item.selected
          }
          if(item.selected) {
            count++
          }
        })
        if(count === this.data.length) {
          this.allChange = true
        } else {
          this.allChange = false
        }
      },
      addShowFn() {
        this.$refs.add.show()
      },
      del () {
        let params = []
        this.data.forEach(item=>{
          if(item.selected) {
            params.push({
              taskCode: item.taskCode
            })
          }
        })
        if(params.length===0) {
          return
        }
        this.$confirm('确认删除这条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'post',
            url: this.$api + 'produce/production/pd/batch/task/delete',
            data: {
              reqParam: params
            }
          }).then((res) => {
              if (res.data.retCode === 1) {
                this.getData()
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                  }
                )
              }
            }
          )
        }).catch(() => {})
      },
      right() {
        sessionStorage.removeItem('currentDetail')
        this.$router.replace('/batchProduction')
      }
    },
    components: {
      Add
    }
  }
</script>

<style scoped lang="stylus">
    .step3
        width 100%
        height 100%
        .title
            font-weight bold
            color #414141
            position relative
            margin-top 1.5em
            .btn
                position absolute
                right 0
        .table-wrap
            margin-top 1em
            max-height 15em
            overflow auto
        .btn-wrap
            position relative
            margin-top 1em
            height 30px
            .table-button-single
                position relative
                float right
</style>
