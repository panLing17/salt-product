import Vue from 'vue'
import Component from './unit.vue'
const UnitConstructor = Vue.extend(Component)

const unit = function (options) {
  if (Vue.prototype.$isServer) return
  const {...rest} = options
  const instance = new UnitConstructor({
    propsData: {
      ...rest
    }
  })

  instance.vm = instance.$mount()
  document.getElementsByClassName(options.className)[0].appendChild(instance.vm.$el)
  instance.vm.unitShow = true
  return instance.vm
}

export default (Vue) => {
  Vue.component(Component.name, Component)
  Vue.prototype.$unit = unit
  Vue.unit = unit
}
