import Vue from 'vue'
import Component from './step2-add-table'
const Step2AddTableConstructor = Vue.extend(Component)

const step2AddTable = function (options) {
  const {...rest} = options
  if (Vue.prototype.$isServer) return
  const instance = new Step2AddTableConstructor({
    propsData: {
      ...rest
    }
  })

  instance.vm = instance.$mount()
  document.getElementById(options.fatherId).appendChild(instance.vm.$el)
  return instance.vm
}

export default (Vue) => {
  Vue.component(Component.name, Component)
  Vue.prototype.$step2AddTable = step2AddTable
  Vue.step2AddTable = step2AddTable
}
