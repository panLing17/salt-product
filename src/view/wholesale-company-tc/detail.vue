<template>
    <transition name="fade">
        <div class="mask" v-show="maskShow">
            <div class="mask-scroll">
                <div class="mask-content-wrap">
                    <div class="mask-title-wrap">
                        <div class="mask-title">
                            统筹批发详情
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
                                <td>批发企业编码</td>
                                <td>{{data.uName}}</td>
                                <td>批发企业简称</td>
                                <td>{{data.sex}}</td>
                            </tr>
                            <tr>
                                <td>批发企业名称</td>
                                <td>{{data.uId}}</td>
                                <td>批发企业地址</td>
                                <td>{{data.jobTitle}}</td>
                            </tr>
                            <tr>
                                <td>所属区域</td>
                                <td>{{data.mobile}}</td>
                                <td>所属区域编码</td>
                                <td>{{data.uType}}</td>
                            </tr>
                            <tr>
                                <td>批发企业法人</td>
                                <td>{{data.mobile}}</td>
                                <td>批发企业上级监管部门</td>
                                <td>{{data.uType}}</td>
                            </tr>
                            <tr>
                                <td>批发企业上级公司</td>
                                <td>{{data.mobile}}</td>
                                <td>批发企业注册资金</td>
                                <td>{{data.uType}}</td>
                            </tr>
                            <tr>
                                <td>批发企业状态</td>
                                <td>{{data.mobile}}</td>
                                <td>批发许可证号</td>
                                <td>{{data.uType}}</td>
                            </tr>
                            <tr>
                                <td>许可证有效期起止</td>
                                <td>{{data.mobile}}</td>
                                <td>中盐平台编码</td>
                                <td>{{data.uType}}</td>
                            </tr>
                            <tr>
                                <td>批发企业网址</td>
                                <td>{{data.mobile}}</td>
                                <td>批发企业电话</td>
                                <td>{{data.uType}}</td>
                            </tr>
                            <tr>
                                <td>备注</td>
                                <td colspan="3"></td>
                            </tr>
                        </table>
                        <div class="title">授权经营区划</div>
                        <table class="mask-table">
                            <tr>
                                <td class="center">省/自治区/直辖市名称</td>
                                <td class="center">城市名称</td>
                                <td class="center">区域名称</td>
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
