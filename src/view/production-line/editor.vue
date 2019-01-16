<template>
    <transition name="fade">
        <div class="mask" v-if="maskShow">
            <div class="mask-scroll">
                <div class="mask-content-wrap">
                    <div class="mask-title-wrap">
                        <div class="mask-title fs_22">
                            车间产线修改
                            <div class="close" @click="hide">
                                <i class="iconfont icon-guanbi"></i>
                            </div>
                        </div>
                    </div>
                    <div class="mask-content">
                        <ul class="shop clear-float" ref="shop">
                            <li class="fs_20 clear-float">
                                <div class="col-1">
                                    <span>*</span>
                                    <label>车间编码</label>
                                    <input type="text" style="background-color: #d0d0d0" disabled v-model="shop.code">
                                </div>
                                <div class="col-2">
                                    <span>*</span>
                                    <label>车间名称</label>
                                    <input type="text" :style="{'background-color': data.wType!==97010?'#d0d0d0':''}" :disabled="data.wType!==97010?true:false" v-model="shop.name" >
                                </div>
                                <div class="col-3">
                                    <l-button v-if="$parent.btnPromise.addUnit" buttonText="增加单元" :bgColor="data.wType!==97010?'#d0d0d0':'#5273CE'" @button-click="addUnit2"></l-button>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="mask-btn-wrap fs_20">
                        <l-button buttonText="取消" @button-click="hide" style="margin-right: 1em"></l-button>
                        <l-button buttonText="确认" @button-click="right"></l-button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
  export default {
    name: 'editor',
    props: {
      data: {
        type: Object
      },
      btnPromise: {
        type: Object
      }
    },
    data() {
      return {
        maskShow: false,
        shop: {
          code: '',
          name: ''
        },
        count: 1,
        tempData: {}
      }
    },
    watch: {
      maskShow(val) {
        if(val) {
          this.initData()
        }
      }
    },
    methods: {
      show() {
        this.maskShow = true
      },
      hide() {
        Object.assign(this.$data, this.$options.data())
        this.maskShow = false
      },
      initData() {
        this.shop.name = this.data.shopName
        this.shop.code = this.data.workId.substring(0, 2)
        if(this.data.units.length>0) {
            this.data.units.forEach((item, index)=>{
              item.workId = item.workId.substring(2, 4)
              this.addUnit(item)
              this.unitInput({
                id: 'unitWrap' + (index + 1),
                value: {
                  code: item.workId,
                  name: item.unitName
                }
              })
              item.lines.forEach((line, i) => {
                line.workId = line.workId.substring(4)
                this.unitInput({
                  id: (index+1) +'lineWrap' + (i + 1),
                  value: {
                    code: line.workId,
                    name: line.lineName,
                    person: line.lineChage,
                    preId: index+1
                  }
                })
              })
            })
        }
      },
      addUnit2() {
        if(this.data.wType !== 97010) {
          return
        }
        this.$unit({
          isAddLine: false,
          id: this.count++,
          className: 'shop',
          delUnitFn: this.delUnit,
          unitInputFn: this.unitInput,
          delLineCallback: this.delLineCallback,
          btnPromise: this.btnPromise,
          wType: this.data.wType
        })
      },
      addUnit (item) {
        this.$nextTick(()=>{
          let p = {
            isAddLine: false,
            id: this.count++,
            className: 'shop',
            delUnitFn: this.delUnit,
            unitInputFn: this.unitInput,
            delLineCallback: this.delLineCallback,
            btnPromise: this.btnPromise,
            wType: this.data.wType
          }
          if(typeof item !== 'undefined') {
            p.unitBack = item
          }
          this.$unit(p)
        })
      },
      delUnit (id) {
        delete this.tempData.id
        delete this.tempData[id]
        this.$refs.shop.removeChild(document.getElementById(id))
      },
      unitInput (data) {
        this.tempData[data.id] = data.value
      },
      delLineCallback (id) {
        delete this.tempData.id
        delete this.tempData[id]
      },
      right () {
        if(!/^(\w){2}$/.test(this.shop.code)) {
          this.$message.warning('车间编码只能是两位')
          return
        }
        let params = {
          reqParam: [
            {
              workId: this.shop.code.padEnd(6, '0'),
              shopName: this.shop.name,
              shopCode: this.shop.code.padEnd(6, '0'),
              unitName: '-',
              unitCode: this.shop.code.padEnd(6, '0'),
              lineName: '-',
              lineCode: this.shop.code.padEnd(6, '0'),
              used: this.$method.queryDictionaryForName.call(this, 'for1', '启用'),
              wType: this.$method.queryDictionaryForName.call(this, 970, '车间'),
              fid: '000000',
              lineChage: '',
              fullName: this.shop.name
            }
          ]
        }
        let flag = true
        for (let i in this.tempData) {
          let t = {}
          let str = i.substring(0, i.length-1)
          if (str === 'unitWrap') {
            if(!/^(\w){2}$/.test(this.tempData[i].code)) {
              flag = false
              this.$message.warning('单元编码只能是两位')
              return
            }
            t.workId = this.shop.code + this.tempData[i].code + '00'
            t.shopName = this.shop.name
            t.shopCode = this.shop.code + this.tempData[i].code + '00'
            t.unitName = this.tempData[i].name
            t.unitCode = this.shop.code + this.tempData[i].code + '00'
            t.lineName = '-'
            t.lineCode = this.shop.code + this.tempData[i].code + '00'
            t.used = this.$method.queryDictionaryForName.call(this, 'for1', '启用')
            t.wType = this.$method.queryDictionaryForName.call(this, 970, '单元')
            t.fid = this.shop.code + '0000'
            t.lineChage = ''
            t.fullName = this.shop.name + this.tempData[i].name
            params.reqParam.push(t)
          } else {
            let preId = this.tempData[i].preId
            if(!/^(\w){2}$/.test(this.tempData[i].code)) {
              flag = false
              this.$message.warning('产线编码只能是两位')
              return
            }
            t.workId = this.shop.code + this.tempData['unitWrap' + preId].code + this.tempData[i].code
            t.shopName = this.shop.name
            t.shopCode = this.shop.code + this.tempData['unitWrap' + preId].code + this.tempData[i].code
            t.unitName = this.tempData['unitWrap' + preId].name
            t.unitCode = this.shop.code + this.tempData['unitWrap' + preId].code + this.tempData[i].code
            t.lineName = this.tempData[i].name
            t.lineCode = this.shop.code + this.tempData['unitWrap' + preId].code + this.tempData[i].code
            t.used = this.$method.queryDictionaryForName.call(this, 'for1', '启用')
            t.wType = this.$method.queryDictionaryForName.call(this, 970, '产线')
            t.fid = this.shop.code + this.tempData['unitWrap' + preId].code + '00'
            t.lineChage = this.tempData[i].person
            t.fullName = this.shop.name + this.tempData['unitWrap' + preId].name + this.tempData[i].name
            params.reqParam.push(t)
          }
        }
        if(flag) {
          this.updateAjax(params)
        }
      },
      updateAjax(params) {
        this.$http({
          url: this.$api + 'produce/resources/rs/work/update',
          method: 'post',
          data: {
            reqParam: params.reqParam
          }
        }).then(res => {
          if (res.data.retCode === 1) {
            this.$parent.params.reqParam.page = 1
            this.$parent.getData()
            this.hide()
            this.$message.success('修改成功')
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
    .mask-content-wrap
        width 80%
        min-width 990px
        top 10%
        .mask-content
            width 93%
            margin 0 auto
            padding 2em 0 .5em
            .shop
                .col-3
                    text-align right
                    width 10%
                .col-2
                    width 49%
                    input
                        width 85%
                .col-1
                    width 40%
                    input
                        width 70%
                .col-1, .col-2, .col-3
                    box-sizing border-box
                    float left
                    span
                        color #D31717
                    input
                        line-height 2em
                        border 1px solid #BFBFBF
                        border-radius 4px
        .mask-btn-wrap
            margin 0 auto
            padding 2em 0
</style>
