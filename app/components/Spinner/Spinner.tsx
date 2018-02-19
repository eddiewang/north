import * as React from 'react'

import classNames from 'classnames'
import * as styles from './Spinner.scss'

interface Props {
  green?: boolean
}

export default class Spinner extends React.Component<Props, {}> {
  public render() {
    const { green } = this.props
    const SpinnerClass = classNames(styles.spinner, green && styles.isGreen)
    return (
      <div className={SpinnerClass}>
        <div className={styles.bounce1} />
        <div className={styles.bounce2} />
        <div className={styles.bounce3} />
      </div>
    )
  }
}
