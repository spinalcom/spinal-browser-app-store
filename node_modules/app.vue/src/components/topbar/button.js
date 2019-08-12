// <app-button/>
import { staticProp, tag } from '../_props'
import on from '../_on'

export const props = {
  tag,
  right: staticProp,
  left: staticProp,
  historyBack: staticProp,
  disabled: staticProp
}

export default {
  functional: true,
  props,
  render (h, /* { props, children } */c) {
    const { props = {}, children = {} } = c || {} // issue of unit test
    if (!props.disabled) {
      if (props.historyBack) on['click'] = () => { window.history.back() }
    }
    return h(
      props.tag,
      {
        class: {
          'app-button': true,
          'left': !!props.left,
          'right': !!props.right,
          'disabled': !!props.disabled
        },
        on
      },
      children
    )
  }
}
