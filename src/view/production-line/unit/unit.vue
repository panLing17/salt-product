<template>
    <li class="unit-wrap fs_20" :id="'unitWrap'+id" v-if="unitShow">
        <div class="node-line"></div>
        <ul class="unit" :id="'unit'+id">
            <li class="fs_20 clear-float">
                <div class="unit-col-1">
                    <span>*</span>
                    <label>单元编码</label>
                    <input type="text" :disabled="unitBack" :style="{'background-color': unitBack?'#d0d0d0':''}" v-model="unit.code" @input="unitInput">
                </div>
                <div class="unit-col-2">
                    <span>*</span>
                    <label>单元名称</label>
                    <input type="text" :style="{'background-color': wType===97010 || wType===97020?'':'#d0d0d0'}" :disabled="wType===97010 || wType===97020?false:true" v-model="unit.name" @input="unitInput">
                    <l-button v-if="btnPromise.addLine" :bgColor="wType===97010 || wType===97020?'#5273CE':'#d0d0d0'" buttonText="增加产线" style="margin-left: .5em" @button-click="addLineFn2"></l-button>
                </div>
                <div class="unit-col-3">
                    <l-button buttonText="删除单元" :bgColor="unitBack?'#d0d0d0':'#5273CE'" @button-click="delUnit"></l-button>
                </div>
            </li>
        </ul>
    </li>
</template>

<script>
  export default {
    name: 'unit',
    props: {
      isAddLine: {
        type: Boolean,
        default: true
      },
      id: {
        type: Number
      },
      delUnitFn: {
        type: Function
      },
      unitInputFn: {
        type: Function
      },
      delLineCallback: {
        type: Function
      },
      btnPromise: {
        type: Object
      },
      unitBack: {
        type: Object
      },
      wType: {
        type: Number
      }
    },
    data () {
      return {
        unitShow: false,
        count: 1,
        unit: {
          code: '',
          name: ''
        }
      }
    },
    created () {
      this.show()
      this.initData()
    },
    mounted () {
      // this.addLine()
    },
    methods: {
      show () {
        this.unitShow = true
      },
      hide () {
        this.unitShow = false
      },
      initData() {
        if(typeof this.unitBack !== 'undefined') {
          this.unit.code = this.unitBack.workId
          this.unit.name = this.unitBack.unitName

          if(this.unitBack.lines.length > 0) {
            this.unitBack.lines.forEach(item=>{
              this.addLineFn(item)
            })
          }
        }
      },
      // addLine () {
      //   if (this.isAddLine) {
      //     this.$nextTick(() => {
      //       this.$line({
      //         fatherId: 'unit' + this.id,
      //         id: 1,
      //         delLineFn: this.delLineFn,
      //         lineInputFn: this.lineInputFn,
      //         preId: this.id
      //       })
      //     })
      //   }
      // },
      addLineFn (item) {
        this.$nextTick(()=>{
          let p = {
            fatherId: 'unit' + this.id,
            id: ++this.count,
            delLineFn: this.delLineFn,
            lineInputFn: this.lineInputFn,
            preId: this.id
          }
          if(typeof item !== 'undefined') {
            p.lineBack = item
          }
          this.$line(p)
        })
      },
      addLineFn2() {
        if(!(this.wType === 97010 || this.wType === 97020)) {
          return
        }
        this.$line({
          fatherId: 'unit' + this.id,
          id: ++this.count,
          delLineFn: this.delLineFn,
          lineInputFn: this.lineInputFn,
          preId: this.id
        })
      },
      delUnit () {
        if(typeof this.unitBack !== 'undefined') {
          return
        }
        this.$emit('del-unit', 'unitWrap' + this.id)
        this.delUnitFn ? this.delUnitFn('unitWrap' + this.id) : ''
        this.$destroy()
      },
      delLineFn (id) {
        this.$emit('del-line-callback', id)
        this.delLineCallback?this.delLineCallback(id):''
        document.getElementById('unit'+this.id).removeChild(document.getElementById(id))
      },
      unitInput () {
        this.$emit('unit-input', {
          id: 'unitWrap' + this.id,
          value: this.unit
        })
        this.unitInputFn?this.unitInputFn({
          id: 'unitWrap' + this.id,
          value: this.unit
        }):''
      },
      lineInputFn (data) {
        this.$emit('unit-input', data)
        this.unitInputFn?this.unitInputFn(data):''
      }
    }
  }
</script>

<style scoped lang="stylus">
    .unit-wrap
        padding-top 2em
        position relative
        .node-line
            position absolute
            left 2em
            top 0
            width 2.2em
            height 3em
            border-left 1px dotted #BFBFBF
            border-bottom 1px dotted #BFBFBF
        .unit
            .unit-col-3
                text-align right
                width 10%
            .unit-col-2
                width 49%
                position relative
                input
                    width 64%
            .unit-col-1
                width 40%
                padding-left 7%
                input
                    width 64%
            .unit-col-1, .unit-col-2, .unit-col-3
                float left
                span
                    color #D31717
                input
                    line-height 2em
                    border 1px solid #BFBFBF
                    border-radius 4px
</style>
