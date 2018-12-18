<template>
    <div class="layout">
        <div class="left" :style="{width: menuStatus?'17%':'3.33%', 'min-width':menuStatus?'120px':''}">
            <div class="top" :style="{'text-align': menuStatus?'right':'center',
                                'justify-content': menuStatus?'flex-end':'center'}">
                <div class="img-wrap">
                    <!--<img-->
                            <!--:style="{'margin-right':menuStatus?'24px':'auto'}"-->
                            <!--:src="menuStatus?require('./img/suojin.png'):require('./img/tanchu.png')"-->
                            <!---->
                    <!--/>-->
                    <i
                            :style="{'margin-right':menuStatus?'24px':'auto'}"
                            class="iconfont icon-tanchu"
                            @click="menuStatusChange"
                    ></i>
                </div>
            </div>
            <div class="bottom" v-show="menuActive===0">
                <div class="nav fs_22"
                     :style="{'justify-content': menuStatus?'':'center'}"
                     :class="{active: navActive===0, 'no-padding': !menuStatus}"
                     @click.stop.prevent="navClick(0)"
                >
                    <div class="icon-wrap">
                        <i class="iconfont icon-mabiao fs_22" :style="{color: navActive===0?'#203262':'#ffffff'}"></i>
                    </div>
                    <div class="text" v-show="navTextShow">码标管理</div>
                </div>
                <div class="nav fs_22"
                     :style="{'justify-content': menuStatus?'':'center'}"
                     :class="{active: navActive===1, 'no-padding': !menuStatus}"
                     @click="navClick(1)"
                >
                    <div class="icon-wrap">
                        <i class="iconfont icon-chanp fs_22" :style="{color: navActive===1?'#203262':'#ffffff'}"></i>
                    </div>
                    <div class="text" v-show="navTextShow">产品管理</div>
                </div>
                <div class="nav fs_22"
                     :style="{'justify-content': menuStatus?'':'center'}"
                     :class="{'no-padding': !menuStatus}"
                     @click="secondShow=!secondShow"
                >
                    <div class="icon-wrap">
                        <i class="iconfont icon-wuliao fs_22"></i>
                    </div>
                    <div class="text" v-show="navTextShow">物料信息</div>
                    <div class="arrow" v-show="navTextShow">
                        <img src="./img/arrow.png" alt="">
                    </div>
                    <ul class="second" v-show="secondShow && !navTextShow">
                        <li class="sanjiao"></li>
                        <li class="fs_20" :class="{active: navActive===2}" @click.stop="secondShow=false,navClick(2)">原料基本信息</li>
                        <li class="fs_20" :class="{active: navActive===3}" @click.stop="secondShow=false,navClick(3)">原料生产企业</li>
                        <li class="fs_20" :class="{active: navActive===4}" @click.stop="secondShow=false,navClick(4)">辅料基本信息</li>
                        <li class="fs_20" :class="{active: navActive===5}" @click.stop="secondShow=false,navClick(5)">辅料生产企业</li>
                    </ul>
                </div>
                <div class="fold-wrap"
                     style="overflow: hidden"
                     :style="{height: secondShow && navTextShow?navSecondHeight+'px':'0'}">
                    <transition name="fold">
                        <ul class="special" ref="special" v-show="secondShow && navTextShow" >
                            <li class="fs_20" :class="{active: navActive===2}" @click.stop="navClick(2)">原料基本信息</li>
                            <li class="fs_20" :class="{active: navActive===3}" @click.stop="navClick(3)">原料生产企业</li>
                            <li class="fs_20" :class="{active: navActive===4}" @click.stop="navClick(4)">辅料基本信息</li>
                            <li class="fs_20" :class="{active: navActive===5}" @click.stop="navClick(5)">辅料生产企业</li>
                        </ul>
                    </transition>
                </div>
                <div class="nav fs_22"
                     :style="{'justify-content': menuStatus?'':'center'}"
                     :class="{active: navActive===6, 'no-padding': !menuStatus}"
                     @click="navClick(6)"
                >
                    <div class="icon-wrap">
                        <i class="iconfont icon-chanxian fs_22" :style="{color: navActive===6?'#203262':'#ffffff'}"></i>
                    </div>
                    <div class="text" v-show="navTextShow">产线车间</div>
                </div>

                <div class="nav fs_22"
                     :style="{'justify-content': menuStatus?'':'center'}"
                     :class="{active: navActive===7, 'no-padding': !menuStatus}"
                     @click="navClick(7)"
                >
                    <div class="icon-wrap">
                        <i class="iconfont icon-xingz fs_22" :style="{color: navActive===7?'#203262':'#ffffff'}"></i>
                    </div>
                    <div class="text" v-show="navTextShow">行政区划</div>
                </div>
                <div class="nav fs_22"
                     :style="{'justify-content': menuStatus?'':'center'}"
                     :class="{active: navActive===8, 'no-padding': !menuStatus}"
                     @click="navClick(8)"
                >
                    <div class="icon-wrap">
                        <i class="iconfont icon-quanxiangl fs_22" :style="{color: navActive===8?'#203262':'#ffffff'}"></i>
                    </div>
                    <div class="text" v-show="navTextShow">权限组管理</div>
                </div>
                <div class="nav fs_22"
                     :style="{'justify-content': menuStatus?'':'center'}"
                     :class="{active: navActive===9, 'no-padding': !menuStatus}"
                     @click="navClick(9)"
                >
                    <div class="icon-wrap">
                        <i class="iconfont icon-yonghu fs_22" :style="{color: navActive===9?'#203262':'#ffffff'}"></i>
                    </div>
                    <div class="text" v-show="navTextShow">用户管理</div>
                </div>
                <div class="nav fs_22"
                     :style="{'justify-content': menuStatus?'':'center'}"
                     :class="{active: navActive===10, 'no-padding': !menuStatus}"
                     @click="navClick(10)"
                >
                    <div class="icon-wrap">
                        <i class="iconfont icon-huaban fs_22" :style="{color: navActive===10?'#203262':'#ffffff'}"></i>
                    </div>
                    <div class="text" v-show="navTextShow">企业信息</div>
                </div>
                <div class="version" v-show="navTextShow">版本:v.2.1.0 | 江苏瑞德信息技术有限公司</div>
            </div>
            <div class="bottom" v-show="menuActive===1">
                <div class="nav fs_22"
                     :style="{'justify-content': menuStatus?'':'center'}"
                     :class="{active: navActive===11, 'no-padding': !menuStatus}"
                     @click.stop.prevent="navClick(11)"
                >
                    <div class="icon-wrap">
                        <i class="iconfont icon-shengczx- fs_22" :style="{color: navActive===11?'#203262':'#ffffff'}"></i>
                    </div>
                    <div class="text" v-show="navTextShow">原料批次管理</div>
                </div>
                <div class="nav fs_22"
                     :style="{'justify-content': menuStatus?'':'center'}"
                     :class="{active: navActive===12, 'no-padding': !menuStatus}"
                     @click.stop.prevent="navClick(12)"
                >
                    <div class="icon-wrap">
                        <i class="iconfont icon-shengczx-png3 fs_22" :style="{color: navActive===12?'#203262':'#ffffff'}"></i>
                    </div>
                    <div class="text" v-show="navTextShow">辅料批次管理</div>
                </div>
                <div class="nav fs_22"
                     :style="{'justify-content': menuStatus?'':'center'}"
                     :class="{active: navActive===13, 'no-padding': !menuStatus}"
                     @click.stop.prevent="navClick(13)"
                >
                    <div class="icon-wrap">
                        <i class="iconfont icon-shengczx-png fs_22" :style="{color: navActive===13?'#203262':'#ffffff'}"></i>
                    </div>
                    <div class="text" v-show="navTextShow">批次生产任务</div>
                </div>
                <div class="nav fs_22"
                     :style="{'justify-content': menuStatus?'':'center'}"
                     :class="{active: navActive===14, 'no-padding': !menuStatus}"
                     @click.stop.prevent="navClick(14)"
                >
                    <div class="icon-wrap">
                        <i class="iconfont icon-shengczx-png1 fs_22" :style="{color: navActive===14?'#203262':'#ffffff'}"></i>
                    </div>
                    <div class="text" v-show="navTextShow">批次追溯查询</div>
                </div>
                <div class="nav fs_22"
                     :style="{'justify-content': menuStatus?'':'center'}"
                     :class="{active: navActive===15, 'no-padding': !menuStatus}"
                     @click.stop.prevent="navClick(15)"
                >
                    <div class="icon-wrap">
                        <i class="iconfont icon-shengczx-png2 fs_22" :style="{color: navActive===15?'#203262':'#ffffff'}"></i>
                    </div>
                    <div class="text" v-show="navTextShow">码追溯查询</div>
                </div>
                <div class="version" v-show="navTextShow">版本:v.2.1.0 | 江苏瑞德信息技术有限公司</div>
            </div>
            <div class="bottom" v-show="menuActive===2">
                <div class="nav fs_22"
                     :style="{'justify-content': menuStatus?'':'center'}"
                     :class="{active: navActive===16, 'no-padding': !menuStatus}"
                     @click.stop.prevent="navClick(16)"
                >
                    <div class="icon-wrap">
                        <i class="iconfont icon-shengczx- fs_22" :style="{color: navActive===16?'#203262':'#ffffff'}"></i>
                    </div>
                    <div class="text" v-show="navTextShow">登录日志</div>
                </div>
                <div class="nav fs_22"
                     :style="{'justify-content': menuStatus?'':'center'}"
                     :class="{active: navActive===17, 'no-padding': !menuStatus}"
                     @click.stop.prevent="navClick(17)"
                >
                    <div class="icon-wrap">
                        <i class="iconfont icon-shengczx-png3 fs_22" :style="{color: navActive===17?'#203262':'#ffffff'}"></i>
                    </div>
                    <div class="text" v-show="navTextShow">维护日志</div>
                </div>
                <div class="version" v-show="navTextShow">版本:v.2.1.0 | 江苏瑞德信息技术有限公司</div>
            </div>
        </div>
        <div class="right" :style="{width: menuStatus?'83%':'96.67%'}">
            <div class="top">
                <!--<div class="menu" v-for="(item, index) in GLOBAL.listByUser" :class="{active: menuActive===index}" @click="menuChange(index)">-->
                    <!--<div>{{item.sName}}</div>-->
                <!--</div>-->
                <div class="menu" :class="{active: menuActive===0}" @click="menuChange(0)">
                    <div>资源中心</div>
                </div>
                <div class="menu" :class="{active: menuActive===1}" @click="menuChange(1)">
                    <div>生产中心</div>
                </div>
                <div class="menu" :class="{active: menuActive===2}" @click="menuChange(2)">
                    <div>监控中心</div>
                </div>
            </div>
            <div class="bottom">
                <router-view @count-change="$emit('count-change')"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
