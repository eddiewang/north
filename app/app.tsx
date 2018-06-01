///<reference types="webpack-env" />
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import smoothscroll from 'smoothscroll-polyfill'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { IntlProvider, addLocaleData } from 'react-intl'
import { AppContainer } from 'react-hot-loader'
import Routes from './routes'
import en from 'react-intl/locale-data/en'
import mainStore from 'stores/MainStore'

addLocaleData([...en])

smoothscroll.polyfill()

const stores = {
  main: mainStore
}

function renderApp(CurrRoutes: React.ComponentClass<any>) {
  const main: HTMLElement = document.getElementById('root') as HTMLElement
  const renderOrHydrate = main.innerHTML.trim().length ? 'hydrate' : 'render'
  ReactDOM[renderOrHydrate](
    <AppContainer>
      <Provider {...stores}>
        <IntlProvider locale="en">
          <Router children={<CurrRoutes />} />
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
