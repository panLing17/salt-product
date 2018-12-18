<template>
    <transition name="fade">
        <div class="mask" v-if="maskShow">
            <div class="mask-content-wrap special">
                <div class="mask-title-wrap">
                    <div class="mask-title fs_22">
                        同步产品管理信息
                        <div class="close" @click="maskShow=false">
                            <i class="iconfont icon-guanbi"></i>
                        </div>
                    </div>
                </div>
                <div class="mask-content">
                    <table class="mask-table fs_20">
                        <colgroup width="5%"></colgroup>
                        <tr>
                            <td class="center" style="text-align: center" @click="checkAll">
                                <i class="iconfont"
                                   :class="{'icon-dianxuan-1': !checkFlag, 'icon-dianxuan-': checkFlag}"
                                   :style="{color: checkFlag?'#5F7FD9':'#707070'}"
                                ></i>
                            </td>
                            <td>产品编码</td>
                            <td>产品名称</td>
                            <td>碘盐标志</td>
                            <td>规格</td>
                            <td>产品类别</td>
                            <td>产品种类</td>
                            <td>包装形式</td>
                            <td>包装类别</td>
                        </tr>
                        <tr v-for="(item, index) in data" :key="index">
                            <td class="center" @click="itemCheck(index)">
                                <i class="iconfont"
                                   :class="{'icon-dianxuan-1': !item.selected, 'icon-dianxuan-': item.selected}"
                                   :style="{color: item.selected?'#5F7FD9':'#707070'}"
                                ></i>
                            </td>
                            <td>{{item.productCode}}</td>
                            <td>{{item.productName}}</td>
                            <td>{{item.iodate}}</td>
                            <td>{{item.spec}}</td>
                            <td>{{item.productType}}</td>
                            <td>{{item.productCategory}}</td>
                            <td>{{item.packStyle}}</td>
                            <td>{{item.packType}}</td>
                        </tr>
                    </table>
                </div>
                <div class="mask-btn-wrap fs_20">
                    <l-button buttonText="确认" @button-click="right"></l-button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
  export default {
    name: 'sync-select',
    props: {
      data: {
        type: Array
      }
    },
    data () {
      return {
        maskShow: false,
        checkFlag: false
      }
    },
    methods: {
      show () {
        this.maskShow = true
      },
      hide() {
        Object.assign(this.$data, this.$options.data())
        this.maskShow = false
      },
      checkAll () {
        this.checkFlag = !this.checkFlag
        this.data.forEach(item => {
          item.selected = this.checkFlag
        })
      },
      itemCheck (index) {
        this.data[index].selected = !this.data[index].selected
        let count = 0
        this.data.forEach(item => {
          if(item.selected) {
            count++
          }
        })
        if(count === this.data.length) {
          this.checkFlag = true
        } else {
          this.checkFlag = false
        }
      },
      right () {
        let arr = []
        this.data.forEach(item => {
          if(item.selected) {
            arr.push(item.productCode)
          }
        })
        this.$http({
          url: this.$api + 'produce/resources/sync/productPermissionSelected',
          method: 'post',
          data: {
            reqParam: arr
          }
        }).then(res => {
          if(res.data.retCode === 1) {
            this.$message.success('同步成功')
            this.$parent.params.reqParam.page = 1
            this.$parent.getData()
            this.hide()
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
    .mask-content-wrap
        width 74.8%
        .mask-title
            width 93%
        .mask-content
            width 93%
            margin 0 auto
            padding 1em 0
            .mask-table
                width 100%
                td
                    line-height 2em
        .mask-btn-wrap
            width 93%
            margin 0 auto
            padding 2em 0
            text-align right
</style>
