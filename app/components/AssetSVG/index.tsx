import * as React from 'react'
import * as classNames from 'classnames'
import * as styles from './AssetSVG.scss'

type AssetRatio = 'none' | 'xMinYMin' | 'xMidYMid'

export interface Props {
  src: string
  viewBox?: string // would be best if we could grab this automatically from the Symbol
  aspectRatio?: AssetRatio
  title?: string
}

export default function AssetSVG({ src, viewBox, aspectRatio, title, ...otherProps }: Props) {
  const className = classNames(styles.AssetSVG)

  const xlinkHref = `#${src}`

  return (
    <svg
      className={className}
      viewBox={viewBox || '0 0 20 20'}
      preserveAspectRatio={aspectRatio || 'xMidYMid'}
      focusable="false"
      aria-hidden={title ? null : true}
      {...otherProps}
    >
      {title && <title>{title}</title>}
      <use xlinkHref={xlinkHref} />
    </svg>
  )
}
