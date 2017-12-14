const noop = () => {
  return undefined
}
type TSupports = boolean | null

let supportsPassive: TSupports = null

let supportsOnce: TSupports = null

export function supportsEventListenerOnceOption() {
  if (supportsOnce !== null) {
    return supportsOnce
  }
  try {
    const opts = Object.defineProperty({}, 'once', {
      get() {
        supportsOnce = true
      }
    })
    document.addEventListener('test', noop, opts)
  } catch (error) {
    supportsOnce = false
  }
  document.removeEventListener('test', noop)
  return supportsOnce
}

export function supportsEventListenerPassiveOption() {
  if (supportsPassive !== null) {
    return supportsPassive
  }
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        supportsPassive = true
      }
    })
    document.addEventListener('test', noop, opts)
  } catch (error) {
    supportsPassive = false
  }
  document.removeEventListener('test', noop)
  return supportsPassive
}
