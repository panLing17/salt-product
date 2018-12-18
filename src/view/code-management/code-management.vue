<template>
    <div class="code-management">
        <div class="top-card white-bg">
            <div class="top-title view-title">查询</div>
            <div class="search-wrap">
                <label class="fs_20">申请时间</label>
                <el-date-picker
                        ref="elDatePicker"
                        size="mini"
                        v-model="queryDate"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        >
                </el-date-picker>
                <l-button :style="{'margin': '0 1em 0 2.5em'}" buttonText="查询" iconName="iconfont icon-chaxx" @button-click="getData"></l-button>
            </div>
        </div>
        <div class="bottom-card white-bg">
            <div class="view-title">标码管理列表</div>
            <div class="table-button-wrap">
                <table-button class="fs_18" :data="tableButtonArr1" @item-click="tableItemClick1"></table-button>
                <table-button class="fs_18" style="margin-left: 2.777em" :data="tableButtonArr2" @item-click="tableItemClick2"></table-button>
                <div class="table-button-single fs_18" @click="synData">同步标码管理</div>
            </div>
            <div class="table-wrap">
                <table class="fs_20 table-header">
                    <colgroup width="20%"></colgroup>
                    <colgroup width="18%"></colgroup>
                    <colgroup width="10%"></colgroup>
                    <colgroup width="12%"></colgroup>
                    <colgroup width="10%"></colgroup>
                    <colgroup width="18%"></colgroup>
                    <colgroup width="12%"></colgroup>
                    <tr class="tr">
                        <th class="th">申请单号</th>
                        <th class="th">碘盐标志</th>
                        <th class="th">包装</th>
                        <th class="th">申请量</th>
                        <th class="th">分段号</th>
                        <th class="th">起止序号</th>
                        <th class="th">操作</th>
                    </tr>
                </table>
                <div class="table-scroll fs_20">
                    <table class="table fs_20">
                        <colgroup width="20%"></colgroup>
                        <colgroup width="18%"></colgroup>
                        <colgroup width="10%"></colgroup>
                        <colgroup width="12%"></colgroup>
                        <colgroup width="10%"></colgroup>
                        <colgroup width="18%"></colgroup>
                        <colgroup width="12%"></colgroup>
                        <tr class="tr" v-for="(item, index) in data.dataList" :key="index">
                            <td class="td">{{item.pkId}}</td>
                            <td class="td">{{item.iodate}}</td>
                            <td class="td">{{item.lvl}}级包装</td>
                            <td class="td">{{item.amount}}</td>
                            <td class="td">{{item.segment}}</td>
                            <td class="td">{{item.stNo}}~{{item.edNo}}</td>
                            <td class="td btn-wrap">
                                <div class="btn" @click="getDetail(item)">
                                    <i class="fs_18 iconfont icon-xiangq"></i>
                                    <span class="fs_18">详情</span>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <l-page
                    :totalPage="data.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
            ></l-page>
        </div>
        <transition name="fade">
            <div class="mask" v-show="detailShow">
                <div class="mask-content-wrap">
                    <div class="mask-title-wrap">
                        <div class="mask-title fs_22">
                            标码管理详情
                            <div class="close" @click="hideMask">
                                <i class="iconfont icon-guanbi"></i>
                            </div>
                        </div>
                    </div>
                    <div class="mask-content">
                        <table class="mask-table fs_20">
                            <colgroup width="11%"></colgroup>
                            <colgroup width="39%"></colgroup>
                            <colgroup width="12%"></colgroup>
                            <colgroup width="38%"></colgroup>
                            <tr>
                                <td>申请单号</td>
                                <td>{{detailData.pkId}}</td>
                                <td>碘盐标志</td>
                                <td>{{detailData.iodate}}</td>
                            </tr>
                            <tr>
                                <td>包装层级</td>
                                <td>{{detailData.lvl}}级包装</td>
                                <td>分段号</td>
                                <td>{{detailData.segment}}</td>
                            </tr>
                            <tr>
                                <td>申请数量</td>
                                <td>{{detailData.amount}}</td>
                                <td>起止序号</td>
                                <td>{{detailData.stNo}}~{{detailData.edNo}}</td>
                            </tr>
                            <tr>
                                <td>申请时间</td>
                                <td>{{detailData.applicationTime}}</td>
                                <td>申请人</td>
                                <td>{{detailData.applicant}}</td>
                            </tr>
                            <tr>
                                <td>审核时间</td>
                                <td>{{detailData.reviewTime}}</td>
                                <td>审核人</td>
                                <td>{{detailData.reviewer}}</td>
                            </tr>
                            <tr>
                                <td>印刷前缀</td>
                                <td>{{detailData.prIntPrefix}}</td>
                                <td>下载次数</td>
                                <td>{{detailData.downTimes}}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="mask-btn-wrap fs_20">
                        <l-button buttonText="返回" @button-click="hideMask"></l-button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import {pageCallback} from '@/assets/js/mixin'