const BASE_HEIGHT = 1080
export default {
  name: 'l-layout',
  data () {
    return {
      menuStatus: true, // 菜单伸缩状态 true 展开 false 缩起 动画延时用
      menuActive: 0, // 头部菜单选中
      bodyHeight: document.body.clientHeight,
      navActive: 0, // 左侧导航选中
      navTextShow: true,
      navList: {
        0:{},
        1:{},
        2:{}
      },
      secondShow: false,
      navSecondHeight: 0
    }
  },
  computed: {
    navHeight () {
      return this.bodyHeight * (80 / BASE_HEIGHT) + 'px'
    },
    liHeight () {
      return this.bodyHeight * (48 / BASE_HEIGHT) + 'px'
    }
  },
  watch: {
    '$route'(to, from) {
      this.initData(to)
    }
  },
  created() {
    console.log(this.bodyHeight)
    this.initData(this.$route)
    this.getNavList()
  },
  mounted() {
    this.secondShow = true
    this.$nextTick(()=>{
      this.navSecondHeight = this.$refs.special.offsetHeight
      this.secondShow = false
    })
  },
  methods: {
    getNavList() {
      this.GLOBAL.listByUser.forEach((item,index)=>{
        item.child.forEach(c=>{
          if(c.pid===1) {
            this.navList[0][c.pkId] = true
          } else if(c.pid===2) {
            this.navList[1][c.pkId] = true
          } else if(c.pid===3) {
            this.navList[1][c.pkId] = true
          }
        })
      })
    },
    initData(to) {
      let flag = to.matched[1].meta.flag
      if (flag === 1) {
        this.menuActive = 0
        switch (to.name) {
          case '码标管理':
            this.navActive = 0
            break
          case '产品管理':
            this.navActive = 1
            break
          case '原料基本信息':
            this.navActive = 2
            break
          case '原料生产企业':
            this.navActive = 3
            break
          case '辅料基本信息':
            this.navActive = 4
            break
          case '辅料生产企业':
            this.navActive = 5
            break
          case '产线车间':
            this.navActive = 6
            break
          case '行政区划':
            this.navActive = 7
            break
          case '权限组管理':
            this.navActive = 8
            break
          case '用户管理':
            this.navActive = 9
            break
          case '企业信息':
            this.navActive = 10
            break
        }
      } else if (flag === 2) {
        this.menuActive = 1
        switch (this.$route.name) {
          case '原料批次管理':
            this.navActive = 11
            break
          case '批次生产任务':
            this.navActive = 13
            break
          case '新增批次生产任务':
            this.navActive = 13
            break
          case '步骤1':
            this.navActive = 13
            break
          case '步骤2':
            this.navActive = 13
            break
          case '步骤3':
            this.navActive = 13
            break
          case '信息汇总':
            this.navActive = 13
            break
          case '产品信息':
            this.navActive = 13
            break
          case '生产批次信息':
            this.navActive = 13
            break
          case '批次投料信息':
            this.navActive = 13
            break
          case '批次生产任务信息':
            this.navActive = 13
            break
          case '抽检信息':
            this.navActive = 13
            break
          case '检验信息':
            this.navActive = 13
            break
          case '批次追溯查询':
            this.navActive = 14
            break
          case '码追溯查询':
            this.navActive = 15
            break
        }
      } else if(flag===3) {
        this.menuActive = 2
        switch (this.$route.name) {
          case '登录日志':
            this.navActive = 16
            break
          case '维护日志':
            this.navActive = 17
            break
        }
      }
    },
    menuStatusChange () {
      this.menuStatus = !this.menuStatus
      if (this.menuStatus) {
        setTimeout(() => {
          this.navTextShow = true
        }, 500)
      } else {
        this.navTextShow = false
      }
    },
    menuChange (data) {
      this.menuActive = data
      switch (data) {
        case 0:
          this.navActive = 0
          this.$router.replace('/codeManagement')
          break
        case 1:
          this.navActive = 11
          this.$router.replace('/materialsBatch')
          break
        case 2:
          this.navActive = 16
          this.$router.replace('/loginLog')
          break
      }
    },
    navClick (index) {
      this.navActive = index
      if(index<2 || index > 5) {
        this.secondShow = false
      }
      switch (index) {
        case 0:
          this.$router.replace('/codeManagement')
          break
        case 1:
          this.$router.replace('/productManagement')
          break
        case 2:
          this.$router.replace('/materialInfo')
          break
        case 3:
          this.$router.replace('/materialCompany')
          break
        case 4:
          this.$router.replace('/auxiliaryInfo')
          break
        case 5:
          this.$router.replace('/auxiliaryCompany')
          break
        case 6:
          this.$router.replace('/productionLine')
          break
        case 7:
          this.$router.replace('/administrativeDivision')
          break
        case 8:
          this.$router.replace('/permissionManagement')
          break
        case 9:
          this.$router.replace('/userManagement')
          break
        case 10:
          this.$router.replace('/enterpriseInformation')
          break
        case 11:
          this.$router.replace('/materialsBatch')
          break
        case 12:
          this.$router.replace('/auxiliaryBatch')
          break
        case 13:
          this.$router.replace('/batchProduction')
          break
        case 14:
          this.$router.replace('/traceBack')
          break
        case 15:
          this.$router.replace('/traceBackCode')
          break
        case 16:
          this.$router.replace('/loginLog')
          break
        case 17:
          this.$router.replace('/protectLog')
          break
      }
    }
  }
}
</script>

