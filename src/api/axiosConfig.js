import axios from 'axios'
import { Message } from 'element-ui'
import Router from '@/router/index'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers['Content-Type'] = 'multipart/form-data'
  if (config.url !== '/apiproduce/personal/rs/token/create') {
    if (localStorage.getItem('token')) {
      if(config.params) {
        config.params.token = localStorage.getItem('token')
      }
      if(config.data) {
        let formData = new FormData()
        let temp = deepClone(config.data.reqParam)
        let str = JSON.stringify(temp)
        formData.append('reqParam', str)
        formData.append('token', localStorage.getItem('token'))
        config.data = formData
      }
    } else {
      Message('请先登录')
      Router.replace('/login')
    }
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data.retCode !== 1) {
    if (response.data.retCode === 1000) {
      Router.replace('/login')
    } else {
      Message.error(response.data.retMsg)
    }
  }
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 深层拷贝
function deepClone(obj) {
  let type = Object.prototype.toString.call(obj);  //通过原型对象获取对象类型
  let newObj;
  if(type ==='[object Array]'){
    //数组
    newObj =[];
    if(obj.length >0){
      for(let x=0;x<obj.length;x++){
        newObj.push(deepClone(obj[x]));
      }
    }
  }else if(type==='[object Object]'){
    //对象
    newObj = {};
    for(let x in obj) {
      newObj[x] = deepClone(obj[x]);
    }
  }else{
    //基本类型和方法可以直接赋值
    newObj = obj;
  }
  return newObj;
}
