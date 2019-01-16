<template>
    <transition name="fade">
        <div class="mask materials-batch-add" v-if="maskShow">
            <div class="mask-scroll">
                <div class="mask-content-wrap">
                <div class="mask-title-wrap">
                    <div class="mask-title fs_22">
                        新增原料批次任务
                        <div class="close" @click="hide">
                            <i class="iconfont icon-guanbi"></i>
                        </div>
                    </div>
                </div>
                <div class="mask-content fs_20">
                    <div class="block">
                        <label>原料名称</label>
                        <el-select v-model="materials" filterable clearable  placeholder="" style="width: 50%">
                            <el-option
                                    v-for="item in materialsData"
                                    :key="item.pkId"
                                    :label="item.mName"
                                    :value="item.pkId">
                            </el-option>
                        </el-select>
                    </div>
                    <table class="mask-table" style="margin-top: 1em">
                        <colgroup width="15%"></colgroup>
                        <colgroup width="35%"></colgroup>
                        <colgroup width="15%"></colgroup>
                        <colgroup width="35%"></colgroup>
                        <tr>
                            <td>原料名称</td>
                            <td>{{materialsDetail.mName}}</td>
                            <td>规格</td>
                            <td>{{materialsDetail.spec}}</td>
                        </tr>
                        <tr>
                            <td>净含量</td>
                            <td>{{materialsDetail.cxt}}</td>
                            <td>保质期</td>
                            <td>{{materialsDetail.expDate}}</td>
                        </tr>
                        <tr>
                            <td>标准号</td>
                            <td>{{materialsDetail.stcode}}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                    <div class="block">
                        <label>原料企业</label>
                        <el-select v-model="company" filterable clearable  placeholder="" style="width: 50%">
                            <el-option
                                    v-for="item in companyData"
                                    :key="item.pkId"
                                    :label="item.fName"
                                    :value="item.pkId">
                            </el-option>
                        </el-select>
                    </div>
                    <table class="mask-table" style="margin-top: 1em">
                        <colgroup width="15%"></colgroup>
                        <colgroup width="35%"></colgroup>
                        <colgroup width="15%"></colgroup>
                        <colgroup width="35%"></colgroup>
                        <tr>
                            <td>企业名称</td>
                            <td>{{companyDetail.fName}}</td>
                            <td>企业地址</td>
                            <td>{{companyDetail.address}}</td>
                        </tr>
                        <tr>
                            <td>营业执照号</td>
                            <td>{{companyDetail.bLicense}}</td>
                            <td>生产许可证号</td>
                            <td>{{companyDetail.pLicense}}</td>
                        </tr>
                        <tr>
                            <td>企业联系电话</td>
                            <td>{{companyDetail.tel}}</td>
                            <td>企业网址</td>
                            <td>{{companyDetail.website}}</td>
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
                                <input type="text" v-model="params.reqParam.batchNo">
                            </td>
                            <td>
                                <input type="text" v-model="params.reqParam.prodPlace">
                            </td>
                            <td>
                                <el-date-picker
                                        v-model="params.reqParam.prodDate"
                                        type="date"
                                        format="yyyy-MM-dd"
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
                    <div class="upload">
                        <div class="upload-title">
                            <label>验收检验报告</label>
                            <span>*</span>
                            <span class="fs_18" style="margin-left: .2em;color: #BFBFBF">最多上传1张照片，每张照片不超过5M</span>
                        </div>
                        <el-upload
                                action="uploadUrl"
                                list-type="picture-card"
                                :on-remove="handleRemove2"
                                :show-file-list="true"
                                :limit="1"
                                :on-exceed="uploadExceed"
                                :http-request="uploadImg2"
                                :before-upload="beforeAvatarUpload"
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
    name: 'add',
    props: {
      companyData: {
        type: Array
      },
      materialsData: {
        type: Array
      }
    },
    data () {
      return {
        maskShow: false,
        materials: '',
        company: '',
        materialsDetail: {},
        companyDetail: {},
        params: {
          reqParam: {
            prodDate: '',
            factoryPkId: '',
            rawPkId: '',
            prodPlace: '',
            batchNo: '',
            factoryInspReport: '',
            accepetInspReport: ''
          }
        }
      }
    },
    watch: {
      materials(newVal) {
        if(newVal) {
          this.getMaterialsInfo()
        }
      },
      company(newVal) {
        if(newVal) {
          this.getCompanyInfo()
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
      getMaterialsInfo() {
        this.$http({
          url: this.$api + 'produce/resources/rs/raw/getById',
          method: 'post',
          data: {
            reqParam: {
              pkId: this.materials
            }
          }
        }).then(res => {
          if(res.data.retCode === 1) {
            this.materialsDetail = res.data.retVal
          }
        })
      },
      getCompanyInfo() {
        this.$http({
          url: this.$api + 'produce/resources/rs/raw/factory/getById',
          method: 'post',
          data: {
            reqParam: {
              pkId: this.company
            }
          }
        }).then(res => {
          if(res.data.retCode === 1) {
            this.companyDetail = res.data.retVal
          }
        })
      },
      uploadImg1(file) {
        let _this = this
        if (file) {
          if(file.file.size/1024 > 1025) { //大于1M，进行压缩上传
            this.$method.photoCompress(file.file, {
              quality: 0.5
            }, function(base64Codes){
              _this.params.reqParam.factoryInspReport = base64Codes
            })
          }else{ //小于等于1M 原图上传
            this.fileReader.readAsDataURL(file.file)
            this.fileReader.onload = () => {
              this.params.reqParam.factoryInspReport = this.fileReader.result
            }
          }
        }
      },
      handleRemove1() {
        this.params.reqParam.factoryInspReport = ''
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isLt2M;
      },
      uploadImg2(file) {
        let _this = this
        if (file) {
          if(file.file.size/1024 > 1025) { //大于1M，进行压缩上传
            this.$method.photoCompress(file.file, {
              quality: 0.5
            }, function(base64Codes){
              _this.params.reqParam.accepetInspReport = base64Codes
            })
          }else{ //小于等于1M 原图上传
            this.fileReader.readAsDataURL(file.file)
            this.fileReader.onload = () => {
              this.params.reqParam.accepetInspReport = this.fileReader.result
            }
          }
        }
      },
      handleRemove2() {
        this.params.reqParam.accepetInspReport = ''
      },
      uploadExceed() {
        this.$message.warning('最多上传1张图片')
      },
      right () {
        this.params.reqParam.factoryPkId = this.company
        this.params.reqParam.rawPkId = this.materials
        let t = this.params.reqParam.prodDate
        if(typeof t !== 'string') {
          this.params.reqParam.prodDate = t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate()
        }

        if(!this.$method.check(this.params.reqParam, {
          prodDate: '生产日期',
          factoryPkId: '企业编码',
          rawPkId: '原料编码',
          prodPlace: '生产地',
          batchNo: '原料出厂批号',
          factoryInspReport: '出厂检验报告',
          accepetInspReport: '验收检验报告'
        })) {
          return
        }

        this.$http({
          url: this.$api + 'produce/production/pd/raw/batch/save',
          method: 'post',
          data: this.params
        }).then(res => {
          if(res.data.retCode === 1) {
            this.$parent.params.reqParam.page = 1
            this.$parent.getData()
            this.$message.success('新增成功')
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
                padding-top 3em
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
                    line-height 3em
                    span
                        color #D91C1C
        .mask-btn-wrap
            width 85%
            margin 0 auto
            padding 2em 0
</style>
<style lang="stylus">
    .materials-batch-add
        .el-input__inner
            height 2em
            border-color #BFBFBF
        .el-input__icon
            line-height 2em
        .el-date-editor.el-input, .el-date-editor.el-input__inner
            width 100%
</style>
