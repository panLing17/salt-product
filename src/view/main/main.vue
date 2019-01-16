<template>
    <div class="main">
        <l-header ref="lHeader" @to-batch="$refs.lLayout.initData()"></l-header>
        <l-layout @count-change="$refs.lHeader.getCount()" ref="lLayout"></l-layout>
    </div>
</template>

<script>
  import LHeader from '@/components/l-header/l-header'
  import LLayout from '@/components/l-layout/l-layout'
  export default {
    name: 'main',
    components: {
      LHeader,
      LLayout
    }
  }
</script>

<style scoped lang="stylus">
    .main
        width 100%
        height 100%
        min-width 1000px
        min-height 500px
</style>
