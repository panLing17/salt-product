<template>
    <transition name="fade">
        <div class="mask" v-show="maskShow">
            <div class="mask-content-wrap fs_20">
                <div class="mask-title-wrap">
                    <div class="mask-title fs_22">
                        投料详情
                        <div class="close" @click="hide">
                            <i class="iconfont icon-guanbi"></i>
                        </div>
                    </div>
                </div>
                <div class="mask-content">
                    <table class="mask-table">
                        <colgroup width="15%"></colgroup>
                        <colgroup width="35%"></colgroup>
                        <colgroup width="15%"></colgroup>
                        <colgroup width="35%"></colgroup>
                        <tr>
                            <td>类型</td>
                            <td></td>
                            <td>物料名称</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>企业名称</td>
                            <td></td>
                            <td>出厂批号</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>投入量</td>
                            <td></td>
                            <td>投料点</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>操作人</td>
                            <td></td>
                            <td>投料时间</td>
                            <td></td>
                        </tr>
                    </table>
                </div>
                <div class="mask-btn-wrap fs_20">
                    <l-button buttonText="确定"></l-button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
  export default {
    name: 'step2-detail',
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
    .mask-content-wrap
        width 74.8%
        top 30%
        .mask-content
            overflow auto
            padding-top 2em
            .mask-table
                td
                    height 2em
                    &.center
                        text-align center
                        padding-left 0
        .mask-btn-wrap
            margin 0 auto
            padding 3em 0 2em
</style>
