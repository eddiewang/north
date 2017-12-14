import * as React from 'react'
import * as classNames from 'classnames'
import { variationName } from 'utilities/styles'
import * as styles from './LayoutContainer.scss'

type ContainerType = 'main' | 'header' | 'footer'

export interface Props {
  type?: ContainerType
  children?: React.ReactNode
}

export default function LayoutContainer({ type, children }: Props) {
  const className = classNames(styles.LayoutContainer, type && styles[variationName('type', type)])

  return <div className={className}>{children}</div>
}
