<template>
    <div class="production-line">
        <div class="top-card white-bg">
            <div class="top-title view-title">查询</div>
            <div class="search-wrap fs_20">
                <label>车间名称</label>
                <input type="text" v-model="params.reqParam.fullName">
                <label>单元名称</label>
                <input type="text" v-model="params.reqParam.unitName">
                <label>产线名称</label>
                <input type="text" v-model="params.reqParam.lineName">
                <l-button :style="{'margin': '0 1em 0 2.5em'}" buttonText="查询" iconName="iconfont icon-chaxx" @button-click="getData"></l-button>
                <l-button buttonText="清空" iconName="iconfont icon-qingk" @button-click="clear"></l-button>
            </div>
        </div>
        <div class="bottom-card white-bg">
            <div class="view-title">生产车间列表</div>
            <div class="table-button-wrap">
                <table-button class="fs_18" :data="tableButtonArr1" @item-click="tableItemClick1"></table-button>
                <div class="table-button-single fs_18" @click="openAdd">
                    <i class="iconfont icon-xinz fs_16"></i>
                    <span>新增产线车间</span>
                </div>
            </div>
            <div class="table-wrap">
                    <table class="fs_20 table-header">
                        <colgroup width="20%"></colgroup>
                        <colgroup width="18%"></colgroup>
                        <colgroup width="20%"></colgroup>
                        <colgroup width="12%"></colgroup>
                        <colgroup width="12%"></colgroup>
                        <colgroup width="18%"></colgroup>
                        <tr class="tr">
                            <th class="th">车间产线编码</th>
                            <th class="th">类型</th>
                            <th class="th">完整名称</th>
                            <th class="th">产线负责人</th>
                            <th class="th">状态</th>
                            <th class="th">操作</th>
                        </tr>
                    </table>
                    <div class="table-scroll fs_20">
                        <table class="table fs_20">
                            <colgroup width="20%"></colgroup>
                            <colgroup width="18%"></colgroup>
                            <colgroup width="20%"></colgroup>
                            <colgroup width="12%"></colgroup>
                            <colgroup width="12%"></colgroup>
                            <colgroup width="18%"></colgroup>
                            <tr class="tr" v-for="(item, index) in data.dataList" :key="index">
                                <td class="td">{{item.workId}}</td>
                                <td class="td">{{item.wType}}</td>
                                <td class="td">{{item.shopName}}{{item.unitName?'/':''}}{{item.unitName}}{{item.lineName?'/':''}}{{item.lineName}}</td>
                                <td class="td">{{item.lineChage}}</td>
                                <td class="td" :style="{color: item.used==='启用'?'#70DEC0':'#E31414'}">{{item.used}}</td>
                                <td class="td btn-wrap">
                                    <div class="btn" style="margin-right: 20px" @click="getDetail(item)">
                                        <i class="fs_18 iconfont icon-xiangq"></i>
                                        <span class="fs_18">详情</span>
                                    </div>
                                    <div class="btn" @click.stop="openPop(index)">
                                        <i class="fs_18 iconfont icon-guanli"></i>
                                        <span class="fs_18">管理</span>
                                        <i class="fs_16 iconfont icon-jiant-x" style="margin-left: .2em"></i>
                                        <div class="pop-btn fs_20" v-show="item.btnPopShow">
                                            <div class="sanjiao"></div>
                                            <ul class="pop-list">
                                                <li class="pop-item" :style="{color: item.used==='启用'?'#BFBFBF':'#203262'}" @click="usedChange(0, item)">启用</li>
                                                <li class="pop-item" :style="{color: item.used==='停用'?'#BFBFBF':'#203262'}" @click="usedChange(1, item)">停用</li>
                                                <li class="pop-item" @click="del(index)">删除</li>
                                            </ul>
                                        </div>
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
        <add-line ref="addLine"></add-line>
        <transition name="fade">
            <div class="mask" v-show="detailShow">
                <div class="mask-scroll">
                    <div class="mask-content-wrap">
                    <div class="mask-title-wrap">
                        <div class="mask-title fs_22">
                            详情查看
                            <div class="close" @click="hideDetail">
                                <i class="iconfont icon-guanbi"></i>
                            </div>
                        </div>
                    </div>
                    <div class="mask-content">
                        <table class="mask-table">
                            <colgroup width="10%"></colgroup>
                            <colgroup width="10%"></colgroup>
                            <colgroup width="10%"></colgroup>
                            <colgroup width="10%"></colgroup>
                            <colgroup width="10%"></colgroup>
                            <colgroup width="10%"></colgroup>
                            <colgroup width="10%"></colgroup>
                            <colgroup width="10%"></colgroup>
                            <colgroup width="10%"></colgroup>
                            <colgroup width="10%"></colgroup>
                            <tr class="th fs_22">
                                <td>车间名称</td>
                                <td>车间编码</td>
                                <td>状态</td>
                                <td>单元名称</td>
                                <td>单元编码</td>
                                <td>状态</td>
                                <td>产线名称</td>
                                <td>产线编码</td>
                                <td>状态</td>
                                <td>负责人</td>
                            </tr>
                            <tr class="td fs_20" v-for="(line, index) in detailData" :key="index">
                                <td :rowspan="detailData.length" v-if="index===0">{{line.shopName}}</td>
                                <td :rowspan="detailData.length" v-if="index===0">{{line.shopCode}}</td>
                                <td :rowspan="detailData.length" v-if="index===0" :style="{color: line.shopUsed==='启用'?'#70DEC0':'#E31414'}">{{line.shopUsed}}</td>
                                <td :rowspan="line.rowspan" v-if="line.rowspan">{{line.unitName}}</td>
                                <td :rowspan="line.rowspan" v-if="line.rowspan">{{line.unitCode}}</td>
                                <td :rowspan="line.rowspan" v-if="line.rowspan" :style="{color: line.unitUsed==='启用'?'#70DEC0':'#E31414'}">{{line.unitUsed}}</td>
                                <td>{{line.lineName}}</td>
                                <td>{{line.workId}}</td>
                                <td :style="{color: line.used==='启用'?'#70DEC0':'#E31414'}">{{line.used}}</td>
                                <td>{{line.lineChage}}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="mask-btn-wrap fs_20">
                        <l-button buttonText="返回" @button-click="hideDetail"></l-button>
                    </div>
                </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
  import {pageCallback} from '@/assets/js/mixin'
  import AddLine from './add-line'
  export default {
    name: 'production-line',
    mixins: [pageCallback],
    data () {
      return {
        data: {},
        tableButtonArr1: [{
          dName: '全部',
          pkId: ''
        }],
        params: {
          reqParam: {
            fullName: '',
            unitName: '',
            lineName: '',
            page: 1,
            pageSize: 10,
            used: ''
          }
        },
        detailShow: false,
        detailData: {}
      }
    },
    created () {
      this.getData()
      this.initData()
    },
    methods: {
      initData () {
        this.tableButtonArr1 = this.tableButtonArr1.concat(this.GLOBAL.dictionaryData['for1'])
      },
      getData () {
        this.$http({
          url: this.$api + 'produce/resources/rs/work/list',
          method: 'post',
          data: this.params
        }).then(res => {
          if (res.data.retCode === 1) {
            res.data.retVal.dataList.forEach(item => {
              item.wType = this.$method.queryDictionary.call(this, 970, item.wType)
              item.used = this.$method.queryDictionary.call(this, 400, item.used)
              item.btnPopShow = false
            })
            this.data = res.data.retVal
          }
        })
      },
      clear () {
        this.params.reqParam.fullName = ''
        this.params.reqParam.unitName = ''
        this.params.reqParam.lineName = ''
      },
      tableItemClick1 (data) {
        this.params.reqParam.used = data.pkId
        this.params.reqParam.page = 1
        this.getData()
      },
      openAdd () {
        this.$refs.addLine.show()
      },
      getDetail (item) {
        this.$http({
          url: this.$api + 'produce/resources/rs/work/getById',
          method: 'post',
          data: {
            reqParam: {
              workId: item.workId
            }
          }
        }).then(res => {
          if (res.data.retCode === 1) {
            this.detailShow = true
            let arr = []
            res.data.retVal.units.forEach((unit, index) => {
              unit.lines.forEach((line, i) => {
                if (i === 0) {
                  line.rowspan = unit.lines.length
                  line.unitName = unit.unitName
                  line.unitCode = unit.workId
                  line.unitUsed = this.$method.queryDictionary.call(this, 400, unit.used)
                  line.shopName = res.data.retVal.shopName
                  line.shopCode = res.data.retVal.workId
                  line.shopUsed = this.$method.queryDictionary.call(this, 400, res.data.retVal.used)
                  line.used = this.$method.queryDictionary.call(this, 400, line.used)
                }
                arr.push(line)
              })
            })
            console.log(arr)
            this.detailData = arr
          }
        })
      },
      hideDetail () {
        this.detailShow = false
      },
      usedChange (flag, item) {
        this.$http({
          url: this.$api + 'produce/resources/rs/work/abled',
          method: 'post',
          data: {
            reqParam: {
              workId: item.workId,
              used: this.$method.queryDictionaryForName.call(this, 400, flag === 0 ? '启用':'停用')
            }
          }
        }).then(res => {
          if (res.data.retCode === 1) {
            this.getData()
            this.$message.success('操作成功')
          }
        })
      },
      del (index) {
        this.$confirm('确认删除这条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'post',
            url: this.$api + 'produce/resources/rs/work/delete',
            data: {
              reqParam: {
                workId: this.data.dataList[index].workId
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
      }
    },
    components: {
      AddLine
    }
  }
</script>

<style scoped lang="stylus">
    .production-line
        width 100%
        height 100%
        .search-wrap
            label
                margin-right .5em
                &:nth-of-type(1)
                    margin-left 2.85em
            input
                margin-right 1em
                width 10em
        .table-button-wrap
            .btn
                position absolute
                right 0
                top 50%
                transform translateY(-50%)
        .table-wrap
            width 94.38%
            height 70%
            margin 0 auto
            margin-top 1em
            overflow auto
        .mask-content-wrap
            width 74%
            .mask-content
                padding-top 2em
                padding-bottom .1em
                overflow auto
            tr
                color #414141
                &:nth-of-type(1)
                    font-weight bold
                td
                    line-height 2em
            .mask-btn-wrap
                margin 0 auto
                padding 2em 0
</style>
