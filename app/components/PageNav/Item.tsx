import * as React from 'react'
import { Link } from 'react-router-dom'
import * as classNames from 'classnames'

import * as styles from './PageNav.scss'

export interface Props {
  href: string
  title: string
  current?: boolean
}

export default function Item({ href, title, current }: Props) {
  const className = classNames(styles.Item, current && styles.isCurrent)

  return (
    <li className={className}>
      <Link to={href} className={styles.Link} aria-current={current ? 'page' : null}>
        {title}
      </Link>
    </li>
  )
}
