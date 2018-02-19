import * as React from 'react'
import classNames from 'classnames'
import { variationName } from 'utilities/styles'
import * as styles from './LayoutContainer.scss'

type ContainerType = 'main' | 'header' | 'footer'

export interface Props {
  type?: ContainerType
  children?: React.ReactNode
  classes?: string
}

export default function LayoutContainer({ type, children, classes }: Props) {
  const className = classNames(
    styles.LayoutContainer,
    type && styles[variationName('type', type)],
    classes && classes
  )

  return <div className={className}>{children}</div>
}
