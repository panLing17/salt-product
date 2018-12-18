<template>
    <div class="information">
        <div class="content-wrap">
            <div class="tab-wrap fs_20">
                <div class="tab-item" :class="{active: tabItemActive===0}" @click="tabItemActive=0">
                    <span>产品信息</span>
                </div>
                <div class="tab-item" :class="{active: tabItemActive===1}" @click="tabItemActive=1">
                    <span>生产批次信息</span>
                </div>
                <div class="tab-item" :class="{active: tabItemActive===2}" @click="tabItemActive=2">
                    <span>批次投料信息</span>
                </div>
                <div class="tab-item" :class="{active: tabItemActive===3}" @click="tabItemActive=3">
                    <span>批次生产任务信息</span>
                </div>
                <div class="tab-item" :class="{active: tabItemActive===4}" @click="tabItemActive=4">
                    <span>抽检信息</span>
                </div>
                <div class="tab-item" :class="{active: tabItemActive===5}" @click="tabItemActive=5">
                    <span>检验信息</span>
                </div>
            </div>
            <div class="information-content">
                <router-view :currentDetail="currentDetail"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'infomation',
    data() {
      return {
        tabItemActive: 0,
        currentDetail: {}
      }
    },
    created() {
      this.currentDetail = JSON.parse(sessionStorage.getItem('currentDetail'))
    },
    watch: {
      tabItemActive(newVal) {
        switch (newVal) {
          case 0:
            this.$router.replace('/information/product')
            break
          case 1:
            this.$router.replace('/information/batch')
            break
          case 2:
            this.$router.replace('/information/putting')
            break
          case 3:
            this.$router.replace('/information/task')
            break
          case 4:
            this.$router.replace('/information/random')
            break
          case 5:
            this.$router.replace('/information/check')
            break
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
    .information
        width 100%
        height 100%
        .content-wrap
            width 98%
            height 99%
            background-color #ffffff
            margin 0 auto
            border-radius 6px
            border 1px solid #D5D5D5
            .tab-wrap
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
                        span
                            position relative
                            &:after
                                content ''
                                display block
                                height 2px
                                width 100%
                                background-color #5F7FD9
                                position absolute
                                bottom -.2em
                                left 0
                    &:nth-of-type(1)
                        padding-left 0
                    &:last-child
                        &:before
                            display none
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
            .information-content
                padding-top 1em
                width 93%
                margin 0 auto
</style>
