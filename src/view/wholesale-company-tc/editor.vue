<template>
    <transition name="fade">
        <div class="mask wholesale-company-editor" v-if="maskShow">
            <div class="mask-scroll">
                <div class="mask-content-wrap">
                    <div class="mask-title-wrap">
                        <div class="mask-title fs_22">
                            修改批发企业
                            <div class="close" @click="hide">
                                <i class="iconfont icon-guanbi"></i>
                            </div>
                        </div>
                    </div>
                    <div class="mask-content">
                        <table class="label-table">
                            <colgroup width="33.33%"></colgroup>
                            <colgroup width="33.33%"></colgroup>
                            <colgroup width="33.33%"></colgroup>
                            <tr class="label-wrap">
                                <td>
                                    <label>批发企业编码</label>
                                    <span>*</span>
                                </td>
                                <td>
                                    <label>批发企业名称</label>
                                    <span>*</span>
                                </td>
                                <td>
                                    <label>批发企业简称</label>
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
                                    <label>所属区域</label>
                                    <span>*</span>
                                </td>
                                <td>
                                    <label>批发企业地址</label>
                                    <span>*</span>
                                </td>
                                <td>

                                    <label>批发企业状态</label>
                                    <span>*</span>

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" v-model="data.status">
                                </td>
                                <td>
                                    <el-cascader
                                            filterable
                                            :options="GLOBAL.areaList"
                                            :props="props"
                                            @change="select"
                                            v-model="selectedValue"
                                    ></el-cascader>
                                </td>
                                <td>
                                    <input type="text" v-model="data.customCode">
                                </td>
                            </tr>
                            <tr class="label-wrap">
                                <td>
                                    <label>中盐平台编码</label>
                                    <span>*</span>
                                </td>
                                <td>
                                    <label>批发企业上级公司</label>
                                </td>
                                <td>
                                    <label>批发企业上级监管部门</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" v-model="data.legal">
                                </td>
                                <td>
                                    <el-select v-model="data.entHigherCode" clearable  placeholder="">
                                        <el-option
                                                v-for="item in companyList"
                                                :key="item.pkId"
                                                :label="item.entName"
                                                :value="item.pkId">
                                        </el-option>
                                    </el-select>
                                </td>
                                <td>
                                    <input type="text" v-model="data.entSupervisory">
                                </td>
                            </tr>
                            <tr class="label-wrap">
                                <td>
                                    <label>批发企业电话</label>
                                </td>
                                <td>
                                    <label>批发许可证号</label>
                                </td>
                                <td>
                                    <label>许可证有效期起止</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" v-model="data.telephone">
                                </td>
                                <td>
                                    <input type="text" v-model="data.license">
                                </td>
                                <td>
                                    <el-date-picker
                                            v-model="queryDate"
                                            value-format="yyyy-MM-dd"
                                            type="daterange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                                    </el-date-picker>
                                </td>
                            </tr>
                            <tr class="label-wrap">
                                <td>
                                    <label>批发企业注册资金</label>
                                </td>
                                <td>
                                    <label>批发企业网址</label>
                                </td>
                                <td>
                                    <label>批发企业法人</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" v-model="data.registFund">
                                </td>
                                <td>
                                    <input type="text" v-model="data.website">
                                </td>
                                <td>
                                    <input type="text" v-model="data.entSupervisory">
                                </td>
                            </tr>
                            <tr class="label-wrap">
                                <td colspan="3">
                                    <label>备注</label>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <textarea name="" v-model="data.remark"></textarea>
                                </td>
                            </tr>
                        </table>
                        <div class="block">
                            <div class="block-title">
                                <span>授权经营区划</span>
                            </div>
                            <div class="block-content" id="areaWrap">
                            </div>
                        </div>
                    </div>
                    <div class="mask-btn-wrap">
                        <div class="btn-normal-l" style="margin-right: 2em" @click="hide">返回</div>
                        <div class="btn-normal-l" @click="right">确认</div>
                    </div>
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
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        maskShow: true,
        queryDate: ['1989-1-12','2018-11-2'],
        selectedValue: [],
        props: {
          value: 'areaId',
          children: 'childList',
          label: 'areaName'
        },
        companyList: [],
        areaCount: 1,
        areaList: {}
      }
    },
    watch: {
      queryDate (newVal) {
        if(newVal.length>0) {
          this.data.licenseIssue = newVal[0]
          this.data.licenseExp = newVal[1]
        } else {
          this.params.licenseIssue = ''
          this.params.licenseExp = ''
        }
      },
      maskShow(val) {
        if(val) {
          this.initData()
          this.getCompany()
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
      getCompany() {
        this.$method.http('platform/resources/rs/ent/wholesale/getForCombox').then(res => {
          this.companyList = res
        })
      },
      initData() {
        if(this.data.licenseIssue && this.data.licenseExp) {
          let temp = [this.data.licenseIssue,this.data.licenseExp]
          this.queryDate = temp
        }
        this.selectedValue = this.formatArea(this.data.areaId)

        this.data.areas.forEach(item=>{
          let full = this.formatArea(item.areaId)
          this.addArea(full)
        })


      },
      formatArea(target) {
        let t = target
        let arr = ['000000']
        let index = 2
        while (arr[arr.length-1] != t && index<=6) {
          let a = t.substring(0, index)
          a = a.padEnd(6, '0')
          arr.push(a)
          index+=2
        }
        return arr
      },
      addArea(item) {
        this.$nextTick(()=>{
          let p = {
            fatherId: 'areaWrap',
            id: this.areaCount++,
            change: this.areaChange,
            del: this.areaDel
          }
          if(Array.isArray(item)) {
            p.data = item
          }
          this.$area(p)
        })
      },
      areaChange(data) {
        this.areaList[data.id] = data.data
      },
      areaDel(id) {
        if(this.areaList[id]) {
          delete this.areaList[id]
        }
        document.getElementById('areaWrap').removeChild(document.getElementById('area'+id))
      },
      select(val) {
        this.data.workArea = val[val.length-1]
      },
      right() {
        let temp = {}
        temp.pkId = this.data.pkId
        temp.entName = this.data.entName
        temp.entAddress = this.data.entAddress
        temp.areaId = this.data.areaId
        temp.status = this.data.status
        temp.customCode = this.data.customCode
        if(!this.$method.check(temp, {
          pkId: '批发企业编码',
          entName: '批发企业名称',
          entAddress: '批发企业地址',
          areaId: '所属地区名称',
          status: '批发企业状态',
          customCode: '中盐平台编码',
        }, {
          pkId: 15,
          entName: 150,
          entAddress: 300,
          areaId: 6,
          status: 50,
          customCode: 50,
        })) {
          return
        }

        let arr = []
        for(let i in this.areaList) {
          arr.push({
            areaId: this.areaList[i]
          })
        }
        this.data.areas = arr
        this.$method.http('platform/resources/rs/ent/wholesale/update', this.data).then(res => {
          this.$message.success('修改批发企业成功')
          this.hide()
          this.$parent.getData()
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
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
                        .el-input__icon
                            line-height 2em
                    .el-input__inner
                        color #414141
                    span
                        color #D31717
                    .el-select
                        width 90%
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
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color: #BFBFBF;
    }
    input:-moz-placeholder, textarea:-moz-placeholder {
        color:#BFBFBF;
    }
    input::-moz-placeholder, textarea::-moz-placeholder {
        color:#BFBFBF;
    }
    input:-ms-input-placeholder, textarea:-ms-input-placeholder {
        color:#BFBFBF;
    }
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
    .block
        padding-left 2%
        font-size-set(20px)
        color #414141
        .block-title
            font-size 0
            padding 5px 0
            i
                color #5273CE
                font-size-set(20px)
                padding 0 10px
                cursor pointer
            span
                font-size-set(20px)
    .img-wrap
        display inline-block
        width 24%
        height 0
        padding-bottom 24%
        position relative
        img
            position absolute
            width 100%
            height 100%
            top 0
            left 0
        i
            padding 10px
            font-size-set(20px)
            color rgba(255,255,255,.5)
            position absolute
            top 0
            right 0
            z-index 2
            cursor pointer
            &:hover
                color #ffffff
    .upload-wrap
        padding-left 2%
        font-size 0
        .upload-title
            padding 10px 0
            font-size-set(20px)
            color #414141
            span
                margin-left 1em
                font-size-set(18px)
                color #BFBFBF
        .upload-img
            display inline-block
            width 23%
            height 0
            padding-bottom 23%
            position relative
            margin-bottom 10px
            border-radius 4px
            overflow hidden
            margin-right 2%
            img
                position absolute
                width 100%
                height 100%
                left 0
                top 0
            i
                padding 10px
                font-size-set(20px)
                color rgba(255,255,255,.5)
                position absolute
                top 0
                right 0
                z-index 2
                cursor pointer
                &.icon-qingk
                    right 30px
                &:hover
                    color #ffffff
    .mask-btn-wrap
        padding-right 2% !important
</style>
<style lang="stylus">
    @import '../../assets/css/fn.styl'
    .wholesale-company-editor
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
