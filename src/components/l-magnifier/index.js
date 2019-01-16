import Vue from 'vue'
import Component from './l-magnifier'
const LMagnifierConstructor = Vue.extend(Component)

const lManifier = function (options) {
  const {...rest} = options
  if (Vue.prototype.$isServer) return
  const instance = new LMagnifierConstructor({
    propsData: {
      ...rest
    }
  })

  instance.vm = instance.$mount()
  document.documentElement.appendChild(instance.vm.$el)
  return instance.vm
}

export default (Vue) => {
  Vue.component(Component.name, Component)
  Vue.prototype.$lManifier = lManifier
  Vue.lManifier = lManifier
}