export default {
  name: 'code-management',
  mixins: [pageCallback],
  data () {
    return {
      queryDate: '',
      tableButtonArr1: [
        {
          dName: '全部',
          pkId: ''
        }
      ],
      tableButtonArr2: [
        {
          dName: '全部',
          pkId: ''
        },
        {
          dName: '1级包装',
          pkId: 1
        },
        {
          dName: '2级包装',
          pkId: 2
        }
      ],
      params: {
        reqParam: {
          lvl: '',
          iodate: '',
          startTime: '',
          endTime: '',
          page: 1,
          pageSize: 10
        }
      },
      data: {},
      detailData: {},
      detailShow: false
    }
  },
  watch: {
    queryDate (newVal) {
      if (newVal) {
        this.params.reqParam.startTime = newVal[0].getFullYear() + '-' + (newVal[0].getMonth() + 1) + '-' + newVal[0].getDate()
        this.params.reqParam.endTime = newVal[1].getFullYear() + '-' + (newVal[1].getMonth() + 1) + '-' + newVal[1].getDate()
      } else {
        this.params.reqParam.startTime = ''
        this.params.reqParam.endTime = ''
      }
    }
  },
  created () {
    this.getData()
    this.initData()
  },
  methods: {
    initData () {
      this.tableButtonArr1 = this.tableButtonArr1.concat(this.GLOBAL.dictionaryData[100])
    },
    getData () {
      this.$http({
        method: 'post',
        url: this.$api + 'produce/resources/rs/codes/list',
        data: this.params
      }).then((res) => {
        if (res.data.retCode === 1) {
          this.data = res.data.retVal
        }
      })
    },
    tableItemClick1 (data) {
      this.params.reqParam.iodate = data.pkId
      this.params.reqParam.page = 1
      this.getData()
    },
    tableItemClick2 (data) {
      this.params.reqParam.lvl = data.pkId
      this.params.reqParam.page = 1
      this.getData()
    },
    synData () {
      this.$http({
        method: 'post',
        url: this.$api + 'produce/resources/sync/codeMark',
        data: {}
      }).then((res) => {
        if (res.data.retCode === 1) {
          this.$message.success('同步成功')
        }
      })
    },
    getDetail (item) {
      this.$http({
        method: 'post',
        url: this.$api + 'produce/resources/rs/codes/getById',
        data: {
          reqParam: {
            pkId: item.pkId
          }
        }
      }).then((res) => {
        if (res.data.retCode === 1) {
          for (let i in this.GLOBAL.dictionaryData[100]) {
            if (this.GLOBAL.dictionaryData[100][i].pkId === res.data.retVal.iodate) {
              res.data.retVal.iodate = this.GLOBAL.dictionaryData[100][i].dName
            }
          }
          this.detailData = res.data.retVal
          this.detailShow = true
        }
      })
    },
    hideMask () {
      this.detailShow = false
    }
  }
}
</script>

<style scoped lang="stylus">
    .code-management
        width 100%
        height 100%
        .search-wrap
            font-size 0
            label
                margin 0 .5em 0 2.85em
        .table-wrap
            width 94.38%
            height 70%
            margin 1% auto 0
            overflow auto
            box-sizing border-box
            .table-scroll
                height calc(100% - 2.5em)
                overflow-y auto
                box-sizing border-box
                position relative
        .mask-content-wrap
            width 74.8%
            height 62.6%
            .mask-table
                width 94%
                margin-top 1.95em
                td
                    height 2.5em
            .mask-btn-wrap
                width 87.5%
                margin 0 auto
                padding 3em 0
                text-align right

</style>
<style lang="stylus">
    .code-management
        .el-date-editor .el-range-separator
            width 6%
        .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner
            width 300px
</style>
