<template>
    <transition name="fade">
        <div class="mask" v-show="maskShow">
            <div class="mask-content-wrap">
                <div class="mask-title-wrap">
                    <div class="mask-title fs_22">
                        个人信息
                        <div class="close" @click="hide">
                            <i class="iconfont icon-guanbi"></i>
                        </div>
                    </div>
                </div>
                <div class="mask-content">
                    <div class="block">
                        <label>当前密码</label>
                        <input type="password" v-model="params.reqParam.oldPwd">
                    </div>
                    <div class="block" style="margin-top: 3em">
                        <label>新密码</label>
                        <input type="password" v-model="params.reqParam.newPwd">
                    </div>
                    <div class="block" style="margin-top: 1em">
                        <label>确认密码</label>
                        <input type="password" v-model="params.reqParam.againPwd">
                    </div>
                    <div class="btn-wrapper" style="margin-top: 2em">
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
    props: {
      data: {
        type: Object
      }
    },
    name: 'edit-password',
    data() {
      return {
        maskShow: false,
        params: {
          reqParam: {
            oldPwd: '',
            newPwd: '',
            againPwd: ''
          }
        }
      }
    },
    methods: {
      show() {
        this.maskShow = true
      },
      hide() {
        Object.assign(this.$data, this.$options.data())
        this.maskShow = false
      },
      right() {
        if(this.$method.isNullFn(this.params.reqParam)) {
          this.$message.warning('表单不能为空')
          return
        }
        if(this.params.reqParam.newPwd !== this.params.reqParam.againPwd) {
          this.$message.warning('重复密码不一致')
          return
        }
        this.$http({
          url: this.$api + 'produce/personal/rs/users/editPasswd',
          method: 'post',
          data: this.params
        }).then(res=>{
          if(res.data.retCode===1) {
            this.$message.success('密码修改成功')
            this.$parent.getPersonInfo()
            this.hide()
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
    .mask-content-wrap
        width 50%
        height 60%
        font-size 13px
        .mask-content
            width 21em
            position absolute
            top 25%
            left 50%
            transform translateX(-50%)
        .block
            margin 0 auto
            label
                color #414141
                width 5em
                display inline-block
            input
                padding 0 1em
                border 1px solid #414141
                height 2em
                border-radius 4px
                width 15em
        .btn-wrapper
            text-align center
</style>
