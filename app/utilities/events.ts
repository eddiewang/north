import {
  supportsEventListenerOnceOption,
  supportsEventListenerPassiveOption
} from 'utilities//feature-detect'

export function addEventListener(target, eventName, handler, options) {
  if (options === void 0) {
    options = {}
  }
  const wrappedHandler =
    !supportsEventListenerOnceOption() && options.once ? once(target, eventName, handler) : handler
  if (supportsEventListenerPassiveOption() || supportsEventListenerOnceOption()) {
    const addListener = target.addEventListener
    return addListener.call(target, eventName, handler, options)
  }
  return target.addEventListener(eventName, wrappedHandler, options.capture)
}

export function removeEventListener(target, eventName, handler, capture) {
  return target.removeEventListener(eventName, handler, capture)
}

function once(target, eventName, handler) {
  return function selfRemovingHandler(event) {
    handler.call(event.currentTarget, event)
    target.removeEventListener(eventName, handler)
  }
}