<style scoped lang="stylus">
@import './media.styl'
.fold-enter-active, .fold-leave-active {
    transition: all 0.5s;
}
.fold-enter, .fold-leave-to {
    transform: translate3d(0,-100%,0);
}
.layout
    height 92.32%
    background-color #496AC5
    position relative
    .left
        /*float left*/
        position absolute
        left 0
        top 0
        width 17%
        height 100%
        transition all 0.5s
        /*overflow hidden*/
        .top
            background-color #496AC5
            height 8%
            min-height 30px
            font-size 0
            display flex
            align-items center
            justify-content flex-end
            display table\9
            width 100%
            .img-wrap
                display table-cell\9
                vertical-align middle\9
                i
                    color #ffffff
        .bottom
            background-color #38466F
            height 92%
            position relative
            .nav
                display flex
                align-items center
                color #ffffff
                width 100%
                cursor pointer
                height 8.7%
                min-height 30px
                padding-left 2.18em
                user-select none
                position relative
                &.no-padding
                    padding-left 0
                &:hover
                    color #203262
                    background-color #EAEFF9
                &.active
                    color #203262
                    background-color #EAEFF9
                .text
                    margin-left .727em
                    letter-spacing 1px
                .arrow
                    margin-left .9em
                .second
                    width 120px
                    background-color #203262
                    position absolute
                    right -128px
                    z-index 10
                    border-radius 4px
                    padding 5px 0
                    .sanjiao
                        width 8px
                        height 8px
                        transform rotate(45deg) translateY(-50%)
                        border-bottom 1px solid #E3E3E3
                        border-left 1px solid #E3E3E3
                        position absolute
                        left -7px
                        top 50%
                        background-color #203262
                    li
                        text-align center
                        line-height 1.5em
                        color #ffffff
                        &:hover {
                            color #5273CE
                        }
            .special
                li
                    padding-left 30%
                    color #ffffff
                    position relative
                    cursor pointer
                    line-height 2.4em
                    user-select none
                    &:before
                        content ''
                        display block
                        width 4px
                        height 4px
                        border-radius 50%
                        background-color #ffffff
                        position absolute
                        left 25%
                        top 50%
                        transform translateY(-50%)
                    &.active
                        color #203262
                        background-color #EAEFF9
                        &:before
                            background-color #203262
            .version
                width 100%
                color #717DA2
                font-size 12px
                text-align center
                position absolute
                bottom 20px
                left 0
    .right
        /*float left*/
        position absolute
        right 0
        top 0
        transition all 0.5s
        width 83%
        height 100%
        overflow hidden
        .top
            height 8%
            min-height 30px
            background-color #5273CE
            .menu
                float left
                height 100%
                text-align center
                color #ffffff
                display flex
                align-items center
                justify-content center
                display table\\9\\0
                position relative
                cursor pointer
                &.active
                    background-color #5F7FD9
                    &:after
                        content ''
                        display block
                        width 100%
                        height 2px
                        background-color #70DEC0
                        position absolute
                        bottom 0
                        left 0
                div
                    display table-cell\\9\\0
                    vertical-align middle\\9\\0
                    line-height 0
        .bottom
            width 100%
            height 92%
            background-color #EAEFF9
            padding-top .5em
    .fold-wrap
        transition all .5s
</style>
