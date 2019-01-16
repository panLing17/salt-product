<template>
    <div class="administrative-division">
        <div class="top-card white-bg">
            <!--<div class="top-title view-title">查询</div>-->
            <div class="search-wrap fs_20">
                <label class="label-1">地区名称</label>
                <input type="text" v-model="params.reqParam.areaName">
                <label class="label-2">地区编码</label>
                <input type="text" v-model="params.reqParam.areaId">
                <l-button v-if="btnPromise.search" :style="{'margin': '11px 1em 11px 2.5em'}" buttonText="查询" iconName="iconfont icon-chaxx" @button-click="search"></l-button>
                <l-button buttonText="清空" :style="{'margin': '11px 0'}" iconName="iconfont icon-qingk" @button-click="clear"></l-button>
            </div>
        </div>
        <div class="bottom-card white-bg">
            <div class="view-title">
                行政区划列表
            </div>
            <div class="table-wrap">
                <table class="fs_20 table-header">
                    <colgroup width="13%"></colgroup>
                    <colgroup width="13%"></colgroup>
                    <colgroup width="14%"></colgroup>
                    <colgroup width="12%"></colgroup>
                    <colgroup width="14%"></colgroup>
                    <colgroup width="14%"></colgroup>
                    <colgroup width="20%"></colgroup>
                    <tr class="tr">
                        <th class="th">省编码</th>
                        <th class="th">省名称</th>
                        <th class="th">市编码</th>
                        <th class="th">市名称</th>
                        <th class="th">地区编码</th>
                        <th class="th">地区名称</th>
                        <th class="th">完整名称</th>
                    </tr>
                </table>
                <table class="table fs_20">
                    <colgroup width="13%"></colgroup>
                    <colgroup width="13%"></colgroup>
                    <colgroup width="14%"></colgroup>
                    <colgroup width="12%"></colgroup>
                    <colgroup width="14%"></colgroup>
                    <colgroup width="14%"></colgroup>
                    <colgroup width="20%"></colgroup>
                    <tr class="tr" v-for="(item, index) in data.dataList" :key="index">
                        <td class="td">
                            <el-tooltip :open-delay="300" :content="item.provId" placement="top">
                                <span style="cursor: pointer">{{item.provId}}</span>
                            </el-tooltip>
                        </td>
                        <td class="td">
                            <el-tooltip :open-delay="300" :content="item.provName" placement="top">
                                <span style="cursor: pointer">{{item.provName}}</span>
                            </el-tooltip>
                        </td>
                        <td class="td">
                            <el-tooltip :open-delay="300" :content="item.cityId" placement="top">
                                <span style="cursor: pointer">{{item.cityId}}</span>
                            </el-tooltip>
                        </td>
                        <td class="td">
                            <el-tooltip :open-delay="300" :content="item.cityName" placement="top">
                                <span style="cursor: pointer">{{item.cityName}}</span>
                            </el-tooltip>
                        </td>
                        <td class="td">
                            <el-tooltip :open-delay="300" :content="item.areaId" placement="top">
                                <span style="cursor: pointer">{{item.areaId}}</span>
                            </el-tooltip>
                        </td>
                        <td class="td">
                            <el-tooltip :open-delay="300" :content="item.areaName" placement="top">
                                <span style="cursor: pointer">{{item.areaName}}</span>
                            </el-tooltip>
                        </td>
                        <td class="td">
                            <el-tooltip :open-delay="300" :content="item.fullName" placement="top">
                                <span style="cursor: pointer">{{item.fullName}}</span>
                            </el-tooltip>
                        </td>
                    </tr>
                </table>
            </div>
            <l-page
                    :totalPage="data.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :currentPage="params.reqParam.page"
            ></l-page>
        </div>
    </div>
</template>

<script>
  import {pageCallback} from '@/assets/js/mixin'
  export default {
    name: 'administrative-division',
    mixins: [pageCallback],
    data () {
      return {
        params: {
          reqParam: {
            areaId: '',
            areaName: '',
            page: 1,
            pageSize: 10
          }
        },
        data: {}
      }
    },
    methods: {
      getData () {
        this.$http({
          url: this.$api + 'produce/resources/rs/area/list',
          method: 'post',
          data: this.params
        }).then(res => {
          if (res.data.retCode === 1) {
            this.data = res.data.retVal
          }
        })
      },
      clear () {
        this.params.reqParam.areaId = ''
        this.params.reqParam.areaName = ''
      }
    }
  }
</script>

<style scoped lang="stylus">
    .administrative-division
        width 100%
        height 100%
        overflow auto
        .search-wrap
            .label-1
                margin 0 0.5em 0 2.85em
            input
                width 18em
            .label-2
                margin 0 0.5em 0 1em
        .table-wrap
            width 94%
            /*height 70%*/
            /*overflow auto*/
            margin 0 auto
            .table
                .td
                    &:last-child
                        overflow hidden
                        text-overflow ellipsis
                        white-space nowrap
</style>
