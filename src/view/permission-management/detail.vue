<template>
    <transition name="fade">
        <div class="mask permission-management-detail" v-if="maskShow">
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
                    <div class="title fs_22" style="margin: 1em auto .5em">授权功能</div>
                    <el-collapse v-model="activeNames">
                        <el-collapse-item v-for="(grandfather, index) in promiseData" :key="index" :title="grandfather.sName" :name="index">
                            <ul class="button-list">
                                <li class="button second fs_20"
                                    v-for="(father, fi) in grandfather.child"
                                    :key="fi"
                                    @click="fatherClick(index, fi)"
                                >
                                    <span
                                            :style="{color: father.selected?'#5F7FD9':'#414141'}"
                                            :class="{active: father.selected}">{{father.sName}}</span>
                                </li>
                            </ul>
                            <div v-for="(father, fi) in grandfather.child" :key="fi">
                                <ul class="button-content">
                                    <li class="text fs_20"
                                        v-show="father.selected"
                                        v-for="(children, ci) in father.child"
                                        :key="ci"
                                        @click="childrenClick(index, fi, ci)"
                                    >
                                        <span
                                                :style="{color: children.selected || (father.pkId!==11500)?'#5F7FD9':'#414141'}"
                                        >{{children.sName}}</span>
                                    </li>
                                </ul>
                                <div v-for="(children, ci) in father.child" v-if="father.pkId===11500">
                                    <ul class="button-content" style="padding-left: 40px">
                                        <li class="text fs_20"
                                            v-for="(li, liIndex) in children.child"
                                            v-show="children.selected && father.selected"
                                        >
                                            <span>{{li.sName}}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <div class="mask-btn-wrap fs_20">
                    <l-button buttonText="确认" @button-click="hide"></l-button>
                </div>
            </div>
            </div>
        </div>
    </transition>
</template>

<script>
  export default {
    name: 'detail',
    props: {
      data: {
        type: Object
      },
      promiseData: {
        type: Array
      }
    },
    watch: {
      promiseData(newVal) {
        this.activeNames = []
        newVal.forEach((item, index) => {
          this.activeNames.push(index)
        })
      }
    },
    data () {
      return {
        maskShow: false,
        activeNames: []
      }
    },
    methods: {
      show () {
        this.maskShow = true
      },
      hide () {
        this.maskShow = false
      },
      fatherClick(fi, oi) {
        this.promiseData[fi].child.forEach((item, index) => {
          if (oi === index) {
            item.selected = true
          } else {
            item.selected = false
          }
        })
        this.$forceUpdate()
      },
      childrenClick(gi, fi, ci) {
        if(this.promiseData[gi].child[fi].pkId === 11500) {
          this.promiseData[gi].child[fi].child.forEach((a, i)=>{
            if(i===ci) {
              a.selected = true
            } else {
              a.selected = false
            }
          })
        }
        this.$forceUpdate()
      }
    }
  }
</script>

<style scoped lang="stylus">
    .mask-content-wrap
        width 75%
        top 10%
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
                tr
                    td
                        height 2em
            /*.button-list*/
                /*font-size 0*/
                /*.button*/
                    /*display inline-block*/
                    /*padding 0 1em*/
                    /*border-right 1px solid #BFBFBF*/
                    /*line-height 1.1em*/
                    /*margin-bottom .8em*/
                    /*cursor pointer*/
                    /*user-select none*/
                    /*&.second*/
                        /*span*/
                            /*&.active*/
                                /*border-bottom 1px solid #5F7FD9*/
                    /*&:last-child*/
                        /*border none*/
                    /*span*/
                        /*position relative*/
                        /*padding-bottom .1em*/
            /*.button-content*/
                /*font-size 0*/
                /*.text*/
                    /*display inline-block*/
                    /*padding .5em 1em*/
                    /*line-height 1.1em*/
                    /*color #5F7FD9*/
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
                padding-left 20px
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
    .permission-management-detail
        .el-collapse-item__header
            font-weight bold
            color #414141
        .el-collapse-item__content
            padding-bottom 1em
</style>
