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
            <div class="bottom">
                <div class="nav fs_22"
                     v-for="item in navList"
                >
                    <div class="icon-wrap"
                         @click="navClick(item.pkId, 0, item, {})"
                         :class="{active: navActive===item.pkId && !item.hasSecond, 'no-padding': !menuStatus}"
                         :style="{'text-align': !menuStatus?'center':''}"
                    >
                        <i class="iconfont fs_22"
                           :class="[item.icon]"
                           ></i>
                        <span class="text" v-show="navTextShow">{{item.sName}}</span>
                        <i class="iconfont icon-jiant"
                           v-show="navTextShow"
                           v-if="item.hasSecond"
                           :class="{trans: item.secondShow}"                        ></i>
                    </div>
                    <ul class="second" v-show="item.secondShow && !navTextShow" v-if="item.hasSecond">
                        <li class="sanjiao"></li>
                        <li class="fs_20"
                            :class="{active: navActive===li.pkId}"
                            @click.stop="navClick(li.pkId, 1, li, item)"
                            v-for="li in item.child"
                        >{{li.sName}}</li>
                    </ul>
                    <div class="fold-wrap"
                         :style="{'height': item.secondShow?item.childHeight:'0px'}"                        
                          v-if="item.hasSecond"
                         ref="foldWrap"
                         v-show="navTextShow"
                    >
                        <ul class="special" ref="special" v-show="navTextShow" >
                            <li class="fs_20"
                                v-for="li in item.child"
                                :class="{active: navActive===li.pkId}"
                                @click.stop="navClick(li.pkId, 0, li, item)"
                            >{{li.sName}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="version" v-show="navTextShow">版本:v.2.1.0 | 江苏瑞德信息技术有限公司</div>
        </div>
        <div class="right" :style="{width: menuStatus?'83%':'96.67%'}">
            <div class="top">
                <div class="menu"
                     v-for="(item, index) in GLOBAL.listByUser"
                     :class="{active: menuActive===index}"
                     @click="menuChange(index)"
                     v-show="item.pkId!==80000"
                >
                    <div>{{item.sName}}</div>
                </div>
            </div>
            <div class="bottom">
                <router-view @count-change="$emit('count-change')" :navList="navList" :navActive="navActive"></router-view>
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
      navSecondHeight: 0
    }
  },
  computed: {
    navHeight () {
      return this.bodyHeight * (80 / BASE_HEIGHT) + 'px'
    },
    liHeight () {
      return this.bodyHeight * (48 / BASE_HEIGHT) + 'px'
    },
    navList() {
      return this.GLOBAL.listByUser[this.menuActive].child
    }
  },
  created() {
    this.listByUserIcon()
    // this.initData()
  },
  mounted() {

  },
  methods: {
    listByUserIcon() {
      console.log(this.GLOBAL.listByUser)
      this.GLOBAL.listByUser.forEach((a, ai)=>{
        a.child.forEach((b,index)=>{
          if(b.hasSecond) {
            b.childHeight = b.child.length * 25 + 'px'
          }
          switch (b.pkId) {
            case 10500:
              b.icon = 'icon-mabiao'
              b.child[0].url = '/codeManagement'
              b.child[1].url = '/codeManagementZY'
              break
            case 11000:
              b.icon = 'icon-chanp'
              b.child[0].url = '/productManagement'
              b.child[1].url = '/productManagementZY'
              break
            case 11500:
              b.icon = 'icon-wuliao'
              b.child.forEach(c=>{
                switch (c.pkId) {
                  case 11510:
                    c.url = '/materialInfo'
                    break
                  case 11520:
                    c.url = '/materialCompany'
                    break
                  case 11530:
                    c.url = '/auxiliaryInfo'
                    break
                  case 11540:
                    c.url = '/auxiliaryCompany'
                    break
                }
              })
              break
            case 10:
              b.icon = 'icon-pifqy'
              b.child[0].url = '/wholesaleCompanyTC'
              b.child[1].url = '/wholesaleCompanyZY'
              break
            case 20:
              b.icon = 'icon-jinyqy'
              b.child[0].url = '/enterprisesManagementTc'
              b.child[1].url = '/enterprisesManagementZy'
              break
            case 40500:
              b.icon = 'icon-sccrk'
              b.url = '/production-stock'
              break
            case 50500:
              b.icon = 'icon-scbg'
              b.url = '/production-report'
              break
            case 12000:
              b.icon = 'icon-chanxian'
              b.url = '/productionLine'
              break
            case 12500:
              b.icon = 'icon-xingz'
              b.url = '/administrativeDivision'
              break
            case 13000:
              b.icon = 'icon-quanxiangl'
              b.url = '/permissionManagement'
              break
            case 13500:
              b.icon = 'icon-yonghu'
              b.url = '/userManagement'
              break
            case 14000:
              b.icon = 'icon-huaban'
              b.url = '/enterpriseInformation'
              break
            case 20500:
              b.icon = 'icon-shengczx-'
              b.url = '/materialsBatch'
              break
            case 21000:
              b.icon = 'icon-shengczx-png3'
              b.url = '/auxiliaryBatch'
              break
            case 21500:
              b.icon = 'icon-shengczx-png'
              b.url = '/batchProduction'
              break
            case 22000:
              b.icon = 'icon-shengczx-png1'
              b.url = '/traceBack'
              break
            case 22500:
              b.icon = 'icon-shengczx-png2'
              b.url = '/traceBackCode'
              break
            case 30500:
              b.icon = 'icon-dlrz'
              b.url = '/loginLog'
              break
            case 31000:
              b.icon = 'icon-weihrz'
              b.url = '/protectLog'
              break
          }
        })
      })
      if(this.GLOBAL.listByUser[0].child[0].hasSecond && this.GLOBAL.listByUser[0].child[0].child.length > 0) {
        this.$router.push(this.GLOBAL.listByUser[0].child[0].child[0].url)
        this.navActive = this.GLOBAL.listByUser[0].child[0].child[0].pkId
        this.GLOBAL.listByUser[0].child[0].secondShow = true
      } else if(!this.GLOBAL.listByUser[0].child[0].hasSecond){
        this.$router.push(this.GLOBAL.listByUser[0].child[0].url)
        this.navActive = this.GLOBAL.listByUser[0].child[0].pkId
      }
      this.$forceUpdate()
    },
    // initData() {
    //   if(typeof this.$route.matched[1] === 'undefined') {
    //     return
    //   }
    //   let flag = this.$route.matched[1].meta.flag
    //   if (flag === 1) {
    //     switch (this.$route.name) {
    //       case '码标管理':
    //         this.navActive = 10500
    //         break
    //       case '产品管理':
    //         this.navActive = 11000
    //         break
    //       case '原料基本信息':
    //         this.navActive = 11510
    //         break
    //       case '原料生产企业':
    //         this.navActive = 11520
    //         break
    //       case '辅料基本信息':
    //         this.navActive = 11530
    //         break
    //       case '辅料生产企业':
    //         this.navActive = 11540
    //         break
    //       case '产线车间':
    //         this.navActive = 12000
    //         break
    //       case '行政区划':
    //         this.navActive = 12500
    //         break
    //       case '权限组管理':
    //         this.navActive = 13000
    //         break
    //       case '用户管理':
    //         this.navActive = 13500
    //         break
    //       case '企业信息':
    //         this.navActive = 14000
    //         break
    //     }
    //   } else if (flag === 2) {
    //     switch (this.$route.name) {
    //       case '原料批次管理':
    //         this.navActive = 20500
    //         break
    //       case '辅料批次管理':
    //         this.navActive = 21000
    //         break
    //       case '批次生产任务':
    //         this.navActive = 21500
    //         break
    //       case '新增批次生产任务':
    //         this.navActive = 21500
    //         break
    //       case '步骤1':
    //         this.navActive = 21500
    //         break
    //       case '步骤2':
    //         this.navActive = 21500
    //         break
    //       case '步骤3':
    //         this.navActive = 21500
    //         break
    //       case '信息汇总':
    //         this.navActive = 21500
    //         break
    //       case '产品信息':
    //         this.navActive = 21500
    //         break
    //       case '生产批次信息':
    //         this.navActive = 21500
    //         break
    //       case '批次投料信息':
    //         this.navActive = 21500
    //         break
    //       case '批次生产任务信息':
    //         this.navActive = 21500
    //         break
    //       case '抽检信息':
    //         this.navActive = 21500
    //         break
    //       case '检验信息':
    //         this.navActive = 21500
    //         break
    //       case '批次追溯查询':
    //         this.navActive = 22000
    //         break
    //       case '码追溯查询':
    //         this.navActive = 22500
    //         break
    //     }
    //   } else if(flag===3) {
    //     switch (this.$route.name) {
    //       case '登录日志':
    //         this.navActive = 30500
    //         break
    //       case '维护日志':
    //         this.navActive = 31000
    //         break
    //     }
    //   }
    //
    //   this.GLOBAL.listByUser.forEach((a, index)=>{
    //     if(a.pkId === this.navActive) {
    //       this.menuActive = index
    //     }
    //     a.child.forEach(b=>{
    //       if(b.pkId === this.navActive) {
    //         this.menuActive = index
    //       }
    //     })
    //   })
    // },
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
      console.log(data)
      switch (data) {
        case 0:
          this.navActive = 1
          this.$router.replace('/codeManagement')
          break
        case 1:
          this.navActive = 20500
          this.$router.replace('/materialsBatch')
          break
        case 2:
          this.navActive = 30500
          this.$router.replace('/loginLog')
          break
        case 4:
          this.navActive = 40500
          this.$router.replace('/production-stock')
          break
        case 5:
          this.navActive = 50500
          this.$router.replace('/production-report')
          break
      }
    },
    navClick (index, flag, item, father) {
      this.navActive = index
      if(item.hasSecond) {
        this.GLOBAL.listByUser[this.menuActive].child.forEach(item=>{
          if(item.pkId === index && !item.secondShow) {
            item.secondShow = true
          } else {
            item.secondShow = false
          }
        })
        this.$forceUpdate()
        return
      } else if(father.hasSecond){
        if(flag === 1) {
          father.secondShow = false
        }
      } else {
        this.GLOBAL.listByUser[this.menuActive].child.forEach(item=>{
          if(item.hasSecond) {
            item.secondShow = false
          }
        })
      }
      this.$forceUpdate()
      this.$router.push(item.url)
    }
  }
}
</script>

