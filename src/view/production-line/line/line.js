import Vue from 'vue'
import Component from './line.vue'
const LineConstructor = Vue.extend(Component)

const line = function (options) {
  const {...rest} = options
  if (Vue.prototype.$isServer) return
  const instance = new LineConstructor({
    propsData: {
      ...rest
    }
  })

  instance.vm = instance.$mount()
  document.getElementById(options.fatherId).appendChild(instance.vm.$el)
  instance.vm.lineShow = true
  return instance.vm
}

export default (Vue) => {
  Vue.component(Component.name, Component)
  Vue.prototype.$line = line
  Vue.line = line
}
