<template>
    <transition name="fade">
        <div class="mask" v-if="maskShow">
            <div class="mask-scroll">
                <div class="mask-content-wrap fs_20">
                <div class="mask-title-wrap">
                    <div class="mask-title fs_22">
                        结批
                        <div class="close" @click="hide">
                            <i class="iconfont icon-guanbi"></i>
                        </div>
                    </div>
                </div>
                <div class="mask-content">
                    <div class="title">批次报告</div>
                    <table class="mask-table">
                        <tr>
                            <td>生产企业</td>
                            <td>{{detailData.entName}}</td>
                            <td>产品名称</td>
                            <td>{{product.productName}}</td>
                        </tr>
                        <tr>
                            <td>品规</td>
                            <td>{{product.spec}}</td>
                            <td>实际产量</td>
                            <td>{{detailData.weight}}</td>
                        </tr>
                        <tr>
                            <td>产品批号</td>
                            <td>{{detailData.batch}}</td>
                            <td>生产日期</td>
                            <td>{{detailData.currentTime}}</td>
                        </tr>
                    </table>
                    <div class="title">生产情况统计</div>
                    <table class="mask-table">
                        <tr>
                            <td class="center">车间</td>
                            <td class="center">单元</td>
                            <td class="center">产线(负责人)</td>
                            <td class="center">班组</td>
                            <td class="center">数量(件)</td>
                            <td class="center">重量(吨)</td>
                            <td class="center" colspan="2">合计</td>
                        </tr>
                        <tr v-for="(item, index) in taks">
                            <td class="center" :rowspan="item.rowspan" v-if="item.rowspan">{{item.shopName}}</td>
                            <td class="center" :rowspan="item.rowspan" v-if="item.rowspan">{{item.unitName}}</td>
                            <td class="center" :rowspan="item.rowspan" v-if="item.rowspan">{{item.lineName}}({{item.lineChage}})</td>
                            <td class="center">{{item.groupName}}</td>
                            <td class="center">{{item.boxQty}}</td>
                            <td class="center">{{item.weight}}</td>
                            <td class="center" :rowspan="item.rowspan" v-if="item.rowspan">{{item.sum1}}(件)</td>
                            <td class="center" :rowspan="item.rowspan" v-if="item.rowspan">{{item.sum2}}(吨)</td>
                        </tr>
                    </table>
                    <div class="title">投料信息</div>
                    <table class="mask-table">
                        <tr>
                            <td class="center">物料名称</td>
                            <td class="center">类型</td>
                            <td class="center">规格</td>
                            <td class="center">净含量</td>
                            <td class="center">生产企业</td>
                            <td class="center">出厂批次号</td>
                            <td class="center">数量</td>
                        </tr>
                        <tr v-for="(item, index) in feeds">
                            <td>{{item.mName}}</td>
                            <td>{{item.masterType}}</td>
                            <td>{{item.spec}}</td>
                            <td>{{item.cxt}}</td>
                            <td>{{item.fName}}</td>
                            <td>{{item.batchNo}}</td>
                            <td>{{item.amount}}</td>
                        </tr>
                    </table>
                    <div class="title">抽检信息</div>
                    <table class="mask-table">
                        <tr>
                            <td>检验单号</td>
                            <td colspan="3">{{random.billCode}}</td>
                        </tr>
                        <tr>
                            <td>取样日期</td>
                            <td>{{random.sDate}}</td>
                            <td>取样人</td>
                            <td>{{random.sUser}}</td>
                        </tr>
                        <tr>
                            <td>收样日期</td>
                            <td>{{random.aDate}}</td>
                            <td>收样人</td>
                            <td>{{random.aUser}}</td>
                        </tr>
                        <tr>
                            <td>检验依据</td>
                            <td>{{random.tsBase}}</td>
                            <td>检验结果</td>
                            <td>{{random.tsResult}}</td>
                        </tr>
                        <tr>
                            <td>检测判定</td>
                            <td>{{random.tsJudge}}</td>
                            <td>检测人</td>
                            <td>{{random.inspector}}</td>
                        </tr>
                        <tr>
                            <td>批准人</td>
                            <td>{{random.approver}}</td>
                            <td>报告日期</td>
                            <td>{{random.reportDate}}</td>
                        </tr>
                    </table>
                </div>
                <div class="mask-btn-wrap fs_20">
                    <l-button buttonText="返回" style="margin-right: .5em" @button-click="hide"></l-button>
                    <l-button v-show="status===0" buttonText="结批" @button-click="right"></l-button>
                </div>
            </div>
            </div>
        </div>
    </transition>
