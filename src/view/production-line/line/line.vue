<template>
    <li class="line-wrap fs_20" :id="'lineWrap'+id" v-if="lineShow">
        <div class="node-line"></div>
        <ul class="line">
            <li class="fs_20 clear-float">
                <div class="line-col-1">
                        <span>*</span>
                        <label>产线编码</label>
                    <input type="text" v-model="line.code" @input="lineInput">
                </div>
                <div class="line-col-2">
                        <span>*</span>
                        <label>产线名称</label>
                    <input type="text" v-model="line.name" @input="lineInput">
                        <span style="margin-left: 2em">*</span>
                        <label>产线负责人</label>
                    <input type="text" v-model="line.person" @input="lineInput">
                </div>
                <div class="line-col-3">
                    <l-button buttonText="删除产线" @button-click="delLine"></l-button>
                </div>
            </li>
        </ul>
    </li>
</template>

<script>
  export default {
    name: 'line',
    props: {
      id: {
        type: Number
      },
      delLineFn: {
        type: Function
      },
      lineInputFn: {
        type: Function
      },
      preId: {
        type: Number
      }
    },
    data () {
      return {
        lineShow: false,
        line: {
          code: '',
          name: '',
          person: '',
          preId: this.preId
        }
      }
    },
    created () {
      this.show()
    },
    methods: {
      show () {
        this.unitShow = true
      },
      hide () {
        this.unitShow = false
      },
      delLine () {
        this.delLineFn('lineWrap' + this.id)
        this.$destroy()
      },
      lineInput () {
        this.lineInputFn({
          id: 'lineWrap' + this.id,
          value: this.line
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
    .line-wrap
        padding-top 2em
        position relative
        .node-line
            position absolute
            left 7em
            top 0
            width 2.2em
            height 3em
            border-left 1px dotted #BFBFBF
            border-bottom 1px dotted #BFBFBF
        .line
            .line-col-3
                text-align right
                width 10%
            .line-col-2
                width 49%
                position relative
                input
                    width 30%
            .line-col-1
                width 40%
                padding-left 14%
                input
                    width 54%
            .line-col-1, .line-col-2, .line-col-3
                float left
                span
                    color #D31717
                input
                    line-height 2em
                    border 1px solid #BFBFBF
                    border-radius 4px
</style>
