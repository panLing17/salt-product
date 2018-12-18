<template>
    <div class="enterprise-information">
        <div class="content-wrap">
            <div class="view-title">企业信息</div>
            <div class="desc-wrap clear-float">
                <!--<div class="img">-->
                    <!--<img src="" alt="">-->
                <!--</div>-->
                <div class="desc fs_20">{{data.remark}}</div>
            </div>
            <div class="table-wrap">
                <table class="table fs_20">
                    <colgroup width="15%"></colgroup>
                    <colgroup width="35%"></colgroup>
                    <colgroup width="15%"></colgroup>
                    <colgroup width="35%"></colgroup>
                    <tr class="tr">
                        <td class="td">企业名称</td>
                        <td class="td">{{data.entName}}</td>
                        <td class="td">生产地址</td>
                        <td class="td">{{data.workArea}}</td>
                    </tr>
                    <tr class="tr">
                        <td class="td">企业地址</td>
                        <td class="td">{{data.entAddress}}</td>
                        <td class="td">产能规模</td>
                        <td class="td">{{data.capacity}}</td>
                    </tr>
                    <tr class="tr">
                        <td class="td">企业代码</td>
                        <td class="td">{{data.pkId}}</td>
                        <td class="td">上市公司代码</td>
                        <td class="td">{{data.listedCode}}</td>
                    </tr>
                    <tr class="tr">
                        <td class="td">企业电话</td>
                        <td class="td">{{data.workTel}}</td>
                        <td class="td">上级或控股公司</td>
                        <td class="td">{{data.entHigher}}</td>
                    </tr>
                    <tr class="tr">
                        <td class="td">企业网址</td>
                        <td class="td">{{data.website}}</td>
                        <td class="td">法人</td>
                        <td class="td">{{data.legal}}</td>
                    </tr>
                    <tr class="tr">
                        <td class="td">许可证号</td>
                        <td class="td">{{data.license}}</td>
                        <td class="td">信用等级</td>
                        <td class="td">{{data.entCredit}}</td>
                    </tr>
                    <tr class="tr">
                        <td class="td">有效期</td>
                        <td class="td">{{data.licenseIssue}}至{{data.licenseExp}}</td>
                        <td class="td"></td>
                        <td class="td"></td>
                    </tr>
                </table>
            </div>
            <div class="button-wrap fs_20">
                <div class="table-button-single" @click="sync">同步企业信息</div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'enterprise-information',
    data() {
      return {
        data: {}
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData() {
        this.$http({
          url: this.$api + 'produce/resources/rs/ent/manufacturer/getById',
          method: 'post',
          data: {}
        }).then(res => {
          if (res.data.retCode === 1) {
            this.data = res.data.retVal
          }
        })
      },
      sync() {
        this.$http({
          url: this.$api + 'produce/resources/sync/manufacturer',
          method: 'post',
          data: {}
        }).then(res => {
          if (res.data.retCode === 1) {
            this.getData()
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
    .enterprise-information
        width 100%
        height 100%
        .content-wrap
            width 98%
            height 99%
            background-color #ffffff
            margin 0 auto
            border-radius 6px
            border 1px solid #D5D5D5
            .view-title
                margin-top 1.1em
            .desc-wrap
                width 93%
                margin 1em auto 0
                .img
                    float left
                    width 21%
                    height 0
                    padding-bottom 21%
                    position relative
                    font-size 1
                    border-radius 4px
                    overflow hidden
                    img
                        position absolute
                        left 0
                        right 0
                        width 100%
                .desc
                    width 100%
                    text-align justify
                    word-break break-all
                    line-height 1.8em
                    color #6f6f6f
                    text-indent 2em
            .table-wrap
                width 93%
                margin 2em auto 0
                .table
                    td
                        &:nth-of-type(1), &:nth-of-type(3)
                            font-weight bold
            .button-wrap
                width 93%
                margin 2em auto 0
                position relative
                text-align right
                .time
                    color #414141
                    margin-right .5em
                .table-button-single
                    position relative
</style>
