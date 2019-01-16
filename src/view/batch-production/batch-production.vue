<template>
    <div class="batch-production">
        <div class="top-card white-bg">
            <!--<div class="top-title view-title">查询</div>-->
            <div class="search-wrap">
                <label class="label-1">产品名称</label>
                <el-select v-model="params.reqParam.productCode" filterable  clearable placeholder="">
                    <el-option
                            v-for="item in productList"
                            :key="item.productCode"
                            :label="item.productName"
                            :value="item.productCode">
                    </el-option>
                </el-select>
                <label class="label-2">生产批号</label>
                <input type="text" v-model="params.reqParam.batch">
                <l-button v-if="btnPromise.search" :style="{'margin': '11px 1em 11px 2.5em'}" buttonText="查询" iconName="iconfont icon-chaxx" @button-click="search"></l-button>
                <l-button buttonText="清空" :style="{'margin': '11px 0'}" iconName="iconfont icon-qingk" @button-click="clear"></l-button>
            </div>
        </div>
        <div class="bottom-card white-bg">
            <div class="view-title">批次生产任务列表</div>
            <div class="table-button-wrap">
                <table-button v-if="btnPromise.search" class="fs_18" :data="tableButtonArr1" @item-click="tableItemClick1"></table-button>
                <table-button v-if="btnPromise.search" class="fs_18" style="margin-left: 2.777em" :data="tableButtonArr2" @item-click="tableItemClick2"></table-button>
                <div v-if="btnPromise.addBatch" class="table-button-single fs_18" @click="addShow">
                    <i class="iconfont icon-xinz fs_16"></i>
                    <span>新增批次任务</span>
                </div>
            </div>
            <div class="table-wrap">
                <table class="fs_20 table-header">
                    <colgroup width="10%"></colgroup>
                    <colgroup width="15%"></colgroup>
                    <colgroup width="21%"></colgroup>
                    <colgroup width="11%"></colgroup>
                    <colgroup width="8%"></colgroup>
                    <colgroup width="6%"></colgroup>
                    <colgroup width="6%"></colgroup>
                    <colgroup width="4%"></colgroup>
                    <colgroup width="4%"></colgroup>
                    <colgroup width="15%"></colgroup>
                    <tr class="tr">
                        <th class="th">批次任务编号</th>
                        <th class="th">产品名称</th>
                        <th class="th">品规</th>
                        <th class="th">生产批号</th>
                        <th class="th">生产状态</th>
                        <th class="th">计划产量</th>
                        <th class="th">实际产量</th>
                        <th class="th">抽检</th>
                        <th class="th">检验</th>
                        <th class="th">操作</th>
                    </tr>
                </table>
                <div class="table-scroll fs_20">
                    <table class="table fs_20">
                        <colgroup width="10%"></colgroup>
                        <colgroup width="15%"></colgroup>
                        <colgroup width="21%"></colgroup>
                        <colgroup width="11%"></colgroup>
                        <colgroup width="8%"></colgroup>
                        <colgroup width="6%"></colgroup>
                        <colgroup width="6%"></colgroup>
                        <colgroup width="4%"></colgroup>
                        <colgroup width="4%"></colgroup>
                        <colgroup width="15%"></colgroup>
                        <tr class="tr" v-for="(item, index) in data.dataList" :key="index">
                            <td class="td">{{item.pkId}}</td>
                            <td class="td">{{item.productName}}</td>
                            <td class="td">{{item.spec}}</td>
                            <td class="td">{{item.batch}}</td>
                            <td class="td">{{item.statusText}}</td>
                            <td class="td">{{item.plans}}{{item.unit}}</td>
                            <td class="td">{{item.weight}}{{item.unit}}</td>
                            <td class="td" @click="sampling(item)" style="cursor: pointer">
                                <span
                                        :style="{color: item.samplingBillCode?'#70DEC0':'#E31414'}"
                                        style="padding-bottom: .1em;border-bottom: 1px solid"
                                >{{item.samplingBillCode?'已检':'未检'}}</span>
                            </td>
                            <td class="td" @click="inspect(item)" style="cursor: pointer">
                                <span
                                        :style="{color: item.inspectBillCode?'#70DEC0':'#E31414'}"
                                        style="padding-bottom: .1em;border-bottom: 1px solid"
                                >{{item.inspectBillCode?'已检':'未检'}}</span>
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
                                        <el-dropdown-item :command="{flag:0,index}" v-if="btnPromise.delBatch">删除</el-dropdown-item>
                                        <el-dropdown-item :command="{flag:1,item}" v-if="item.status===94012 && btnPromise.knot">结批</el-dropdown-item>
                                        <el-dropdown-item :command="{flag:2,item}" v-if="(item.status===94011 || item.status===94012) && btnPromise.editorBatch">修改</el-dropdown-item>
                                        <el-dropdown-item :command="{flag:3,item}" v-if="item.status===94014 && btnPromise.pass">放行</el-dropdown-item>
                                        <el-dropdown-item :command="{flag:4,item}" v-if="item.status===94011 && btnPromise.examineBatch">审核</el-dropdown-item>
                                        <el-dropdown-item :command="{flag:6,item}" v-if="(item.status===94014 || item.status===94015 || item.status===94016) && btnPromise.knotReport">结批报告</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
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
        <el-dialog
                title="审核"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>审核是否通过？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="examineAjax(1)">不通过</el-button>
                <el-button type="primary" @click="examineAjax(0)">通 过</el-button>
              </span>
        </el-dialog>
        <knot-batch ref="knotBatch" :detailData="detailData" :status="knotBatchStatus"></knot-batch>
        <detail ref="detail"></detail>
        <pass ref="pass" :detailData="detailData"></pass>
        <random-check ref="randomCheck" :data="currentDetail"></random-check>
        <random-check-detail :btnPromise="btnPromise" ref="randomCheckDetail" :data="currentDetail"></random-check-detail>
        <check ref="check" :data="currentDetail"></check>
        <check-detail :btnPromise="btnPromise" ref="checkDetail" :data="currentDetail"></check-detail>
    </div>
