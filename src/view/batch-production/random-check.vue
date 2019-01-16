<template>
    <transition name="fade">
        <div class="mask random-check" v-if="maskShow">
            <div class="mask-content-wrap fs_20">
                <div class="mask-title-wrap">
                    <div class="mask-title fs_22">
                        抽检
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
                                <label>取样日期</label>
                                <span>*</span>
                            </td>
                            <td class="label-td">
                                <label>取样人</label>
                                <span>*</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-date-picker
                                        v-model="sDate"
                                        type="date"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </td>
                            <td>
                                <input type="text" v-model="params.reqParam.sUser">
                            </td>
                        </tr>
                        <tr>
                            <td class="label-td">
                                <label>收样日期</label>
                                <span>*</span>
                            </td>
                            <td class="label-td">
                                <label>收样人</label>
                                <span>*</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-date-picker
                                        v-model="aDate"
                                        type="date"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </td>
                            <td>
                                <input type="text" v-model="params.reqParam.aUser">
                            </td>
                        </tr>
                        <tr>
                            <td class="label-td">
                                <label>批准人</label>
                                <span>*</span>
                            </td>
                            <td class="label-td">
                                <label>检验结果</label>
                                <span>*</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" v-model="params.reqParam.approver">
                            </td>
                            <td>
                                <input type="text" v-model="params.reqParam.tsResult">
                            </td>
                        </tr>
                        <tr>
                            <td class="label-td">
                                <label>检测判定</label>
                                <span>*</span>
                            </td>
                            <td class="label-td">
                                <label>检测人</label>
                                <span>*</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-select
                                        v-model="params.reqParam.tsJudge"
                                        filterable
                                        allow-create
                                        default-first-option
                                        placeholder="">
                                    <el-option
                                            v-for="item in options1"
                                            :key="item.label"
                                            :label="item.label"
                                            :value="item.label">
                                    </el-option>
                                </el-select>
                            </td>
                            <td>
                                <input type="text" v-model="params.reqParam.inspector">
                            </td>
                        </tr>
                        <tr>
                            <td class="label-td">
                                <label>审核人</label>
                                <span>*</span>
                            </td>
                            <td class="label-td">

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" v-model="params.reqParam.reviewer">
                            </td>
                            <td>

                            </td>
                        </tr>
                        <tr>
                            <td class="label-td" colspan="2">
                                <label>检验依据</label>
                                <span>*</span>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <el-select
                                        v-model="tsBase"
                                        multiple
                                        filterable
                                        allow-create
                                        default-first-option
                                        placeholder="">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.label"
                                            :label="item.label"
                                            :value="item.label">
                                    </el-option>
                                </el-select>
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
                                :before-upload="beforeAvatarUpload"
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
    name: 'random-check',
    props: {
      data: {
        type: Object
      }
    },
    data() {
      return {
        maskShow: false,
        reportDate: '',
        sDate: '',
        aDate: '',
        params: {
          reqParam: {
            billCode: '',
            batchPkId: '',
            sDate: '',
            sUser: '',
            aDate: '',
            aUser: '',
            tsBase: '',
            tsResult: '',
            tsJudge: '',
            inspector: '',
            reviewer: '',
            approver: '',
            reportDate: '',
            report: ''
          }
        },
        tsBase: [],
        options: [{
          label: 'NY/T 1040-2012'
        }],
        options1: [{
          label: '合格'
        },
          {
            label: '不合格'
          }]
      }
    },
    watch: {
      maskShow(newVal) {
        if(newVal) {
          this.params.reqParam.batchPkId = this.data.pkId
        }
      },
      tsBase(val) {
        this.params.reqParam.tsBase = val.join(',')
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
        let _this = this
        if (file) {
          if(file.file.size/1024 > 1025) { //大于1M，进行压缩上传
            this.$method.photoCompress(file.file, {
              quality: 0.5
            }, function(base64Codes){
              _this.params.reqParam.report = base64Codes
            })
          }else{ //小于等于1M 原图上传
            this.fileReader.readAsDataURL(file.file)
            this.fileReader.onload = () => {
              this.params.reqParam.report = this.fileReader.result
            }
          }
        }
      },
      handleRemove1() {
        this.params.reqParam.report = ''
      },
      uploadExceed() {
        this.$message.warning('最多上传1张图片')
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isLt2M;
      },
      right() {
        let t = this.sDate
        if(typeof t !== 'string') {
          this.params.reqParam.sDate = t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate()
        }
        t = this.aDate
        if(typeof t !== 'string') {
          this.params.reqParam.aDate = t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate()
        }
        t = this.reportDate
        if(typeof t !== 'string') {
          this.params.reqParam.reportDate = t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate()
        }

        if(!this.$method.check(this.params.reqParam, {
          billCode: '检验单号',
          sDate: '取样日期',
          sUser: '取样人',
          aDate: '收样日期',
          aUser: '收样人',
          tsBase: '检测依据',
          tsResult: '检验结果',
          tsJudge: '检验判定',
          inspector: '检验人',
          reviewer: '审核人',
          approver: '批准人',
          reportDate: '报告日期',
          report: '检验报告图片'
        }, {
          billCode: 50,
          sDate: 10,
          sUser: 50,
          aDate: 10,
          aUser: 50,
          tsBase: 50,
          tsResult: 100,
          tsJudge: 10,
          inspector: 50,
          reviewer: 50,
          approver: 50,
          reportDate: 10
        })) {
          return
        }
        this.$http({
          url: this.$api + 'produce/production/pd/batch/sampling/save',
          method: 'post',
          data: this.params
        }).then(res => {
          if(res.data.retCode === 1) {
            this.$message.success('抽检报告添加成功')
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
            cursor auto
        .el-input__icon
            line-height 2em
</style>
