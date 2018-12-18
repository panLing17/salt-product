<template>
    <div class="l-page fs_16">
        <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="pageSelect"
                :page-size="pageSize"
                layout="sizes, prev, pager, next"
                prev-text="上一页"
                next-text="下一页"
                :total="totalPage">
        </el-pagination>
    </div>
</template>

<script>
export default {
  name: 'l-page',
  props: {
    totalPage: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      pageSize: 10,
      pageSelect: [10, 20, 30, 40, 50],
      selectShow: false
    }
  },
  methods: {
    handleSizeChange (data) {
      this.$emit('size-change', data)
    },
    handleCurrentChange (data) {
      this.$emit('current-change', data)
    }
  }
}
</script>

<style lang="stylus">
    .l-page
        width 94.38%
        height 28px
        position absolute
        bottom 0
        left 2.7%
        .el-pagination
            text-align right
            position relative
            bottom 1em
            padding 0
        .el-pagination__sizes
            position absolute
            left 0
        .btn-prev span
            padding 0 5px
        .btn-next span
            padding 0 0 0 5px
        .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li
            margin 0
        .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li
            background-color #ffffff
        .el-pagination.is-background .el-pager li:not(.disabled).active
            background-color #5F7FD9
        .el-select .el-input.is-focus .el-input__inner
            border-color #5F7FD9
    .el-select-dropdown__item.selected
        color #5F7FD9
    .el-pagination .el-select .el-input
        margin 0
</style>
