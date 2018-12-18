export const pageCallback = {
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
  methods: {
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
    }
  }
}
