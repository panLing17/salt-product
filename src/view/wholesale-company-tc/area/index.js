import Vue from 'vue'
import Component from './area'
const AreaConstructor = Vue.extend(Component)

const area = function (options) {
  const {...rest} = options
  if (Vue.prototype.$isServer) return
  const instance = new AreaConstructor({
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
  Vue.prototype.$area = area
  Vue.area = area
}
