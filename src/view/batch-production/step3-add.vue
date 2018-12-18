<template>
    <transition name="fade">
        <div class="mask" v-if="maskShow">
            <div class="mask-scroll">
                <div class="mask-content-wrap fs_20">
                <div class="mask-title-wrap">
                    <div class="mask-title fs_22">
                        新增批次任务
                        <div class="close" @click="hide">
                            <i class="iconfont icon-guanbi"></i>
                        </div>
                    </div>
                </div>
                <div class="mask-content">
                    <div class="list-wrap fs_20">
                        <div class="list clear-float" v-for="(item, index) in data">
                            <div class="list-left">
                                {{item.fullName}}
                            </div>
                            <div class="list-right">
                                <ul>
                                    <li v-for="(line, i) in item.child"
                                        @click="lineClick(index, i)"
                                        v-if="line.inTask===40020 || line.inBatch===40021 || (line.inTask===40020 && line.inBatch===40020)"
                                    >
                                        <i class="iconfont"
                                           :class="{'icon-dianxuan-1': !line.selected, 'icon-dianxuan-': line.selected}"
                                           :style="{color: line.inBatch===40021?'#E3E3E3':line.selected?'#5F7FD9':'#707070'}"
                                        ></i>
                                        <span>{{line.fullName}}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
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
    name: 'step3-add',
    data() {
      return {
        maskShow: false,
        batchInfo: {},
        data: []
      }
    },
    watch: {
      maskShow(newVal) {
        if(newVal) {
          this.getData()
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
      getData() {
        this.batchInfo = JSON.parse(sessionStorage.getItem('currentDetail'))
        this.$http({
          url: this.$api + 'produce/resources/rs/work/listLineByBatch',
          method: 'post',
          data: {
            reqParam: {
              batchPkId: this.batchInfo.pkId,
              retType: 1
            }
          }
        }).then(res => {
          if(res.data.retCode === 1) {
            let arr = []
            res.data.retVal.forEach(item=>{
              item.selected = item.inTask===40021?true:false
              if(item.workId.substring(2) === '0000') {
                item.child = []
                arr.push(item)
              }
            })
            res.data.retVal.forEach(item => {
              if(item.workId.substring(item.workId.length-2, item.workId.length) !== '00') {
                arr.forEach(a => {
                  if (item.workId.substring(0, 2) === a.workId.substring(0, 2)) {
                    a.child.push(item)
                  }
                })
              }
            })
            this.data = arr
          }
        })
      },
      lineClick(fi, oi) {
        this.data[fi].child.forEach((line,index) => {
          if(line.selected && line.inTask === 40021) {
            return
          } else if(index === oi) {
            line.selected = !line.selected
          }

        })
      },
      right() {
        let params = []
        this.data.forEach(f => {
          f.child.forEach(o => {
            if(o.selected && o.inTask!==40021) {
              params.push({
                batchPkId: this.batchInfo.pkId,
                workId: o.workId
              })
            }
          })
        })
        this.$http({
          url: this.$api + 'produce/production/pd/batch/task/save',
          method: 'post',
          data: {
            reqParam: params
          }
        }).then(res => {
          if(res.data.retCode === 1) {
            this.$message.success('新增生产任务成功')
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
        top 10%
        .tab-wrap
            font-weight bold
            color #414141
            width 93%
            margin 0 auto
            .tab-item
                display inline-block
                line-height 3.9em
                padding 0 1.5em
                position relative
                cursor pointer
                &.active
                    color #5F7FD9
                    &:nth-of-type(1)
                        &:after
                            left 0
                            transform translateX(0)
                    &:after
                        content ''
                        display block
                        height 2px
                        width 3em
                        background-color #5F7FD9
                        position absolute
                        bottom 1em
                        left 50%
                        transform translateX(-50%)
                &:nth-of-type(1)
                    padding-left 0
                &:before
                    content ''
                    display block
                    width 1px
                    height 1.15em
                    background-color #414141
                    position absolute
                    right 0
                    top 50%
                    transform translateY(-50%)
        .mask-content
            overflow auto
            .list-wrap
                width 100%
                overflow auto
                padding-top 1.5em
                .list
                    border 1px solid #e3e3e3
                    border-radius  4px
                    margin-bottom 1em
                    position relative
                    padding-left 10%
                    background-color #e3e3e3
                    .list-left
                        position absolute
                        width 10%
                        left 0
                        text-align center
                        top 50%
                        transform translateY(-50%)
                        font-weight bold
                        user-select none
                    .list-right
                        width 100%
                        padding .5em 0
                        background-color #fff
                        ul
                            padding-left 1em
                            li
                                cursor pointer
                                user-select none
                                margin-bottom .5em
                                display inline-block
                                width 25%
        .mask-btn-wrap
            margin 0 auto
            padding 3em 0 2em
</style>
