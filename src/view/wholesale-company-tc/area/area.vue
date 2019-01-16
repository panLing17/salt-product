<template>
    <div class="area" :id="'area'+id">
        <el-cascader
                filterable
                change-on-select
                :options="GLOBAL.areaList"
                :props="props"
                @change="select"
                v-model="params"
        ></el-cascader>
        <!--<div class="icon-btn" style="margin-left: 15px" @click="delMe">-->
            <!--<i class="iconfont icon-qingk"></i>-->
        <!--</div>-->
    </div>
</template>

<script>
  export default {
    name: 'area',
    props: {
      id: {
        type: Number
      },
      change: {
        type: Function
      },
      del: {
        type: Function
      },
      data: {
        type: Array
      }
    },
    data() {
      return {
        props: {
          value: 'areaId',
          children: 'childList',
          label: 'areaName'
        },
        params: []
      }
    },
    created() {
      this.initData()
    },
    methods: {
      initData() {
        if(Array.isArray(this.data)) {
          this.params = this.data
          this.select(this.params)
        }
      },
      select(data) {
        this.change({
          id: this.id,
          data: data[data.length-1]
        })
      },
      delMe() {
        this.$destroy()
        this.del(this.id)
      }
    }
  }
</script>

<style lang="stylus">
    @import '../../../assets/css/fn.styl'
    .area
        margin-top 10px
        .el-date-editor .el-range__icon
            font-size-set(20px)
            height-set(40px,height)
            margin-left 5px
        .el-cascader
            width 50%
            color #414141
            font-size-set(20px)
            height-set(40px,line-height)
        .el-input__inner
            font-size-set(20px)
            height-set(40px,height)
            border-color  #bfbfbf
</style>
