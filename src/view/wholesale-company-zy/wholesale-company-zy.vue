<template>
    <div class="wholesale-company-zy">
        <div class="top-card">
            <div class="search-wrap">
                <label>批发企业名称</label>
                <input type="text">
                <label>批发企业编码</label>
                <input type="text">
                <l-button :style="{'margin': '11px 1em 11px 2.5em'}" buttonText="查询" iconName="iconfont icon-chaxx" @button-click="search"></l-button>
                <l-button buttonText="清空" :style="{'margin': '11px 0'}" iconName="iconfont icon-qingk" @button-click="clear"></l-button>
            </div>
        </div>
        <div class="bottom-card white-bg">
            <div class="view-title">统筹批发企业
                <div class="table-button-single">
                    导入自营批发企业
                    <input type="file" ref="fileInput" name="codeFile" @change="importCompany">
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
                        <th class="th">批发企业编码</th>
                        <th class="th">批发企业名称</th>
                        <th class="th">批发许可证号</th>
                        <th class="th">许可证有效期起止</th>
                        <th class="th">所属区域</th>
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
        <detail ref="detail" :data="detailData"></detail>
    </div>
</template>

<script>
  import {pageCallback} from '@/assets/js/mixin'
  import Detail from './detail'
  export default {
    name: 'wholesale-company-tc',
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
      importCompany() {
        let input = this.$refs.fileInput.files[0]
        this.$http({
          method: 'post',
          url: this.$api + 'produce/resources/rs/ent/wholesale/import',
          data: {
            wholesaleFile: input
          }
        }).then((res) => {
          this.$refs.fileInput.value = ''
          if (res.data.retCode === 1) {
            this.$message.success('导入成功')
          }
        })
      }
    },
    components: {
      Detail
    }
  }
</script>

<style scoped lang="stylus">
    .wholesale-company-zy
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
            input
                opacity 0
                width 100%
                height 100%
                position absolute
                top 0
                left 0
                z-index 10
                cursor pointer
</style>
