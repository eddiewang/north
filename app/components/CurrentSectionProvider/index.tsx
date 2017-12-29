import * as React from 'react'
import PropTypes from 'prop-types'
import debounce from 'utilities/debounce'
import EventListener from '../EventListener'
export interface Props {
  children?: React.ReactNode
}

export interface Context {
  currentSection: string
}

function getScrollDimension() {
  const { scrollTop, scrollHeight } =
    document.documentElement || document.body.parentNode || document.body

  return {
    scrollTop,
    scrollHeight
  }
}

function isInView(el: HTMLElement): boolean {
  if (!el) {
    return false
  }

  const rect = el.getBoundingClientRect()
  const winH = window.innerHeight
  const { scrollTop } = getScrollDimension()
  const scrollBottom = scrollTop + winH
  const elTop = rect.top + scrollTop
  const elBottom = elTop + el.offsetHeight

  return elTop < scrollBottom && elBottom > scrollTop
}

function isAtBottom(): boolean {
  const { scrollTop, scrollHeight } = getScrollDimension()
  const winH = window.innerHeight
  const scrolledToBottom = scrollTop + winH >= scrollHeight

  return scrolledToBottom
}

export default class CurrentSectionProvider extends React.PureComponent<Props, {}> {
  public static childContextTypes = {
    currentSection: PropTypes.string
  }

  public state = {
    currentSection: 'navigation'
  }

  private debouncedMeasure

  public constructor(props) {
    super(props)
  }

  public componentDidMount() {
    this.measure = this.measure.bind(this)
    this.debouncedMeasure = debounce(this.measure, 250)
  }

  public getChildContext() {
    return { currentSection: this.state.currentSection }
  }

  public render() {
    const { children } = this.props
    return (
      <div>
        <EventListener event="resize" handler={this.debouncedMeasure} />
        <EventListener event="scroll" handler={this.debouncedMeasure} />
        {children}
      </div>
    )
  }

  private measure() {
    this.setState({
      currentSection: 'navigation'
    })

    const contentSections: any = document.querySelectorAll('[data-content-section]')

    if (contentSections.length > 1) {
      ;[...contentSections].forEach((section: HTMLElement) => {
        if (isInView(section)) {
          this.setState({
            currentSection: section.id
          })
        }
      })

      if (isAtBottom()) {
        this.setState({
          currentSection: contentSections[length].id
        })
      }
    }
  }
}
