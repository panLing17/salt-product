<template>
    <div class="login">
        <div class="header">
            <div class="wrap">
                <div class="img">
                    <img class="fs_29" src="./logo1.png" style="width: 1.5em">
                </div>
                <div class="title fs_29">江苏省食盐安全追溯生产管理系统</div>
            </div>
        </div>
        <div class="content">
            <div class="form-wrap fs_20">
                <div class="form-title fs_26">系统登录</div>
                <div class="form-item">
                    <input type="text" placeholder="请输入账号" v-model="params.userId">
                    <img class="icon" src="./1.png" alt="">
                </div>
                <div class="form-item">
                    <input type="password" placeholder="请输入密码" v-model="params.passwd">
                    <img class="icon" src="./2.png" alt="">
                </div>
                <!--<div class="form-item clear-float">-->
                    <!--<input class="code-text" type="text" placeholder="请输入验证码">-->
                    <!--<img class="code" src="" alt="">-->
                <!--</div>-->
                <div class="form-btn" @click="login">登录</div>
            </div>
        </div>
        <div class="bottom">
            <div class="wrap clear-float fs_20">
                <div class="block">
                    <div class="block-title fs_28">技术支持</div>
                    <p>江苏瑞德信息产业有限公司</p>
                    <p></p>
                    <p>邮箱：info@redinfo.cn</p>
                </div>
                <div class="block" style="margin-left: 2em">
                    <div class="block-title fs_28">&nbsp;</div>
                    <p>全国统一客服：4008808919</p>
                </div>
                <div class="img" style="margin-left: 5em">
                    <img src="./3.png" style="height: 10.55em">
                </div>
                <div class="img" style="margin-left: 2em">
                    <img src="./5.png" style="width: 12em">
                </div>
            </div>
        </div>
        <div class="footer fs_20">技术服务公司：江苏瑞德信息有限公司</div>
    </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        params: {
          userId: '',
          passwd: ''
        }
      }
    },
    created() {
      localStorage.clear()
      this.GLOBAL.listByUser = []
      this.GLOBAL.dictionaryData = {}
      this.GLOBAL.areaList = {}
      this.GLOBAL.count = 0
    },
    methods: {
      login() {
        if (this.params.userId.length === 0 || this.params.passwd.length===0) {
          this.$message.warning('账号或密码不能为空')
          return
        }
        if (this.params.passwd.length < 6) {
          this.$message.warning('密码需大于6位')
          return
        }
        let formData = new FormData()
        formData.append('userId', this.params.userId)
        formData.append('passwd', this.params.passwd)
        this.$http({
          url: this.$api + 'produce/personal/rs/token/create',
          method: 'post',
          data: formData
        }).then(res => {
          if (res.data.retCode === 1) {
            localStorage.setItem('token', res.data.retVal.token)
            localStorage.setItem('uId', this.params.userId)
            this.$router.push('/main')
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">

    input::-webkit-input-placeholder{ color: #dedede }    /* 使用webkit内核的浏览器 */
    input:-moz-placeholder{ color: #dedede }                  /* Firefox版本4-18 */
    input::-moz-placeholder{ color: #dedede }                  /* Firefox版本19+ */
    input:-ms-input-placeholder{ color: #dedede }           /* IE浏览器 */
    input:-webkit-autofill {
        -webkit-box-shadow : 0 0 0px 1000px #ffffff inset ; //如果你的图片都背景颜色，这里修改的颜色和背景颜色一致即可，我选的是#dddddd
    }
    .login
        width 100%
        height 100%
        .header
            height 10%
            background-color #ffffff
            position relative
            .wrap
                position absolute
                top 50%
                left 18%
                transform translateY(-50%)
                line-height 1
                font-size 0
                .img
                    display inline-block
                    vertical-align top
                    img
                        width 6.9em
                .title
                    margin-left 1.6em
                    display inline-block
                    vertical-align top
                    color #153862
                    position relative
                    font-weight bold
                    &:before
                        content ''
                        display block
                        position absolute
                        height 100%
                        width 1px
                        left -.8em
                        background-color #153862
        .content
            height 57%
            background url("./banner.png") no-repeat
            background-size 100% 100%
            position relative
            .form-wrap
                position absolute
                right 18%
                top 50%
                transform translateY(-50%)
                border-radius 4px
                background-color #ffffff
                overflow hidden
                width 20.6%
                .form-title
                    background-color #f0f0f0
                    line-height 2.5em
                    text-align center
                    color #2989de
                    border-bottom 1px solid #b7c7e1
                    margin-bottom 1.4em
                .form-item
                    height 2.5em
                    width 80%
                    margin 1em auto 0
                    border-radius 4px
                    border 1px solid #dedede
                    position relative
                    input
                        width 100%
                        height 100%
                        border none
                        outline none
                        padding 0 2.25em 0 .9em
                        &.code-text
                            float left
                            width 58%
                    .code
                        float left
                        width 42%
                        height 100%
                        background-color #dddddd
                    .icon
                        position absolute
                        right .7em
                        top 50%
                        transform translateY(-50%)
                        width 1.35em
                .form-btn
                    width 80%
                    height 2.5em
                    background-color #1899e3
                    color #ffffff
                    line-height 2.5em
                    text-align center
                    margin 1.45em auto 2.85em
                    border-radius 4px
                    cursor pointer
        .bottom
            height 29%
            background-color #ffffff
            position relative
            overflow hidden
            .wrap
                /*position absolute
                left 50%
                top 50%
                transform translate(-50%, -50%)*/
                width 50em
                height 60%
                margin 30px auto 0
                .block
                    float left
                    position relative
                    .block-title
                        color #383838
                        margin-bottom 1em
                    p
                        line-height 1.5em
                        color #595959
                .img
                    float left
                    position relative
                    .text
                        text-align center
                        color #787878
        .footer
            height 4%
            background-color #282828
            text-align center
            line-height 2em
            color #ffffff
</style>