</template>

<script>
  import {pageCallback} from '@/assets/js/mixin'
  import KnotBatch from './knot-batch'
  import Detail from './step3-add'
  import Pass from './pass'
  import RandomCheck from './random-check'
  import RandomCheckDetail from './random-check-detail'
  import Check from './check'
  import CheckDetail from './check-detail'
  export default {
    name: 'code-management',
    mixins: [pageCallback],
    data () {
      return {
        productList: [],
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
          }
        ],
        params: {
          reqParam: {
            productCode: '',
            batch: '',
            status: '',
            iodate: '',
            page: 1,
            pageSize: 10
          }
        },
        data: {},
        currentDetail: {},
        detailData: {},
        knotBatchStatus: 0,
        dialogVisible: false,
        examineData: {}
      }
    },
    created () {
      this.initData()
      this.getProductList()
    },
    methods: {
      getProductList() {
        this.$http({
          url: this.$api + 'produce/resources/rs/product/getForCombox',
          method: 'post',
          data: {
            reqParam: {
              productName: ''
            }
          }
        }).then(res => {
          if(res.data.retCode === 1) {
            this.productList = res.data.retVal
          }
        })
      },
      initData () {
        if(typeof this.$route.query.page !== 'undefined') {
          this.params.reqParam.page = this.$route.query.page
        }
        this.tableButtonArr1 = this.tableButtonArr1.concat(this.GLOBAL.dictionaryData[940])
        this.tableButtonArr2 = this.tableButtonArr2.concat(this.GLOBAL.dictionaryData[100])
      },
      getData () {
        this.$http({
          method: 'post',
          url: this.$api + 'produce/production/pd/batch/list',
          data: this.params
        }).then((res) => {
          if (res.data.retCode === 1) {
            res.data.retVal.dataList.forEach(item => {
              item.statusText = this.$method.queryDictionary.call(this, 940, item.status)
              item.btnPopShow = false
            })
            this.data = res.data.retVal
          }
        })
      },
      tableItemClick1 (data) {
        this.params.reqParam.status = data.pkId
        this.params.reqParam.page = 1
        this.getData()
      },
      tableItemClick2 (data) {
        this.params.reqParam.iodate = data.pkId
        this.params.reqParam.page = 1
        this.getData()
      },
      addShow() {
        sessionStorage.setItem('productList', JSON.stringify(this.productList))
        this.$router.replace('/addBatch')
      },
      sampling(item) {
        if(!item.samplingBillCode) {
          if(this.btnPromise.addRandom) {
            this.currentDetail = item
            this.$refs.randomCheck.show()
          }
        } else {
          if(this.btnPromise.showRandom) {
            this.$http({
              url: this.$api + 'produce/production/pd/batch/sampling/getByIdOrBatchPkId',
              method: 'post',
              data: {
                reqParam: {
                  batchPkId: item.pkId
                }
              }
            }).then(res => {
              if(res.data.retCode === 1) {
                res.data.retVal.status = item.status
                this.currentDetail = res.data.retVal
                this.$refs.randomCheckDetail.show()
              }
            })
          }
        }
      },
      inspect(item) {
        if(!item.inspectBillCode) {
          if(this.btnPromise.addCheck) {
            this.currentDetail = item
            this.$refs.check.show()
          }
        } else {
          if(this.btnPromise.showCheck) {
            this.$http({
              url: this.$api + 'produce/production/pd/batch/inspect/getByIdOrBatchPkId',
              method: 'post',
              data: {
                reqParam: {
                  batchPkId: item.pkId
                }
              }
            }).then(res => {
              if(res.data.retCode === 1) {
                res.data.retVal.status = item.status
                this.currentDetail = res.data.retVal
                this.$refs.checkDetail.show()
              }
            })
          }
        }
      },
      addShowFn() {
        this.$router.push('/addBatch')
      },
      clear() {
        this.params.reqParam.batch = ''
      },
      del (index) {
        this.$confirm('确认删除这条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'post',
            url: this.$api + 'produce/production/pd/batch/delete',
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
      getDetail(item, flag, status) {
        this.$http({
          url: this.$api + 'produce/production/pd/batch/getById',
          method: 'post',
          data: {
            reqParam: {
              pkId: item.pkId
            }
          }
        }).then(res => {
          if(res.data.retCode === 1) {
            this.detailData = res.data.retVal
            if(flag ===0) {
              sessionStorage.setItem('currentDetail', JSON.stringify(this.detailData))
              this.$router.push({path: '/information', query: {page: this.params.reqParam.page}})
            } else if(flag === 1) {
              this.knotBatchStatus = status
                this.$refs.knotBatch.show()
            } else if(flag === 2) {
              sessionStorage.setItem('currentDetail', JSON.stringify(this.detailData))
              if(item.status===94011) {
                this.$router.push('/modifyBatch')
              } else if(item.status===94012) {
                this.$router.push('/modifyBatch/step2')
              }
            } else if(flag === 3) {
              this.$refs.pass.show()
            }
          }
        })
      },
      examine(item) {
        this.examineData = item
        this.dialogVisible = true
      },
      handleClose() {
        this.dialogVisible = false
      },
      examineAjax(flag) {
        this.dialogVisible = false
        this.$http({
          url: this.$api + 'produce/production/pd/batch/audit',
          method: 'post',
          data: {
            reqParam: {
              pkId: this.examineData.pkId,
              status: flag===0?94012:94013
            }
          }
        }).then(res => {
          if(res.data.retCode === 1) {
            this.getData()
            this.$emit('count-change')
            this.$message('审核完成')
          }
        })
      },
      handleChange(data) {
        if(data.flag === 0) {
          this.del(data.index)
        } else if(data.flag===1){
          this.getDetail(data.item, 1, 0)
        } else if(data.flag===2){
          this.getDetail(data.item, 2)
        } else if(data.flag===3){
          this.getDetail(data.item, 3)
        } else if(data.flag===4){
          this.examine(data.item)
        } else {
          this.getDetail(data.item, 1, 1)
        }
      }
    },
    components: {
      KnotBatch,
      Detail,
      Pass,
      RandomCheck,
      RandomCheckDetail,
      Check,
      CheckDetail
    }
  }
</script>

<style scoped lang="stylus">
    .batch-production
        width 100%
        height 100%
        position relative
        .search-wrap
            .label-1
                margin 0 0.5em 0 2.85em
            input
                width 15%
            .label-2
                margin 0 0.5em 0 1em
        .table-button-wrap
            .btn
                position absolute
                right 0
                top 50%
                transform translateY(-50%)
        .table-wrap
            width 94.38%
            /*height 70%*/
            margin 1% auto 0
            /*overflow auto*/
            box-sizing border-box
            .table-scroll
                height calc(100% - 2.5em)
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
                width 94%
                margin 0 auto
                padding 3em 0
                text-align right

</style>
<style lang="stylus">
    .batch-production
        .search-wrap
            .el-select
                width 20%
            .el-input__icon
                line-height 2em
</style>
