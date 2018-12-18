<template>
    <div class="information-1 clear-float">
        <div class="img">
            <img :src="data.imgs[0]?data.imgs[0].img:''" @error="$method.imgError($event)" alt="">
        </div>
        <table class="table fs_20">
            <tr class="tr">
                <td class="td">产品名称</td>
                <td class="td">{{data.productName}}</td>
                <td class="td">规格</td>
                <td class="td">{{data.spec}}</td>
                <td class="td">碘盐标志</td>
                <td class="td">{{data.iodate}}</td>
            </tr>
            <tr class="tr">
                <td class="td">净含量</td>
                <td class="td">{{data.netWeight}}</td>
                <td class="td">保质期(月)</td>
                <td class="td">{{data.expiryDate}}个月</td>
                <td class="td">贮存条件</td>
                <td class="td">{{data.storageCondition}}</td>
            </tr>
            <tr class="tr">
                <td class="td">产品品牌</td>
                <td class="td">{{data.productBrand}}</td>
                <td class="td">产品种类</td>
                <td class="td">{{data.productCategory}}</td>
                <td class="td">产品类别</td>
                <td class="td">{{data.productType}}</td>
            </tr>
            <tr class="tr">
                <td class="td">包装类型</td>
                <td class="td">{{data.packType}}</td>
                <td class="td">包装方式</td>
                <td class="td">{{data.packMethod}}</td>
                <td class="td">包装形式</td>
                <td class="td">{{data.packStyle}}</td>
            </tr>
            <tr class="tr">
                <td class="td">每箱含量</td>
                <td class="td">{{data.boxRatio}}</td>
                <td class="td">包装计量单位</td>
                <td class="td">{{data.packUnit}}</td>
                <td class="td">存储计量单位</td>
                <td class="td">{{data.unit}}</td>
            </tr>
            <tr class="tr">
                <td class="td">执行标准</td>
                <td class="td">{{data.standardCode}}</td>
                <td class="td">生产工艺</td>
                <td class="td">{{data.craftWork}}</td>
                <td class="td"></td>
                <td class="td"></td>
            </tr>
            <tr class="tr">
                <td class="td">产品介绍</td>
                <td class="td" colspan="5">{{data.introduction}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
  export default {
    name: 'information-1',
    props: {
      currentDetail: {
        type: Object
      }
    },
    data() {
      return {
        data: {
          imgs: []
        }
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData() {
        if(this.data.productCode) {
          return
        }
        this.$http({
          url: this.$api + 'produce/resources/rs/product/getById',
          method: 'post',
          data: {
            reqParam: {
              productCode: this.currentDetail.productCode
            }
          }
        }).then(res => {
          if(res.data.retCode === 1) {
            let item = res.data.retVal
            item.iodate = this.$method.queryDictionary.call(this, 100, item.iodate)
            item.packType = this.$method.queryDictionary.call(this, 100, item.packType)
            item.packStyle = this.$method.queryDictionary.call(this, 100, item.packStyle)
            this.data = item
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
    .information-1
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
        .table
            float right
            width 75%
            .td
                height 2.6em
</style>
