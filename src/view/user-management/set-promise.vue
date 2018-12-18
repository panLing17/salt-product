<template>
    <transition name="fade">
        <div class="mask user-management-set" v-if="maskShow">
            <div class="mask-scroll">
                <div class="mask-content-wrap">
                <div class="mask-title-wrap">
                    <div class="mask-title fs_22">
                        设置权限
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
                    <div class="title fs_22" style="margin: 1em auto .5em">设置权限组</div>
                    <ul class="button-list">
                        <li class="button fs_20" v-for="(item, index) in promiseData" @click="item.selected=!item.selected">
                            <i class="iconfont fs_16"
                               :class="{'icon-dianxuan-1': !item.selected, 'icon-dianxuan-': item.selected}"
                               :style="{color: item.selected && item.selected?'#5F7FD9':'#414141'}"
                            ></i>
                            <span
                                    :style="{color: item.selected?'#5F7FD9':'#414141'}"
                            >{{item.gName}}</span>
                        </li>
                    </ul>
                </div>
                <div class="mask-btn-wrap fs_20">
                    <l-button buttonText="返回" @button-click="hide" style="margin-right: 1em"></l-button>
                    <l-button buttonText="确认" @button-click="right"></l-button>
                </div>
            </div>
            </div>
        </div>
    </transition>
</template>

<script>
  export default {
    name: 'set-promise',
    props: {
      data: {
        type: Object
      }
    },
    data () {
      return {
        maskShow: false,
        promiseData: []
      }
    },
    watch: {
      maskShow(newVal) {
        if (newVal) {
          this.getPromise()
        }
      }
    },
    methods: {
      show () {
        this.maskShow = true
      },
      hide () {
        Object.assign(this.$data, this.$options.data())
        this.maskShow = false
      },
      getPromise() {
        this.$http({
          url: this.$api + 'produce/resources/rs/groups/listByUser',
          method: 'post',
          data: {
            reqParam: {
              uId: this.data.uId,
              retType: 1
            }
          }
        }).then(res => {
          if (res.data.retCode === 1) {
            this.$http({
              url: this.$api + 'produce/resources/rs/groups/listByUser',
              method: 'post',
              data: {
                reqParam: {
                  uId: this.data.uId,
                  retType: 2
                }
              }
            }).then(response => {
              res.data.retVal.forEach(item => {
                item.selected = false
              })
                res.data.retVal.forEach(item => {
                  response.data.retVal.forEach(r => {
                    if (r.pkId === item.pkId) {
                      item.selected = true
                    }
                  })
                })
              this.promiseData = res.data.retVal
            })
          }
        })
      },
      right () {
        let groups = []
        this.promiseData.forEach(item => {
          if (item.selected) {
            groups.push({
              pkId: item.pkId
            })
          }
        })
        this.$http({
          url: this.$api + 'produce/resources/rs/users/permission/setGroup',
          method: 'post',
          data: {
            reqParam: {
              setType: 1,
              users: [{uId: this.data.uId}],
              groups: groups
            }
          }
        }).then(res => {
          if (res.data.retCode === 1) {
            this.hide()
            this.$message.success('设置权限成功')
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
    .mask-content-wrap
        width 75%
        .mask-content
            width 85%
            margin 0 auto 0
            overflow auto
            .title
                font-weight bold
                color #414141
                margin-top 1em
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
                    line-height 1.1em
                    margin-bottom .8em
                    cursor pointer
                    user-select none
                    span
                        position relative
                        padding-bottom .1em
        .mask-btn-wrap
            width 85%
            margin 0 auto
            padding 1em 0
            text-align right
</style>
<style lang="stylus">
    .user-management-set
        .el-collapse-item__header
            font-weight bold
            color #414141
        .el-collapse-item__content
            padding-bottom 1em
        .el-input__inner
            padding-left 1em
            height 2em
            border-color #BFBFBF
        .el-input__icon
            line-height 2em
        .el-select
            width 100%
        .mask-table
            td
                &:nth-of-type(1)
                    .el-select
                        width 90%
</style>
