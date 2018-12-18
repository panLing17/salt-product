<template>
    <transition name="fade">
        <div class="mask permission-management-modify" v-if="maskShow">
            <div class="mask-scroll">
                <div class="mask-content-wrap">
                <div class="mask-title-wrap">
                    <div class="mask-title fs_22">
                        修改权限组
                        <div class="close" @click="hide">
                            <i class="iconfont icon-guanbi"></i>
                        </div>
                    </div>
                </div>
                <div class="mask-content">
                    <div class="title fs_22">权限基本信息</div>
                    <table class="mask-table fs_20">
                        <colgroup width="50%"></colgroup>
                        <colgroup width="50%"></colgroup>
                        <tr class="label-wrap">
                            <td>
                                <label>组名称</label>
                                <span>*</span>
                            </td>
                            <td>
                                <label>是否可编辑</label>
                                <span>*</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" v-model="data.gName">
                            </td>
                            <td>
                                <el-select class="fs_20" filterable v-model="data.edited" placeholder="">
                                    <el-option
                                            v-for="item in editedData"
                                            :key="item.pkId"
                                            :label="item.dName"
                                            :value="item.pkId">
                                    </el-option>
                                </el-select>
                            </td>
                        </tr>
                        <tr class="label-wrap">
                            <td class="special" colspan="2">
                                <label>备注</label>
                                <span>*</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="special" colspan="2">
                                <textarea class="special" v-model="data.remark"></textarea>
                            </td>
                        </tr>
                    </table>
                    <div class="title fs_22" style="margin: 1em auto .5em">授权功能</div>
                    <el-collapse v-model="activeNames">
                        <el-collapse-item v-for="(grandfather, index) in promiseData" :key="index" :title="grandfather.sName" :name="index">
                            <ul class="button-list">
                                <li class="button second fs_20"
                                    v-for="(father, fi) in grandfather.child"
                                    :key="fi"
                                >
                                    <i class="iconfont fs_16"
                                       :class="{'icon-dianxuan-1': !father.selected, 'icon-dianxuan-': father.selected}"
                                       :style="{color: father.show && father.selected?'#5F7FD9':'#414141'}"
                                       @click="fatherClick(index, fi)"
                                    ></i>
                                    <span
                                            :style="{color: father.show?'#5F7FD9':'#414141'}"
                                            :class="{active: father.show}"
                                            @click="showClick(index, fi)"
                                    >{{father.sName}}</span>
                                </li>
                            </ul>
                            <div v-for="(father, fi) in grandfather.child" :key="fi">
                                <ul class="button-content">
                                    <li class="text fs_20"
                                        v-show="father.show"
                                        v-for="(children, ci) in father.child"
                                        :key="ci"
                                        @click="childrenClick(index, fi, ci)"
                                    >
                                        <i class="iconfont fs_16"
                                           :class="{'icon-dianxuan-1': !children.selected, 'icon-dianxuan-': children.selected}"
                                           :style="{color: children.selected?'#5F7FD9':'#414141'}"
                                        ></i>
                                        <span>{{children.sName}}</span>
                                    </li>
                                </ul>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
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
    name: 'modify',
    props: {
      data: Object
    },
    data () {
      return {
        maskShow: false,
        activeNames: [],
        promiseData: [],
        editedData: []
      }
    },
    watch: {
      maskShow(newVal) {
        if (newVal) {
          this.getUser()
        }
      }
    },
    methods: {
      show () {
        this.maskShow = true
      },
      hide () {
        Object.assign(this.$data, this.$options.data())
        this.maskShow = false
      },
      getUser() {
        this.editedData = this.GLOBAL.dictionaryData['for2']
        this.$http({
          url: this.$api + 'produce/resources/rs/groups/resources/listByUser',
          method: 'post',
          data: {
            reqParam: {
              uId: localStorage.getItem('uId')
            }
          }
        }).then(res => {
          if (res.data.retCode === 1) {
            let arr = []
            let re = res.data.retVal
            re.forEach(r => {
              this.data.resources.forEach(da => {
                if (r.pkId === da.pkId) {
                  r.selected = true
                }
              })
            })
            re.forEach(item => {
              if (item.pid === 0) {
                item.child = []
                arr.push(item)
              }
            })
            arr.forEach(father => {
              re.forEach((children, ci) => {
                if (children.pid === father.pkId) {
                  children.child = []
                  father.child.push(children)
                }
              })
            })
            let t = []
            arr.forEach((grandfather, gi) => {
              grandfather.child.forEach((father, index) => {
                father.show = index === 0?true:false
                re.forEach(children => {
                  if (children.pid === father.pkId) {
                    father.child.push(children)
                  }
                  if (children.selected) {
                    t.push({gi, index})
                  }
                })
              })
            })
            t.forEach(item=>{
              let count = 0
              arr[item.gi].child[item.index].child.forEach(c => {
                if (c.selected) {
                  count++
                }
              })
              if (arr[item.gi].child[item.index].child.length === count) {
                arr[item.gi].child[item.index].selected = true
              } else {
                arr[item.gi].child[item.index].selected = false
              }
            })

            arr.forEach((item, index) => {
              this.activeNames.push(index)
            })
            this.promiseData = arr
          }
        })
      },
      fatherClick(fi, oi) {
        this.promiseData[fi].child[oi].selected = !this.promiseData[fi].child[oi].selected
        this.promiseData[fi].child[oi].child.forEach(item => {
          item.selected = this.promiseData[fi].child[oi].selected
        })
        this.$forceUpdate()
      },
      showClick(fi, oi) {
          this.promiseData[fi].child.forEach((father, index) => {
            if (oi === index) {
              father.show = true
            } else {
              father.show = false
            }
          })
        this.$forceUpdate()
      },
      childrenClick(gi, fi, ci) {
        this.promiseData[gi].child[fi].child[ci].selected = !this.promiseData[gi].child[fi].child[ci].selected
        let count = 0
        this.promiseData[gi].child[fi].child.forEach((c) => {
            if (c.selected) {
              count++
            }
        })
        if (count === this.promiseData[gi].child[fi].child.length) {
          this.promiseData[gi].child[fi].selected = true
        } else {
          this.promiseData[gi].child[fi].selected = false
        }
        this.$forceUpdate()
      },
      right() {
        let resoures = []
        let s = new Set()
        let s2 = new Set()
        this.promiseData.forEach((g, g_i) => {
          g.child.forEach((f, f_i) => {
            f.child.forEach((c, c_i) => {
              if (c.selected) {
                resoures.push({
                  pkId: c.pkId
                })
                s.add(g_i)
                s2.add(f.pkId)
              }
            })
          })
        })
        for (let i of s) {
          resoures.push({
            pkId: this.promiseData[i].pkId
          })
        }
        for (let i of s2) {
          resoures.push({
            pkId: i
          })
        }
        this.data.resources = resoures
        this.data.edited = this.$method.queryDictionaryForName.call(this, 'for2', this.data.edited)
        let params = {
          reqParam: this.data
        }
        this.$http({
          url: this.$api + 'produce/resources/rs/groups/update',
          method: 'post',
          data: params
        }).then(res => {
          if (res.data.retCode === 1) {
            this.$parent.getData()
            this.hide()
            this.$message.success('修改成功')
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
    .mask-content-wrap
        width 75%
        .mask-content
            width 85%
            margin 0 auto 0
            overflow auto
            .title
                font-weight bold
                color #414141
                padding-top 1em
            .mask-table
                border none
                tr
                    border none
                    &.label-wrap
                        height 2em
                        vertical-align bottom
                        td
                            padding-bottom .5em
                    td
                        border none
                        padding-left 0
                        &:last-child
                            padding-left 10%
                        span
                            color #D31717
                        &:nth-of-type(1)
                            input
                                width 90%
                        &.special
                            padding-left 0
                        input
                            border-radius 4px
                            border 1px solid #BFBFBF
                            width 100%
                            height 2em
                            padding-left 1em
                        textarea
                            border-radius 4px
                            border 1px solid #BFBFBF
                            &.special
                                width 100%
                                height 3em

            .button-list
                font-size 0
                .button
                    display inline-block
                    padding 0 1em
                    border-right 1px solid #BFBFBF
                    line-height 1.1em
                    margin-bottom .8em
                    cursor pointer
                    user-select none
                    &:last-child
                        border none
                    span
                        position relative
                        padding-bottom .1em
                        &.active
                            border-bottom 1px solid #5F7FD9
            .button-content
                font-size 0
                cursor pointer
                .text
                    display inline-block
                    padding .5em 1em
                    line-height 1.1em
                    color #5F7FD9
                    user-select none
        .mask-btn-wrap
            width 85%
            margin 0 auto
            padding 1em 0
            text-align right
</style>
<style lang="stylus">
    .permission-management-modify
        .el-collapse-item__header
            font-weight bold
            color #414141
        .el-collapse-item__content
            padding-bottom 1em
        .el-select
            width 100%
        .el-input__inner
            height 2em
            line-height 2em
            border-color #BFBFBF
        .el-input__icon
            line-height 2em
</style>
