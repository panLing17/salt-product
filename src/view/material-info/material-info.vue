<template>
    <div class="material-info">
        <div class="top-card white-bg">
            <!--<div class="top-title view-title">查询</div>-->
            <div class="search-wrap fs_20">
                <label class="label-1">原料名称</label>
                <input type="text" v-model="params.reqParam.mName">
                <label class="label-2">创建日期</label>
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
                <l-button v-if="btnPromise.search" :style="{'margin': '11px 1em 11px 2.5em'}" buttonText="查询" iconName="iconfont icon-chaxx" @button-click="search"></l-button>
                <l-button buttonText="清空" :style="{'margin': '11px 0'}" iconName="iconfont icon-qingk" @button-click="clear"></l-button>
            </div>
        </div>
        <div class="bottom-card white-bg">
            <div class="view-title">
                原料基本信息列表
                <div class="table-button-single fs_18" v-if="btnPromise.add" @click="addShowFn">
                    <i class="iconfont icon-xinz fs_16"></i>
                    <span>新增原料</span>
                </div>
            </div>
            <div class="table-wrap">
                <table class="fs_20 table-header">
                    <colgroup width="20%"></colgroup>
                    <colgroup width="16%"></colgroup>
                    <colgroup width="16%"></colgroup>
                    <colgroup width="16%"></colgroup>
                    <colgroup width="16%"></colgroup>
                    <colgroup width="16%"></colgroup>
                    <tr class="tr">
                        <th class="th">原料名称</th>
                        <th class="th">规格</th>
                        <th class="th">净含量</th>
                        <th class="th">保质期</th>
                        <th class="th">标准号</th>
                        <th class="th">操作</th>
                    </tr>
                </table>
                <div class="table-scroll fs_20">
                    <table class="table fs_20">
                        <colgroup width="20%"></colgroup>
                        <colgroup width="16%"></colgroup>
                        <colgroup width="16%"></colgroup>
                        <colgroup width="16%"></colgroup>
                        <colgroup width="16%"></colgroup>
                        <colgroup width="16%"></colgroup>
                        <tr class="tr" v-for="(item, index) in data.dataList" :key="index">
                            <td class="td">
                                <el-tooltip :open-delay="300" :content="item.mName" placement="top">
                                    <span style="cursor: pointer">{{item.mName}}</span>
                                </el-tooltip>
                            </td>
                            <td class="td">
                                <el-tooltip :open-delay="300" :content="item.spec" placement="top">
                                    <span style="cursor: pointer">{{item.spec}}</span>
                                </el-tooltip>
                            </td>
                            <td class="td">
                                <el-tooltip :open-delay="300" :content="item.cxt" placement="top">
                                    <span style="cursor: pointer">{{item.cxt}}</span>
                                </el-tooltip>
                            </td>
                            <td class="td">
                                <el-tooltip :open-delay="300" :content="item.expDate" placement="top">
                                    <span style="cursor: pointer">{{item.expDate}}</span>
                                </el-tooltip>
                            </td>
                            <td class="td">
                                <el-tooltip :open-delay="300" :content="item.stcode" placement="top">
                                    <span style="cursor: pointer">{{item.stcode}}</span>
                                </el-tooltip>
                            </td>
                            <td class="td btn-wrap">
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
            </div>
            <l-page
                    :totalPage="data.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :currentPage="params.reqParam.page"
            ></l-page>
        </div>
        <transition name="fade">
            <div class="mask" v-if="addShow">
                <div class="mask-content-wrap">
                    <div class="mask-title-wrap">
                        <div class="mask-title fs_22">
                            新增原料
                            <div class="close" @click="addHide">
                                <i class="iconfont icon-guanbi"></i>
                            </div>
                        </div>
                    </div>
                    <div class="mask-content">
                        <table class="mask-table fs_20">
                            <colgroup width="50%"></colgroup>
                            <colgroup width="50%"></colgroup>
                            <tr class="label-wrap">
                                <td>
                                    <label>原料名称</label>
                                    <span>*</span>
                                </td>
                                <td>
                                    <label>规格</label>
                                    <span>*</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" v-model="addParams.reqParam.mName">
                                </td>
                                <td>
                                    <input type="text" v-model="addParams.reqParam.spec">
                                </td>
                            </tr>
                            <tr class="label-wrap">
                                <td>
                                    <label>净含量</label>
                                    <span>*</span>
                                </td>
                                <td>
                                    <label>保质期</label>
                                    <span>*</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" v-model="addParams.reqParam.cxt">
                                </td>
                                <td>
                                    <input type="text" v-model="addParams.reqParam.expDate">
                                </td>
                            </tr>
                            <tr class="label-wrap">
                                <td class="special" colspan="2">
                                    <label>标准号</label>
                                    <span>*</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="special" colspan="2">
                                    <input class="special" type="text" v-model="addParams.reqParam.stcode">
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="mask-btn-wrap fs_20">
                        <l-button buttonText="确认" @button-click="add"></l-button>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div class="mask" v-show="editorShow">
                <div class="mask-content-wrap">
                    <div class="mask-title-wrap">
                        <div class="mask-title fs_22">
                            原料修改
                            <div class="close" @click="hideEditor">
                                <i class="iconfont icon-guanbi"></i>
                            </div>
                        </div>
                    </div>
                    <div class="mask-content" ref="maskContent">
                        <table class="mask-table fs_20">
                            <colgroup width="50%"></colgroup>
                            <colgroup width="50%"></colgroup>
                            <tr class="label-wrap">
                                <td>
                                    <label>原料名称</label>
                                    <span>*</span>
                                </td>
                                <td>
                                    <label>规格</label>
                                    <span>*</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" @focus="setColor($event)" style="color: #BFBFBF" v-model="editorParams.mName">
                                </td>
                                <td>
                                    <input type="text" @focus="setColor($event)" style="color: #BFBFBF" v-model="editorParams.spec">
                                </td>
                            </tr>
                            <tr class="label-wrap">
                                <td>
                                    <label>净含量</label>
                                    <span>*</span>
                                </td>
                                <td>
                                    <label>保质期</label>
                                    <span>*</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" @focus="setColor($event)" style="color: #BFBFBF" v-model="editorParams.cxt">
                                </td>
                                <td>
                                    <input type="text" @focus="setColor($event)" style="color: #BFBFBF" v-model="editorParams.expDate">
                                </td>
                            </tr>
                            <tr class="label-wrap">
                                <td class="special" colspan="2">
                                    <label>标准号</label>
                                    <span>*</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="special" colspan="2">
                                    <input class="special" @focus="setColor($event)" style="color: #BFBFBF" type="text" v-model="editorParams.stcode">
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="mask-btn-wrap fs_20">
                        <l-button buttonText="返回" @button-click="hideEditor" style="margin-right: 1em"></l-button>
                        <l-button buttonText="确认" @button-click="editor"></l-button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
  import {pageCallback} from '@/assets/js/mixin'
  export default {
    name: 'material-info',
    mixins: [pageCallback],
    data () {
      return {
        queryDate: '',
        data: {},
        params: {
          reqParam: {
            mName: '',
            page: 1,
            pageSize: 10,
            startTime: '',
            endTime: ''
          }
        },
        addShow: false,
        addParams: {
          reqParam: {
            mName: '',
            cxt: '',
            spec: '',
            stcode: '',
            expDate: ''
          }
        },
        editorShow: false,
        editorParams: {}
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
    methods: {
      getData () {
        this.$http({
          url: this.$api + 'produce/resources/rs/raw/list',
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
      addShowFn () {
        this.addShow = true
      },
      clear () {
        this.params.reqParam.mName = ''
      },
      add () {
        let p = this.addParams.reqParam
        if(!this.$method.check(p, {
          stcode: '标准号',
          expDate: '保质期',
          cxt: '净含量',
          spec: '规格',
          mName: '原料名称'
        },
          {
            stcode: 50,
            expDate: 50,
            cxt: 150,
            spec: 50,
            mName: 50
          })) {
          return
        }
        this.$http({
          url: this.$api + 'produce/resources/rs/raw/save',
          method: 'post',
          data: this.addParams
        }).then(res => {
          if (res.data.retCode===1) {
            this.addHide()
            this.params.reqParam.page = 1
            this.getData()
            this.$message.success('新增成功')
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
            url: this.$api + 'produce/resources/rs/raw/delete',
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
      hideEditor () {
        this.editorShow = false
        Array.from(this.$refs.maskContent.getElementsByTagName('input')).forEach(item => {
          item.style.color = '#BFBFBF'
        })
      },
      getDetail (item) {
        this.$http({
          url: this.$api + 'produce/resources/rs/raw/getById',
          method: 'post',
          data: {
            reqParam: {
              pkId: item.pkId
            }
          }
        }).then(res => {
          if (res.data.retCode === 1) {
            this.editorShow = true
            this.editorParams = res.data.retVal
          }
        })
      },
      setColor (e) {
        e.target.style.color = '#414141'
      },
      editor () {
        let temp = {}
        temp.mName = this.editorParams.mName
        temp.cxt = this.editorParams.cxt
        temp.spec = this.editorParams.spec
        temp.stcode = this.editorParams.stcode
        temp.expDate = this.editorParams.expDate
        if(!this.$method.check(temp, {
            stcode: '标准号',
            expDate: '保质期',
            cxt: '净含量',
            spec: '规格',
            mName: '原料名称'
          },
          {
            stcode: 50,
            expDate: 50,
            cxt: 150,
            spec: 50,
            mName: 50
          })) {
          return
        }

        this.$http({
          url: this.$api + 'produce/resources/rs/raw/update',
          method: 'post',
          data: {
            reqParam: this.editorParams
          }
        }).then(res => {
          if (res.data.retCode === 1) {
            this.getData()
            this.hideEditor()
            this.$message.success('修改成功')
          }
        })
      },
      addHide() {
        this.addShow = false
        this.addParams.reqParam.mName = ''
        this.addParams.reqParam.cxt = ''
        this.addParams.reqParam.spec = ''
        this.addParams.reqParam.stcode = ''
        this.addParams.reqParam.expDate = ''
      },
      handleChange(data) {
        if(data.flag === 0) {
          this.del(data.index)
        } else {
          this.getDetail(data.item)
        }
      }
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
                width 18em
            .label-2
                margin 0 0.5em 0 1em
        .button-wrap
            width 94%
            height 30px
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
