<template>
    <div class="l-button fs_20" :style="{'background-color': bgColor}" @click="$emit('button-click')">
        <i v-if="iconName" class="fs_18" :class="iconName"></i>
        <img v-if="icon" :src="icon" />
        <span>{{buttonText}}</span>
    </div>
</template>

<script>
export default {
  name: 'l-button',
  props: {
    icon: {
      type: Object
    },
    iconName: {
      type: String
    },
    buttonText: {
      type: String
    },
    bgColor: {
      type: String,
      default: '#5273CE'
    }
  }
}
</script>

<style scoped lang="stylus">
    .l-button
        padding 0 1em
        height 28px
        border-radius 4px
        display inline-flex
        vertical-align top
        justify-content center
        align-items center
        color #ffffff
        cursor pointer
        user-select none
        line-height 1
        font-weight normal
        span
            margin-left .2em
</style>
