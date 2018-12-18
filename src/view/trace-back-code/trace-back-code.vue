<template>
    <div class="trace-back-code">
        <div class="top-card white-bg">
            <div class="top-title view-title">查询</div>
            <div class="search-wrap fs_20">
                <label class="label-1">追溯码</label>
                <input type="text" v-model="search.reqParam.traceCode">
                <l-button :style="{'margin': '0 1em 0 2.5em'}" buttonText="查询" @button-click="getInfo" iconName="iconfont icon-chaxx"></l-button>
                <l-button buttonText="清空" iconName="iconfont icon-qingk" @button-click="clear"></l-button>
            </div>
        </div>
        <div class="bottom-card white-bg fs_20">
            <div class="view-title">码追溯信息</div>
            <div class="tab-wrap fs_20">
                <div class="tab-item" :class="{active: tabItemActive===0}" @click="tabItemActive=0">
                    <span>产品信息</span>
                </div>
                <div class="tab-item" :class="{active: tabItemActive===1}" @click="tabItemActive=1">
                    <span>生产批次信息</span>
                </div>
                <div class="tab-item" :class="{active: tabItemActive===2}" @click="tabItemActive=2">
                    <span>批次投料信息</span>
                </div>
                <div class="tab-item" :class="{active: tabItemActive===3}" @click="tabItemActive=3">
                    <span>批次生产任务信息</span>
                </div>
                <div class="tab-item" :class="{active: tabItemActive===4}" @click="tabItemActive=4">
                    <span>抽检信息</span>
                </div>
                <div class="tab-item" :class="{active: tabItemActive===5}" @click="tabItemActive=5">
                    <span>检验信息</span>
                </div>
                <div class="tab-item" :class="{active: tabItemActive===6}" @click="tabItemActive=6">
                    <span>出入库信息</span>
                </div>
            </div>
            <div class="tab-content clear-float" v-show="tabItemActive===0">
                <div class="img">
                    <img :src="product.imgs[0]?product.imgs[0].img:''" @error="$method.imgError($event)" alt="">
                </div>
                <table class="table right">
                    <tr class="tr">
                        <td class="td">产品编码</td>
                        <td class="td">{{product.productCode}}</td>
                        <td class="td">生产批号</td>
                        <td class="td">{{data[itemActive]?data[itemActive].batch:''}}</td>
                    </tr>
                    <tr class="tr">
                        <td class="td">产品名称</td>
                        <td class="td">{{product.productName}}</td>
                        <td class="td">规格</td>
                        <td class="td">{{product.spec}}</td>
                    </tr>
                    <tr class="tr">
                        <td class="td">碘盐标志</td>
                        <td class="td">{{product.iodate}}</td>
                        <td class="td">产品种类</td>
                        <td class="td">{{product.productCategory}}</td>
                    </tr>
                    <tr class="tr">
                        <td class="td">包装方式</td>
                        <td class="td">{{product.packMethod}}</td>
                        <td class="td">每箱含量</td>
                        <td class="td">{{product.boxRatio}}</td>
                    </tr>
                    <tr class="tr">
                        <td class="td">计划产量</td>
                        <td class="td">{{data[itemActive]?data[itemActive].plans:''}}</td>
                        <td class="td">实际产量</td>
                        <td class="td">{{data[itemActive]?data[itemActive].weight:''}}</td>
                    </tr>
                    <tr class="tr">
                        <td class="td">保质期</td>
                        <td class="td">{{product.expiryDate}}个月</td>
                        <td class="td"></td>
                        <td class="td"></td>
                    </tr>
                </table>
            </div>
            <div class="tab-content" v-show="tabItemActive===1">
                <table class="table">
                    <tr class="tr">
                        <td class="td">生产批号</td>
                        <td class="td" colspan="3">{{batch.batch}}</td>
                    </tr>
                    <tr class="tr">
                        <td class="td">建单人</td>
                        <td class="td">{{batch.applicant}}</td>
                        <td class="td">建单时间</td>
                        <td class="td">{{batch.applicantTime}}</td>
                    </tr>
                    <tr class="tr">
                        <td class="td">计划产量</td>
                        <td class="td">{{batch.plans}}</td>
                        <td class="td">实际产量</td>
                        <td class="td">{{batch.weight}}</td>
                    </tr>
                    <tr class="tr">
                        <td class="td">审核人</td>
                        <td class="td">{{batch.auditor}}</td>
                        <td class="td">审核时间</td>
                        <td class="td">{{batch.auditorTime}}</td>
                    </tr>
                    <tr class="tr">
                        <td class="td">每托含量</td>
                        <td class="td">{{batch.tpRatio}}</td>
                        <td class="td">状态</td>
                        <td class="td">{{batch.status}}</td>
                    </tr>
                    <tr class="tr">
                        <td class="td">结批时间</td>
                        <td class="td"></td>
                        <td class="td">放行时间</td>
                        <td class="td"></td>
                    </tr>
                </table>
            </div>
            <div class="tab-content" v-show="tabItemActive===2">
                <table class="table">
                    <tr class="tr">
                        <td class="td center">类型</td>
                        <td class="td center">物料名称</td>
                        <td class="td center">企业名称</td>
                        <td class="td center">出厂批号</td>
                        <td class="td center">投入量</td>
                        <td class="td center">投料点</td>
                        <td class="td center">操作人</td>
                        <td class="td center">投料时间</td>
                    </tr>
                    <tr class="tr" v-for="item in feeds">
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
            <div class="tab-content" v-show="tabItemActive===3">
                <table class="table">
                    <tr class="tr">
                        <td class="td center">任务单号</td>
                        <td class="td center">车间单元产线名称</td>
                        <td class="td center">产线负责人</td>
                        <td class="td center">大箱完成量</td>
                        <td class="td center">小盒完成量</td>
                        <td class="td center">实际完成量</td>
                        <td class="td center">生产状态</td>
                    </tr>
                    <tr class="tr">
                        <td class="td">{{tasks.taskCode}}</td>
                        <td class="td">{{tasks.fullName}}</td>
                        <td class="td">{{tasks.lineChage}}</td>
                        <td class="td">{{tasks.codeCount}}</td>
                        <td class="td">{{tasks.boxCount}}</td>
                        <td class="td">{{tasks.weight}}</td>
                        <td class="td">{{tasks.status}}</td>
                    </tr>
                </table>
            </div>
            <div class="tab-content clear-float" v-show="tabItemActive===4">
                <div class="img">
                    <img :src="random.report" @error="$method.imgError($event)" alt="">
                </div>
                <table class="table right">
                    <tr class="tr">
                        <td class="td">检验单号</td>
                        <td class="td" colspan="3">{{random.billCode}}</td>
                    </tr>
                    <tr class="tr">
                        <td class="td">取样日期</td>
                        <td class="td">{{random.sDate}}</td>
                        <td class="td">取样人</td>
                        <td class="td">{{random.sUser}}</td>
                    </tr>
                    <tr class="tr">
                        <td class="td">收样日期</td>
                        <td class="td">{{random.aDate}}</td>
                        <td class="td">收样人</td>
                        <td class="td">{{random.aUser}}</td>
                    </tr>
                    <tr class="tr">
                        <td class="td">检验依据</td>
                        <td class="td">{{random.tsBase}}</td>
                        <td class="td">检验结果</td>
                        <td class="td">{{random.tsResult}}</td>
                    </tr>
                    <tr class="tr">
                        <td class="td">检测判定</td>
                        <td class="td">{{random.tsJudge}}</td>
                        <td class="td">检测人</td>
                        <td class="td">{{random.inspector}}</td>
                    </tr>
                    <tr class="tr">
                        <td class="td">批准人</td>
                        <td class="td">{{random.approver}}</td>
                        <td class="td">报告日期</td>
                        <td class="td">{{random.reportDate}}</td>
                    </tr>
                </table>
            </div>
            <div class="tab-content clear-float" v-show="tabItemActive===5">
                <div class="img">
                    <img :src="check.report" @error="$method.imgError($event)" alt="">
                </div>
                <table class="table right">
                    <tr class="tr">
                        <td class="td">检验单号</td>
                        <td class="td">{{check.billCode}}</td>
                        <td class="td">报告日期</td>
                        <td class="td">{{check.reportDate}}</td>
                    </tr>
                    <tr class="tr">
                        <td class="td">检测依据</td>
                        <td class="td">{{check.tsBase}}</td>
                        <td class="td">检验方法</td>
                        <td class="td">{{check.tsMethod}}</td>
                    </tr>
                    <tr class="tr">
                        <td class="td">检验设备</td>
                        <td class="td">{{check.tsEqm}}</td>
                        <td class="td">检验结果</td>
                        <td class="td">{{check.tsResult}}</td>
                    </tr>
                    <tr class="tr">
                        <td class="td">监测判定</td>
                        <td class="td">{{check.tsJudge}}</td>
                        <td class="td">检验人</td>
                        <td class="td">{{check.inspector}}</td>
                    </tr>
                    <tr class="tr">
                        <td class="td">审核人</td>
                        <td class="td">{{check.reviewer}}</td>
                        <td class="td">批准人</td>
                        <td class="td">{{check.approver}}</td>
                    </tr>
                </table>
            </div>
            <div class="tab-content" v-show="tabItemActive===6">
                <div style="height: 80%;overflow: auto">
                    <table class="table">
                        <tr class="tr">
                            <td class="td center">单据时间</td>
                            <td class="td center">客户</td>
                            <td class="td center">大箱数量</td>
                            <td class="td center">小盒数量</td>
                            <td class="td center">总重量</td>
                            <td class="td center">类型</td>
                        </tr>
                        <tr class="tr" v-for="item in data.dataList">
                            <td class="td">{{item.storageDay}}</td>
                            <td class="td">{{item.toName}}</td>
                            <td class="td">{{item.boxCount}}</td>
                            <td class="td">{{item.barCount}}</td>
                            <td class="td">{{item.weight}}</td>
                            <td class="td">{{item.billType}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'trace-back-code',
    data() {
      return {
        tabItemActive: 0,
        search: {
          reqParam: {
            traceCode: ''
          }
        },
        data: {},
        itemActive: -1,
        product: {
          imgs:[]
        },
        batch: {},
        feeds: [],
        tasks: {},
        random: {},
        check: {},
        searchList: [],
        params:{
          reqParam: {
            traceCode: ''
          }
        }
      }
    },
    methods: {
      clear() {
        this.search.reqParam.traceCode = ''
      },
      getInfo() {
        if(this.search.reqParam.traceCode.trim().length===0) {
          this.$message.warning('请输入追溯码')
          return
        }
        this.getProduct()
        this.getBatch()
        this.getFeeds()
        this.getTasks()
        this.getRandom()
        this.getCheck()
        this.getData()
      },
      getProduct() {
        this.$http({
          url: this.$api + 'produce/production/trace/code/product',
          method: 'post',
          data: this.search
        }).then(res => {
          if(res.data.retCode === 1) {
            res.data.retVal.iodate = this.$method.queryDictionary.call(this, 100, res.data.retVal.iodate)
            this.product = res.data.retVal
          }
        })
      },
      getBatch() {
        this.$http({
          url: this.$api + 'produce/production/trace/code/batch',
          method: 'post',
          data: this.search
        }).then(res => {
          if(res.data.retCode === 1) {
            res.data.retVal.status = this.$method.queryDictionary.call(this, 950, res.data.retVal.status)
            this.batch = res.data.retVal
          }
        })
      },
      getFeeds() {
        this.$http({
          url: this.$api + 'produce/production/trace/code/feed',
          method: 'post',
          data: this.search
        }).then(res => {
          if(res.data.retCode === 1) {
            res.data.retVal.forEach(item=>{
              item.masterType = this.$method.queryDictionary.call(this, 930, item.masterType)
            })
            this.feeds = res.data.retVal
          }
        })
      },
      getTasks() {
        this.$http({
          url: this.$api + 'produce/production/trace/code/task',
          method: 'post',
          data: this.search
        }).then(res => {
          if(res.data.retCode === 1) {
            res.data.retVal.status = this.$method.queryDictionary.call(this, 950, res.data.retVal.status)
            this.tasks = res.data.retVal
          }
        })
      },
      getRandom() {
        this.$http({
          url: this.$api + 'produce/production/trace/code/sampling',
          method: 'post',
          data: this.search
        }).then(res => {
          if(res.data.retCode === 1) {
            this.random = res.data.retVal?res.data.retVal:{}
          }
        })
      },
      getCheck() {
        this.$http({
          url: this.$api + 'produce/production/trace/code/inspect',
          method: 'post',
          data: this.search
        }).then(res => {
          if(res.data.retCode === 1) {
            this.check = res.data.retVal?res.data.retVal:{}
          }
        })
      },
      getData() {
        this.params.reqParam.traceCode = this.search.reqParam.traceCode
        this.$http({
          url: this.$api + 'produce/production/trace/code/sale',
          method: 'post',
          data: this.params
        }).then(res => {
          if(res.data.retCode === 1) {
            res.data.retVal.dataList.forEach(item=>{
              item.billType = this.$method.queryDictionary.call(this, 960, item.billType)
            })
            this.data = res.data.retVal
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
    .trace-back-code
        width 100%
        height 100%
        .search-wrap
            .label-1
                margin 0 0.5em 0 2.85em
            input
                width 20%
        .tab-wrap
            color #414141
            width 94.38%
            margin 0 auto
            .tab-item
                display inline-block
                line-height 3.9em
                padding 0 1.5em
                position relative
                cursor pointer
                &.active
                    color #5F7FD9
                    span
                        position relative
                        &:after
                            content ''
                            display block
                            height 2px
                            width 100%
                            background-color #5F7FD9
                            position absolute
                            bottom -.2em
                            left 0
                &:nth-of-type(1)
                    padding-left 0
                &:last-child
                    &:before
                        display none
                &:before
                    content ''
                    display block
                    width 1px
                    height 1.15em
                    background-color #E3E3E3
                    position absolute
                    right 0
                    top 50%
                    transform translateY(-50%)
        .tab-content
            width 94.38%
            margin 0 auto
            .img
                float left
                width 20%
                height 0
                padding-bottom 20%
                position relative
                bakcground-color #E3E3E3
                font-size 0
                img
                    position absolute
                    width 100%
                    height 100%
            .table
                &.right
                    float right
                    width 79%
                .tr
                    .td
                        height 2.6em
</style>

