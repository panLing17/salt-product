import Vue from 'vue'
import { Message } from 'element-ui'
let vm = new Vue()
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

function check (data, labelList, lenList, typeList) {
  let count = 0
  for(let i in data) {
    if(data[i].toString().trim().length===0) {
      count++
      for(let j in labelList) {
        if(j === i) {
          Message.warning(labelList[j] + '不能为空！')
          return
        }
      }
    } else {
      for(let z in lenList) {
        if(z === i) {
          if(data[i].toString().trim().length > lenList[z]) {
            count++
            for(let j in labelList) {
              if(j === i) {
                Message.warning(labelList[j] + '的长度不能大于' + lenList[z] + '!')
                return
              }
            }
          }
        }
      }
      for(let a in typeList) {
        if(a === i) {
          if(typeList[a] === 'int'){
            if(!/^[1-9][0-9]*$/.test(data[i])) {
              count++
              for(let j in labelList) {
                if(j === i) {
                  Message.warning(labelList[j] + '的类型只能是数字且不能以0开头！')
                  return
                }
              }
            }
          } else if(typeList[a] === 'float') {
            if(!/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/.test(data[i])) {
              count++
              for(let j in labelList) {
                if(j === i) {
                  Message.warning(labelList[j] + '的类型只能是浮点型！')
                  return
                }
              }
            }
          }
        }
      }
    }
  }
  return count===0?true:false
}

/*
        三个参数
        file：一个是文件(类型是图片格式)，
        w：一个是文件压缩的后宽度，宽度越小，字节越小
        objDiv：一个是容器或者回调函数
        photoCompress()
         */
function photoCompress(file,w,objDiv){
  let ready=new FileReader();
  /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
  ready.readAsDataURL(file);
  ready.onload=function(){
    let re=this.result;
    canvasDataURL(re,w,objDiv)
  }
}

function canvasDataURL(path, obj, callback){
  let img = new Image();
  img.src = path;
  img.onload = function(){
    let that = this;
    // 默认按比例压缩
    let w = that.width,
      h = that.height,
      scale = w / h;
    w = obj.width || w;
    h = obj.height || (w / scale);
    let quality = 0.7;  // 默认图片质量为0.7
    //生成canvas
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    // 创建属性节点
    let anw = document.createAttribute("width");
    anw.nodeValue = w;
    let anh = document.createAttribute("height");
    anh.nodeValue = h;
    canvas.setAttributeNode(anw);
    canvas.setAttributeNode(anh);
    ctx.drawImage(that, 0, 0, w, h);
    // 图像质量
    if(obj.quality && obj.quality <= 1 && obj.quality > 0){
      quality = obj.quality;
    }
    // quality值越小，所绘制出的图像越模糊
    let base64 = canvas.toDataURL('image/jpeg', quality);
    // 回调函数返回base64的值
    callback(base64);
  }
}

/**
 * 放大图片
 * @param img 图片源
 */
function magnifier(img) {
  if(typeof img === 'undefined'|| img.length ===0){
    return
  }
  vm.$lManifier({src: img})
}
export default {
  queryDictionary,
  queryDictionaryForName,
  isNullFn,
  imgError,
  check,
  photoCompress,
  magnifier
}
