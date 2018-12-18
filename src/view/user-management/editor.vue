<template>
    <transition name="fade">
        <div class="mask user-management-editor" v-if="maskShow">
            <div class="mask-content-wrap">
                <div class="mask-title-wrap">
                    <div class="mask-title fs_22">
                        编辑
                        <div class="close" @click="hide">
                            <i class="iconfont icon-guanbi"></i>
                        </div>
                    </div>
                </div>
                <div class="mask-content">
                    <table class="mask-table fs_20">
                        <colgroup width="50%"></colgroup>
                        <colgroup width="50%"></colgroup>
                        <tr class="label-wrap">
                            <td>
                                <label>账号</label>
                                <span>*</span>
                            </td>
                            <td>
                                <label>岗位</label>
                                <span>*</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" v-model="data.uId">
                            </td>
                            <td>
                                <input type="text" v-model="data.jobTitle">
                            </td>
                        </tr>
                        <tr class="label-wrap">
                            <td>
                                <label>姓名</label>
                                <span>*</span>
                            </td>
                            <td>
                                <label>性别</label>
                                <span>*</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" v-model="data.uName">
                            </td>
                            <td>
                                <el-select class="fs_20" filterable v-model="sexActive" placeholder="">
                                    <el-option
                                            v-for="item in sex"
                                            :key="item.pkId"
                                            :label="item.dName"
                                            :value="item.dName">
                                    </el-option>
                                </el-select>
                            </td>
                        </tr>
                        <tr class="label-wrap">
                            <td>
                                <label>类型</label>
                                <span>*</span>
                            </td>
                            <td>
                                <label>手机号</label>
                                <span>*</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-select class="fs_20" filterable v-model="uTypeActive" placeholder="">
                                    <el-option
                                            v-for="item in uType"
                                            :key="item.pkId"
                                            :label="item.dName"
                                            :value="item.dName">
                                    </el-option>
                                </el-select>
                            </td>
                            <td>
                                <input type="text" v-model="data.mobile">
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="mask-btn-wrap fs_20">
                    <l-button buttonText="返回" @button-click="hide" style="margin-right: 1em"></l-button>
                    <l-button buttonText="确认" @button-click="right"></l-button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
  export default {
    name: 'editor',
    props: {
      data: {
        type: Object
      }
    },
    data () {
      return {
        maskShow: false,
        sex: [],
        uType: [],
        sexActive: '',
        uTypeActive: ''
      }
    },
    watch: {
      maskShow(newVal) {
        if (newVal) {
          this.initData()
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
      initData() {
        this.sex = this.GLOBAL.dictionaryData[800]
        this.uType = this.GLOBAL.dictionaryData[500]
        this.sexActive = this.data.sex
        this.uTypeActive = this.data.uType
      },
      right () {
        let params = {
          reqParam: this.data
        }
        params.reqParam.uType = this.$method.queryDictionaryForName.call(this, 500, this.uTypeActive)
        params.reqParam.sex = this.$method.queryDictionaryForName.call(this, 800, this.sexActive)
        console.log(this.sexActive)
        this.$http({
          url: this.$api + 'produce/resources/rs/users/update',
          method: 'post',
          data: params
        }).then(res => {
          if (res.data.retCode === 1) {
            this.$parent.getData()
            this.hide()
            this.$message.success('修改成功')
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
                padding-top 1em
            .mask-table
                border none
                margin-top 1em
                tr
                    border none
                    &.label-wrap
                        height 2em
                        vertical-align bottom
                        td
                            padding-bottom .5em
                    td
                        border none
                        padding-left 0
                        &:last-child
                            padding-left 10%
                        span
                            color #D31717
                        &:nth-of-type(1)
                            input
                                width 90%
                        &.special
                            padding-left 0
                        input
                            border-radius 4px
                            border 1px solid #BFBFBF
                            width 100%
                            height 2em
                            padding-left 1em
                        textarea
                            border-radius 4px
                            border 1px solid #BFBFBF
                            &.special
                                width 100%
                                height 3em

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
                    &:last-child
                        border none
                    span
                        position relative
                        padding-bottom .1em
                        &.active
                            border-bottom 1px solid #5F7FD9
        .mask-btn-wrap
            width 85%
            margin 0 auto
            padding 1em 0
            text-align right
</style>
<style lang="stylus">
    .user-management-editor
        .el-collapse-item__header
            font-weight bold
            color #414141
        .el-collapse-item__content
            padding-bottom 1em
        .el-input__inner
            padding-left 1em
            height 2em
            border-color #BFBFBF
            color #414141
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
