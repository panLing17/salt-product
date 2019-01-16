<template>
        <transition name="fade">
            <div class="mask" v-show="editorShow">
                <div class="mask-content-wrap">
                    <div class="mask-title-wrap">
                        <div class="mask-title fs_22">
                            经营企业修改
                            <div class="close" @click="hideEditor">
                                <i class="iconfont icon-guanbi"></i>
                            </div>
                        </div>
                    </div>
                    <div class="mask-content" ref="maskContent">
                        <table class="label-table">
                            <colgroup width="33%"></colgroup>
                            <colgroup width="33%"></colgroup>
                            <colgroup width="33%"></colgroup>
                            <tr class="label-wrap">
                                <td>
                                    <label>经营企业编码</label>
                                    <span>*</span>
                                </td>
                                <td>
                                    <label>经营企业名称</label>
                                    <span>*</span>
                                </td>
                                <td>
                                    <label>经营企业别名</label>
                                    <span>*</span>
                                </td>
                            </tr>
                            <tr>
                            <td>
                                <input type="text" readonly v-model="data.pkId">
                            </td>
                            <td>
                                <input type="text" v-model="data.entName">
                            </td>
                            <td>
                                <input type="text" v-model="data.entAddress">
                            </td>
                             </tr>
                            <tr class="label-wrap">
                                <td>
                                    <label>经营企业地址</label>
                                    <span>*</span>
                                </td>
                                <td>
                                    <label>经营企业类型</label>
                                    <span>*</span>
                                </td>
                                 <td>
                                    <label>上级批发企业</label>
                                    <span>*</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" @focus="setColor($event)" style="color: #BFBFBF">
                                </td>
                                <td>
                                    <el-select placeholder="">
                                        <el-option>
                                        </el-option>
                                    </el-select>
                                </td>
                                <td>
                                    <el-select placeholder="">
                                        <el-option>
                                        </el-option>
                                    </el-select>
                                </td>
                            </tr>
                            <tr class="label-wrap">
                                <td>
                                    <label>属地区划</label>
                                    <span>*</span>
                                </td>
                                <td>
                                    <label>经营企业负责人</label>
                                </td>
                                 <td>
                                    <label>经营企业负责人电话</label>
                                </td>
                                
                            </tr>
                            <tr>
                                <td>
                                    <el-select placeholder="">
                                        <el-option>
                                        </el-option>
                                    </el-select>
                                </td>
                                <td>
                                    <input type="text" @focus="setColor($event)" style="color: #BFBFBF">
                                </td>
                                <td>
                                    <input type="text" @focus="setColor($event)" style="color: #BFBFBF">
                                </td>
                            </tr>
                            <tr class="label-wrap">
                                <td>
                                    <label>经营企业负责人邮箱</label>
                                </td>
                                <td>
                                    <label>中盐平台编码</label>
                                    <span>*</span>
                                </td>
                            </tr>
                             <tr>
                                <td>
                                    <input type="text" @focus="setColor($event)" style="color: #BFBFBF">
                                </td>
                                <td>
                                    <input type="text" @focus="setColor($event)" style="color: #BFBFBF">
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="mask-btn-wrap fs_20">
                        <l-button buttonText="返回" @button-click="hideEditor" style="margin-right: 1em"></l-button>
                        <l-button buttonText="确认" @button-click="editor"></l-button>
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
    data() {
      return {
        editorShow: false,
        cTypeList: [],
        props: {
          value: 'areaId',
          children: 'childList',
          label: 'areaName'
        },
        selectedValue: [],
        companyList: []
      }
    },
    watch: {
      editorShow(newVal) {
        if(newVal) {
          this.initData()
          this.getCompany()
        }
      }
    },
    methods: {
      hideEditor () {
        this.editorShow = false
      },
    }
  }
</script>
<style scoped lang="stylus">
    .label-table
        padding-left 2%
        tr
            td
                .el-select
                    width 95%
                &:last-child
                    padding-left 0
                input
                    width 95%
                textarea
                    width 98%
    .mask-btn-wrap
        padding-right 2% !important
