<template>
    <div class="production-stock">
        <div class="top-card">
            <div class="search-wrap">
                <div class="block-wrap">
                    <label>收货单位</label>
                    <el-select filterable clearable v-model="test" placeholder="">
                        <el-option
                                v-for="item in sex"
                                :key="item.pkId"
                                :label="item.dName"
                                :value="item.dName">
                        </el-option>
                    </el-select>
                </div>
                <div class="block-wrap">
                    <label>产品名称</label>
                    <el-select filterable clearable v-model="test" placeholder="">
                        <el-option
                                v-for="item in sex"
                                :key="item.pkId"
                                :label="item.dName"
                                :value="item.dName">
                        </el-option>
                    </el-select>
                </div>
                <div class="block-wrap">
                    <label>生产批号</label>
                    <input type="text">
                </div>
                <div class="block-wrap" style="width: 25%">
                    <label>生产日期</label>
                    <el-date-picker
                            ref="elDatePicker"
                            size="mini"
                            v-model="queryDate"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                </div>
                <div class="block-wrap" style="width: 15%; text-align: right">
                    <l-button :style="{'margin': '11px 1em 11px 0'}" buttonText="查询" iconName="iconfont icon-chaxx" @button-click="search"></l-button>
                    <l-button buttonText="清空" :style="{'margin': '11px 0'}" iconName="iconfont icon-qingk" @button-click="clear"></l-button>
                </div>
            </div>
        </div>
        <div class="bottom-card white-bg">
            <div class="view-title">生产出入库列表</div>
            <div class="table-button-wrap">
                <table-button :data="tableButtonArr1" @item-click="tableItemClick1"></table-button>
            </div>
            <div class="table-wrap">
                <table class="table-header">
                    <colgroup width="10%"></colgroup>
                    <colgroup width="15%"></colgroup>
                    <colgroup width="15%"></colgroup>
                    <colgroup width="10%"></colgroup>
                    <colgroup width="10%"></colgroup>
                    <colgroup width="10%"></colgroup>
                    <colgroup width="10%"></colgroup>
                    <colgroup width="10%"></colgroup>
                    <colgroup width="10%"></colgroup>
                    <tr class="tr">
                        <th class="th">生产日期</th>
                        <th class="th">生产批号</th>
                        <th class="th">产品名称</th>
                        <th class="th">规格</th>
                        <th class="th">碘盐标志</th>
                        <th class="th">重量</th>
                        <th class="th">类型</th>
                        <th class="th">单据时间</th>
                        <th class="th">操作</th>
                    </tr>
                </table>
                <div class="table-scroll">
                    <table class="table">
                        <colgroup width="20%"></colgroup>
                        <colgroup width="18%"></colgroup>
                        <colgroup width="10%"></colgroup>
                        <colgroup width="12%"></colgroup>
                        <colgroup width="10%"></colgroup>
                        <colgroup width="18%"></colgroup>
                        <colgroup width="12%"></colgroup>
                        <tr class="tr" v-for="(item, index) in data.dataList" :key="index">
                            <td class="td">
                                <el-tooltip :open-delay="300" :content="item.pkId+''" placement="top">
                                    <span style="cursor: pointer">{{item.pkId}}</span>
                                </el-tooltip>
                            </td>
                            <td class="td">
                                <el-tooltip :open-delay="300" :content="item.iodate" placement="top">
                                    <span style="cursor: pointer">{{item.iodate}}</span>
                                </el-tooltip>
                            </td>
                            <td class="td">
                                <el-tooltip :open-delay="300" :content="item.lvl+'码'" placement="top">
                                    <span style="cursor: pointer">{{item.lvl}}级码</span>
                                </el-tooltip>
                            </td>
                            <td class="td">
                                <el-tooltip :open-delay="300" :content="item.amount+''" placement="top">
                                    <span style="cursor: pointer">{{item.amount}}</span>
                                </el-tooltip>
                            </td>
                            <td class="td">
                                <el-tooltip :open-delay="300" :content="item.segment+''" placement="top">
                                    <span style="cursor: pointer">{{item.segment}}</span>
                                </el-tooltip>
                            </td>
                            <td class="td">
                                <el-tooltip :open-delay="300" :content="item.stNo+'~'+item.edNo" placement="top">
                                    <span style="cursor: pointer">{{item.stNo}}~{{item.edNo}}</span>
                                </el-tooltip>
                            </td>
                            <td class="td btn-wrap">
                                <div class="btn" @click="getDetail(item)">
                                    <i class="iconfont icon-xiangq"></i>
                                    <span>详情</span>
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
                    :currentPage="params.reqParam.page"
            ></l-page>
        </div>
        <detail :data="detailData"></detail>
    </div>
</template>

<script>
  import {pageCallback} from '@/assets/js/mixin'
  import Detail from './detail'
  export default {
    name: 'production-stock',
    mixins: [pageCallback],
    data() {
      return {
        sex: [],
        test: '',
        tableButtonArr1: [
          {
            dName: '全部',
            pkId: ''
          }
        ],
        params: {
          reqParam: {
            iodate: '',
            page: 1,
            pageSize: 10
          }
        },
        queryDate: [],
        data: {},
        detailData: {}
      }
    },
    created() {
      this.initData()
    },
    methods: {
      clear() {},
      search() {},
      initData () {
        this.tableButtonArr1 = this.tableButtonArr1.concat(this.GLOBAL.dictionaryData[100])
      },
      tableItemClick1 (data) {
        this.params.reqParam.iodate = data.pkId
        this.params.reqParam.page = 1
        this.getData()
      }
    },
    components: {
      Detail
    }
  }
</script>

<style scoped lang="stylus">
    @import '../../assets/css/fn.styl'
    .production-stock
        width 100%
        height 100%
        .search-wrap
            width 94%
            height 100%
            margin 0 auto
            font-size 0
            .block-wrap
                display inline-block
                vertical-align top
                width 20%
                height 100%
                label
                    font-size-set(16px)
                    margin-right 5px
                input
                    box-sizing border-box
                    display inline-block
                    width 70%
        .table-wrap
            width 94.38%
            margin 1% auto 0
            box-sizing border-box
</style>
<style lang="stylus">
    .production-stock
        .top-card
            .el-select
                width 70%
            .el-select>.el-input
                display inline-block
            .el-input
                width 100%
            .el-range-editor--mini.el-input__inner
                height 30px
            .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner
                width 70%
            .el-date-editor .el-range-separator
                padding 0
                width 15%
</style>
