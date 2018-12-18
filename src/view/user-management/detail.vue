<template>
    <transition name="fade">
        <div class="mask user-management-detail" v-if="maskShow">
            <div class="mask-content-wrap">
                <div class="mask-title-wrap">
                    <div class="mask-title fs_22">
                        用户管理详情
                        <div class="close" @click="hide">
                            <i class="iconfont icon-guanbi"></i>
                        </div>
                    </div>
                </div>
                <div class="mask-content">
                    <div class="title fs_22">用户信息</div>
                    <table class="mask-table fs_20">
                        <colgroup width="10%"></colgroup>
                        <colgroup width="37%"></colgroup>
                        <colgroup width="13%"></colgroup>
                        <colgroup width="40%"></colgroup>
                        <tr>
                            <td>姓名</td>
                            <td>{{data.uName}}</td>
                            <td>性别</td>
                            <td>{{data.sex}}</td>
                        </tr>
                        <tr>
                            <td>账号</td>
                            <td>{{data.uId}}</td>
                            <td>岗位</td>
                            <td>{{data.jobTitle}}</td>
                        </tr>
                        <tr>
                            <td>手机号</td>
                            <td>{{data.mobile}}</td>
                            <td>类型</td>
                            <td>{{data.uType}}</td>
                        </tr>
                        <tr>
                            <td>权限组</td>
                            <td colspan="3">{{data.userGName}}</td>
                        </tr>
                    </table>
                </div>
                <div class="mask-btn-wrap fs_20">
                    <l-button buttonText="返回" @button-click="hide"></l-button>
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
      },
      promiseData: {
        type: Array
      }
    },
    watch: {
      promiseData(newVal) {
        this.activeNames = []
        newVal.forEach((item, index) => {
          this.activeNames.push(index)
        })
      }
    },
    data () {
      return {
        maskShow: false,
        activeNames: []
      }
    },
    methods: {
      show () {
        this.maskShow = true
      },
      hide () {
        this.maskShow = false
      },
      fatherClick(fi, oi) {
        this.promiseData[fi].child.forEach((item, index) => {
          if (oi === index) {
            item.selected = true
          } else {
            item.selected = false
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
    .mask-content-wrap
        width 75%
        top 10%
        .mask-content
            width 85%
            margin 0 auto 0
            overflow auto
            .title
                font-weight bold
                color #414141
                padding-top 1em
            .mask-table
                margin-top 1em
                tr
                    td
                        height 2em
            .button-list
                font-size 0
                .button
                    display inline-block
                    padding 0 1em
                    border-right 1px solid #BFBFBF
                    line-height 1.1em
                    margin-bottom .8em
                    cursor pointer
                    user-select none
                    &.second
                        span
                            &.active
                                border-bottom 1px solid #5F7FD9
                    &:last-child
                        border none
                    span
                        position relative
                        padding-bottom .1em
            .button-content
                font-size 0
                .text
                    display inline-block
                    padding .5em 1em
                    line-height 1.1em
                    color #5F7FD9
        .mask-btn-wrap
            width 85%
            margin 0 auto
            padding 1em 0
            text-align right
</style>
<style lang="stylus">
    .user-management-detail
        .el-collapse-item__header
            font-weight bold
            color #414141
        .el-collapse-item__content
            padding-bottom 1em
</style>
