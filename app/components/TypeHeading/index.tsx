import * as React from 'react'
import * as classNames from 'classnames'
import { variationName } from 'utilities//styles'
import * as styles from './TypeHeading.scss'

type HeadingLevel = 1 | 2 | 3 | 4
const HeadingTagName = { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4' }

export interface Props {
  level: HeadingLevel
  style?: HeadingLevel
  inverse?: boolean
  element?: string
  children?: React.ReactNode
}

export default function TypeHeading({
  level,
  style,
  inverse,
  element: Element = HeadingTagName[level],
  children
}: Props) {
  const hasStyle = style !== undefined
  const differentStyle = hasStyle && level !== style

  const className = classNames(
    styles.TypeHeading,
    !differentStyle && styles[variationName('level', level.toString())],
    style && differentStyle && styles[variationName('level', style.toString())],
    inverse && styles[variationName('is', inverse && 'inverse')]
  )

  return <Element className={className}>{children}</Element>
}
