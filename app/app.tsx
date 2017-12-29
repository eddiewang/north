///<reference types="webpack-env" />
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import smoothscroll from 'smoothscroll-polyfill'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import mainStore from 'stores/MainStore'

import { Provider } from 'mobx-react'
import { IntlProvider } from 'react-intl'
import { AppContainer } from 'react-hot-loader'

import Routes from './routes'

smoothscroll.polyfill()

const stores = {
  main: mainStore
}

function hashLinkScroll() {
  const { hash } = window.location
  if (hash !== '') {
    // Push onto callback queue so it runs after the DOM is updated,
    // this is required when navigating from a different page so that
    // the element is rendered on the page before trying to getElementById.
    setTimeout(() => {
      const element = hash.startsWith('#section')
        ? document.querySelector(`${hash} h2`)
        : document.querySelector(hash)

      if (!element) {
        return
      }

      element.scrollIntoView({ behavior: 'smooth' })
    }, 0)
  }
}

function renderApp(CurrRoutes: React.ComponentClass<any>) {
  const main: HTMLElement = document.getElementById('root') as HTMLElement
  const renderOrHydrate = main.innerHTML.trim().length ? 'hydrate' : 'render'
  ReactDOM[renderOrHydrate](
    <AppContainer>
      <Provider {...stores}>
        <IntlProvider>
          <Router onUpdate={hashLinkScroll} children={<CurrRoutes />} />
        </IntlProvider>
      </Provider>
    </AppContainer>,
    main
  )
}

renderApp(Routes)

if (module.hot) {
  const renderNewApp = () => {
    const newRoutes = require('./routes.tsx').default
    renderApp(newRoutes)
  }
  module.hot.accept('./routes.tsx', renderNewApp)
}
