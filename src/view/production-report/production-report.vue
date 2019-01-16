<template>
    <div class="production-report">
        <div class="top-card">
            <div class="search-wrap">
                <label>申请时间</label>
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
                <l-button :style="{'margin': '11px 1em 11px 2.5em'}" buttonText="查询" iconName="iconfont icon-chaxx" @button-click="search"></l-button>
                <l-button buttonText="清空" :style="{'margin': '11px 0'}" iconName="iconfont icon-qingk" @button-click="clear"></l-button>
            </div>
        </div>
        <div class="bottom-card white-bg">
            <div class="view-title">统筹批发企业
                <div class="table-button-single">
                    <i class="iconfont icon-xinz"></i>
                    <span>生成报告</span>
                </div>
            </div>
            <div class="table-wrap">
                <table class="table-header">
                    <colgroup width="20%"></colgroup>
                    <colgroup width="18%"></colgroup>
                    <colgroup width="15%"></colgroup>
                    <colgroup width="20%"></colgroup>
                    <colgroup width="15%"></colgroup>
                    <colgroup width="12%"></colgroup>
                    <tr class="tr">
                        <th class="th">创建时间</th>
                        <th class="th">报告时间段</th>
                        <th class="th">报告状态</th>
                        <th class="th">PDF文件下载次数</th>
                        <th class="th">中盐XML下载次数</th>
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
                                <div class="btn" @click="getDetail(item)" v-if="btnPromise.detail">
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
        <build></build>
        <download></download>
    </div>
</template>

<script>
  import {pageCallback} from '@/assets/js/mixin'
  import Build from './build'
  import Download from './download'
  export default {
    name: 'production-report',
    mixins: [pageCallback],
    data() {
      return {
        queryDate: [],
        data: {},
        params: {
          reqParam: {

          }
        }
      }
    },
    methods: {
      clear() {},
      search() {}
    },
    components: {
      Build,
      Download
    }
  }
</script>

<style scoped lang="stylus">
    @import '../../assets/css/fn.styl'
    .production-report
        width 100%
        height 100%
        .search-wrap
            font-size 0
            label
                margin 0 .5em 0 2.85em
        .table-wrap
            width 94.38%
            margin 1% auto 0
            box-sizing border-box
        .table-button-single
            .iconfont
                font-size-set(12px)
</style>
