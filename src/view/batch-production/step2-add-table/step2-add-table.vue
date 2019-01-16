<template>
    <div class="step2-add-table" :id="'step2-add-table-'+id">
        <table class="label-table">
            <tr>
                <td class="label-td">
                    <label>选择投料信息</label>
                    <span>*</span>
                </td>
                <td class="label-td">
                    <label>物料名称</label>
                    <span>*</span>
                </td>
                <td class="label-td">
                    <label>企业名称</label>
                    <span>*</span>
                </td>
            </tr>
            <tr>
                <td>
                    <el-cascader
                            :filterable="true"
                            :options="typeList"
                            @active-item-change="handleItemChange"
                            @change="select"
                            :props="props"
                    ></el-cascader>
                </td>
                <td>
                    <input type="text" readonly v-model="showData.materialName">
                </td>
                <td>
                    <input type="text" readonly v-model="showData.companyName">
                </td>
            </tr>
            <tr>
                <td class="label-td">
                    <label>出厂批号</label>
                    <span>*</span>
                </td>
                <td class="label-td">
                    <label>投入量(吨)</label>
                    <span>*</span>
                </td>
                <td class="label-td">
                    <label>投入点</label>
                    <span>*</span>
                </td>
            </tr>
            <tr>
                <td>
                    <input type="text" v-model="showData.batchNo" readonly>
                </td>
                <td>
                    <input type="text" v-model="params.amount" @input="emitData">
                </td>
                <td>
                    <input type="text" v-model="params.place" @input="emitData">
                </td>
            </tr>
            <tr>
                <td class="label-td">
                    <label>操作人</label>
                    <span>*</span>
                </td>
                <td class="label-td">
                    <label>投料时间</label>
                    <span>*</span>
                </td>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <input type="text" v-model="params.feedUser" @input="emitData">
                </td>
                <td>
                    <el-date-picker
                            v-model="time"
                            type="datetime"
                            placeholder="选择投料时间">
                    </el-date-picker>
                </td>
                <td style="text-align: right">
                    <l-button buttonText="删除" @button-click="del"></l-button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
  export default {
    name: 'step2-add-table',
    props: {
      id: {
        type: Number
      },
      tableInput: {
        type: Function
      },
      tableDel: {
        type: Function
      }
    },
    data() {
      return {
        typeList: [],
        props: {
          value: 'value',
          children: 'child'
        },
        showData: {
          materialName: '',
          companyName: '',
          batchNo: ''
        },
        time: '',
        params: {
            batchPkId: JSON.parse(sessionStorage.getItem('currentDetail')).pkId,
            masterType: '',
            materBatchId: '',
            amount: '',
            place: '',
            feedUser: '',
            feedTime: ''
        }
      }
    },
    watch: {
      time(newVal) {
        if(newVal) {
          this.emitData()
        }
      }
    },
    created() {
        this.setTypeList()
    },
    methods: {
      setTypeList() {
        this.typeList = this.GLOBAL.dictionaryData[130]
        this.typeList.forEach(item => {
          item.label = item.dName
          item.value = item.pkId
          item.child = []
        })
      },
      select(val) {
        console.log(val)
        this.params.masterType = val[0]
        this.params.materBatchId = val[3].pkId
        this.emitData()
        this.showData.materialName = val[1].name
        this.showData.companyName = val[2].name
        this.showData.batchNo = val[3].name
      },
      handleItemChange(val) {
        if(val.toString().indexOf('13010') > -1 && !this.typeList[0].child.length) {
            this.getMaterial(0)
        } else if(val.toString().indexOf('13011') > -1 && !this.typeList[1].child.length) {
            this.getMaterial(1)
        }  else if(val.length === 3) {
            if(val[0].toString().indexOf('13010') > -1) {
              this.getBatch(0, val)
            } else if(val[0].toString().indexOf('13011') > -1) {
              this.getBatch(1, val)
            }
        }
      },
      getMaterial(flag) {
        let url = ''
        url = flag === 0?'produce/resources/rs/raw/getSelected':'produce/resources/rs/excipient/getSelected'
        this.$http({
          url: this.$api + url,
          method: 'post',
          data: {
            reqParam: {}
          }
        }).then(res => {
          if(res.data.retCode === 1) {
            res.data.retVal.dataList.forEach(item => {
              item.label = item.mName
              item.value = {
                name: item.mName,
                pkId: item.pkId
              }
              item.child = []
            })
            let t = this.typeList[flag]
            t.child = res.data.retVal.dataList
            this.typeList.splice(flag, 1, t)
            this.$forceUpdate()
            this.getFactor(flag)
          }
        })
      },
      getFactor(flag) {
        let url = ''
        url = flag === 0?'produce/resources/rs/raw/factory/getSelected':'produce/resources/rs/excipient/factory/getSelected'
        this.$http({
          url: this.$api + url,
          method: 'post',
          data: {
            reqParam: {}
          }
        }).then(res => {
          if(res.data.retCode === 1) {
            res.data.retVal.dataList.forEach(item => {
              item.label = item.fName
              item.value = {
                name: item.fName,
                pkId: item.pkId
              }
              item.child = []
            })
            this.typeList[flag].child.forEach(item => {
              item.child = res.data.retVal.dataList
            })
            this.$forceUpdate()
          }
        })
      },
      getBatch(flag, val) {
        let url = flag===0?'produce/production/pd/raw/batch/getForCombox':'produce/production/pd/excipient/batch/getForCombox'
        let params = flag===0?{rawPkId:val[1].pkId,rawFacPkId:val[2].pkId}:{execPkId:val[1].pkId,execFacPkId:val[2].pkId}
        this.$http({
          url: this.$api + url,
          method: 'post',
          data: {
            reqParam: params
          }
        }).then(res => {
          if(res.data.retCode === 1) {
            res.data.retVal.forEach(item => {
              item.label = item.batchNo
              item.value = {
                name: item.batchNo,
                pkId: item.pkId
              }
            })
            this.typeList.forEach(a => {
              if(a.pkId == val[0]) {
                a.child.forEach(b => {
                  if(b.pkId === val[1].pkId) {
                    b.child.forEach(c => {
                      if(c.pkId === val[2].pkId) {
                        c.child = res.data.retVal
                      }
                    })
                  }
                })
              }
            })
            this.typeList.splice(flag, 1, this.typeList[flag])
          }
        })
      },
      emitData() {
        let t = this.time
        if(typeof t !== 'string') {
          this.params.feedTime = t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate() + ' '+ t.getHours()+':'+t.getMinutes()+':'+t.getSeconds()
        }
        this.tableInput({
          id: 'step2-add-table-'+this.id,
          value: this.params
        })
      },
      del() {
        this.tableDel('step2-add-table-'+this.id)
        this.$destroy()
      }
    }
  }
</script>

<style scoped lang="stylus">
    .step2-add-table
        padding-bottom 2em
        border-bottom 1px dashed #707070
        .label-table
            width 100%
            tr
                td
                    color #414141
                    padding-left 1em
                    &:nth-of-type(1)
                        padding-left 0
                    span
                        color #D91C1C
                    input
                        width 100%
                        height 2em
                        border 1px solid #BFBFBF
                        border-radius 4px
                    &.label-td
                        padding-top 1em
</style>
<style lang="stylus">
    .step2-add-table
        .el-select
            width 100%
        .el-input__inner
            height 2em
            line-height 2em
            border-color #BFBFBF
        .el-input__icon
            line-height 2em
        .el-date-editor.el-input, .el-date-editor.el-input__inner
            width 100%
</style>
