<template>
    <div class="step2 fs_20">
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
            投料列表
            <div class="table-button-single fs_18" @click="addShowFn">
                <i class="iconfont icon-xinz fs_16"></i>
                <span>新增投料</span>
            </div>
        </div>
        <div class="table-wrap">
            <table class="table-header">
                <colgroup width="8%"></colgroup>
                <colgroup width="8%"></colgroup>
                <colgroup width="8%"></colgroup>
                <colgroup width="24%"></colgroup>
                <colgroup width="10%"></colgroup>
                <colgroup width="10%"></colgroup>
                <colgroup width="8%"></colgroup>
                <colgroup width="8%"></colgroup>
                <colgroup width="16%"></colgroup>
                <tr class="tr">
                    <th class="th" @click="allChangeFn">
                        <i class="iconfont"
                           :class="{'icon-dianxuan-1': !allChange, 'icon-dianxuan-': allChange}"
                           :style="{color: allChange?'#5F7FD9':'#707070'}"
                        ></i>
                    </th>
                    <th class="th">物料类型</th>
                    <th class="th">物料名称</th>
                    <th class="th">企业名称</th>
                    <th class="th">出厂批号</th>
                    <th class="th">投入量</th>
                    <th class="th">投料点</th>
                    <th class="th">操作人</th>
                    <th class="th">投料时间</th>
                </tr>
            </table>
            <table class="table">
                <colgroup width="8%"></colgroup>
                <colgroup width="8%"></colgroup>
                <colgroup width="8%"></colgroup>
                <colgroup width="24%"></colgroup>
                <colgroup width="10%"></colgroup>
                <colgroup width="10%"></colgroup>
                <colgroup width="8%"></colgroup>
                <colgroup width="8%"></colgroup>
                <colgroup width="16%"></colgroup>
                <tr class="tr" v-for="(item, index) in feedList" :key="index">
                    <td class="td btn-wrap center" @click="itemChange(index)">
                        <i class="iconfont"
                           :class="{'icon-dianxuan-1': !item.selected, 'icon-dianxuan-': item.selected}"
                           :style="{color: item.selected?'#5F7FD9':'#707070'}"
                        ></i>
                    </td>
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
        <div class="btn-wrap clear-float">
            <div class="table-button-single" @click="$router.push('/modifyBatch/step3')"  style="margin-left: .5em">下一步</div>
            <div class="table-button-single" v-show="batchInfo.status===94012" style="margin-left: .5em" @click="$router.push('/batchProduction')">确定</div>
            <div class="table-button-single" v-show="batchInfo.status===94011" @click="$router.go(-1)">上一步</div>
            <div class="table-button-single" style="margin-right: .5em" @click="del">批量删除</div>
        </div>
        <detail ref="detail"></detail>
        <add ref="add"></add>
    </div>
</template>

<script>
  import Detail from './step2-detail'
  import Add from './step2-add'
  export default {
    name: 'step2',
    data() {
      return {
        batchInfo: {},
        feedList: [],
        allChange: false
      }
    },
    created() {
      this.batchInfo = JSON.parse(sessionStorage.getItem('currentDetail'))
      this.getFeedList()
      this.getProduct()
    },
    methods: {
      getFeedList() {
        this.$http({
          url: this.$api + 'produce/production/pd/batch/feed/list',
          method: 'post',
          data: {
            reqParam: {
              batchPkId: this.batchInfo.pkId
            }
          }
        }).then(res => {
          if(res.data.retCode === 1) {
            res.data.retVal.forEach(item => {
              item.selected = false
              item.masterType = this.$method.queryDictionary.call(this, 130, item.masterType)
            })
            this.feedList = res.data.retVal
            if(this.feedList.length===0) {
              this.allChange = false
            }
          }
        })
      },
      getProduct() {
        this.$http({
          url: this.$api + 'produce/resources/rs/product/getById',
          method: 'post',
          data: {
            reqParam: {
              productCode: this.batchInfo.productCode
            }
          }
        }).then(res => {
          if(res.data.retCode === 1) {
            this.batchInfo.productName = res.data.retVal.productName
            sessionStorage.setItem('currentDetail', JSON.stringify(this.batchInfo))
            this.$forceUpdate()
          }
        })
      },
      allChangeFn() {
        this.allChange = !this.allChange
        this.feedList.forEach(item=>{
          item.selected = this.allChange
        })
      },
      itemChange(index) {
        let count = 0
        this.feedList.forEach((item, i) => {
          if(index === i) {
            item.selected = !item.selected
          }
          if(item.selected) {
            count++
          }
        })
        if(count === this.feedList.length) {
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
        this.feedList.forEach(item=>{
          if(item.selected) {
            params.push({
              pkId: item.pkId
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
            url: this.$api + 'produce/production/pd/batch/feed/delete',
            data: {
              reqParam: params
            }
          }).then((res) => {
              if (res.data.retCode === 1) {
                this.getFeedList()
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                  }
                )
              }
            }
          )
        }).catch(() => {})
      }
    },
    components: {
      Detail,
      Add
    }
  }
</script>

<style scoped lang="stylus">
    .step2
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
