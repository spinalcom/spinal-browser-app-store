/*!
 * app-vue +v
 */
import components from './components'

export default {
  install (Vue) {
    Object.keys(components).forEach(c => {
      Vue.component(`app-${c}`, components[c])
    })
  }
}
