<template>
    <transition name="fade">
        <div class="mask" v-if="maskShow">
            <div class="mask-content-wrap fs_20">
                <div class="mask-title-wrap">
                    <div class="mask-title fs_22">
                        检验
                        <div class="close" @click="hide">
                            <i class="iconfont icon-guanbi"></i>
                        </div>
                    </div>
                </div>
                <div class="mask-content clear-float">
                    <div class="img">
                        <img :src="data.report" @click="$method.magnifier(data.report)" @error="$method.imgError($event)" alt="">
                    </div>
                    <table class="mask-table">
                        <tr>
                            <td>检验单号</td>
                            <td colspan="3">{{data.billCode}}</td>
                        </tr>
                        <tr>
                            <td>检验方法</td>
                            <td>{{data.tsMethod}}</td>
                            <td>检验设备</td>
                            <td>{{data.tsEqm}}</td>
                        </tr>
                        <tr>
                            <td>检验依据</td>
                            <td>{{data.tsBase}}</td>
                            <td>检验结果</td>
                            <td>{{data.tsResult}}</td>
                        </tr>
                        <tr>
                            <td>检测判定</td>
                            <td>{{data.tsJudge}}</td>
                            <td>检测人</td>
                            <td>{{data.inspector}}</td>
                        </tr>
                        <tr>
                            <td>批准人</td>
                            <td>{{data.approver}}</td>
                            <td>报告日期</td>
                            <td>{{data.reportDate}}</td>
                        </tr>
                    </table>
                </div>
                <div class="mask-btn-wrap fs_20">
                    <l-button v-if="btnPromise.delCheck && (data.status===94011 || data.status===94012 || data.status===94013)"  buttonText="删除" style="margin-right: .5em" @button-click="del"></l-button>
                    <l-button buttonText="返回" @button-click="hide"></l-button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
  export default {
    name: 'check-detail',
    props: {
      data: {
        type: Object
      },
      btnPromise: {
        type: Object
      }
    },
    data() {
      return {
        maskShow: false
      }
    },
    methods: {
      show() {
        this.maskShow = true

      },
      hide() {
        this.maskShow = false
      },
      del () {
        this.$confirm('确认删除这份检验报告?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'post',
            url: this.$api + 'produce/production/pd/batch/inspect/delete',
            data: {
              reqParam: {
                pkId: this.data.pkId
              }
            }
          }).then((res) => {
              if (res.data.retCode === 1) {
                this.$parent.getData()
                this.hide()
                this.$message({
                    type: 'success',
                    message: '检验报告删除成功!'
                  }
                )
              }
            }
          )
        }).catch(() => {})
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
            padding-top 1em
            .img
                float left
                width 27%
                height 0
                padding-bottom 27%
                position relative
                img
                    position absolute
                    top 0
                    left 0
                    width 100%
            .mask-table
                float right
                width 72%
                td
                    height 3em
        .mask-btn-wrap
            margin 0 auto
            padding 1em 0
</style>
