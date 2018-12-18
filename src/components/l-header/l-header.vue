<template>
    <div class="header">
        <div class="left">
            <div class="logo">
                <img src="./logo.png" alt="食盐安全追溯生产管理系统">
            </div>
            <div class="title">食盐安全追溯生产管理系统</div>
        </div>
        <div class="right">
            <div class="email" @click="$router.replace('/batchProduction')">
                <img src="./email.png">
                <div v-show="count>0" class="badge">{{count}}</div>
            </div>
            <div class="info" @click.stop="popShow=!popShow">
                <img class="avatar" src="./avatar.png" alt="">
                <span>{{person.unitName}}</span>
                <span>{{person.uName}}</span>
                <img class="arrow" src="./arrow.png" alt="">
                <div class="pop-wrapper" v-show="popShow">
                    <div class="sanjiao"></div>
                    <ul class="pop">
                        <li class="item" @click="$refs.info.show()">个人信息</li>
                        <li class="item" @click="$refs.editPassword.show()">修改密码</li>
                        <li class="item" @click="logout">退出</li>
                    </ul>
                </div>
            </div>
        </div>
        <info ref="info" :data="person"></info>
        <edit-password ref="editPassword"></edit-password>
    </div>
</template>

<script>
import Info from './info'
import EditPassword from './edit-password'
export default {
  name: 'l-header',
  data () {
    return {
      popShow: false, // 个人信息弹出与否
      count: 0,
      person: {}
    }
  },
  created () {
    this.getCount()
    this.getPersonInfo()
  },
  mounted() {
    document.addEventListener('click', () => {
      this.popShow = false
    }, false)
  },
  methods:{
    getCount() {
      this.$http({
        url: this.$api + 'produce/production/pd/batch/auditCount',
        method: 'post',
        data: {}
      }).then(res=>{
        if(res.data.retCode===1) {
            this.count = res.data.retVal.count
        }
      })
    },
    getPersonInfo() {
      this.$http({
        url: this.$api + 'produce/personal/rs/users/findByToken',
        method: 'post',
        data: {}
      }).then(res=>{
        if(res.data.retCode===1) {
            this.person = res.data.retVal
        }
      })
    },
    logout() {
      this.$http({
        url: this.$api + 'produce/personal/rs/token/logout',
        method: 'post',
        data: {}
      }).then(res=>{
        if(res.data.retCode===1) {
          localStorage.clear()
          this.$router.replace('/login')
        }
      })
    }
  },
  components: {
    Info,
    EditPassword
  }
}
</script>

<style scoped lang="stylus">
@import './media.styl'
.header
    height 7.68%
    min-height 30px
    background-color #ffffff
    .left
        float left
        height 100%
        font-size 0
        display table
        .logo
            display table-cell
            vertical-align middle
            font-size 0
            height 100%
            padding 0 23px 0 30px
        .title
            display table-cell
            vertical-align middle
            font-weight bold
            color #203262
    .right
        height 100%
        float right
        font-size 0
        display table
        .email
            display table-cell
            vertical-align middle
            font-size 0
            position relative
            padding-right 20px
            height 100%
            cursor pointer
            .badge
                line-hegiht 1.5
                padding 0 5px
                background-color #FF2F2F
                color #ffffff
                font-size 12px
                border-radius 25px
                position absolute
                top 50%
                left 15px
                transform translateY(-80%)
            &:after
                content ''
                display block
                position absolute
                top 50%
                transform translateY(-50%)
                right 0
                width 1px
                height 20px
                background-color #344D93
        .info
            display table-cell
            vertical-align middle
            height 100%
            font-size 0
            position relative
            cursor pointer
            .avatar
                margin-left 16px
                border-radius 50%
                vertical-align middle
            span
                vertical-align middle
                color #203262
                &:first-of-type
                    margin 0 12px 0 16px
            .arrow
                vertical-align middle
                margin 0 20px 0 14px
            .pop-wrapper
                position absolute
                right 20px
                z-index 5
                .sanjiao
                    width 5px
                    height 5px
                    transform rotate(45deg)
                    border-top 1px solid #E3E3E3
                    border-left 1px solid #E3E3E3
                    position absolute
                    top -3px
                    background-color #ffffff
                .pop
                    border 1px solid #E3E3E3
                    border-radius 4px
                    padding 0 15px
                    background-color #ffffff
                    .item
                        color #203262
                        border-bottom 1px solid #E3E3E3
                        text-align center
                        &:last-child
                            border none
</style>
