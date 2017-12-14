import * as React from 'react'
import * as classNames from 'classnames'
import { variationName } from 'utilities//styles'

import * as styles from './Activator.scss'

export interface Props {
  toggled?: boolean
  onClick?: (() => any)
}

export default class Activator extends React.Component<Props, {}> {
  public render() {
    const { toggled } = this.props
    const label = toggled ? 'Hide navigation' : 'Show navigation'

    const className = classNames(
      styles.Activator,
      toggled && styles[variationName('is', toggled && 'expanded')]
    )

    return (
      <button
        type="button"
        onClick={this.onActivatorClick}
        className={className}
        aria-controls="PageNavInterior"
        aria-expanded={toggled}
        aria-label={label}
      >
        <div className={styles.Hamburger}>
          <div className={styles.MiddleLine} />
        </div>
      </button>
    )
  }

  private onActivatorClick = () => {
    const onClick = this.props.onClick

    if (typeof onClick !== 'function') {
      return
    }

    onClick()
  }
}
