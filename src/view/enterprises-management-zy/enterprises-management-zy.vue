<template>
    <div class="enterprises-management-zy">
        <div class="top-card">
            <div class="search-wrap">
                <label>经营企业名称</label>
                <input type="text">
                <label>经营企业编码</label>
                <input type="text">
                <l-button :style="{'margin': '11px 1em 11px 2.5em'}" buttonText="查询" iconName="iconfont icon-chaxx" @button-click="search"></l-button>
                <l-button buttonText="清空" :style="{'margin': '11px 0'}" iconName="iconfont icon-qingk" @button-click="clear"></l-button>
            </div>
        </div>
        <div class="bottom-card white-bg">
            <div class="view-title">自营经营企业
                <div class="table-button-single" @click="synData">导入自营经营企业</div>
            </div>
            <div class="table-wrap">
                <table class="table-header">
                    <colgroup width="20%"></colgroup>
                    <colgroup width="40%"></colgroup>
                    <colgroup width="28%"></colgroup>
                    <colgroup width="12%"></colgroup>
                    <tr class="tr">
                        <th class="th">经营企业编码</th>
                        <th class="th">经营企业名称</th>
                        <th class="th">上级经营企业名称</th>
                        <th class="th">操作</th>
                    </tr>
                </table>
                <div class="table-scroll">
                    <table class="table">
                        <colgroup width="20%"></colgroup>
                        <colgroup width="40%"></colgroup>
                        <colgroup width="28%"></colgroup>
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
        <!-- <detail ref="detail" :data="detailData"></detail> -->
        <editor ref="editor" :data="detailData"></editor>
    </div>
</template>

<script>
  import {pageCallback} from '@/assets/js/mixin'
  import Editor from './editor.vue'   
  export default {
    name: 'enterprises-management-zy',
    mixins: [pageCallback],
    data() {
      return {
        data: {},
        params: {
          reqParam: {}
        },
        detailData: {}
      }
    },
    methods: {
      search() {},
      clear() {},
      synData() {}
    },
    components: {
      Editor
    }
  }
</script>

<style scoped lang="stylus">
    .enterprises-management-zy
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
</style>
