import * as React from 'react'
import { inject, observer } from 'mobx-react'

import LayoutContainer from 'components/LayoutContainer'
import TypeHeading from 'components/TypeHeading'

@inject('main')
@observer
class Home extends React.Component {
  public render() {
    return (
      <LayoutContainer>
        <div>
          <TypeHeading level={3}>Hello - let's start coding.</TypeHeading>
        </div>
      </LayoutContainer>
    )
  }
}

export default Home
