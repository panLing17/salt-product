<template>
    <transition name="fade">
        <div class="mask" v-if="maskShow">
            <div class="mask-scroll">
                <div class="mask-content-wrap">
                    <div class="mask-title-wrap">
                        <div class="mask-title">
                            生成报告
                            <div class="close" @click="hide">
                                <i class="iconfont icon-guanbi"></i>
                            </div>
                        </div>
                    </div>
                    <div class="mask-content">
                        <div>
                            <label style="margin-right: 10px">报告开始日期</label>
                            <el-date-picker
                                    v-model="queryDate"
                                    type="daterange"
                                    align="right"
                                    unlink-panels
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
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
                        </div>
                    </div>
                    <div class="mask-btn-wrap">
                        <l-button buttonText="返回" @button-click="hide"></l-button>
                        <l-button buttonText="预览" style="margin-left: 10px" @button-click="hide"></l-button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
  export default {
    name: 'build',
    data() {
      return {
        maskShow: false,
        queryDate: [],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        allSelected: {
          col0: false,
          col1: false,
          col2: false
        },
        personList: {
          col0: [],
          col1: [],
          col2: []
        }
      }
    },
    methods: {
      show() {
        this.maskShow = true
      },
      hide() {
        this.maskShow = false
      }
    }
  }
</script>


<style scoped lang="stylus">
    @import '../../assets/css/fn.styl'
    .mask-content-wrap
        width 75%
        top 10%
        .mask-content
            width 93%
            margin 0 auto 0
            padding-top 20px
            .mask-table
                tr
                    td
                        padding 10px 10px
                        font-size-set(16px)
                        white-space normal
            .mask-table
                margin-top 1em
                &.special
                    float left
                    width 33.3%
                tr
                    td
                        height 2em
                        &.icon
                            text-align center
                            padding-left 0
        .mask-btn-wrap
            padding 20px 0 30px
</style>
