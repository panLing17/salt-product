<template>
    <div class="product-management-zy">
        <div class="top-card white-bg">
            <!--<div class="top-title view-title">查询</div>-->
            <div class="search-wrap">
                <label class="fs_20">产品名称</label>
                <input class="fs_20" type="text" v-model="params.reqParam.productName" />
                <l-button v-if="btnPromise.search" :style="{'margin': '11px 1em 11px 2.5em'}" buttonText="查询" iconName="iconfont icon-chaxx" @button-click="search"></l-button>
                <l-button buttonText="清空" :style="{'margin': '11px 0'}" iconName="iconfont icon-qingk" @button-click="clear"></l-button>
            </div>
        </div>
        <div class="bottom-card white-bg">
            <div class="view-title">统筹产品列表</div>
            <div class="table-button-wrap">
                <table-button v-if="btnPromise.search" class="fs_18" :data="tableButtonArr1" @item-click="tableItemClick1"></table-button>
                <table-button v-if="btnPromise.search" class="fs_18" style="margin-left: 2.777em" :data="tableButtonArr2" @item-click="tableItemClick2"></table-button>
                <div class="table-button-single"  v-if="btnPromise.sync">
                    导入自营产品
                    <input type="file" ref="fileInput" name="codeFile" @change="importProduct">
                </div>
            </div>
            <div class="table-wrap">
                <table class="fs_20 table-header">
                    <colgroup width="20%"></colgroup>
                    <colgroup width="20%"></colgroup>
                    <colgroup width="15%"></colgroup>
                    <colgroup width="10%"></colgroup>
                    <colgroup width="12%"></colgroup>
                    <colgroup width="7%"></colgroup>
                    <colgroup width="16%"></colgroup>
                    <tr class="tr">
                        <th class="th">产品编码</th>
                        <th class="th">产品名称</th>
                        <th class="th">品规</th>
                        <th class="th">每箱含量</th>
                        <th class="th">每托含量</th>
                        <th class="th">允许生产</th>
                        <th class="th">操作</th>
                    </tr>
                </table>
                <div class="table-scroll fs_20">
                    <table class="table fs_20">
                        <colgroup width="20%"></colgroup>
                        <colgroup width="20%"></colgroup>
                        <colgroup width="15%"></colgroup>
                        <colgroup width="10%"></colgroup>
                        <colgroup width="12%"></colgroup>
                        <colgroup width="7%"></colgroup>
                        <colgroup width="16%"></colgroup>
                        <tr class="tr" v-for="(item, index) in data.dataList" :key="index">
                            <td class="td">
                                <el-tooltip :open-delay="300" :content="item.productCode" placement="top">
                                    <span style="cursor: pointer">{{item.productCode}}</span>
                                </el-tooltip>
                            </td>
                            <td class="td">
                                <el-tooltip :open-delay="300" :content="item.productName" placement="top">
                                    <span style="cursor: pointer">{{item.productName}}</span>
                                </el-tooltip>
                            </td>
                            <td class="td">
                                <el-tooltip :open-delay="300" :content="item.spec" placement="top">
                                    <span style="cursor: pointer">{{item.spec}}</span>
                                </el-tooltip>
                            </td>
                            <td class="td">
                                <el-tooltip :open-delay="300" :content="item.boxRatio + '袋'" placement="top">
                                    <span style="cursor: pointer">{{item.boxRatio}}</span>
                                </el-tooltip>
                            </td>
                            <td class="td">
                                <el-tooltip :open-delay="300" :content="item.tpRatio + '箱'" placement="top">
                                    <span style="cursor: pointer">{{item.tpRatio}}箱</span>
                                </el-tooltip>
                            </td>
                            <td class="td">{{item.prodStatus}}</td>
                            <td class="td btn-wrap">
                                <div class="btn" @click="getDetail(item,0)">
                                    <i class="fs_18 iconfont icon-xiangq"></i>
                                    <span class="fs_18">详情</span>
                                </div>
                                <el-dropdown trigger="click"  @command="handleChange">
                                  <span class="el-dropdown-link">
                                    <i class="iconfont icon-guanli"></i>管理<i class="fs_16 iconfont icon-jiant-x"></i>
                                  </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item :command="{flag:0,index}" v-if="btnPromise.del">删除</el-dropdown-item>
                                        <el-dropdown-item :command="{flag:1,item}" v-if="btnPromise.set">设置每托含量</el-dropdown-item>
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
            <div class="mask" v-show="detailShow">
                <div class="mask-scroll">
                    <div class="mask-content-wrap">
                        <div class="mask-title-wrap">
                            <div class="mask-title fs_22">
                                产品管理-查看
                                <div class="close" @click="hideMask">
                                    <i class="iconfont icon-guanbi"></i>
                                </div>
                            </div>
                        </div>
                        <div class="tab-wrap fs_20">
                            <div class="tab-item" :class="{active: tabItemActive===0}" @click="tabItemActive=0">基本信息</div>
                            <div class="tab-item" :class="{active: tabItemActive===1}" @click="tabItemActive=1">产品配料</div>
                            <div class="tab-item" :class="{active: tabItemActive===2}" @click="tabItemActive=2">营养成分</div>
                        </div>
                        <div class="mask-content" v-show="tabItemActive===0">
                            <div>
                                <div class="imgs-wrap">
                                    <div class="img" v-for="item in detailData.imgs" :key="item">
                                        <img :src="item.img" @click="$method.magnifier(item.img)" />
                                    </div>
                                </div>
                                <table class="mask-table fs_20" style="margin-top: 1em">
                                    <colgroup width="12%"></colgroup>
                                    <colgroup width="20%"></colgroup>
                                    <colgroup width="12%"></colgroup>
                                    <colgroup width="20%"></colgroup>
                                    <colgroup width="12%"></colgroup>
                                    <colgroup width="24%"></colgroup>
                                    <tr>
                                        <td>产品名称</td>
                                        <td>{{detailData.productName}}</td>
                                        <td>产品编码</td>
                                        <td>{{detailData.productCode}}</td>
                                        <td>产品品牌</td>
                                        <td>{{detailData.productBrand}}</td>
                                    </tr>
                                    <tr>
                                        <td>碘盐标志</td>
                                        <td>{{detailData.iodate}}</td>
                                        <td>规格</td>
                                        <td>{{detailData.spec}}</td>
                                        <td>净含量</td>
                                        <td>{{detailData.netWeight}}克</td>
                                    </tr>
                                    <tr>
                                        <td>执行标准</td>
                                        <td>{{detailData.standardCode}}</td>
                                        <td>保质期(月)</td>
                                        <td>{{detailData.expiryDate}}个月</td>
                                        <td>贮存条件</td>
                                        <td>{{detailData.storageCondition}}</td>
                                    </tr>
                                    <tr>
                                        <td>包装类型</td>
                                        <td>{{detailData.packType}}</td>
                                        <td>包装方式</td>
                                        <td>{{detailData.packMethod}}</td>
                                        <td>包装形式</td>
                                        <td>{{detailData.packStyle}}</td>
                                    </tr>
                                    <tr>
                                        <td>产品类别</td>
                                        <td>{{detailData.productType}}</td>
                                        <td>生产工艺</td>
                                        <td>{{detailData.craftWork}}</td>
                                        <td>每箱含量</td>
                                        <td>{{detailData.boxRatio}}包</td>
                                    </tr>
                                    <tr>
                                        <td>包装计量单位</td>
                                        <td>{{detailData.packUnit}}</td>
                                        <td>存储计量单位</td>
                                        <td>{{detailData.unit}}</td>
                                        <td>中盐平台编码</td>
                                        <td>{{detailData.customCode}}</td>
                                    </tr>
                                    <tr>
                                        <td>生产过程关键工序控制点</td>
                                        <td>{{detailData.processNode}}</td>
                                        <td>规格与存储单位等价值</td>
                                        <td>{{detailData.equivalent}}</td>
                                        <td>使用方法与温馨提示</td>
                                        <td>{{detailData.edibleMethod}}{{detailData.kindlyReminder}}</td>
                                    </tr>
                                    <tr>
                                        <td>产品介绍与适用人群</td>
                                        <td colspan="5">{{detailData.introduction}}{{detailData.spp}}</td>
                                    </tr>
                                    <tr>
                                        <td>备注：</td>
                                        <td colspan="5">{{detailData.remark}}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div class="mask-content" v-show="tabItemActive===1">
                            <table class="mask-table fs_20"  style="text-align: center; margin-top: 0">
                                <colgroup width="50%"></colgroup>
                                <colgroup width="50%"></colgroup>
                                <tr>
                                    <td>配料名称</td>
                                    <td>配料含量</td>
                                </tr>
                                <tr v-for="(item, index) in detailData.ingredients" :key="index">
                                    <td>{{item.name}}</td>
                                    <td>{{item.ctx}}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="mask-content" v-show="tabItemActive===2">
                            <table class="mask-table fs_20"  style="text-align: center; margin-top: 0">
                                <colgroup width="33.33%"></colgroup>
                                <colgroup width="33.33%"></colgroup>
                                <colgroup width="33.33%"></colgroup>
                                <tr>
                                    <td>名称</td>
                                    <td>每100g</td>
                                    <td>NRV%</td>
                                </tr>
                                <tr v-for="(item, index) in detailData.nutrients" :key="index">
                                    <td>{{item.item}}</td>
                                    <td>{{item.egk}}</td>
                                    <td>{{item.nrv}}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="mask-btn-wrap fs_20">
                            <l-button buttonText="返回" @button-click="hideMask"></l-button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div class="mask" v-show="maskShow">
                <div class="mask-content-wrap">
                    <div class="mask-title-wrap">
                        <div class="mask-title fs_22">
                            设置每托含量
                            <div class="close" @click="maskShow=false, productCodeSet=''">
                                <i class="iconfont icon-guanbi"></i>
                            </div>
                        </div>
                    </div>
                    <div class="mask-content clear-float" style="margin-top: 1em">
                        <div class="left">
                            <img :src="detailData.imgs[0]?detailData.imgs[0].img:''" alt="">
                        </div>
                        <div class="right">
                            <table class="mask-table">
                                <colgroup width="20%"></colgroup>
                                <colgroup width="80%"></colgroup>
                                <tr>
                                    <td>产品编码</td>
                                    <td>{{detailData.productCode}}</td>
                                </tr>
                                <tr>
                                    <td>产品名称</td>
                                    <td>{{detailData.productName}}</td>
                                </tr>
                                <tr>
                                    <td>规格</td>
                                    <td>{{detailData.spec}}</td>
                                </tr>
                                <tr>
                                    <td>碘盐标志</td>
                                    <td>{{detailData.iodate}}</td>
                                </tr>
                                <tr>
                                    <td>每箱含量</td>
                                    <td>{{detailData.boxRatio}}包</td>
                                </tr>
                            </table>
                            <table class="mask-table special">
                                <colgroup width="20%"></colgroup>
                                <colgroup width="80%"></colgroup>
                                <tr>
                                    <td>设置每托含量</td>
                                    <td style="padding-left: 0">
                                        <input type="text" autofocus v-model="productCodeSet">
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="mask-btn-wrap fs_20">
                        <l-button buttonText="确认" @button-click="setCount"></l-button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
  import {pageCallback} from '@/assets/js/mixin'
  export default {
    name: 'product-management-zy',
    mixins: [pageCallback],
    data () {
      return {
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
            productName: '',
            iodate: '',
            packStyle: '',
            page: 1,
            pageSize: 10

          }
        },
        data: {},
        detailData: {
          ingredients: {},
          nutrients: {},
          imgs: []
        },
        detailShow: false,
        tabItemActive: 0,
        maskShow: false,
        productCodeSet: '',
        syncSelectData: []
      }
    },
    created () {
      this.initData()
    },
    methods: {
      initData () {
        this.tableButtonArr1 = this.tableButtonArr1.concat(this.GLOBAL.dictionaryData[100])
        this.tableButtonArr2 = this.tableButtonArr2.concat(this.GLOBAL.dictionaryData[920])
      },
      getData () {
        this.$http({
          method: 'post',
          url: this.$api + 'produce/resources/rs/product/list',
          data: this.params
        }).then((res) => {
          if (res.data.retCode === 1) {
            res.data.retVal.dataList.forEach(item => {
                item.btnPopShow = false
                item.prodStatus = this.$method.queryDictionary.call(this, 400, item.prodStatus)
              }
            )
            this.data = res.data.retVal
          }
        })
      },
      clear () {
        this.params.reqParam.productName = ''
      },
      tableItemClick1 (data) {
        this.params.reqParam.iodate = data.pkId
        this.params.reqParam.page = 1
        this.getData()
      },
      tableItemClick2 (data) {
        this.params.reqParam.packStyle = data.pkId
        this.params.reqParam.page = 1
        this.getData()
      },
      getDetail (item, flag) {
        this.$http({
          method: 'post',
          url: this.$api + 'produce/resources/rs/product/getById',
          data: {
            reqParam: {
              productCode: item.productCode
            }
          }
        }).then((res) => {
          if (res.data.retCode === 1) {
            let d = this.GLOBAL.dictionaryData
            for (let i in d[100]) {
              if (d[100][i].pkId === res.data.retVal.iodate) {
                res.data.retVal.iodate = d[100][i].dName
              }
            }
            for (let i in d[930]) {
              if (d[930][i].pkId === res.data.retVal.packType) {
                res.data.retVal.packType = d[930][i].dName
              }
            }
            for (let i in d[920]) {
              if (d[920][i].pkId === res.data.retVal.packStyle) {
                res.data.retVal.packStyle = d[920][i].dName
              }
            }
            this.detailData = res.data.retVal
            flag === 0 ? (this.detailShow = true) : (this.maskShow = true)

          }
        })
      },
      synData () {
        this.$http({
          url: this.$api + 'produce/personal/getClientId',
          method: 'post',
          data: {}
        }).then((res) => {
          if (res.data.retCode === 1) {
            if (res.data.retVal.clientId === '000000') {
              this.syncAll()
            } else {
              this.syncQuery()
            }
          }
        })
      },
      hideMask () {
        this.tabItemActive = 0
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
            url: this.$api + 'produce/resources/rs/product/delete',
            data: {
              reqParam: {
                productCode: this.data.dataList[index].productCode
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
      setCount () {
        if (this.productCodeSet.length === 0 || this.productCodeSet.length>10) {
          this.$message.warning('请输入长度为1-10的数字')
          return
        }
        if (isNaN(this.productCodeSet)) {
          this.$message.warning('请输入数字')
          return
        }

        this.$http({
          method: 'post',
          url: this.$api + 'produce/resources/rs/product/updateTpRatio',
          data: {
            reqParam: {
              productCode: this.detailData.productCode,
              tpRatio: this.productCodeSet
            }
          }
        }).then((res) => {
          if (res.data.retCode === 1) {
            this.productCodeSet = ''
            this.$message.success('设置成功')
            this.maskShow = false
            this.params.reqParam.page = 1
            this.getData()
          }
        })
      },
      handleChange(data) {
        if(data.flag === 0) {
          this.del(data.index)
        } else {
          this.getDetail(data.item, 1)
        }
      },
      importProduct() {
        let input = this.$refs.fileInput.files[0]
        this.$http({
          method: 'post',
          url: this.$api + 'produce/resources/rs/product/import',
          data: {
            productFile: input
          }
        }).then((res) => {
          this.$refs.fileInput.value = ''
          if (res.data.retCode === 1) {
            this.$message.success('导入成功')
          }
        })

      }
    }
  }
</script>

<style scoped lang="stylus">
    .product-management-zy
        width 100%
        height 100%
        .search-wrap
            font-size 0
            label
                margin 0 .5em 0 2.85em
            input
                width 23%
                border 1px solid #BFBFBF
                border-radius 4px
                line-height 1.9em
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
        .table-wrap
            width 94.38%
            /*height 70%*/
            margin 1% auto 0
            /*overflow auto*/
            box-sizing border-box
        .mask-content-wrap
            width 74.8%
            .tab-wrap
                font-weight bold
                color #414141
                width 93%
                margin 0 auto
                .tab-item
                    display inline-block
                    line-height 3.9em
                    padding 0 1.5em
                    position relative
                    cursor pointer
                    &.active
                        color #5F7FD9
                        &:nth-of-type(1)
                            &:after
                                left 0
                                transform translateX(0)
                        &:after
                            content ''
                            display block
                            height 2px
                            width 4em
                            background-color #5F7FD9
                            position absolute
                            bottom 1em
                            left 50%
                            transform translateX(-50%)
                    &:nth-of-type(1)
                        padding-left 0
                    &:before
                        content ''
                        display block
                        width 1px
                        height 1.15em
                        background-color #414141
                        position absolute
                        right 0
                        top 50%
                        transform translateY(-50%)
            .mask-content
                width 93%
                margin 0 auto
                overflow auto
                position relative
                /*.imgs-wrap
                    font-size 0
                    display flex
                    justify-content space-between
                    flex-wrap wrap
                    img
                        width 24%
                        border 1px solid #707070
                        border-radius 4px*/
                .imgs-wrap
                    font-size 0
                    .img
                        display inline-block
                        vertical-align top
                        margin-right 1%
                        width 24%
                        border 1px solid #707070
                        border-radius 4px
                        height 0
                        padding-bottom 24%
                        position relative
                        overflow hidden
                        &:last-child
                            margin-right 0
                    img
                        position absolute
                        left 0
                        top 0
                        width 100%
                        height 100%
                .left
                    float left
                    font-size 0
                    width 27%
                    height 0
                    padding-bottom 27%
                    background-color #1b6d85
                    overflow hidden
                    border 1px solid #707070
                    position relative
                    img
                        width 100%
                        max-height 100%
                        position absolute
                        top 0
                        left 0
                .right
                    float right
                    width 70%
                    .special
                        width 100%
                        margin-top 20px
                        input
                            border none
                            width 100%
                            height 100%
            .mask-table
                width 100%
                table-layout auto
                td
                    height 2.5em
                    white-space normal
            .mask-btn-wrap
                width 93%
                margin 0 auto
                padding 1.7em 0 4em
                text-align right
    @media only screen and (min-width: 1366px) {

    }
</style>
