import * as React from 'react'
import * as classNames from 'classnames'
import * as styles from './Circle.scss'
import { variationName } from 'utilities//styles'

type CircleType = 'solid' | 'border'

export interface Props {
  type?: CircleType
  classes?: string
  children?: React.ReactNode
}

export default function Circle({ type, classes, children }: Props) {
  const className = classNames(styles.Circle, classes, type && styles[variationName('type', type)])

  return <div className={className}>{children}</div>
}
