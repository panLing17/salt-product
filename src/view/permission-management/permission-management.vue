<template>
    <div class="permission-management">
        <div class="top-card white-bg">
            <!--<div class="top-title view-title">查询</div>-->
            <div class="search-wrap fs_20">
                <label class="label-1">权限组名称</label>
                <input type="text" v-model="params.reqParam.gName">
                <l-button v-if="btnPromise.search" :style="{'margin': '11px 1em 11px 2.5em'}" buttonText="查询" iconName="iconfont icon-chaxx" @button-click="search"></l-button>
                <l-button buttonText="清空" :style="{'margin': '11px 0'}" iconName="iconfont icon-qingk" @button-click="clear"></l-button>
            </div>
        </div>
        <div class="bottom-card white-bg">
            <div class="view-title">
                权限组管理列表
                <div v-if="btnPromise.add" class="table-button-single fs_18" @click="openAdd">
                    <i class="iconfont icon-xinz fs_16"></i>
                    <span>新增权限组</span>
                </div>
            </div>
            <div class="table-wrap">
                <table class="fs_20 table-header">
                    <colgroup width="25%"></colgroup>
                    <colgroup width="25%"></colgroup>
                    <colgroup width="25%"></colgroup>
                    <colgroup width="25%"></colgroup>
                    <tr class="tr">
                        <th class="th">组名称</th>
                        <th class="th">编辑状态</th>
                        <th class="th">备注</th>
                        <th class="th">操作</th>
                    </tr>
                </table>
                <table class="table fs_20">
                    <colgroup width="25%"></colgroup>
                    <colgroup width="25%"></colgroup>
                    <colgroup width="25%"></colgroup>
                    <colgroup width="25%"></colgroup>
                    <tr class="tr" v-for="(item, index) in data.dataList" :key="index">
                        <td class="td">{{item.gName}}</td>
                        <td class="td">{{item.edited==='是'?'可编辑':'不可编辑'}}</td>
                        <td class="td">{{item.remark}}</td>
                        <td class="td btn-wrap">
                            <div v-if="btnPromise.detail" class="btn" style="margin-right: 20px" @click="getDetail(item, 0)">
                                <i class="fs_18 iconfont icon-xiangq"></i>
                                <span class="fs_18">详情</span>
                            </div>
                            <el-dropdown trigger="click"  @command="handleChange">
                                  <span class="el-dropdown-link">
                                    <i class="iconfont icon-guanli"></i>管理<i class="fs_16 iconfont icon-jiant-x"></i>
                                  </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command="{flag:0,index}" v-if="item.edited==='是' && btnPromise.del">删除</el-dropdown-item>
                                    <el-dropdown-item :command="{flag:1,item}" v-if="item.edited==='是' && btnPromise.editor">修改</el-dropdown-item>
                                    <el-dropdown-item :command="{flag:2,item}" v-if="item.edited==='是' && btnPromise.set">设置组成员</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </td>
                    </tr>
                </table>
            </div>
            <l-page
                    :totalPage="data.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :currentPage="params.reqParam.page"
            ></l-page>
        </div>
        <add ref="add"></add>
        <detail ref="detail" :data="detailData" :promiseData="promiseData"></detail>
        <set ref="set" :data="detailData"></set>
        <modify ref="modify" :data="detailData"></modify>
    </div>
</template>

<script>
  import {pageCallback} from '@/assets/js/mixin'
  import Add from './add'
  import Detail from './detail'
  import Set from './set'
  import Modify from './modify'
  export default {
    name: 'permission-management',
    mixins: [pageCallback],
    data () {
      return {
        params: {
          reqParam: {
            gName: '',
            page: 1,
            pageSize: 10
          }
        },
        data: {},
        detailData: {},
        promiseData: [],
      }
    },
    methods: {
      getData () {
        this.$http({
          url: this.$api + 'produce/resources/rs/groups/list',
          method: 'post',
          data: this.params
        }).then(res => {
          if (res.data.retCode === 1) {
            res.data.retVal.dataList.forEach(item => {
              item.edited = this.$method.queryDictionary.call(this, 400, item.edited)
              item.btnPopShow = false
            })
            this.data = res.data.retVal
          }
        })
      },
      clear () {
        this.params.reqParam.gName = ''
      },
      openAdd () {
        this.$refs.add.show()
      },
      getDetail (item, flag) {
        this.$http({
          url: this.$api + 'produce/resources/rs/groups/getById',
          method: 'post',
          data: {
            reqParam: {
              pkId: item.pkId
            }
          }
        }).then(res => {
          if (res.data.retCode === 1) {
            res.data.retVal.edited = this.$method.queryDictionary.call(this, 400, res.data.retVal.edited)
            this.detailData = res.data.retVal
            let arr = []
            let re = res.data.retVal.resources
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
                father.selected = index === 0?true:false
                re.forEach((children, ci) => {
                  if (children.pid === father.pkId) {
                    children.child = []
                    father.child.push(children)
                  }
                })
              })
            })
            arr.forEach(a=>{
              a.child.forEach(b=>{
                b.child.forEach((c, index)=>{
                  c.selected = index === 0? true: false
                  re.forEach(d=>{
                    if(d.pid === c.pkId) {
                      c.child.push(d)
                    }
                  })
                })
              })
            })
            this.promiseData = arr
            if (flag === 0) {
              this.$refs.detail.show()
            } else if(flag === 1) {
              this.$refs.modify.show()
            } else {
              this.$refs.set.show()
            }
          }
        })
      },
      del (index) {
        this.$confirm('确认删除这条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            method: 'post',
            url: this.$api + 'produce/resources/rs/groups/delete',
            data: {
              reqParam: {
                pkId: this.data.dataList[index].pkId
              }
            }
          }).then((res) => {
              if (res.data.retCode === 1) {
                this.data.dataList.splice(index, 1)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                  }
                )
              }
            }
          )
        }).catch(() => {})
      },
      handleChange(data) {
        if(data.flag === 0) {
          this.del(data.index)
        } else {
          this.getDetail(data.item, data.flag)
        }
      }
    },
    components: {
      Add,
      Detail,
      Set,
      Modify
    }
  }
</script>

<style scoped lang="stylus">
    .permission-management
        width 100%
        height 100%
        .search-wrap
            .label-1
                margin 0 0.5em 0 2.85em
            input
                width 18em
        .button-wrap
            width 94%
            margin 0 auto
            position relative
            .btn
                position absolute
                right 0
                top -2em
        .table-wrap
            width 94%
            /*height 70%*/
            /*overflow auto*/
            margin 0 auto
</style>
