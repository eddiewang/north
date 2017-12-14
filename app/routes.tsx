import * as React from 'react'
import { Route, RouterState } from 'react-router-dom'

import Layout from './Layout'
import Home from 'pages/Home'
type ComponentCallback = (_: RouterState | null, value: any) => any

export default class Routes extends React.Component {
  public render() {
    return (
      <Layout>
        <Route path="/" component={Home} getComponent={getComponent('Home')} />
      </Layout>
    )
  }
}

function getComponent(page) {
  return (_: RouterState, cb: ComponentCallback) => {
    switch (page) {
      case 'Home':
        System.import('pages/Home')
          .then(loadRoute(cb))
          .catch(reloadOnRouteError)
        break
    }
  }
}

function reloadOnRouteError(err: Error) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    if (localStorage.isRetriedImport) {
      return
    }

    localStorage.isRetriedImport = 'true'
    location.reload(true)
  } catch (storageError) {
    // Probably incognito/private mode; no way around that, so just hope the user refreshes :/
  }
}

function loadRoute(cb: ComponentCallback) {
  return (module: any) => {
    if (typeof window !== 'undefined') {
      try {
        delete localStorage.isRetriedImport
      } catch (storageError) {
        // incognito
      }
    }
    cb(null, module.default)
  }
}
