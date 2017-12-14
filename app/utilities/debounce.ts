////
/// Debounce
////

function debounce(callback: any, wait: number) {
  let timeout: any = null
  let callbackArgs: any = null

  /* tslint:disable:no-invalid-this */
  const later = () => callback.apply(this, callbackArgs)
  /* tslint:enable:no-invalid-this */

  return () => {
    callbackArgs = arguments
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export default debounce
