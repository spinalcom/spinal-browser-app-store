// <app-content/>
import { tag } from './_props'

export const props = {
  tag
}

export default {
  functional: true,
  props,
  render (h, /* { props, children } */c) {
    const { props = {}, children = {} } = c || {} // issue of unit test
    return h(
      props.tag,
      {
        class: {
          'app-content': true
        }
      },
      children
    )
  }
}
