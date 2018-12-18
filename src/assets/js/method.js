// 查字典
function queryDictionary (key, pkId) {
  let d = this.GLOBAL.dictionaryData
  let val
  for (let i in d[key]) {
    if (d[key][i].pkId === pkId) {
      val = d[key][i].dName
    }
  }
  return val
}

function queryDictionaryForName (key, dName) {
  let d = this.GLOBAL.dictionaryData
  let val
  for (let i in d[key]) {
    if (d[key][i].dName === dName) {
      val = d[key][i].pkId
    }
  }
  return val
}

function isNullFn(data) {
  let flag = false
  for(let i in data) {
    if(data[i].length === 0) {
      flag = true
    }
  }
  return flag
}

function imgError(e) {
  e.target.src = require('@/assets/img/no-img.png')
}

export default {
  queryDictionary,
  queryDictionaryForName,
  isNullFn,
  imgError
}
