import * as React from 'react'
import { Route, RouterState } from 'react-router-dom'
import Loadable from 'react-loadable'
import Spinner from 'components/Spinner'

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
  return Loadable({
    loader: () => System.import(`pages/${page}`),
    loading() {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100%'
          }}
        >
          <Spinner green />
        </div>
      )
    }
  })
}
