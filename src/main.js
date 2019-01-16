// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import '@/api/axiosConfig.js'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import LButton from '@/components/l-button/l-button.vue'
import TableButton from '@/components/table-button/table-button'
import LPage from '@/components/l-page/l-page'

import './assets/font/iconfont.css'
import './assets/css/global.styl'
import './assets/css/fontSize.styl'

import './api/api.js'
import _global from './api/global'
import Method from './assets/js/method'

import Unit from './view/production-line/unit/unit.js'
import Line from './view/production-line/line/line.js'
import Step2AddTable from './view/batch-production/step2-add-table/index'
import LMagnifier from './components/l-magnifier/index'

Vue.use(ElementUI)
Vue.use(Unit)
Vue.use(Line)
Vue.use(Step2AddTable)
Vue.use(LMagnifier)
Vue.prototype.$http = axios
Vue.prototype.GLOBAL = _global
Vue.prototype.$method = Method

Vue.component('l-button', LButton)
Vue.component('table-button', TableButton)
Vue.component('l-page', LPage)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
