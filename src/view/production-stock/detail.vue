<template>
    <transition name="fade">
        <div class="mask" v-show="maskShow">
            <div class="mask-scroll">
                <div class="mask-content-wrap">
                    <div class="mask-title-wrap">
                        <div class="mask-title">
                            出入库详情
                            <div class="close" @click="hide">
                                <i class="iconfont icon-guanbi"></i>
                            </div>
                        </div>
                    </div>
                    <div class="mask-content">
                        <table class="mask-table">
                            <colgroup width="10%"></colgroup>
                            <colgroup width="37%"></colgroup>
                            <colgroup width="13%"></colgroup>
                            <colgroup width="40%"></colgroup>
                            <tr>
                                <td>产品名称</td>
                                <td>{{data.uName}}</td>
                                <td>规格</td>
                                <td>{{data.sex}}</td>
                            </tr>
                            <tr>
                                <td>碘盐标志</td>
                                <td>{{data.uId}}</td>
                                <td>生产批号</td>
                                <td>{{data.jobTitle}}</td>
                            </tr>
                            <tr>
                                <td>生产日期</td>
                                <td>{{data.mobile}}</td>
                                <td>保质期</td>
                                <td>{{data.uType}}</td>
                            </tr>
                            <tr>
                                <td>小盒数量</td>
                                <td>{{data.mobile}}</td>
                                <td>大箱数量</td>
                                <td>{{data.uType}}</td>
                            </tr>
                            <tr>
                                <td>总重量</td>
                                <td>{{data.mobile}}</td>
                                <td>包装形式</td>
                                <td>{{data.uType}}</td>
                            </tr>
                            <tr>
                                <td>执行标准</td>
                                <td>{{data.mobile}}</td>
                                <td>类型</td>
                                <td>{{data.uType}}</td>
                            </tr>
                            <tr>
                                <td>单据日期</td>
                                <td>{{data.mobile}}</td>
                                <td>下游企业</td>
                                <td>{{data.uType}}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="mask-btn-wrap">
                        <l-button buttonText="返回" @button-click="hide"></l-button>
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
    data() {
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
      }
    }
  }
</script>

<style scoped lang="stylus">
    @import '../../assets/css/fn.styl'
    .mask-content-wrap
        width 75%
        top 10%
        .mask-content
            width 93%
            margin 0 auto 0
            padding-top 20px
            .mask-table
                tr
                    td
                        padding 10px 10px
                        font-size-set(16px)
                        white-space normal
            .title
                padding 10px 0
                font-size-set(18px)
                color #414141
        .mask-btn-wrap
            padding 20px 0 30px
</style>
