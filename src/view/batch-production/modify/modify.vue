<template>
    <div class="add-batch">
        <div class="content-wrap">
            <div class="view-title">
                修改批次任务
                <div class="fs_18">批次生产任务>修改批次任务</div>
            </div>
            <div class="steps fs_20 clear-float">
                <div class="step-1" :class="{active: stepActive===0}">1.生产批次信息</div>
                <div class="step-2" :class="{active: stepActive===1}">2.批次投料信息</div>
                <div class="step-3" :class="{active: stepActive===2}">3.批次生产任务信息</div>
            </div>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'modify',
    data() {
      return {
        stepActive: 0
      }
    },
    created () {
      this.stepChange()
    },
    updated () {
      this.stepChange()
    },
    methods: {
      stepChange() {
        switch (this.$route.name) {
          case '步骤1':
            this.stepActive = 0
            break
          case '步骤2':
            this.stepActive = 1
            break
          case '步骤3':
            this.stepActive = 2
            break
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
    .add-batch
        width 100%
        height 100%
        .content-wrap
            width 98%
            min-height 99%
            background-color #ffffff
            margin 0 auto
            border-radius 6px
            border 1px solid #D5D5D5
            .view-title
                margin 1.1em auto 0
                position relative
                div
                    position absolute
                    right 2.81%
                    top 0
                    color #BFBFBF
                    font-weight normal
            .steps
                width 94.38%
                margin 1.1em auto 0
                height 2.5em
                overflow hidden
                .step-1, .step-2, .step-3
                    width calc(33.33% - .4em)
                    text-align center
                    color #414141
                    float left
                    height 2.5em
                    line-height 2.5em
                    background-color #E3E3E3
                    position relative
                    &.active
                        background-color #5F7FD9
                        color #ffffff
                        &:after
                            background-color #5F7FD9
                            border-left 2px solid #5F7FD9
                            border-bottom 2px solid #5F7FD9
                    &:after
                        content ''
                        display block
                        position absolute
                        width 1.9em
                        height 1.9em
                        right -.9em
                        top .3em
                        border-top 2px solid #ffffff
                        border-right 2px solid #ffffff
                        border-left 2px solid #E3E3E3
                        border-bottom 2px solid #E3E3E3
                        background-color #E3E3E3
                        box-sizing border-box
                        transform rotate(45deg)
                        z-index 10
            .content
                width 94.38%
                margin 1em auto 0
</style>
