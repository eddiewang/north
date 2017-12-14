import React from 'react'
import { withRouter, InjectedRouter } from 'react-router'
import * as classNames from 'classnames'
import { variationName } from 'utilities/styles'

import withBreakpoint from '../../components/WithBreakpoint'
import { Context as BreakpointContext, Breakpoint } from '../../components/BreakpointProvider'
// import GlobalSearch from '../../components/GlobalSearch';
import Icon from '../../components/Icon'

import Activator from './Activator'
import Item from './Item'

import * as styles from './PageNav.scss'

interface NavItem {
  name: string
  path: string
}

export interface Props {
  items: NavItem[]
  location: any
  activePath: string
  basePath: string
  data?: any // this needs to be typed!
}

interface State {
  opened: boolean
  sticky: boolean
  showSearch: boolean
}

class PageNav extends React.Component<Props & BreakpointContext, State> {
  public state: State = {
    opened: false,
    sticky: false,
    showSearch: false
  }

  private previousLocation: Location = this.props.location

  public componentDidUpdate(oldProps: BreakpointContext) {
    const { opened } = this.state

    const { currentBreakpoint, location } = this.props
    const { currentBreakpoint: oldBreakpoint } = oldProps

    const movingToDesktop =
      currentBreakpoint >= Breakpoint.Desktop && oldBreakpoint === Breakpoint.Mobile

    const justNavigated = location !== this.previousLocation

    if (opened && (movingToDesktop || justNavigated)) {
      this.setState({ opened: false })
    }

    this.previousLocation = location
  }

  public showSearch = () => {
    this.setState({ showSearch: true })
  }

  public onSearchClose = () => {
    this.setState({ showSearch: false })
  }

  public close = () => {
    this.setState({ opened: false })
  }

  public render() {
    const { activePath, basePath, currentBreakpoint, items } = this.props
    const { opened } = this.state

    const classNameInterior = classNames(
      styles.Interior,
      opened && styles[variationName('is', opened && 'opened')]
    )

    const menuAriaHidden = !(opened || currentBreakpoint === Breakpoint.Desktop)

    const pageNavListItems = items.map(({ path, name }: NavItem, index: number) => {
      const fullPath = `${basePath}/${path}`
      const isActiveRoute = activePath.indexOf(fullPath.replace(/([^/])\/.+$/, '$1')) === 0

      return <Item key={index} href={fullPath} title={name} current={isActiveRoute} />
    })

    return (
      <div id="navigation" className={styles.PageNav}>
        <nav id="PageNavInterior" className={classNameInterior} aria-hidden={menuAriaHidden}>
          <ul className={styles.List}>{pageNavListItems}</ul>
        </nav>

        {/* <GlobalSearch showMobile={this.state.showSearch} onClose={this.onSearchClose} /> */}

        <Activator toggled={opened} onClick={this.toggleOpenedState} />
        <button
          className={styles.SearchActivator}
          onClick={this.showSearch}
          aria-label="Show search"
        >
          <Icon src="IconSearch" size="20" aria-hidden="true" />
        </button>
      </div>
    )
  }

  private toggleOpenedState = () => {
    this.setState(state => {
      return { opened: !state.opened }
    })
  }
}

export default withRouter<Props>(withBreakpoint(PageNav))
