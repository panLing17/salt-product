<template>
    <div class="material-company">
        <div class="top-card white-bg">
            <div class="top-title view-title">查询</div>
            <div class="search-wrap fs_20">
                <label class="label-1">企业名称</label>
                <input type="text" v-model="params.reqParam.fName">
                <label class="label-2">生产许可证号</label>
                <input type="text" v-model="params.reqParam.pLicense">
                <l-button :style="{'margin': '0 1em 0 2.5em'}" buttonText="查询" iconName="iconfont icon-chaxx" @button-click="getData"></l-button>
                <l-button buttonText="清空" iconName="iconfont icon-qingk" @button-click="clear"></l-button>
            </div>
        </div>
        <div class="bottom-card white-bg">
            <div class="view-title">
                原料生产企业列表
                <div class="table-button-single fs_18" @click="openAdd">
                    <i class="iconfont icon-xinz fs_16"></i>
                    <span>新增原料生产企业</span>
                </div>
            </div>
            <div class="table-wrap">
                <table class="fs_20 table-header">
                    <colgroup width="27%"></colgroup>
                    <colgroup width="28%"></colgroup>
                    <colgroup width="15%"></colgroup>
                    <colgroup width="15%"></colgroup>
                    <colgroup width="15%"></colgroup>
                    <tr class="tr">
                        <th class="th">企业名称</th>
                        <th class="th">企业地址</th>
                        <th class="th">营业执照号</th>
                        <th class="th">生产许可证号</th>
                        <th class="th">操作</th>
                    </tr>
                </table>
                <table class="table fs_20">
                    <colgroup width="27%"></colgroup>
                    <colgroup width="28%"></colgroup>
                    <colgroup width="15%"></colgroup>
                    <colgroup width="15%"></colgroup>
                    <colgroup width="15%"></colgroup>
                    <tr class="tr" v-for="(item, index) in data.dataList" :key="index">
                        <td class="td">{{item.fName}}</td>
                        <td class="td">{{item.address}}</td>
                        <td class="td">{{item.bLicense}}</td>
                        <td class="td">{{item.pLicense}}</td>
                        <td class="td btn-wrap">
                            <div class="btn" @click="getDetail(item, 0)">
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
                                        <li class="pop-item" @click="del(index)">删除</li>
                                        <li class="pop-item" @click="getDetail(item, 1)">修改</li>
                                    </ul>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <l-page
                    :totalPage="data.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
            ></l-page>
        </div>
        <transition name="fade">
            <div class="mask" v-if="addShow">
                <div class="mask-content-wrap">
                    <div class="mask-title-wrap">
                        <div class="mask-title fs_22">
                            新增原料
                            <div class="close" @click="addShow=false">
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
                                    <label>企业名称</label>
                                    <span>*</span>
                                </td>
                                <td>
                                    <label>企业地址</label>
                                    <span>*</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" v-model="addParams.reqParam.fName">
                                </td>
                                <td>
                                    <input type="text" v-model="addParams.reqParam.address">
                                </td>
                            </tr>
                            <tr class="label-wrap">
                                <td>
                                    <label>营业执照号</label>
                                    <span>*</span>
                                </td>
                                <td>
                                    <label>生产许可证号</label>
                                    <span>*</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" v-model="addParams.reqParam.bLicense">
                                </td>
                                <td>
                                    <input type="text" v-model="addParams.reqParam.pLicense">
                                </td>
                            </tr>
                            <tr class="label-wrap">
                                <td>
                                    <label>企业联系电话</label>
                                    <span>*</span>
                                </td>
                                <td>
                                    <label>企业网址</label>
                                    <span>*</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" v-model="addParams.reqParam.tel">
                                </td>
                                <td>
                                    <input type="text" v-model="addParams.reqParam.website">
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
            <div class="mask" v-show="detailShow">
                <div class="mask-content-wrap">
                    <div class="mask-title-wrap">
                        <div class="mask-title fs_22">
                            原料生产企业详情
                            <div class="close" @click="detailShow=false">
                                <i class="iconfont icon-guanbi"></i>
                            </div>
                        </div>
                    </div>
                    <div class="mask-content2">
                        <table class="mask-table2">
                            <colgroup width="15%"></colgroup>
                            <colgroup width="35%"></colgroup>
                            <colgroup width="15%"></colgroup>
                            <colgroup width="35%"></colgroup>
                            <tr>
                                <td>企业名称</td>
                                <td>{{detailData.fName}}</td>
                                <td>企业地址</td>
                                <td>{{detailData.address}}</td>
                            </tr>
                            <tr>
                                <td>营业执照号</td>
                                <td>{{detailData.bLicense}}</td>
                                <td>生产许可证号</td>
                                <td>{{detailData.pLicense}}</td>
                            </tr>
                            <tr>
                                <td>企业联系电话</td>
                                <td>{{detailData.tel}}</td>
                                <td>企业网址</td>
                                <td>{{detailData.website}}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="mask-btn-wrap2 fs_20">
                        <l-button buttonText="返回" @button-click="hideDetail"></l-button>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div class="mask" v-show="editorShow">
                <div class="mask-content-wrap">
                    <div class="mask-title-wrap">
                        <div class="mask-title fs_22">
                            原料企业修改
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
                                    <label>企业名称</label>
                                    <span>*</span>
                                </td>
                                <td>
                                    <label>企业地址</label>
                                    <span>*</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" @focus="setColor($event)" style="color: #BFBFBF" v-model="detailData.fName">
                                </td>
                                <td>
                                    <input type="text" @focus="setColor($event)" style="color: #BFBFBF" v-model="detailData.address">
                                </td>
                            </tr>
                            <tr class="label-wrap">
                                <td>
                                    <label>营业执照号</label>
                                    <span>*</span>
                                </td>
                                <td>
                                    <label>生产许可证号</label>
                                    <span>*</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" @focus="setColor($event)" style="color: #BFBFBF" v-model="detailData.bLicense">
                                </td>
                                <td>
                                    <input type="text" @focus="setColor($event)" style="color: #BFBFBF" v-model="detailData.pLicense">
                                </td>
                            </tr>
                            <tr class="label-wrap">
                                <td>
                                    <label>企业联系电话</label>
                                    <span>*</span>
                                </td>
                                <td>
                                    <label>企业网址</label>
                                    <span>*</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" @focus="setColor($event)" style="color: #BFBFBF" v-model="detailData.tel">
                                </td>
                                <td>
                                    <input type="text" @focus="setColor($event)" style="color: #BFBFBF" v-model="detailData.website">
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
    name: 'material-company',
    mixins: [pageCallback],
    data () {
      return {
        data: {},
        params: {
          reqParam: {
            fName: '',
            pLicense: '',
            page: 1,
            pageSize: 10
          }
        },
        addShow: false,
        addParams: {
          reqParam: {
            fName: '',
            address: '',
            bLicense: '',
            pLicense: '',
            tel: '',
            website: ''
          }
        },
        detailShow: false,
        detailData: {},
        editorShow: false
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData() {
        this.$http({
          url: this.$api + 'produce/resources/rs/raw/factory/list',
          method: 'post',
          data: this.params
        }).then(res => {
          if (res.data.retCode === 1) {
            res.data.retVal.dataList.forEach(item => {
              item.btnPopShow = false
            })
            this.data = res.data.retVal
          }
        })
      },
      clear () {
        this.params.reqParam.fName = ''
        this.params.reqParam.pLicense = ''
      },
      openAdd () {
        this.addShow = true
      },
      add () {
        let p = this.addParams.reqParam
        if (p.fName.length===0 || p.address.length===0
          || p.bLicense.length===0 || p.pLicense.length===0
          || p.tel.length===0 || p.website.length===0) {
          this.$message.warning('星号为必填项')
          return
        }
        this.$http({
          url: this.$api + 'produce/resources/rs/raw/factory/save',
          method: 'post',
          data: this.addParams
        }).then(res => {
          if (res.data.retCode === 1) {
            this.params.reqParam.page = 1
            this.getData()
            this.addShow = false
            this.$message.success('新增成功')
          }
        })
      },
      getDetail (item, flag) {
        this.$http({
          url: this.$api + 'produce/resources/rs/raw/factory/getById',
          method: 'post',
          data: {
            reqParam: {
              pkId: item.pkId
            }
          }
        }).then(res => {
          if (res.data.retCode === 1) {
            this.detailData = res.data.retVal
            flag===0?(this.detailShow = true):(this.editorShow = true)
          }
        })
      },
      hideDetail () {
        this.detailShow = false
      },
      del (index) {
        this.$confirm('确认删除这条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'post',
            url: this.$api + 'produce/resources/rs/raw/factory/delete',
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
      setColor (e) {
        e.target.style.color = '#414141'
      },
      editor () {
        this.$http({
          url: this.$api + 'produce/resources/rs/raw/factory/update',
          method: 'post',
          data: {
            reqParam: this.detailData
          }
        }).then(res => {
          if (res.data.retCode === 1) {
            this.getData()
            this.hideEditor()
            this.$message.success('修改成功')
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
    .material-company
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
            margin 0 auto
            position relative
            .btn
                position absolute
                right 0
                top -2em
        .table-wrap
            width 94%
            height 70%
            margin 0 auto
            overflow auto
        .mask-content-wrap
            width 75%
            top 15%
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
            .mask-content2
                width 93%
                margin 2em auto 0
                .mask-table2
                    width 100%
                    border 1px solid #BFBFBF
                    border-collapse collapse
                    tr
                        border 1px solid #BFBFBF
                        td
                            border 1px solid #BFBFBF
                            padding-left 1.5em
                            color #414141
                            line-height 3.5em
            .mask-btn-wrap2
                width 93%
                text-align right
                margin 0 auto
                padding 3em 0 5em
</style>
