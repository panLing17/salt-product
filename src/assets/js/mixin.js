export const pageCallback = {
  props: {
    navList: {
      type: Array
    },
    navActive: {
      type: Number
    }
  },
  data() {
    return {
      btnPromise: {}
    }
  },
  mounted() {
    setTimeout(()=>{
      if(this.data.dataList) {
        document.addEventListener('click', () =>{
          this.data.dataList.forEach(item => {
            item.btnPopShow = false
          })
        }, false)
      }
    }, 1500)
  },
  created() {
    this.initBtnPromise()
  },
  methods: {
    initBtnPromise() {
      this.navList.forEach(item=>{
        if(item.pkId === this.navActive) {
          switch (item.pkId) {
            case 12000:
              item.child.forEach(c=>{
                switch (c.pkId) {
                  case 12001:
                    this.btnPromise.search = true
                    break
                  case 12002:
                    this.btnPromise.detail = true
                    break
                  case 12003:
                    this.btnPromise.addShop = true
                    break
                  case 12004:
                    this.btnPromise.addUnit = true
                    break
                  case 12005:
                    this.btnPromise.addLine = true
                    break
                  case 12006:
                    this.btnPromise.del = true
                    break
                  case 12007:
                    this.btnPromise.on = true
                    break
                  case 12008:
                    this.btnPromise.off = true
                    break
                  case 12009:
                    this.btnPromise.editor = true
                    break
                }
              })
              break
            case 12500:
              item.child.forEach(c=>{
                switch (c.pkId) {
                  case 12501:
                    this.btnPromise.search = true
                    break
                }
              })
              break
            case 13000:
              item.child.forEach(c=>{
                switch (c.pkId) {
                  case 13001:
                    this.btnPromise.search = true
                    break
                  case 13002:
                    this.btnPromise.detail = true
                    break
                  case 13003:
                    this.btnPromise.add = true
                    break
                  case 13004:
                    this.btnPromise.editor = true
                    break
                  case 13005:
                    this.btnPromise.del = true
                    break
                  case 13006:
                    this.btnPromise.set = true
                    break
                }
              })
              break
            case 13500:
              item.child.forEach(c=>{
                switch (c.pkId) {
                  case 13501:
                    this.btnPromise.search = true
                    break
                  case 13502:
                    this.btnPromise.detail = true
                    break
                  case 13503:
                    this.btnPromise.add = true
                    break
                  case 13504:
                    this.btnPromise.editor = true
                    break
                  case 13505:
                    this.btnPromise.del = true
                    break
                  case 13506:
                    this.btnPromise.set = true
                    break
                  case 13507:
                    this.btnPromise.reset = true
                    break
                }
              })
              break
            case 14000:
              item.child.forEach(c=>{
                switch (c.pkId) {
                  case 14001:
                    this.btnPromise.detail = true
                    break
                  case 14002:
                    this.btnPromise.sync = true
                    break
                }
              })
              break
            case 20500:
              item.child.forEach(c=>{
                switch (c.pkId) {
                  case 20501:
                    this.btnPromise.search = true
                    break
                  case 20502:
                    this.btnPromise.detail = true
                    break
                  case 20503:
                    this.btnPromise.add = true
                    break
                  case 20504:
                    this.btnPromise.editor = true
                    break
                  case 20505:
                    this.btnPromise.del = true
                    break
                }
              })
              break
            case 21000:
              item.child.forEach(c=>{
                switch (c.pkId) {
                  case 21001:
                    this.btnPromise.search = true
                    break
                  case 21002:
                    this.btnPromise.detail = true
                    break
                  case 21003:
                    this.btnPromise.add = true
                    break
                  case 21004:
                    this.btnPromise.editor = true
                    break
                  case 21005:
                    this.btnPromise.del = true
                    break
                }
              })
              break
            case 21500:
              item.child.forEach(c=>{
                switch (c.pkId) {
                  case 21501:
                    this.btnPromise.search = true
                    break
                  case 21502:
                    this.btnPromise.detail = true
                    break
                  case 21503:
                    this.btnPromise.showCheck = true
                    break
                  case 21504:
                    this.btnPromise.addCheck = true
                    break
                  case 21505:
                    this.btnPromise.showRandom = true
                    break
                  case 21506:
                    this.btnPromise.addRandom = true
                    break
                  case 21507:
                    this.btnPromise.addBatch = true
                    break
                  case 21508:
                    this.btnPromise.editorBatch = true
                    break
                  case 21509:
                    this.btnPromise.delBatch = true
                    break
                  case 21510:
                    this.btnPromise.examineBatch = true
                    break
                  case 21511:
                    this.btnPromise.knot = true
                    break
                  case 21512:
                    this.btnPromise.pass = true
                    break
                  case 21513:
                    this.btnPromise.knotReport = true
                    break
                  case 21514:
                    this.btnPromise.delCheck = true
                    break
                  case 21515:
                    this.btnPromise.delRandom = true
                    break
                }
              })
              break
            case 22000:
              item.child.forEach(c=>{
                switch (c.pkId) {
                  case 22001:
                    this.btnPromise.search = true
                    break
                  case 22002:
                    this.btnPromise.detail = true
                    break
                }
              })
              break
            case 22500:
              item.child.forEach(c=>{
                switch (c.pkId) {
                  case 22501:
                    this.btnPromise.search = true
                    break
                }
              })
              break
            case 30500:
              item.child.forEach(c=>{
                switch (c.pkId) {
                  case 30501:
                    this.btnPromise.search = true
                    break
                }
              })
              break
            case 31000:
              item.child.forEach(c=>{
                switch (c.pkId) {
                  case 31001:
                    this.btnPromise.search = true
                    break
                }
              })
              break
          }
        }
        if(this.navActive===11510 || this.navActive===11520 || this.navActive===11530 || this.navActive===11540) {
          item.child.forEach(a=>{
            switch (a.pkId) {
              case 11510:
                a.child.forEach(d=>{
                  switch (d.pkId) {
                    case 11511:
                      this.btnPromise.search = true
                      break
                    case 11512:
                      this.btnPromise.add = true
                      break
                    case 11513:
                      this.btnPromise.editor = true
                      break
                    case 11514:
                      this.btnPromise.del = true
                      break
                  }
                })
                break
              case 11520:
                a.child.forEach(d=>{
                  switch (d.pkId) {
                    case 11521:
                      this.btnPromise.search = true
                      break
                    case 11522:
                      this.btnPromise.add = true
                      break
                    case 11523:
                      this.btnPromise.editor = true
                      break
                    case 11524:
                      this.btnPromise.del = true
                      break
                    case 11525:
                      this.btnPromise.detail = true
                      break
                  }
                })
                break
              case 11530:
                a.child.forEach(d=>{
                  switch (d.pkId) {
                    case 11531:
                      this.btnPromise.search = true
                      break
                    case 11532:
                      this.btnPromise.add = true
                      break
                    case 11533:
                      this.btnPromise.editor = true
                      break
                    case 11534:
                      this.btnPromise.del = true
                      break
                  }
                })
                break
              case 11540:
                a.child.forEach(d=>{
                  switch (d.pkId) {
                    case 11541:
                      this.btnPromise.search = true
                      break
                    case 11542:
                      this.btnPromise.add = true
                      break
                    case 11543:
                      this.btnPromise.editor = true
                      break
                    case 11544:
                      this.btnPromise.del = true
                      break
                    case 11545:
                      this.btnPromise.detail = true
                      break
                  }
                })
                break
            }
          })
        }
        if(this.navActive===1 || this.navActive===2) {
          item.child.forEach(a => {
            a.child.forEach(d => {
              switch (d.pkId) {
                case 10501:
                  this.btnPromise.search = true
                  break
                case 10502:
                  this.btnPromise.detail = true
                  break
                case 10503:
                  this.btnPromise.sync = true
                  break
              }
            })
          })
        }
        if(this.navActive===3 || this.navActive===4) {
          item.child.forEach(a=>{
            a.child.forEach(d=>{
              switch (d.pkId) {
                case 11001:
                  this.btnPromise.search = true
                  break
                case 11002:
                  this.btnPromise.detail = true
                  break
                case 11003:
                  this.btnPromise.sync = true
                  break
                case 11004:
                  this.btnPromise.del = true
                  break
                case 11005:
                  this.btnPromise.set = true
                  break
              }
            })
          })
        }
      })
      if(this.navActive === 14000) {
        if(this.btnPromise.detail) {
          this.getData()
        }
      } else if(this.navActive!==22000 && this.navActive!==22500){
        if(this.btnPromise.search) {
          this.getData()
        }
      }
    },
    openPop (i) {
      this.data.dataList.forEach((item, index) => {
        if (index === i) {
          item.btnPopShow = !item.btnPopShow
        } else {
          item.btnPopShow = false
        }
      })
    },
    handleSizeChange (data) {
      this.params.reqParam.pageSize = data
      this.params.reqParam.page = 1
      this.getData()
    },
    handleCurrentChange (data) {
      this.params.reqParam.page = data
      this.getData()
    },
    search() {
      this.params.reqParam.page = 1
      this.getData()
    }
  }
}
