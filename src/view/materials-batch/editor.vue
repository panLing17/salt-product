<template>
    <transition name="fade">
        <div class="mask materials-batch-editor" v-if="maskShow">
            <div class="mask-scroll">
                <div class="mask-content-wrap">
                <div class="mask-title-wrap">
                    <div class="mask-title fs_22">
                        修改原料批次任务
                        <div class="close" @click="hide">
                            <i class="iconfont icon-guanbi"></i>
                        </div>
                    </div>
                </div>
                <div class="mask-content fs_20">
                    <div class="block">
                        <label>原料信息</label>
                    </div>
                    <table class="mask-table" style="margin-top: .5em">
                        <colgroup width="15%"></colgroup>
                        <colgroup width="35%"></colgroup>
                        <colgroup width="15%"></colgroup>
                        <colgroup width="35%"></colgroup>
                        <tr>
                            <td>原料名称</td>
                            <td>{{data.rawInfo.mName}}</td>
                            <td>规格</td>
                            <td>{{data.rawInfo.spec}}</td>
                        </tr>
                        <tr>
                            <td>净含量</td>
                            <td>{{data.rawInfo.cxt}}</td>
                            <td>保质期</td>
                            <td>{{data.rawInfo.expDate}}</td>
                        </tr>
                        <tr>
                            <td>标准号</td>
                            <td>{{data.rawInfo.stcode}}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                    <div class="block">
                        <label>原料企业</label>
                    </div>
                    <table class="mask-table" style="margin-top: .5em">
                        <colgroup width="15%"></colgroup>
                        <colgroup width="35%"></colgroup>
                        <colgroup width="15%"></colgroup>
                        <colgroup width="35%"></colgroup>
                        <tr>
                            <td>企业名称</td>
                            <td>{{data.factoryInfo.fName}}</td>
                            <td>企业地址</td>
                            <td>{{data.factoryInfo.address}}</td>
                        </tr>
                        <tr>
                            <td>营业执照号</td>
                            <td>{{data.factoryInfo.bLicense}}</td>
                            <td>生产许可证号</td>
                            <td>{{data.factoryInfo.pLicense}}</td>
                        </tr>
                        <tr>
                            <td>企业联系电话</td>
                            <td>{{data.factoryInfo.tel}}</td>
                            <td>企业网址</td>
                            <td>{{data.factoryInfo.website}}</td>
                        </tr>
                    </table>
                    <table class="mask-table special fs_20" style="margin-top: 1em">
                        <colgroup width="30%"></colgroup>
                        <colgroup width="30%"></colgroup>
                        <colgroup width="40%"></colgroup>
                        <tr class="label-wrap">
                            <td>
                                <label>出厂编号</label>
                                <span>*</span>
                            </td>
                            <td>
                                <label>生产地</label>
                                <span>*</span>
                            </td>
                            <td>
                                <label>生产日期</label>
                                <span>*</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" v-model="data.batchNo">
                            </td>
                            <td>
                                <input type="text" v-model="data.prodPlace">
                            </td>
                            <td>
                                <el-date-picker
                                        v-model="data.prodDate"
                                        type="date"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </td>
                        </tr>
                    </table>
                    <div class="upload">
                        <div class="upload-title">
                            <label>出厂检验报告</label>
                            <span>*</span>
                            <span class="fs_18" style="margin-left: .2em;color: #BFBFBF">最多上传1张照片，每张照片不超过5M</span>
                        </div>
                        <div class="img-upload" v-show="imgShow1 && data.factoryInspReport">
                            <i class="fs_18 iconfont icon-qingk" @click="imgShow1=false"></i>
                            <img :src="data.factoryInspReport" alt="">
                        </div>
                        <el-upload
                                v-show="!imgShow1 || !data.factoryInspReport"
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
                    <div class="upload">
                        <div class="upload-title">
                            <label>验收检验报告</label>
                            <span>*</span>
                            <span class="fs_18" style="margin-left: .2em;color: #BFBFBF">最多上传1张照片，每张照片不超过5M</span>
                        </div>
                        <div class="img-upload" v-show="imgShow2 && data.accepetInspReport">
                            <i class="fs_18 iconfont icon-qingk" @click="imgShow2=false"></i>
                            <img :src="data.accepetInspReport" alt="">
                        </div>
                        <el-upload
                                v-show="!imgShow2 || !data.accepetInspReport"
                                action="uploadUrl"
                                list-type="picture-card"
                                :on-remove="handleRemove2"
                                :show-file-list="true"
                                :limit="1"
                                :on-exceed="uploadExceed"
                                :http-request="uploadImg2"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </div>
                </div>
                <div class="mask-btn-wrap fs_20">
                    <l-button buttonText="确认" @button-click="right"></l-button>
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
        type: Object
      }
    },
    data () {
      return {
        maskShow: false,
        dialogImageUrl: '',
        dialogVisible: false,
        uploadUrl: this.$api + 'produce/production/pd/raw/batch/save',
        fileList: [],
        imgShow1: true,
        imgShow2: true
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
            this.data.factoryInspReport = this.fileReader.result
          }
        }
      },
      handleRemove1() {
        this.data.factoryInspReport = ''
      },
      uploadImg2(file) {
        if (file) {
          this.fileReader.readAsDataURL(file.file)
          this.fileReader.onload = () => {
            this.data.accepetInspReport = this.fileReader.result
          }
        }
      },
      handleRemove2() {
        this.data.accepetInspReport = ''
      },
      uploadExceed() {
        this.$message.warning('最多上传1张图片')
      },
      right () {
        let t = this.data.prodDate
        console.log(t)
        if(typeof t !== 'string') {
          this.data.prodDate = t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate()
        }
        this.$http({
          url: this.$api + 'produce/production/pd/raw/batch/update',
          method: 'post',
          data: {
            reqParam: this.data
          }
        }).then(res => {
          if(res.data.retCode === 1) {
            this.$parent.getData()
            this.$message.success('修改成功')
            this.hide()
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
    .mask-content-wrap
        width 75%
        top 7%
        .mask-content
            width 85%
            margin 0 auto 0
            overflow auto
            .block
                padding-top 1em
            .mask-table
                td
                    height 2em
                input
                    width 100%
                    height 100%
                    border none
                &.special
                    border none
                    margin-top 1em
                    tr
                        border none
                        &.label-wrap
                            height 2em
                            vertical-align bottom
                            td
                                padding-bottom .5em
                                &:nth-of-type(1)
                                    padding-left 0
                        td
                            border none
                            &:nth-of-type(1)
                                padding-left 0
                            span
                                color #D31717
                            input
                                border-radius 4px
                                border 1px solid #BFBFBF
                                width 100%
                                height 2em
                                padding-left 1em
            .upload
                margin-top 1em
                .upload-title
                    span
                        color #D91C1C
                .img-upload
                    width 25%
                    font-size 0
                    position relative
                    i
                        position absolute
                        padding 1em
                        right 0
                        top 0
                        z-index 2
                        color #BFBFBF
                        cursor pointer
                    img
                        width 100%
        .mask-btn-wrap
            width 85%
            margin 0 auto
            padding 2em 0
</style>
<style lang="stylus">
    .materials-batch-editor
        .el-input__inner
            height 2em
            border-color #BFBFBF
        .el-input__icon
            line-height 2em
        .el-date-editor.el-input, .el-date-editor.el-input__inner
            width 100%
</style>
