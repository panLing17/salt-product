<template>
    <div class="material-info">
        <div class="top-card white-bg">
            <!--<div class="top-title view-title">查询</div>-->
            <div class="search-wrap fs_20">
                <label class="label-1">企业名称</label>
                <el-select class="fs_20" filterable  clearable v-model="params.reqParam.factoryId" placeholder="">
                    <el-option
                            v-for="item in companyData"
                            :key="item.pkId"
                            :label="item.fName"
                            :value="item.pkId">
                    </el-option>
                </el-select>
                <label class="label-2">辅料名称</label>
                <el-select v-model="params.reqParam.rawPkId" filterable clearable placeholder="">
                    <el-option
                            v-for="item in materialsData"
                            :key="item.pkId"
                            :label="item.mName"
                            :value="item.pkId">
                    </el-option>
                </el-select>
                <label class="label-2">出厂批号</label>
                <input type="text" v-model="params.reqParam.batchNo">
                <l-button v-if="btnPromise.search" :style="{'margin': '11px 1em 11px 2.5em'}" buttonText="查询" iconName="iconfont icon-chaxx" @button-click="search"></l-button>
                <l-button buttonText="清空" :style="{'margin': '11px 0'}" iconName="iconfont icon-qingk" @button-click="clear"></l-button>
            </div>
        </div>
        <div class="bottom-card white-bg">
            <div class="view-title">
                辅料基本信息列表
                <div v-if="btnPromise.add" class="table-button-single fs_18" @click="addShow">
                    <i class="iconfont icon-xinz fs_16"></i>
                    <span>新增辅料批次任务</span>
                </div>
            </div>
            <div class="table-wrap">
                <table class="fs_20 table-header">
                    <colgroup width="25%"></colgroup>
                    <colgroup width="25%"></colgroup>
                    <colgroup width="8%"></colgroup>
                    <colgroup width="10%"></colgroup>
                    <colgroup width="10%"></colgroup>
                    <colgroup width="10%"></colgroup>
                    <colgroup width="12%"></colgroup>
                    <tr class="tr">
                        <th class="th">企业名称</th>
                        <th class="th">辅料名称</th>
                        <th class="th">净含量</th>
                        <th class="th">规格</th>
                        <th class="th">辅料出厂批号</th>
                        <th class="th">生产日期</th>
                        <th class="th">操作</th>
                    </tr>
                </table>
                <table class="table fs_20">
                    <colgroup width="25%"></colgroup>
                    <colgroup width="25%"></colgroup>
                    <colgroup width="8%"></colgroup>
                    <colgroup width="10%"></colgroup>
                    <colgroup width="10%"></colgroup>
                    <colgroup width="10%"></colgroup>
                    <colgroup width="12%"></colgroup>
                    <tr class="tr" v-for="(item, index) in data.dataList" :key="index">
                        <td class="td">{{item.fName}}</td>
                        <td class="td">{{item.mName}}</td>
                        <td class="td">{{item.cxt}}</td>
                        <td class="td">{{item.spec}}</td>
                        <td class="td">{{item.batchNo}}</td>
                        <td class="td">
                            <el-tooltip :open-delay="300" :content="item.prodDate" placement="top">
                                <span style="cursor: pointer">{{item.prodDate}}</span>
                            </el-tooltip>
                        </td>
                        <td class="td btn-wrap">
                            <div v-if="btnPromise.detail" class="btn" @click="getDetail(item, 0)">
                                <i class="fs_18 iconfont icon-xiangq"></i>
                                <span class="fs_18">详情</span>
                            </div>
                            <el-dropdown trigger="click"  @command="handleChange">
                                  <span class="el-dropdown-link">
                                    <i class="iconfont icon-guanli"></i>管理<i class="fs_16 iconfont icon-jiant-x"></i>
                                  </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command="{flag:0,index}" v-if="btnPromise.del">删除</el-dropdown-item>
                                    <el-dropdown-item :command="{flag:1,item}" v-if="btnPromise.editor">修改</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
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
        <add ref="add" :companyData="companyData" :materialsData="materialsData"></add>
        <detail ref="detail" :data="detailData"></detail>
        <editor ref="editor" :data="detailData"></editor>
    </div>
</template>

