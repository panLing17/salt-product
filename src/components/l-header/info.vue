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
                    <el-collapse v-model="activeName" accordion>
                        <el-collapse-item :title="'姓名：'+ data.uName" name="1">
                            <div class="block">
                                <label>姓名</label>
                                <input type="text" v-model="params.reqParam.uName">
                            </div>
                        </el-collapse-item>
                        <el-collapse-item :title="'性别：'+$method.queryDictionary.call(this, 800, data.sex)" name="2">
                            <div class="block">
                                <label>性别</label>
                                <el-select v-model="params.reqParam.sex" filterable placeholder="请选择">
                                    <el-option
                                            v-for="item in sexList"
                                            :key="item.pkId"
                                            :label="item.dName"
                                            :value="item.pkId">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-collapse-item>
                        <div class="readonly">
                            <div class="block">
                                <label>所属单位：</label>
                                <input type="text" v-model="data.unitName" readonly>
                            </div>
                        </div>
                        <el-collapse-item :title="'手机号：'+data.mobile" name="3">
                            <div class="block">
                                <label>手机号</label>
                                <input type="text" v-model="params.reqParam.mobile">
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <div class="mask-btn-wrap fs_20">
                    <l-button buttonText="确认" @button-click="right"></l-button>
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
    name: 'info',
    data() {
      return {
        maskShow: false,
        activeName: '1',
        sexList: [],
        params: {
          reqParam: {
            uName: '',
            sex: '',
            mobile: ''
          }
        }
      }
    },
    created() {
      this.sexList = this.GLOBAL.dictionaryData[800]
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
        if(this.params.reqParam.mobile.trim().length===0 &&
          this.params.reqParam.uName.trim().length===0 &&
          this.params.reqParam.sex.toString().trim().length===0
        ) {
          this.hide()
        } else {
          if(this.params.reqParam.mobile.trim().length===0) {
            this.params.reqParam.mobile = this.data.mobile
          }
          if(this.params.reqParam.uName.trim().length===0) {
            this.params.reqParam.uName = this.data.uName
          }
          if(this.params.reqParam.sex.toString().trim().length===0) {
            this.params.reqParam.sex = this.data.sex
          }
          this.$http({
            url: this.$api + 'produce/personal/rs/users/editByToken',
            method: 'post',
            data: this.params
          }).then(res=>{
            if(res.data.retCode===1) {
              this.$message.success('个人信息修改成功')
              this.$parent.getPersonInfo()
              this.hide()
            }
          })
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
.mask-content-wrap
    width 60%
    height 60%
    .block
        label
            color #414141
        input
            border 1px solid #E3E3E3
            border-radius 4px
            height 2em
            margin-left .8em
            padding 0 1em
    .readonly
        font-size 13px
        height 48px
        border-bottom 1px solid #ebeef5
        .block
            line-height 48px
    .mask-btn-wrap
        margin 3em auto 0
</style>
