<template>
    <div class="step1 fs_20">
        <table class="label-table fs_20">
            <colgroup width="20%"></colgroup>
            <colgroup width="20%"></colgroup>
            <colgroup width="20%"></colgroup>
            <colgroup width="20%"></colgroup>
            <colgroup width="20%"></colgroup>
            <tr>
                <td>
                    <label>生产批号</label>
                    <span>*</span>
                </td>
                <td>
                    <label>计划产量</label>
                    <span>*</span>
                </td>
                <td>
                    <label>存储计量单位</label>
                    <span>*</span>
                </td>
                <td>
                    <label>每托含量</label>
                    <span>*</span>
                </td>
                <td>
                    <label>申请人</label>
                    <span>*</span>
                </td>
            </tr>
            <tr>
                <td>
                    <input type="text" v-model="params.reqParam.batch">
                </td>
                <td>
                    <input type="text" v-model="params.reqParam.plans">
                </td>
                <td>
                    <input type="text" v-model="params.reqParam.unit">
                </td>
                <td>
                    <input type="text" v-model="params.reqParam.tpRatio">
                </td>
                <td>
                    <input type="text" v-model="params.reqParam.applicant">
                </td>
            </tr>
            <tr>
                <td colspan="5" style="padding-top: 1em">
                    <label>产品名称</label>
                    <span>*</span>
                </td>
            </tr>
            <tr>
                <td colspan="5">
                    <el-select v-model="productCode" filterable  placeholder="">
                        <el-option
                                v-for="item in productList"
                                :key="item.productCode"
                                :label="item.productName"
                                :value="item.productCode">
                        </el-option>
                    </el-select>
                </td>
            </tr>
        </table>
        <div class="detail-wrap clear-float">
            <div class="img">
                <img :src="product.imgs[0]?product.imgs[0].img:''" @error="$method.imgError($event)" alt="">
            </div>
            <table class="detail-table fs_20">
                <colgroup width="10%"></colgroup>
                <colgroup width="20%"></colgroup>
                <colgroup width="10%"></colgroup>
                <colgroup width="25%"></colgroup>
                <colgroup width="10%"></colgroup>
                <colgroup width="25%"></colgroup>
                <tr>
                    <td>产品名称</td>
                    <td>{{product.productName}}</td>
                    <td>产品编码</td>
                    <td>{{product.productCode}}</td>
                    <td>产品品牌</td>
                    <td>{{product.productBrand}}</td>
                </tr>
                <tr>
                    <td>碘盐标志</td>
                    <td>{{product.iodate}}</td>
                    <td>规格</td>
                    <td>{{product.spec}}</td>
                    <td>净含量</td>
                    <td>{{product.netWeight}}</td>
                </tr>
                <tr>
                    <td>执行标准</td>
                    <td>{{product.standardCode}}</td>
                    <td>保质期(月)</td>
                    <td>{{product.expiryDate}}个月</td>
                    <td>贮存条件</td>
                    <td>{{product.storageCondition}}</td>
                </tr>
                <tr>
                    <td>包装类型</td>
                    <td>{{product.packType}}</td>
                    <td>包装方式</td>
                    <td>{{product.packMethod}}</td>
                    <td>包装形式</td>
                    <td>{{product.packStyle}}</td>
                </tr>
                <tr>
                    <td>产品类别</td>
                    <td>{{product.productType}}</td>
                    <td>生产工艺</td>
                    <td>{{product.craftWork}}</td>
                    <td>每箱含量</td>
                    <td>{{product.boxRatio}}</td>
                </tr>
                <tr>
                    <td>包装计量单位</td>
                    <td>{{product.packUnit}}</td>
                    <td>存储计量单位</td>
                    <td>{{product.unit}}</td>
                    <td>中盐平台编码</td>
                    <td>{{product.customCode}}</td>
                </tr>
                <tr>
                    <td>生产过程关键工序控制点</td>
                    <td>{{product.processNode}}</td>
                    <td>规格与存储单位等价值</td>
                    <td>{{product.equivalent}}</td>
                    <td>使用方法与温馨提示</td>
                    <td>{{product.edibleMethod}},{{product.kindlyReminder}}</td>
                </tr>
            </table>
        </div>
        <div class="btn-wrap">
            <div class="table-button-single" @click="add">下一步</div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'step1',
    data() {
      return {
        productList: [],
        productCode: '',
        product: {
          imgs: []
        },
        params: {
          reqParam: {
            batch: '',
            productCode: '',
            tpRatio: '',
            plans: '',
            unit: '',
            applicant: ''
          }
        }
      }
    },
    watch: {
      productCode(newVal) {
        if(newVal) {
          this.getProduct()
        }
      }
    },
    created() {
      this.getProductList()
    },
    methods: {
      getProductList() {
        this.$http({
          url: this.$api + 'produce/resources/rs/product/getForCombox',
          method: 'post',
          data: {
            reqParam: {
              productName: '',
              prodStatus: this.$method.queryDictionaryForName.call(this, 'for2', '是')
            }
          }
        }).then(res => {
          if(res.data.retCode === 1) {
            this.productList = res.data.retVal
          }
        })
      },
      getProduct() {
        this.$http({
          url: this.$api + 'produce/resources/rs/product/getById',
          method: 'post',
          data: {
            reqParam: {
              productCode: this.productCode
            }
          }
        }).then(res => {
          if(res.data.retCode === 1) {
            res.data.retVal.iodate = this.$method.queryDictionary.call(this, 100, res.data.retVal.iodate)
            res.data.retVal.packType = this.$method.queryDictionary.call(this, 930, res.data.retVal.packType)
            res.data.retVal.packStyle = this.$method.queryDictionary.call(this, 920, res.data.retVal.packStyle)
            this.product = res.data.retVal
          }
        })
      },
      add() {
        this.params.reqParam.productCode = this.productCode
        this.$http({
          url: this.$api + 'produce/production/pd/batch/save',
          method: 'post',
          data: this.params
        }).then(res => {
          if(res.data.retCode === 1) {
            this.productList.forEach(item => {
              if(item.productCode === this.productCode) {
                this.params.reqParam.productName = item.productName
              }
            })
            this.params.reqParam.pkId = res.data.retVal.pkId
            sessionStorage.setItem('currentDetail', JSON.stringify(this.params.reqParam))
            this.$router.push('/addBatch/step2')
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
    .step1
        .label-table
            width 100%
            tr
                td
                    color #414141
                    padding-left 1em
                    &:nth-of-type(1)
                        padding-left 0
                    span
                        color #D91C1C
                    input
                        width 100%
                        height 2em
                        border 1px solid #BFBFBF
                        border-radius 4px
        .detail-wrap
            margin-top 1em
            .img
                float left
                width 24.6%
                height 0
                padding-bottom 24.6%
                position relative
                bakcground-color #E3E3E3
                font-size 0
                img
                    position absolute
                    width 100%
                    height 100%
            .detail-table
                float right
                width 75%
                border 1px solid #BFBFBF
                table-layout fixed
                border-collapse collapse
                tr
                    border 1px solid #BFBFBF
                    td
                        height 2em
                        padding-left .2em
                        border 1px solid #BFBFBF

        .btn-wrap
            position relative
            margin-top 1em
</style>
<style lang="stylus">
    .step1
        .el-select
            width 30%
        .el-input__inner
            height 2em
            line-height 2em
            border-color #BFBFBF
        .el-input__icon
            line-height 2em
</style>
