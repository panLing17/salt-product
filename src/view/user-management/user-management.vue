<template>
    <div class="user-management">
        <div class="top-card white-bg">
            <div class="top-title view-title">查询</div>
            <div class="search-wrap">
                <label class="fs_20">账号</label>
                <input type="text" v-model="params.reqParam.uId"/>
                <label class="fs_20">姓名</label>
                <input type="text" v-model="params.reqParam.uName" />
                <l-button :style="{'margin': '0 1em 0 2.5em'}" buttonText="查询" iconName="iconfont icon-chaxx" @button-click="getData"></l-button>
                <l-button buttonText="清空" iconName="iconfont icon-qingk" @button-click="clear"></l-button>
            </div>
        </div>
        <div class="bottom-card white-bg">
            <div class="view-title">用户管理列表</div>
            <div class="table-button-wrap">
                <table-button class="fs_18" :data="tableButtonArr1" @item-click="tableItemClick1"></table-button>
                <div class="table-button-single fs_18" @click="openAdd">
                    <i class="iconfont icon-xinz fs_16"></i>
                    <span>新增用户</span>
                </div>
            </div>
            <div class="table-wrap">
                <table class="fs_20 table-header">
                    <colgroup width="20%"></colgroup>
                    <colgroup width="10%"></colgroup>
                    <colgroup width="10%"></colgroup>
                    <colgroup width="20%"></colgroup>
                    <colgroup width="15%"></colgroup>
                    <colgroup width="12%"></colgroup>
                    <colgroup width="13%"></colgroup>
                    <tr class="tr">
                        <th class="th">账号</th>
                        <th class="th">姓名</th>
                        <th class="th">性别</th>
                        <th class="th">手机号</th>
                        <th class="th">类型</th>
                        <th class="th">岗位</th>
                        <th class="th">操作</th>
                    </tr>
                </table>
                <div class="table-scroll fs_20">
                    <table class="table fs_20">
                        <colgroup width="20%"></colgroup>
                        <colgroup width="10%"></colgroup>
                        <colgroup width="10%"></colgroup>
                        <colgroup width="20%"></colgroup>
                        <colgroup width="15%"></colgroup>
                        <colgroup width="12%"></colgroup>
                        <colgroup width="13%"></colgroup>
                        <tr class="tr" v-for="(item, index) in data.dataList" :key="index">
                            <td class="td">{{item.uId}}</td>
                            <td class="td">{{item.uName}}</td>
                            <td class="td">{{item.sex}}</td>
                            <td class="td">{{item.mobile}}</td>
                            <td class="td">{{item.uType}}</td>
                            <td class="td">{{item.jobTitle}}</td>
                            <td class="td btn-wrap">
                                <div class="btn" @click="getDetail(item, 0)">
                                    <i class="fs_18 iconfont icon-xiangq"></i>
                                    <span class="fs_18">详情</span>
                                </div>
                                <div class="btn" @click.stop="openPop(index)">
                                    <i class="fs_18 iconfont icon-guanli"></i>
                                    <span class="fs_18">管理</span>
                                    <i class="fs_16 iconfont icon-jiant-x" style="margin-left: .2em"></i>
                                    <div class="pop-btn fs_20" v-show="item.btnPopShow">
                                        <div class="sanjiao"></div>
                                        <ul class="pop-list">
                                            <li class="pop-item" @click="del(index)">删除</li>
                                            <li class="pop-item" @click="getDetail(item, 1)">编辑</li>
                                            <li class="pop-item" @click="getDetail(item, 2)">设置权限组</li>
                                            <li class="pop-item" @click="resetPwd(item)">重置密码</li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <l-page
                    :totalPage="data.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
            ></l-page>
        </div>
        <add ref="add"></add>
        <detail ref="detail" :data="detailData"></detail>
        <editor ref="editor" :data="detailData"></editor>
        <set-promise ref="setPromise" :data="detailData"></set-promise>
    </div>
</template>

<script>
  import {pageCallback} from '@/assets/js/mixin'
  import Add from './add'
  import Detail from './detail'
  import Editor from './editor'
  import SetPromise from './set-promise'
  export default {
    name: 'user-management',
    mixins: [pageCallback],
    data () {
      return {
        tableButtonArr1: [
          {
            dName: '全部',
            pkId: ''
          }
        ],
        params: {
          reqParam: {
            uId: '',
            uName: '',
            uType: '',
            page: 1,
            pageSize: 10
          }
        },
        data: {},
        detailData: {}
      }
    },
    created () {
      this.getData()
      this.initData()
    },
    methods: {
      initData () {
        this.tableButtonArr1 = this.tableButtonArr1.concat(this.GLOBAL.dictionaryData[500])
      },
      getData () {
        this.$http({
          method: 'post',
          url: this.$api + 'produce/resources/rs/users/list',
          data: this.params
        }).then((res) => {
          if (res.data.retCode === 1) {
            res.data.retVal.dataList.forEach(item => {
              item.sex = this.$method.queryDictionary.call(this, 800, item.sex)
              item.uType = this.$method.queryDictionary.call(this, 500, item.uType)
              item.btnPopShow = false
            })
            this.data = res.data.retVal
          }
        })
      },
      tableItemClick1 (data) {
        this.params.reqParam.uType = data.pkId
        this.params.reqParam.page = 1
        this.getData()
      },
      clear () {
        this.params.reqParam.uName = ''
        this.params.reqParam.uId = ''
      },
      openAdd () {
        this.$refs.add.show()
      },
      getDetail (item, flag) {
        this.$http({
          method: 'post',
          url: this.$api + 'produce/resources/rs/users/getById',
          data: {
            reqParam: {
              uId: item.uId
            }
          }
        }).then((res) => {
          if (res.data.retCode === 1) {
            res.data.retVal.sex = this.$method.queryDictionary.call(this, 800, res.data.retVal.sex)
            res.data.retVal.uType = this.$method.queryDictionary.call(this, 500, res.data.retVal.uType)
            this.detailData = res.data.retVal
            if (flag === 0) {
              this.$refs.detail.show()
            } else if (flag === 2) {
              this.$refs.setPromise.show()
            } else {
              this.$refs.editor.show()
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
            url: this.$api + 'produce/resources/rs/users/delete',
            data: {
              reqParam: {
                uId: this.data.dataList[index].uId
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
      resetPwd(item) {
        this.$confirm('密码改为 67890a?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$api + 'produce/resources/rs/users/resetPasswd',
            method: 'post',
            data: {
              reqParam: {
                uId: item.uId,
                uPwd: '67890a'
              }
            }
          }).then((res) => {
              if (res.data.retCode === 1) {
                this.$message({
                    type: 'success',
                    message: '重置密码成功成功!'
                  }
                )
              }
            }
          )
        }).catch(() => {})
      }
    },
    components: {
      Add,
      Detail,
      Editor,
      SetPromise
    }
  }
</script>

<style scoped lang="stylus">
    .user-management
        width 100%
        height 100%
        .search-wrap
            font-size 0
            label
                margin 0 .5em 0 2.85em
        .table-button-wrap
            .btn
                position absolute
                right 0
        .table-wrap
            width 94.38%
            height 70%
            margin 1% auto 0
            overflow auto
            box-sizing border-box
</style>