<script>
  import {pageCallback} from '@/assets/js/mixin'
  import Add from './add'
  import Detail from './detail'
  import Editor from './editor'
  export default {
    name: 'auxiliary-batch',
    mixins: [pageCallback],
    data () {
      return {
        data: {},
        params: {
          reqParam: {
            factoryId: '',
            rawPkId:'',
            batchNo: '',
            page: 1,
            pageSize: 10
          }
        },
        companyData: [],
        materialsData: [],
        detailData: {}
      }
    },
    created () {
      this.getCompanyData()
      this.getMaterialsData()
    },
    methods: {
      getCompanyData() {
        this.$http({
          url: this.$api + 'produce/resources/rs/excipient/factory/getSelected',
          method: 'post',
          data: {
            reqParam: {}
          }
        }).then(res => {
            if(res.data.retCode === 1) {
              this.companyData = res.data.retVal.dataList
            }
        })
      },
      getMaterialsData() {
        this.$http({
          url: this.$api + 'produce/resources/rs/excipient/getSelected',
          method: 'post',
          data: {
            reqParam: {}
          }
        }).then(res => {
          if(res.data.retCode === 1) {
            this.materialsData = res.data.retVal.dataList
          }
        })
      },
      getData () {
        this.$http({
          url: this.$api + 'produce/production/pd/excipient/batch/list',
          method: 'post',
          data: this.params
        }).then((res) => {
          if (res.data.retCode === 1) {
            res.data.retVal.dataList.forEach(item => {
              item.btnPopShow = false
            })
            this.data = res.data.retVal
          }
        })
      },
      getDetail (item, flag) {
        this.$http({
          url: this.$api + 'produce/production/pd/excipient/batch/getById',
          method: 'post',
          data: {
            reqParam: {
              pkId: item.pkId
            }
          }
        }).then(res => {
          if (res.data.retCode === 1) {
            this.detailData = res.data.retVal
            flag === 0?this.$refs.detail.show():this.$refs.editor.show()
          }
        })
      },
      addShow () {
        this.$refs.add.show()
      },
      clear () {
        this.params.reqParam.batchNo = ''
      },
      del (index) {
        this.$confirm('确认删除这条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'post',
            url: this.$api + 'produce/production/pd/excipient/batch/delete',
            data: {
              reqParam: {
                pkId: this.data.dataList[index].pkId
              }
            }
          }).then((res) => {
              if (res.data.retCode === 1) {
                this.data.dataList.splice(index, 1)
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
      handleChange(data) {
        if(data.flag === 0) {
          this.del(data.index)
        } else{
          this.getDetail(data.item, data.flag)
        }
      }
    },
    components: {
      Add,
      Detail,
      Editor
    }
  }
</script>

<style scoped lang="stylus">

    input::-webkit-input-placeholder{
        color #BFBFBF
    }    /* 使用webkit内核的浏览器 */
    input:-moz-placeholder{
        color #BFBFBF
    }                  /* Firefox版本4-18 */
    input::-moz-placeholder{
        color #BFBFBF
    }                  /* Firefox版本19+ */
    input:-ms-input-placeholder{
        color #BFBFBF
    }           /* IE浏览器 */

    .material-info
        width 100%
        height 100%
        .search-wrap
            .label-1
                margin 0 0.5em 0 2.85em
            input
                width 15%
            .label-2
                margin 0 0.5em 0 1em
        .button-wrap
            width 94%
            margin 0 auto
            position relative
            .btn
                position absolute
                right 0
                top -2em
        .table-wrap
            width 94%
            /*height 70%*/
            /*overflow auto*/
            margin 0 auto
        .mask-content-wrap
            width 75%
            top 10%
            transform translate(-50%, 0)
            .mask-content
                width 80%
            .mask-table
                border none
                tr
                    border none
                    &.label-wrap
                        height 3em
                        vertical-align bottom
                        td
                            padding-bottom .5em
                    td
                        border none
                        padding-left 0
                        &:last-child
                            padding-left 10%
                        span
                            color #D31717
                        &:nth-of-type(1)
                            input
                                width 90%
                        &.special
                            padding-left 0
                        input
                            border-radius 4px
                            border 1px solid #BFBFBF
                            width 100%
                            height 2em
                            padding-left 1em
                            &.special
                                width 45%
            .mask-btn-wrap
                width 80%
                margin 0 auto
                padding 2em 0 5em
</style>
<style lang="stylus">
    .auxiliary-batch
        .el-select
            width 15%
        .el-input__icon
            line-height 2em
</style>
