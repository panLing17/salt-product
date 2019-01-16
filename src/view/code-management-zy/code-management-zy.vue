<template>
    <div class="code-management">
        <div class="top-card white-bg">
            <!--<div class="top-title view-title">查询</div>-->
            <div class="search-wrap">
                <label>导入时间</label>
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
                <label>生成码生产批号</label>
                <input type="text" v-model="params.reqParam.codeBatch">
                <l-button :style="{'margin': '11px 1em 11px 2.5em'}" v-if="btnPromise.search" buttonText="查询" iconName="iconfont icon-chaxx" @button-click="search"></l-button>
                <l-button buttonText="清空" :style="{'margin': '11px 0'}" iconName="iconfont icon-qingk" @button-click="clear"></l-button>
            </div>
        </div>
        <div class="bottom-card white-bg">
            <div class="view-title">标码管理列表</div>
            <div class="table-button-wrap">
                <table-button v-if="btnPromise.search" :data="tableButtonArr1" @item-click="tableItemClick1"></table-button>
                <table-button v-if="btnPromise.search" style="margin-left: 10px" :data="tableButtonArr2" @item-click="tableItemClick2"></table-button>
                <div class="table-button-single"  v-if="btnPromise.sync">
                    导入码标
                    <input type="file" ref="fileInput" name="codeFile" @change="importCode">
                </div>
            </div>
            <div class="table-wrap">
                <table class="table-header">
                    <colgroup width="20%"></colgroup>
                    <colgroup width="18%"></colgroup>
                    <colgroup width="10%"></colgroup>
                    <colgroup width="12%"></colgroup>
                    <colgroup width="10%"></colgroup>
                    <colgroup width="18%"></colgroup>
                    <colgroup width="12%"></colgroup>
                    <tr class="tr">
                        <th class="th">生成码生产批号</th>
                        <th class="th">企业简称</th>
                        <th class="th">申请码类型</th>
                        <th class="th">碘盐标志</th>
                        <th class="th">标签规格</th>
                        <th class="th">数量</th>
                        <th class="th">生成时间</th>
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
                                <el-tooltip :open-delay="300" :content="item.lvl+'包装'" placement="top">
                                    <span style="cursor: pointer">{{item.lvl}}级包装</span>
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
                            <td class="td">
                                <el-tooltip :open-delay="300" :content="item.stNo+'~'+item.edNo" placement="top">
                                    <span style="cursor: pointer">{{item.stNo}}~{{item.edNo}}</span>
                                </el-tooltip>
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
        <transition name="fade">
            <div class="mask" v-show="detailShow">
                <div class="mask-content-wrap">
                    <div class="mask-title-wrap">
                        <div class="mask-title">
                            标码管理详情
                            <div class="close" @click="hideMask">
                                <i class="iconfont icon-guanbi"></i>
                            </div>
                        </div>
                    </div>
                    <div class="mask-content">
                        <table class="mask-table">
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
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                    <div class="mask-btn-wrap">
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
    name: 'code-management-zy',
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
            dName: '1级码',
            pkId: '一级码'
          },
          {
            dName: '2级码',
            pkId: '二级码'
          }
        ],
        params: {
          reqParam: {
            lvl: '',
            iodate: '',
            startTime: '',
            endTime: '',
            page: 1,
            pageSize: 10,
            codeBatch: ''
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
      this.initData()
    },
    methods: {
      initData () {
        this.tableButtonArr1 = this.tableButtonArr1.concat(this.GLOBAL.dictionaryData[100])
      },
      clear() {
        this.queryDate = ''
      },
      getData () {
        this.$http({
          method: 'post',
          url: this.$api + 'produce/resources/rs/zy/codes/list',
          data: this.params
        }).then((res) => {
          if (res.data.retCode === 1) {
            res.data.retVal.dataList.forEach(item=>{
              item.iodate = this.$method.queryDictionary.call(this, 100, item.iodate)
            })
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
      importCode () {
        let input = this.$refs.fileInput.files[0]
        if(input.name.substring(input.name.length-4, input.name.length)!=='.txt') {
          this.$message.warning('请上传.txt文件')
          return
        }
        let reg = /^([\d]{10}[_]{1}[\u4e00-\u9fa5a-zA-Z0-9\s]+[_]{1}[\u4e00-\u9fa5]+[_]{1}[\u4e00-\u9fa5]+[_]{1}[\u4e00-\u9fa5]+[_]{1}\d+\s?[\u4e00-\u9fa5]{1}[_]{1}\d+)|([\d]{10}[_]{1}[\u4e00-\u9fa5a-zA-Z0-9\s]+[_]{1}[\u4e00-\u9fa5]+[_]{1}\d+\s?[\u4e00-\u9fa5]{1}[_]{1}\d+)$/
        if (!reg.test(input.name.split('.txt')[0])) {
          this.$message.warning('文件名格式不正确')
          return
        }

        this.$http({
          method: 'post',
          url: this.$api + 'produce/resources/rs/zy/codes/import',
          data: {
            codeFile: input
          }
        }).then((res) => {
          this.$refs.fileInput.value = ''
          if (res.data.retCode === 1) {
            this.$message.success('导入成功')
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
            /*height 70%*/
            margin 1% auto 0
            /*overflow auto*/
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
                tr
                    td
                        height 2.5em
            .mask-btn-wrap
                width 87.5%
                margin 0 auto
                padding 3em 0
                text-align right

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
<style lang="stylus">
    .code-management
        .el-date-editor .el-range-separator
            width 6%
        .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner
            width 300px
</style>
