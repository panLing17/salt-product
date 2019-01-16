<template>
  <div class="enterprises-management-tc">
    <div class="top-card">
      <div class="search-wrap">
        <label>经营企业名称</label>
        <input type="text">
        <label>经营企业编码</label>
        <input type="text">
        <l-button :style="{'margin': '11px 1em 11px 2.5em'}" buttonText="查询" iconName="iconfont icon-chaxx"
          @button-click="search"></l-button>
        <l-button buttonText="清空" :style="{'margin': '11px 0'}" iconName="iconfont icon-qingk" @button-click="clear"></l-button>
      </div>
    </div>
    <div class="bottom-card white-bg">
      <div class="view-title">统筹经营企业
        <div class="table-button-single" @click="synData">同步统筹经营企业</div>
      </div>
      <div class="table-wrap">
        <table class="table-header">
          <colgroup width="20%"></colgroup>
          <colgroup width="40%"></colgroup>
          <colgroup width="28%"></colgroup>
          <colgroup width="12%"></colgroup>
          <tr class="tr">
            <th class="th">经营企业编码</th>
            <th class="th">经营企业名称</th>
            <th class="th">上级经营企业名称</th>
            <th class="th">操作</th>
          </tr>
        </table>
        <div class="table-scroll">
          <table class="table">
            <colgroup width="20%"></colgroup>
            <colgroup width="40%"></colgroup>
            <colgroup width="28%"></colgroup>
            <colgroup width="12%"></colgroup>
            <tr class="tr" v-for="(item, index) in data.dataList" :key="index">
              <td class="td">
                <el-tooltip :open-delay="300" placement="top">
                  <span style="cursor: pointer"></span>
                </el-tooltip>
              </td>
              <td class="td">
                <el-tooltip :open-delay="300" placement="top">
                  <span style="cursor: pointer"></span>
                </el-tooltip>
              </td>
              <td class="td">
                <el-tooltip :open-delay="300" placement="top">
                  <span style="cursor: pointer"></span>
                </el-tooltip>
              </td>
              <td class="td btn-wrap">
                <div class="btn" @click="getDetail(item)" v-if="btnPromise.detail">
                  <i class="iconfont icon-xiangq"></i>
                  <span>详情</span>
                </div>
                <el-dropdown trigger="click" @command="handleChange">
                  <span class="el-dropdown-link">
                    <i class="iconfont icon-guanli"></i>管理<i class="fs_16 iconfont icon-jiant-x"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="{flag:0,index}" v-if="btnPromise.tingyong">停用</el-dropdown-item>
                    <el-dropdown-item :command="{flag:1,item}" v-if="btnPromise.editor">修改</el-dropdown-item>
                    <el-dropdown-item :command="{flag:0,index}" v-if="btnPromise.del">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <l-page 
        :totalPage="data.total" 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange"
        :currentPage="params.reqParam.page"></l-page>
    </div>
    <!-- 详情弹窗 -->
    <transition name="fade">
      <div class="mask" v-show="detailShow">
        <div class="mask-content-wrap">
          <div class="mask-title-wrap">
            <div class="mask-title fs_22">
              经营企业详情
              <div class="close" @click="detailShow=false">
                <i class="iconfont icon-guanbi"></i>
              </div>
            </div>
          </div>
          <div class="mask-content2">
            <table class="mask-table2">
              <colgroup width="15%"></colgroup>
              <colgroup width="35%"></colgroup>
              <colgroup width="15%"></colgroup>
              <colgroup width="35%"></colgroup>
              <tr>
                <td>经营企业编码</td>
                <td></td>
                <td>经营企业名称</td>
                <td></td>
              </tr>
              <tr>
                <td>经营企业地址</td>
                <td></td>
                <td>经营企业类型</td>
                <td></td>
              </tr>
              <tr>
                <td>上级批发企业编码</td>
                <td></td>
                <td>上级批发企业名称</td>
                <td></td>
              </tr>
              <tr>
                <td>经营企业负责人</td>
                <td></td>
                <td>经营企业负责人电话</td>
                <td></td>
              </tr>
              <tr>
                <td>经营企业负责人邮箱</td>
                <td></td>
                <td>中盐平台编码</td>
                <td></td>
              </tr>
              <tr>
                <td>属地区划</td>
                <td colspan="3"></td>
              </tr>
            </table>
          </div>
          <div class="mask-btn-wrap2 fs_20">
            <l-button buttonText="返回" @button-click="hideDetail"></l-button>
          </div>
        </div>
      </div>
    </transition>
    <!-- <detail ref="detail" :data="detailData"></detail> -->
    <editor ref="editor" :data="detailData"></editor>
  </div>
</template>

<script>
  import {pageCallback} from '@/assets/js/mixin'
  import Editor from './editor.vue'   
  export default {
    name: 'enterprises-management-tc',
    mixins: [pageCallback],
    data() {
      return {
        data: {},
        params: {
          reqParam: {}
        },
        detailShow: false,
        detailData: {},
      }
    },
    methods: {
      search() {},
      clear() {},
      synData() {},
      hideDetail() {
        this.detailShow = false
      },
      //删除方法
    //   del (index) {
    //     this.$confirm('确认删除这条数据?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       this.$http({
    //         method: 'post',
    //         url: this.$api + '',
    //         data: {
             
    //         }
    //       }).then((res) => {
    //           if (res.data.retCode === 1) {
    //             this.$message({
    //                 type: 'success',
    //                 message: '删除成功!'
    //               }
    //             )
    //           }
    //         }
    //       )
    //     }).catch(() => {})
    //   },
    },
    components: {
      Editor
    }
  }

</script>

<style scoped lang="stylus">
    .enterprises-management-tc
        width 100%
        height 100%
        .search-wrap
            font-size 0
            label
                margin 0 .5em 0 2.85em
        .table-wrap
            width 94.38%
            margin 1% auto 0
            box-sizing border-box
        .mask-content-wrap
            width 75%
            top 15%
            transform translate(-50%, 0)
            .mask-content
                width 80%
            .mask-table
                border none
                tr
                    border none
                    &.label-wrap
                        height 3em
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
                            &.special
                                width 45%
            .mask-btn-wrap
                width 80%
                margin 0 auto
                padding 2em 0 5em
            .mask-content2
                width 93%
                margin 2em auto 0
                .mask-table2
                    width 100%
                    border 1px solid #BFBFBF
                    border-collapse collapse
                    tr
                        border 1px solid #BFBFBF
                        td
                            border 1px solid #BFBFBF
                            padding-left 1.5em
                            color #414141
                            line-height 3.5em
            .mask-btn-wrap2
                width 93%
                text-align right
                margin 0 auto
                padding 3em 0 5em
        
</style>
