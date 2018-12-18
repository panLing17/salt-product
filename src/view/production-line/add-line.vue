<template>
    <transition name="fade">
        <div class="mask" v-if="addShow">
            <div class="mask-scroll">
                <div class="mask-content-wrap">
                <div class="mask-title-wrap">
                    <div class="mask-title fs_22">
                        车间产线新增
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
                                <input type="text" v-model="shop.code">
                            </div>
                            <div class="col-2">
                                <span>*</span>
                                <label>车间名称</label>
                                <input type="text" v-model="shop.name">
                            </div>
                            <div class="col-3">
                                <l-button buttonText="增加单元" @button-click="addUnit"></l-button>
                            </div>
                        </li>
                        <unit @del-line-callback="delLineCallback" :id="1" @del-unit="delUnit" @unit-input="unitInput"></unit>
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
    name: 'addLine',
    data () {
      return {
        addShow: false,
        count: 1,
        tempData: {},
        shop: {
          code: '',
          name: ''
        }
      }
    },
    methods: {
      show () {
        this.addShow = true
      },
      hide () {
        this.addShow = false
      },
      addUnit () {
        this.$unit({
          isAddLine: false,
          id: ++this.count,
          className: 'shop',
          delUnitFn: this.delUnit,
          unitInputFn: this.unitInput,
          delLineCallback: this.delLineCallback
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
        let params = {
          reqParam: [
            {
              workId: this.shop.code + '0000',
              shopName: this.shop.name,
              shopCode: this.shop.code + '0000',
              unitName: '-',
              unitCode: this.shop.code + '0000',
              lineName: '-',
              lineCode: this.shop.code + '0000',
              used: this.$method.queryDictionaryForName.call(this, 'for1', '启用'),
              wType: this.$method.queryDictionaryForName.call(this, 970, '车间'),
              fid: '000000',
              lineChage: '',
              fullName: this.shop.name
            }
          ]
        }
        for (let i in this.tempData) {
          let t = {}
          let str = i.substring(0, i.length-1)
          if (str === 'unitWrap') {
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
          } else if (str === 'lineWrap'){
            let preId = this.tempData[i].preId
            t.workId = this.shop.code + this.tempData['unitWrap' + preId].code + this.tempData[i].code
            t.shopName = this.shop.name
            t.shopCode = this.shop.code + this.tempData['unitWrap' + preId].code + this.tempData[i].code
            t.unitName = this.tempData['unitWrap' + preId].name
            t.unitCode = this.shop.code + this.tempData['unitWrap' + preId].code + this.tempData[i].code
            t.lineName = this.tempData[i].name
            t.lineCode = this.shop.code + this.tempData['unitWrap' + preId].code + this.tempData[i].code
            t.used = this.$method.queryDictionaryForName.call(this, 'for1', '启用')
            t.wType = this.$method.queryDictionaryForName.call(this, 970, '产线')
            t.fid = this.shop.code + this.tempData['unitWrap' + preId].code + this.tempData[i].code
            t.lineChage = this.tempData[i].person
            t.fullName = this.shop.name + this.tempData['unitWrap' + preId].name + this.tempData[i].name
            params.reqParam.push(t)
          }
        }
        this.addAjax(params)
      },
      addAjax (params) {
        this.$http({
          url: this.$api + 'produce/resources/rs/work/save',
          method: 'post',
          data: {
            reqParam: params.reqParam
          }
        }).then(res => {
          if (res.data.retCode === 1) {
            this.$parent.getData()
            this.addShow = false
            this.$message.success('新增成功')
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
    .mask-content-wrap
        width 80%
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
