import * as React from 'react'
import { addEventListener, removeEventListener } from 'utilities//events'

export interface Props {
  event: string
  capture?: boolean
  passive?: boolean
  handler(evt: Event): void
}

// see https://github.com/oliviertassinari/react-event-listener/
export default class EventListener extends React.PureComponent<Props, never> {
  public componentDidMount() {
    this.attachListener()
  }

  public componentWillUpdate() {
    this.detachListener()
  }

  public componentDidUpdate() {
    this.attachListener()
  }

  public componentWillUnmount() {
    this.detachListener()
  }

  // tslint:disable-next-line prefer-function-over-method
  public render() {
    return null
  }

  private attachListener() {
    const { event, handler, capture, passive } = this.props
    addEventListener(window, event, handler, { capture, passive })
  }

  private detachListener() {
    const { event, handler, capture } = this.props
    removeEventListener(window, event, handler, capture)
  }
}