</template>

<script>
  export default {
    name: 'knot-batch',
    props: {
      detailData: {
        type: Object
      },
      status: {
        type: Number
      }
    },
    data() {
      return {
        maskShow: false,
        product: {},
        taks: [],
        feeds: [],
        random: {}
      }
    },
    watch: {
      maskShow(newVal) {
        if(newVal) {
          let t = new Date()
          this.detailData.currentTime = t.getFullYear()+'-'+(t.getMonth()+1)+'-'+t.getDate()
          this.getData()
        }
      }
    },
    methods: {
      show() {
        this.maskShow = true
      },
      hide() {
        Object.assign(this.$data, this.$options.data())
        this.maskShow = false
      },
      getData() {
        this.getProduct()
        this.getTaks()
        this.getFeeds()
        this.getRondom()
      },
      getProduct() {
        this.$http({
          url: this.$api + 'produce/resources/rs/product/getById',
          method: 'post',
          data: {
            reqParam: {
              productCode: this.detailData.productCode
            }
          }
        }).then(res=>{
          if(res.data.retCode === 1){
            this.product = res.data.retVal
          }
        })
      },
      getTaks() {
        this.$http({
          url: this.$api + 'produce/production/pd/code/relations/pallet/getPalletInFo',
          method: 'post',
          data: {
            reqParam: {
              pkId: this.detailData.pkId
            }
          }
        }).then(res=>{
          if(res.data.retCode === 1){
            let s = new Set()
            let j = {}
            res.data.retVal.forEach(item=>{
              s.add(item.fid)
            })
            for(let i of s) {
              j[i] = []
              res.data.retVal.forEach(item=>{
                if(item.fid===i) {
                  j[i].push(item)
                }
              })
            }
              for(let i in j) {
                let sum1 = 0
                let sum2 = 0
                j[i].forEach((item,index)=>{
                  if(index===0) {
                    item.rowspan =  j[i].length
                  }
                  sum1+=item.boxQty
                  sum2+=item.weight
                })
                j[i].forEach(item=>{
                  item.sum1 = sum1
                  item.sum2 = sum2
                })
              }
              let arr = []
            for(let i in j) {
              j[i].forEach(item=>{
                arr.push(item)
              })
            }
            this.taks = arr
          }
        })
      },
      getFeeds() {
        this.$http({
          url: this.$api + 'produce/production/pd/batch/feed/list',
          method: 'post',
          data: {
            reqParam: {
              batchPkId: this.detailData.pkId
            }
          }
        }).then(res=>{
          if(res.data.retCode === 1){
            res.data.retVal.forEach(a=>{
                a.masterType = this.$method.queryDictionary.call(this, 130, a.masterType)
            })
            this.feeds = res.data.retVal
          }
        })
      },
      getRondom() {
        this.$http({
          url: this.$api + 'produce/production/pd/batch/sampling/getByIdOrBatchPkId',
          method: 'post',
          data: {
            reqParam: {
              batchPkId: this.detailData.pkId
            }
          }
        }).then(res=>{
          if(res.data.retCode === 1){
            if(res.data.retVal) {
              this.random = res.data.retVal
            }
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
              status: 94014
            }
          }
        }).then(res=>{
          if(res.data.retCode === 1){
            this.$parent.getData()
            this.$message.success('结批成功')
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
