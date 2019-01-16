<template>
    <transition name="fade">
        <div class="mask" v-if="maskShow">
            <div class="mask-content-wrap">
                <div class="mask-title-wrap">
                    <div class="mask-title">
                        下载
                        <div class="close" @click="hide">
                            <i class="iconfont icon-guanbi"></i>
                        </div>
                    </div>
                </div>
                <div class="mask-content clear-float">
                    <div class="download-btn blue">
                        <p>XML&nbsp;文件下载</p>
                        <p>(用于上传中盐平台文件)</p>
                    </div>
                    <div class="download-btn red">PDF文件下载</div>
                </div>
                <div class="mask-btn-wrap">
                    <l-button buttonText="返回" @button-click="hide"></l-button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
  export default {
    name: 'download',
    data() {
      return {
        maskShow: true
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
        top 25%
        .mask-content
            width 80%
            margin 0 auto 0
            padding-top 50px
        .mask-btn-wrap
            width 80%
            padding 50px 0 30px
        .download-btn
            width-set(500px, width)
            height-set(90px, height)
            font-size-set(26px)
            text-align center
            color #fff
            &.blue
                float left
                background-color #5273CE
                padding 16px 0
                p
                    line-height 1
                    &:last-child
                        font-size-set(16px)
                        margin-top 8px
            &.red
                float right
                height-set(90px, line-height)
                background-color #EA5C28
</style>
