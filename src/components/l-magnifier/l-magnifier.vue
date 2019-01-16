<template>
    <transition name="fade">
        <div class="mask" v-if="maskShow" @click="hide">
            <div class="magnifier" @click.stop="">
                <img :src="src" alt="">
            </div>
        </div>
    </transition>
</template>

<script>
  export default {
    name: 'l-magnifier',
    props: {
      src: {
        type: String
      }
    },
    data() {
      return {
        maskShow: false
      }
    },
    created() {
      this.show()
    },
    methods: {
      hide() {
        this.maskShow = false
      },
      show() {
        this.maskShow = true
      }
    }
  }
</script>

<style scoped lang="stylus">
    .magnifier
        font-size 0
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        img
            max-width 800px
</style>
