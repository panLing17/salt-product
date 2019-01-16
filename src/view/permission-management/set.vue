<template>
    <transition name="fade">
        <div class="mask permission-management-set" v-if="maskShow">
            <div class="mask-scroll">
                <div class="mask-content-wrap">
                <div class="mask-title-wrap">
                    <div class="mask-title fs_22">
                        权限组详情
                        <div class="close" @click="hide">
                            <i class="iconfont icon-guanbi"></i>
                        </div>
                    </div>
                </div>
                <div class="mask-content">
                    <div class="title fs_22">权限基本信息</div>
                    <table class="mask-table fs_20">
                        <colgroup width="10%"></colgroup>
                        <colgroup width="37%"></colgroup>
                        <colgroup width="13%"></colgroup>
                        <colgroup width="40%"></colgroup>
                        <tr>
                            <td>组名称</td>
                            <td>{{data.gName}}</td>
                            <td>是否可编辑</td>
                            <td>{{data.edited}}</td>
                        </tr>
                        <tr>
                            <td>备注</td>
                            <td colspan="3">{{data.remark}}</td>
                        </tr>
                    </table>
                    <div class="title fs_22" style="margin: 1em auto .5em">设置组成员</div>
                    <div class="clear-float">
                        <table class="mask-table special" v-show="personList.col0.length">
                            <colgroup width="20%"></colgroup>
                            <colgroup width="80%"></colgroup>
                            <tr>
                                <td class="icon" @click="allChange(0)">
                                    <i class="iconfont"
                                       :class="{'icon-dianxuan-1': !allSelected.col0, 'icon-dianxuan-': allSelected.col0}"
                                       :style="{color: allSelected.col0?'#5F7FD9':'#707070'}"
                                    ></i>
                                </td>
                                <td class="icon">姓名</td>
                            </tr>
                            <tr v-for="(item, index) in personList.col0" :key="index">
                                <td class="icon" @click="itemChange(0, index)">
                                    <i class="iconfont"
                                       :class="{'icon-dianxuan-1': !item.selected, 'icon-dianxuan-': item.selected}"
                                       :style="{color: item.selected?'#5F7FD9':'#707070'}"
                                    ></i>
                                </td>
                                <td>{{item.uName}}</td>
                            </tr>
                        </table>
                        <table class="mask-table special" style="margin-left: -1px"  v-show="personList.col1.length">
                            <colgroup width="20%"></colgroup>
                            <colgroup width="80%"></colgroup>
                            <tr>
                                <td class="icon" @click="allChange(1)">
                                    <i class="iconfont"
                                       :class="{'icon-dianxuan-1': !allSelected.col1, 'icon-dianxuan-': allSelected.col1}"
                                       :style="{color: allSelected.col1?'#5F7FD9':'#707070'}"
                                    ></i>
                                </td>
                                <td class="icon">姓名</td>
                            </tr>
                            <tr v-for="(item, index) in personList.col1" :key="index">
                                <td class="icon" @click="itemChange(1, index)">
                                    <i class="iconfont"
                                       :class="{'icon-dianxuan-1': !item.selected, 'icon-dianxuan-': item.selected}"
                                       :style="{color: item.selected?'#5F7FD9':'#707070'}"
                                    ></i>
                                </td>
                                <td>{{item.uName}}</td>
                            </tr>
                        </table>
                        <table class="mask-table special" style="margin-left: -1px"  v-show="personList.col2.length">
                            <colgroup width="20%"></colgroup>
                            <colgroup width="80%"></colgroup>
                            <tr>
                                <td class="icon" @click="allChange(2)">
                                    <i class="iconfont"
                                       :class="{'icon-dianxuan-1': !allSelected.col2, 'icon-dianxuan-': allSelected.col2}"
                                       :style="{color: allSelected.col2?'#5F7FD9':'#707070'}"
                                    ></i>
                                </td>
                                <td class="icon">姓名</td>
                            </tr>
                            <tr v-for="(item, index) in personList.col2" :key="index">
                                <td class="icon" @click="itemChange(2, index)">
                                    <i class="iconfont"
                                       :class="{'icon-dianxuan-1': !item.selected, 'icon-dianxuan-': item.selected}"
                                       :style="{color: item.selected?'#5F7FD9':'#707070'}"
                                    ></i>
                                </td>
                                <td>{{item.uName}}</td>
                            </tr>
                        </table>
                        <table class="mask-table special" style="margin-left: -1px"  v-show="personList.col3.length">
                            <colgroup width="20%"></colgroup>
                            <colgroup width="80%"></colgroup>
                            <tr>
                                <td class="icon" @click="allChange(3)">
                                    <i class="iconfont"
                                       :class="{'icon-dianxuan-1': !allSelected.col3, 'icon-dianxuan-': allSelected.col3}"
                                       :style="{color: allSelected.col3?'#5F7FD9':'#707070'}"
                                    ></i>
                                </td>
                                <td class="icon">姓名</td>
                            </tr>
                            <tr v-for="(item, index) in personList.col3" :key="index">
                                <td class="icon" @click="itemChange(3, index)">
                                    <i class="iconfont"
                                       :class="{'icon-dianxuan-1': !item.selected, 'icon-dianxuan-': item.selected}"
                                       :style="{color: item.selected?'#5F7FD9':'#707070'}"
                                    ></i>
                                </td>
                                <td>{{item.uName}}</td>
                            </tr>
                        </table>
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
    name: 'set',
    props: {
      data: {
        type: Object
      }
    },
    data () {
      return {
        maskShow: false,
        allSelected: {
          col0: false,
          col1: false,
          col2: false,
          col3: false
        },
        personList: {
          col0: [],
          col1: [],
          col2: [],
          col3: []
        }
      }
    },
    watch: {
      maskShow(newVal) {
        if (newVal) {
          this.getPerson()
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
      allChange (flag) {
        this.allSelected['col' + flag] = !this.allSelected['col' + flag]
        this.personList['col' + flag].forEach(item => {
          item.selected = this.allSelected['col' + flag]
        })
      },
      itemChange(flag, index) {
        let count = 0
        this.personList['col' + flag].forEach((item, i) => {
          if (index === i) {
            item.selected = !item.selected
          }
          if (item.selected) {
            count++
          }
        })
        if (count === this.personList['col' + flag].length) {
          this.allSelected['col' + flag] = true
        } else {
          this.allSelected['col' + flag] = false
        }
      },
      getPerson() {
        this.$http({
          url: this.$api + 'produce/resources/rs/users/listByGroup',
          method: 'post',
          data: {
            reqParam: {
              gId: this.data.pkId,
              retType: 1
            }
          }
        }).then(res => {
            if (res.data.retCode === 1) {
                res.data.retVal.forEach(item => {
                  item.selected = item.permission===40021?true:false
                })
                res.data.retVal.forEach((item, index) => {
                  this.personList['col' + index%4].push(item)
                })
                let arr = [0,1,2,3]
                arr.forEach(item => {
                  let count = 0
                  this.personList['col' + item].forEach(p => {
                    if (p.selected) {
                      count++
                    }
                  })
                  if (count === this.personList['col' + item].length) {
                    this.allSelected['col'+item] = true
                  }
                })
            }
        })
      },
      right() {
        let users = []
        let arr = [0,1,2,3]
        arr.forEach(item => {
          this.personList['col' + item].forEach(p => {
            if (p.selected) {
              users.push({
                uId: p.uId
              })
            }
          })
        })
        let params = {
          reqParam: {
            setType: 2,
            users: users,
            groups: [{
              pkId: this.data.pkId
            }]
          }
        }
        this.$http({
          url: this.$api + 'produce/resources/rs/users/permission/setGroup',
          method: 'post',
          data: params
        }).then(res=> {
            if (res.data.retCode === 1) {
              this.hide()
              this.$message.success('设置成功')
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
                margin-top 1em
                &.special
                    float left
                    width 25%
                tr
                    td
                        height 2em
                        &.icon
                            text-align center
                            padding-left 0
            .button-list
                font-size 0
                .button
                    display inline-block
                    padding 0 1em
                    border-right 1px solid #BFBFBF
                    line-height 1.1em
                    margin-bottom .8em
                    &:last-child
                        border none
                    span
                        position relative
                        padding-bottom .1em
                        &.active
                            border-bottom 1px solid #5F7FD9
        .mask-btn-wrap
            width 85%
            margin 0 auto
            padding 2em 0
            text-align right
</style>
<style lang="stylus">
    .permission-management-set
        .el-table td, .el-table th
            padding 5px 0
</style>
