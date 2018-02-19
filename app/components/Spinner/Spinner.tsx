import * as React from 'react'

import classNames from 'classnames'
import * as styles from './Spinner.scss'

export default class Spinner extends React.Component<{}, {}> {
  public render() {
    const SpinnerClass = classNames(styles.spinner)
    return (
      <div className={SpinnerClass}>
        <div className={styles.bounce1} />
        <div className={styles.bounce2} />
        <div className={styles.bounce1} />
      </div>
    )
  }
}
