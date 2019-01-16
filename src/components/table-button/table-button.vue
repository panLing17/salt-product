<template>
    <div class="table-button">
        <ul class="list">
            <li class="item fs_18" :key="index" v-for="(item, index) in data" :class="{active: itemActive===index}" @click="itemClick(index)">{{item.dName}}</li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'table-button',
  props: {
    data: {
      type: Array
    },
    itemActive: {
      type: Number,
      default: 0
    }
  },
  methods: {
    itemClick (index) {
      this.itemActive = index
      this.$emit('item-click', this.data[this.itemActive])
    }
  }
}
</script>

<style scoped lang="stylus">
    @import '../../assets/css/fn.styl'
    .table-button
        display inline-block
        box-sizing border-box
        .list
            font-size 0
            .item
                display inline-block
                min-width 3.66em
                text-align center
                padding .2em .83em
                background-color #ffffff
                color #BFBFBF
                border 1px solid #BFBFBF
                border-right none
                line-height 1
                cursor pointer
                user-select none
                font-size-set(16px)
                &.active
                    background-color #5F7FD9
                    color #fff
                    border-color #5F7FD9
                    &:last-child
                        border-right 1px solid #5F7FD9
                &:nth-of-type(1)
                    border-top-left-radius 4px
                    border-bottom-left-radius 4px
                &:last-child
                    border-top-right-radius 4px
                    border-bottom-right-radius 4px
                    border-right 1px solid #BFBFBF
</style>
