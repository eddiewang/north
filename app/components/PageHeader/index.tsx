import * as React from 'react'
import * as classNames from 'classnames'

import LayoutContainer from '../LayoutContainer'
import Icon from 'components/Icon'

import * as styles from './PageHeader.scss'

import LogoSVG from 'svg/logo.svg'

export interface Props {
  children?: React.ReactNode
}

export default function PageHeader({ children }: Props) {
  const className = classNames(styles.PageHeader)
  return (
    <header id="PageHeader" className={className}>
      <LayoutContainer type="header">
        <Icon
          src={LogoSVG.id}
          viewBox={LogoSVG.viewBox}
          aspectRatio="xMinYMin"
          href="/"
          accessibleLabel="Shopify, Back to Home"
          classes={styles.LogoFull}
          aria-hidden="true"
          id="qa-back-to-home"
        />
        {children}
      </LayoutContainer>
    </header>
  )
}
