import * as React from 'react'
import PropTypes from 'prop-types'
import debounce from 'utilities/debounce'

export enum Breakpoint {
  Mobile = 320,
  Desktop = 960
}

export interface Context {
  currentBreakpoint: Breakpoint
}

class BreakpointProvider extends React.PureComponent<{}, { currentBreakpoint: Breakpoint }> {
  public static childContextTypes = {
    currentBreakpoint: PropTypes.number
  }

  public state = {
    currentBreakpoint: Breakpoint.Mobile
  }

  private debouncedHandleResize = debounce(this.handleResize, 250)

  constructor(props) {
    super(props)
    this.handleResize = this.handleResize.bind(this)
  }

  public handleResize() {
    const currentWidth = window.innerWidth >= 960 ? Breakpoint.Desktop : Breakpoint.Mobile

    this.setState({ currentBreakpoint: currentWidth })
  }

  public componentDidMount() {
    window.addEventListener('resize', this.debouncedHandleResize)
    this.debouncedHandleResize()
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedHandleResize)
  }

  public getChildContext() {
    return { currentBreakpoint: this.state.currentBreakpoint }
  }

  public render() {
    return React.Children.only(this.props.children)
  }
}

export default BreakpointProvider
