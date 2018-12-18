<template>
    <transition name="fade">
        <div class="mask random-check" v-if="maskShow">
            <div class="mask-content-wrap fs_20">
                <div class="mask-title-wrap">
                    <div class="mask-title fs_22">
                        检验
                        <div class="close" @click="hide">
                            <i class="iconfont icon-guanbi"></i>
                        </div>
                    </div>
                </div>
                <div class="mask-content">
                    <table class="label-table">
                        <tr>
                            <td class="label-td">
                                <label>检验单号</label>
                                <span>*</span>
                            </td>
                            <td class="label-td">
                                <label>报告日期</label>
                                <span>*</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" v-model="params.reqParam.billCode">
                            </td>
                            <td>
                                <el-date-picker
                                        v-model="reportDate"
                                        type="date"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </td>
                        </tr>
                        <tr>
                            <td class="label-td">
                                <label>检验方法</label>
                                <span>*</span>
                            </td>
                            <td class="label-td">
                                <label>检测判定</label>
                                <span>*</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" v-model="params.reqParam.tsMethod">
                            </td>
                            <td>
                                <input type="text" v-model="params.reqParam.tsJudge">
                            </td>
                        </tr>
                        <tr>
                            <td class="label-td">
                                <label>检验设备</label>
                                <span>*</span>
                            </td>
                            <td class="label-td">
                                <label>检测人</label>
                                <span>*</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" v-model="params.reqParam.tsEqm">
                            </td>
                            <td>
                                <input type="text" v-model="params.reqParam.inspector">
                            </td>
                        </tr>
                        <tr>
                            <td class="label-td">
                                <label>检验依据</label>
                                <span>*</span>
                            </td>
                            <td class="label-td">
                                <label>检验结果</label>
                                <span>*</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" v-model="params.reqParam.tsBase">
                            </td>
                            <td>
                                <input type="text" v-model="params.reqParam.tsResult">
                            </td>
                        </tr>
                        <tr>
                            <td class="label-td">

                            </td>
                            <td class="label-td">

                            </td>
                        </tr>
                        <tr>
                            <td class="label-td">
                                <label>审核人</label>
                                <span>*</span>
                            </td>
                            <td class="label-td">
                                <label>批准人</label>
                                <span>*</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" v-model="params.reqParam.reviewer">
                            </td>
                            <td>
                                <input type="text" v-model="params.reqParam.approver">
                            </td>
                        </tr>
                    </table>
                    <div class="upload">
                        <div class="upload-title">
                            <label>上传抽检报告</label>
                            <span>*</span>
                            <span class="fs_18" style="margin-left: .2em;color: #BFBFBF">最多上传1张照片，每张照片不超过5M</span>
                        </div>
                        <el-upload
                                action="uploadUrl"
                                list-type="picture-card"
                                :on-remove="handleRemove1"
                                :show-file-list="true"
                                :limit="1"
                                :on-exceed="uploadExceed"
                                :http-request="uploadImg1"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </div>
                </div>
                <div class="mask-btn-wrap fs_20">
                    <l-button buttonText="返回" style="margin-right: .5em" @button-click="hide"></l-button>
                    <l-button buttonText="确认" @button-click="right"></l-button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
  export default {
    name: 'check',
    props: {
      data: {
        type: Object
      }
    },
    data() {
      return {
        maskShow: false,
        reportDate: '',
        params: {
          reqParam: {
            billCode: '',
            batchPkId: '',
            tsMethod: '',
            tsEqm: '',
            tsBase: '',
            tsResult: '',
            tsJudge: '',
            inspector: '',
            reviewer: '',
            approver: '',
            reportDate: '',
            report: ''
          }
        }
      }
    },
    watch: {
      maskShow(newVal) {
        if(newVal) {
          this.params.reqParam.batchPkId = this.data.pkId
        }
      }
    },
    mounted() {
      this.fileReader = new FileReader()
    },
    methods: {
      show() {
        this.maskShow = true
      },
      hide() {
        Object.assign(this.$data, this.$options.data())
        this.maskShow = false
      },
      uploadImg1(file) {
        if (file) {
          this.fileReader.readAsDataURL(file.file)
          this.fileReader.onload = () => {
            this.params.reqParam.report = this.fileReader.result
          }
        }
      },
      handleRemove1() {
        this.params.reqParam.report = ''
      },
      uploadExceed() {
        this.$message.warning('最多上传1张图片')
      },
      right() {
        let t = this.reportDate
        if(typeof t !== 'string') {
          this.params.reqParam.reportDate = t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate()
        }
        if(this.$method.isNullFn(this.params.reqParam)) {
          this.$message.warning('数据不能为空')
          return
        }
        this.$http({
          url: this.$api + 'produce/production/pd/batch/inspect/save',
          method: 'post',
          data: this.params
        }).then(res => {
          if(res.data.retCode === 1) {
            this.$message.success('检验报告添加成功')
            this.hide()
            this.$parent.getData()
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
    .mask-content-wrap
        width 74.8%
        top 8%
        .mask-content
            overflow auto
            .label-table
                width 100%
                tr
                    td
                        color #414141
                        padding-left 1em
                        &:nth-of-type(1)
                            padding-left 0
                        span
                            color #D91C1C
                        input
                            width 100%
                            height 2em
                            border 1px solid #BFBFBF
                            border-radius 4px
                        &.label-td
                            padding-top .5em
            .upload
                margin-top 1em
                .upload-title
                    span
                        color #D91C1C
        .mask-btn-wrap
            margin 0 auto
            padding 1em 0
</style>
<style lang="stylus">
    .random-check
        .el-date-editor.el-input, .el-date-editor.el-input__inner
            width 100%
        .el-input__inner
            height 2em
            line-height 2em
        .el-input__icon
            line-height 2em
</style>