</style>
<style lang="stylus" scoped>
    @import '../../assets/css/fn.styl'
    .mask
        position fixed
        width 100%
        height 100%
        overflow auto
        z-index 20
        top 0
        left 0
        background-color rgba(0,0,0,.5)
        .mask-scroll
            position relative
            padding 50px 0
        .mask-content-wrap
            background-color #ffffff
            position relative
            top 10%
            left 50%
            width 75%
            transform translateX(-50%)
            border-radius 4px
            .mask-title-wrap
                border-bottom 1px solid #E3E3E3
                .mask-title
                    line-height 3.18em
                    font-weight bold
                    position relative
                    margin 0 auto
                    width 93%
                    font-size-set(22px)
                    .close
                        position absolute
                        right 0
                        top 50%
                        transform translateY(-50%)
                        cursor pointer
                        color #BFBFBF
                        font-weight normal
            .mask-content
                width 93%
                margin 0 auto
                padding-top 20px
            .mask-btn-wrap
                width 93%
                padding 20px 0 20px
                margin 0 auto
                font-size 0
                text-align right
        .label-table
            border none
            width 100%
            font-size-set(20px)
            table-layout fixed
            &.editor
                tr
                    td
                        input
                            color #BFBFBF
                        .el-input__inner
                            color #BFBFBF
            &.col-2
                tr
                    &.label-wrap
                        td:nth-child(even)
                            padding-left 5%
                            text-align left
                td
                    &:nth-child(even)
                        text-align right
                    input
                        width 90%
            tr
                border none
                &.label-wrap
                    height 2em
                    vertical-align bottom
                    td
                        padding-top .5em
                        line-height 1.5em
                td
                    border none
                    padding-left 0
                    line-height 2em
                    .el-select
                        width 100%
                        height 2em
                        .el-input__icon
                            line-height 2em
                    .el-input__inner
                        color #414141
                    span
                        color #D31717
                    .el-select
                        width 90%
                        height 2em
                        input
                            width 100%
                    &.special
                        padding-left 0
                    input
                        border-radius 4px
                        border 1px solid #BFBFBF
                        width 90%
                        height 2em
                        padding 0 .5em
                        color #414141
                    textarea
                        border-radius 4px
                        padding .5em
                        resize none
                        border 1px solid #BFBFBF
                        &.special
                            width 100%
                            height 3em
        .mask-table
            width 100%
            border 1px solid #BFBFBF
            border-collapse collapse
            table-layout fixed
            font-size-set(20px)
            tr
                border 1px solid #BFBFBF
                td
                    border 1px solid #BFBFBF
                    color #414141
                    padding 5px 10px
                    word-break break-all
                    &.center
                        padding-left 0
                        text-align center
</style>
<style lang="stylus">
    @import '../../assets/css/fn.styl'
    .mask
        .el-range-editor.el-input__inner
            padding 0
        .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner
            width 95%
        .el-input__inner
            font-size-set(20px)
            height 2em
            line-height 2em
            border-color  #bfbfbf
        .el-date-editor .el-range__icon
            font-size-set(20px)
            line-height 2em
            margin-left 5px
        .el-date-editor .el-range-separator
            font-size-set(20px)
            width 7%
            line-height 2em
        .el-date-editor .el-range-input, .el-date-editor .el-range-separator
            font-size-set(20px)
        .label-table tr td span.el-cascader__label, .label-table tr td span.el-input__suffix-inner
            color #414141
        .el-cascader
            width 95%
            color #414141
            font-size-set(20px)
            line-height 2em
        .el-cascader__label
            padding 0 5px
        .label-table tr td input.el-input__inner
            width 100%
        .el-input__icon
            font-size-set(20px)
            line-height 2em
        .el-input__suffix
            right 0
        .label-table tr td .el-cascader__label span
            color #414141
</style>

