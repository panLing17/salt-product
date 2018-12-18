<template>
    <div class="protect-log">
        <div class="top-card white-bg">
            <div class="top-title view-title">查询</div>
            <div class="search-wrap">
                <label class="fs_20">用户名称</label>
                <input type="text" v-model="params.reqParam.userName">
                <label class="fs_20">日志类型</label>
                <el-select v-model="params.reqParam.logType" filterable placeholder="请选择">
                    <el-option
                            v-for="item in loginTypeList"
                            :key="item.pkId"
                            :label="item.dName"
                            :value="item.pkId">
                    </el-option>
                </el-select>
                <label class="fs_20">登录时间</label>
                <el-date-picker
                        ref="elDatePicker"
                        size="mini"
                        v-model="queryDate"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                >
                </el-date-picker>
                <l-button :style="{'margin': '0 1em 0 2.5em'}" buttonText="查询" iconName="iconfont icon-chaxx" @button-click="getData"></l-button>
                <l-button buttonText="清空" iconName="iconfont icon-qingk" @button-click="clear"></l-button>
            </div>
        </div>
        <div class="bottom-card white-bg">
            <div class="view-title">登录日志列表</div>
            <div class="table-wrap">
                <table class="fs_20 table-header">
                    <colgroup width="15%"></colgroup>
                    <colgroup width="10%"></colgroup>
                    <colgroup width="10%"></colgroup>
                    <colgroup width="15%"></colgroup>
                    <colgroup width="15%"></colgroup>
                    <colgroup width="25%"></colgroup>
                    <colgroup width="10%"></colgroup>
                    <tr class="tr">
                        <th class="th">时间</th>
                        <th class="th">日志类型</th>
                        <th class="th">用户姓名</th>
                        <th class="th">用户类型</th>
                        <th class="th">动作模块</th>
                        <th class="th">动作描述</th>
                        <th class="th">动作结果</th>
                    </tr>
                </table>
                <table class="table fs_20">
                    <colgroup width="15%"></colgroup>
                    <colgroup width="10%"></colgroup>
                    <colgroup width="10%"></colgroup>
                    <colgroup width="15%"></colgroup>
                    <colgroup width="15%"></colgroup>
                    <colgroup width="25%"></colgroup>
                    <colgroup width="10%"></colgroup>
                    <tr class="tr" v-for="(item, index) in data.dataList" :key="index">
                        <td class="td">{{item.lastTime}}</td>
                        <td class="td">{{item.logType}}</td>
                        <td class="td">{{item.userName}}</td>
                        <td class="td">{{item.userType}}</td>
                        <td class="td">{{item.logModule}}</td>
                        <td class="td">{{item.logAction}}</td>
                        <td class="td">{{item.logResult}}</td>
                    </tr>
                </table>
            </div>
            <l-page
                    :totalPage="data.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
            ></l-page>
        </div>
    </div>
</template>

<script>
  import {pageCallback} from '@/assets/js/mixin'
  export default {
    name: 'protect-log',
    mixins: [pageCallback],
    data() {
      return {
        loginTypeList: [],
        params: {
          reqParam: {
            page: 1,
            pageSize: 10,
            userName: '',
            logType: '',
            startTime: '',
            endTime: ''
          }
        },
        data: {},
        queryDate: ''
      }
    },
    created() {
      this.loginTypeList = this.GLOBAL.dictionaryData[300]
      this.getData()
    },
    watch: {
      queryDate (newVal) {
        if (newVal) {
          this.params.reqParam.startTime = newVal[0].getFullYear() + '-' + (newVal[0].getMonth() + 1) + '-' + newVal[0].getDate()
          this.params.reqParam.endTime = newVal[1].getFullYear() + '-' + (newVal[1].getMonth() + 1) + '-' + newVal[1].getDate()
        } else {
          this.params.reqParam.startTime = ''
          this.params.reqParam.endTime = ''
        }
      }
    },
    methods: {
      getData() {
        this.$http({
          method: 'post',
          url: this.$api + 'produce/log/operation/list',
          data: this.params
        }).then((res) => {
          if (res.data.retCode === 1) {
            res.data.retVal.dataList.forEach(item=>{
              item.logType = this.$method.queryDictionary.call(this, 300, item.logType)
              item.userType = this.$method.queryDictionary.call(this, 500, item.userType)
              item.logResult = this.$method.queryDictionary.call(this, 400, item.logResult)
            })
            this.data = res.data.retVal
          }
        })
      },
      clear() {}
    }
  }
</script>

<style scoped lang="stylus">
    .protect-log
        width 100%
        height 100%
        .top-card
            .search-wrap
                font-size 0
                label
                    margin 0 .5em 0 2.85em
                input
                    width 10%
                    height 28px
        .table-wrap
            width 94.38%
            height 70%
            margin 0 auto 0
            overflow auto
            box-sizing border-box
</style>
<style lang="stylus">
    .protect-log
        .search-wrap
            .el-select
                width 10%
                height 28px
            .el-input__inner
                height 28px
            .el-input__icon
                line-height 28px
</style>
