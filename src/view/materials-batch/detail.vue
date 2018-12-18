<template>
    <transition name="fade">
        <div class="mask materials-batch-detail" v-if="maskShow">
            <div class="mask-scroll">
                <div class="mask-content-wrap">
                <div class="mask-title-wrap">
                    <div class="mask-title fs_22">
                        原料批次详情
                        <div class="close" @click="hide">
                            <i class="iconfont icon-guanbi"></i>
                        </div>
                    </div>
                </div>
                <div class="mask-content fs_20">
                    <div class="block">
                        <label>原料信息</label>
                    </div>
                    <table class="mask-table" style="margin-top: .5em">
                        <colgroup width="15%"></colgroup>
                        <colgroup width="35%"></colgroup>
                        <colgroup width="15%"></colgroup>
                        <colgroup width="35%"></colgroup>
                        <tr>
                            <td>原料名称</td>
                            <td>{{data.rawInfo.mName}}</td>
                            <td>规格</td>
                            <td>{{data.rawInfo.spec}}</td>
                        </tr>
                        <tr>
                            <td>净含量</td>
                            <td>{{data.rawInfo.cxt}}</td>
                            <td>保质期</td>
                            <td>{{data.rawInfo.expDate}}</td>
                        </tr>
                        <tr>
                            <td>标准号</td>
                            <td>{{data.rawInfo.stcode}}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                    <div class="block">
                        <label>原料企业</label>
                    </div>
                    <table class="mask-table" style="margin-top: .5em">
                        <colgroup width="15%"></colgroup>
                        <colgroup width="35%"></colgroup>
                        <colgroup width="15%"></colgroup>
                        <colgroup width="35%"></colgroup>
                        <tr>
                            <td>企业名称</td>
                            <td>{{data.factoryInfo.fName}}</td>
                            <td>企业地址</td>
                            <td>{{data.factoryInfo.address}}</td>
                        </tr>
                        <tr>
                            <td>营业执照号</td>
                            <td>{{data.factoryInfo.bLicense}}</td>
                            <td>生产许可证号</td>
                            <td>{{data.factoryInfo.pLicense}}</td>
                        </tr>
                        <tr>
                            <td>企业联系电话</td>
                            <td>{{data.factoryInfo.tel}}</td>
                            <td>企业网址</td>
                            <td>{{data.factoryInfo.website}}</td>
                        </tr>
                        <tr>
                            <td>出厂批号</td>
                            <td>{{data.batchNo}}</td>
                            <td>生产地</td>
                            <td>{{data.prodPlace}}</td>
                        </tr>
                    </table>
                    <div class="upload">
                        <div class="upload-title">
                            <label>出厂检验报告</label>
                        </div>
                        <div class="img-upload">
                            <img :src="data.factoryInspReport" alt="">
                        </div>
                    </div>
                    <div class="upload">
                        <div class="upload-title">
                            <label>验收检验报告</label>
                        </div>
                        <div class="img-upload">
                            <img :src="data.accepetInspReport" alt="">
                        </div>
                    </div>
                </div>
                <div class="mask-btn-wrap fs_20">
                    <l-button buttonText="确认" @button-click="hide"></l-button>
                </div>
            </div>
            </div>
        </div>
    </transition>
</template>

<script>
  export default {
    name: 'detail',
    props: {
      data: {
        type: Object
      }
    },
    data () {
      return {
        maskShow: false
      }
    },
    methods: {
      show() {
        this.maskShow = true
      },
      hide() {
        this.maskShow = false
      },
      right () {
        console.log(this.fileList)
      }
    }
  }
</script>

<style scoped lang="stylus">
    .mask-content-wrap
        width 75%
        top 7%
        .mask-content
            width 85%
            margin 0 auto 0
            overflow auto
            .block
                padding-top 1em
            .mask-table
                td
                    height 2em
                input
                    width 100%
                    height 100%
                    border none
                &.special
                    border none
                    margin-top 1em
                    tr
                        border none
                        &.label-wrap
                            height 2em
                            vertical-align bottom
                            td
                                padding-bottom .5em
                                &:nth-of-type(1)
                                    padding-left 0
                        td
                            border none
                            &:nth-of-type(1)
                                padding-left 0
                            span
                                color #D31717
                            input
                                border-radius 4px
                                border 1px solid #BFBFBF
                                width 100%
                                height 2em
                                padding-left 1em
            .upload
                margin-top 1em
                .upload-title
                    margin-bottom .2em
                    span
                        color #D91C1C
                ul
                    font-size 0
                    li
                        width 24%
                        height 0
                        padding-bottom 24%
                        display inline-block
                        position relative
                        margin-right 1.3%
                        &:last-child
                            margin 0
                        img
                            position absolute
                            top 0
                            left 0
                            width 100%
                            height 100%
                .img-upload
                    width 25%
                    font-size 0
                    img
                        width 100%
        .mask-btn-wrap
            width 85%
            margin 0 auto
            padding 2em 0
</style>
<style lang="stylus">
    .materials-batch-detail
        .el-input__inner
            height 2em
            border-color #BFBFBF
        .el-input__icon
            line-height 2em
        .el-date-editor.el-input, .el-date-editor.el-input__inner
            width 100%
</style>
