<template>
    <transition name="fade">
        <div class="mask permission-management-add" v-if="maskShow">
            <div class="mask-scroll">
                <div class="mask-content-wrap">
                <div class="mask-title-wrap">
                    <div class="mask-title fs_22">
                        新增权限组
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
                                <input type="text" v-model="params.reqParam.gName">
                            </td>
                            <td>
                                <el-select class="fs_20" filterable clearable v-model="params.reqParam.edited" placeholder="">
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
                                <textarea class="special" v-model="params.reqParam.remark"></textarea>
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
                                           :style="{color: children.show || (father.pkId!==11500)?'#5F7FD9':'#414141'}"
                                        ></i>
                                        <span
                                                :style="{color: children.show || (father.pkId!==11500)?'#5F7FD9':'#414141'}"
                                        >{{children.sName}}</span>
                                    </li>
                                </ul>
                                <div v-for="(children, ci) in father.child" v-if="father.pkId===11500">
                                    <ul class="button-content" style="padding-left: 40px">
                                        <li class="text fs_20"
                                            v-for="(li, liIndex) in children.child"
                                            v-show="children.show && father.show"
                                            @click="liClick(index, fi, ci, liIndex, li)"
                                        >
                                            <i class="iconfont fs_16"
                                               :class="{'icon-dianxuan-1': !li.selected, 'icon-dianxuan-': li.selected}"
                                               :style="{color: li.selected?'#5F7FD9':'#414141'}"
                                            ></i>
                                            <span>{{li.sName}}</span>
                                        </li>
                                    </ul>
                                </div>
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
    name: 'add',
    data () {
      return {
        maskShow: false,
        params: {
          reqParam: {
            gName: '',
            edited: '',
            remark: ''
          }
        },
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
            console.log(this.setTreeData(res.data.retVal))



            let arr = []
            let re = res.data.retVal
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
            arr.forEach(grandfather => {
              grandfather.child.forEach((father, index) => {
                father.selected = false
                father.show = index === 0?true:false
                re.forEach((children) => {
                  if (children.pid === father.pkId) {
                    children.child = []
                    children.selected = false
                    father.child.push(children)
                  }
                })
              })
            })
            arr.forEach(a=>{
              a.child.forEach(b=>{
                b.child.forEach((c, index)=>{
                  c.show = index === 0? true: false
                  re.forEach(d=>{
                    if(d.pid === c.pkId) {
                      d.selected = false
                      c.child.push(d)
                    }
                  })
                })
              })
            })
            arr.forEach((item, index) => {
              this.activeNames.push(index)
            })
            this.promiseData = arr
          }
        })
      },
      setTreeData(data){
        let cloneData = JSON.parse(JSON.stringify(data))    // 对源数据深度克隆
        let tree = cloneData.filter((father)=>{              //循环所有项
          let branchArr = cloneData.filter((child)=>{
            return father.pkId == child.pid      //返回每一项的子级数组
          });
          if(branchArr.length>0){
            father.children = branchArr;    //如果存在子级，则给父级添加一个children属性，并赋值
          }
          return father.pid==0;      //返回第一层
        });
        return tree     //返回树形数据
      },
      fatherClick(fi, oi) {
        this.promiseData[fi].child[oi].selected = !this.promiseData[fi].child[oi].selected
        this.promiseData[fi].child[oi].child.forEach(item => {
          item.selected = this.promiseData[fi].child[oi].selected
        })
        if(this.promiseData[fi].child[oi].pkId === 11500) {
          this.promiseData[fi].child[oi].child.forEach(item => {
            item.selected = this.promiseData[fi].child[oi].selected
            item.child.forEach(c=>{
              c.selected = this.promiseData[fi].child[oi].selected
            })
          })
        }
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

        if(this.promiseData[gi].child[fi].pkId === 11500) {
          this.promiseData[gi].child[fi].child.forEach((a, i)=>{
            if(i===ci) {
              a.show = true
            } else {
              a.show = false
            }
          })
          this.promiseData[gi].child[fi].child[ci].child.forEach(c=>{
            c.selected = this.promiseData[gi].child[fi].child[ci].selected
          })
        }
        this.$forceUpdate()
      },
      liClick(gi, fi, ci, li, item) {
        item.selected = !item.selected
        let count = 0
        this.promiseData[gi].child[fi].child[ci].child.forEach(item=>{
          if(item.selected) {
            count++
          }
        })
        if(count === this.promiseData[gi].child[fi].child[ci].child.length) {
          this.promiseData[gi].child[fi].child[ci].selected = true
        } else {
          this.promiseData[gi].child[fi].child[ci].selected = false
        }
        count = 0
        this.promiseData[gi].child[fi].child.forEach(item => {
          if(item.selected) {
            count++
          }
        })
        if(count === this.promiseData[gi].child[fi].child.length) {
          this.promiseData[gi].child[fi].selected = true
        } else {
          this.promiseData[gi].child[fi].selected = false
        }
        count = 0
        this.promiseData[gi].child.forEach(item=>{
          if(item.selected) {
            count++
          }
        })
        if(count === this.promiseData[gi].child.length) {
          this.promiseData[gi].selected = true
        } else {
          this.promiseData[gi].selected = false
        }
        this.$forceUpdate()
      },
      right() {
        if(!this.$method.check(this.params.reqParam, {
          gName: '组名称',
          edited: '是否可编辑',
          remark: '备注'
        })) {
          return
        }
        let resoures = []
        let s = new Set()
        let s2 = new Set()
        let s3 = new Set()
        this.promiseData.forEach((g, g_i) => {
          g.child.forEach((f, f_i) => {
            if(f.pkId===80500 && f.selected) {
              resoures.push({
                pkId: f.pkId
              })
              resoures.push({
                pkId: g.pkId
              })
            }
            f.child.forEach((c, c_i) => {
              if(f.pkId===11500) {
                c.child.forEach(d => {
                  if(d.selected) {
                    resoures.push({
                      pkId: d.pkId
                    })
                    s.add(g.pkId)
                    s2.add(f.pkId)
                    s3.add(c.pkId)
                  }
                })
              } else {
                if (c.selected) {
                  resoures.push({
                    pkId: c.pkId
                  })
                  s.add(g.pkId)
                  s2.add(f.pkId)
                }
              }
            })
          })
        })
        for (let i of s) {
          resoures.push({
            pkId: i
          })
        }
        for (let i of s2) {
          resoures.push({
            pkId: i
          })
        }
        for (let i of s3) {
          resoures.push({
            pkId: i
          })
        }
        this.params.reqParam.resources = resoures
        this.$http({
          url: this.$api + 'produce/resources/rs/groups/save',
          method: 'post',
          data: this.params
        }).then(res => {
            if (res.data.retCode === 1) {
              this.$parent.params.reqParam.page = 1
              this.$parent.getData()
              this.hide()
              this.$message.success('新增成功')
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
                margin-top 1em
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
    .permission-management-add
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
