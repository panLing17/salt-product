<template>
    <transition name="fade">
        <div class="mask" v-show="maskShow">
            <div class="mask-scroll">
                <div class="mask-content-wrap fs_20">
                <div class="mask-title-wrap">
                    <div class="mask-title fs_22">
                        新增投料
                        <div class="close" @click="hide">
                            <i class="iconfont icon-guanbi"></i>
                        </div>
                    </div>
                </div>
                <div class="title">
                    <span>投料信息</span>
                    <i class="iconfont icon-touliaoxz fs_20" @click="addTable()"></i>
                </div>
                <div class="mask-content" id="table" ref="tableContent"></div>
                <div class="mask-btn-wrap fs_20">
                    <l-button buttonText="确定" @button-click="right"></l-button>
                </div>
            </div>
            </div>
        </div>
    </transition>
</template>

<script>
  export default {
    name: 'step2-add',
    data() {
      return {
        maskShow: false,
        count: 1,
        tempData: {}
      }
    },
    methods: {
      hide() {
        Array.from(document.getElementsByClassName('step2-add-table')).forEach(item=>{
          document.getElementById('table').removeChild(item)
        })
        Object.assign(this.$data, this.$options.data())
        this.maskShow = false
      },
      show() {
        this.addTable()
        this.maskShow = true
      },
      addTable() {
        this.$nextTick(() => {
          this.$step2AddTable({
            fatherId: 'table',
            id: this.count++,
            tableInput: this.tableInput,
            tableDel: this.tableDel
          })
        })
      },
      tableInput(data) {
        this.tempData[data.id] = data.value
      },
      tableDel(id) {
        this.$refs.tableContent.removeChild(document.getElementById(id))
        delete this.tempData[id]
        delete this.tempData.id
      },
      right() {
        let params = []
        for(let i in this.tempData) {
          params.push(this.tempData[i])
        }
        this.$http({
          url: this.$api + 'produce/production/pd/batch/feed/save',
          method: 'post',
          data: {
            reqParam: params
          }
        }).then(res => {
            if(res.data.retCode === 1) {
              this.$parent.getFeedList()
              this.hide()
            }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
    .mask-content-wrap
        width 74.8%
        top 10%
        .title
            width 93%
            margin 1em auto 0
            padding-bottom .5em
            border-bottom 1px solid #707070
            i
                color #5273CE
                cursor pointer
                margin-left .5em
        .mask-btn-wrap
            margin 0 auto
            padding 1em 0
</style>