<style scoped lang="stylus">
@import '../../assets/css/fn.styl'
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
        position absolute
        left 0
        top 0
        width 17%
        height 100%
        transition all 0.5s
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
                color #ffffff
                width 100%
                cursor pointer
                user-select none
                position relative
                .icon-wrap
                    position relative
                    width 100%
                    height-set(60px, line-height)
                    min-height 30px
                    padding-left 2.18em
                    &.no-padding
                        padding-left 0
                    &:hover
                        /*color #203262*/
                        background-color #5F7FD9
                    &.active
                        color #203262
                        background-color #EAEFF9
                    .text
                        margin-left .727em
                        letter-spacing 1px
                        font-size-set(18px)
                    i.icon-jiant
                        margin-left .5em
                        font-size-set(10px)
                        display inline-block
                        transition all .3s
                        &.trans
                            transform rotate(180deg)
                .second
                    width 120px
                    background-color #203262
                    position absolute
                    right -128px
                    top 0
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
                        line-height 25px
                        user-select none
                        font-size-set(18px)
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
                            background-color #EAEFF9 !important
                            &:before
                                background-color #203262
                        &:hover
                            /*color #203262*/
                            background-color #5F7FD9
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
                font-size-set(22px)
                width-set(192px, width)
                &.active
                    background-color #5F7FD9
                    &:after
                        content ''
                        display block
                        width 100%
                        height 2px
                        background-color #5F7FD9
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
            overflow auto
    .fold-wrap
        transition all .5s
        overflow hidden
</style>
