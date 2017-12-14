import * as React from 'react'
import hoistStatics from 'hoist-non-react-statics'
import { getDisplayName } from 'utilities/components'
import BreakpointProvider, { Context } from '../../components/BreakpointProvider'

function withBreakpoint<OwnProps>(
  WrappedComponent: React.ComponentClass<OwnProps & Context>
): React.ComponentClass<OwnProps> {
  class WithBreakpoint extends React.Component<OwnProps, {}> {
    public static displayName = `withBreakpoint(${getDisplayName(WrappedComponent)})`
    public static WrappedComponent = WrappedComponent
    public static contextTypes = BreakpointProvider.childContextTypes

    public context: Context

    public render() {
      const { currentBreakpoint } = this.context
      // TODO: should remove the cast once https://github.com/Microsoft/TypeScript/issues/10727 is resolved
      const props = { ...(this.props as any), currentBreakpoint }
      return <WrappedComponent {...props} />
    }
  }

  const FinalComponent = hoistStatics(WithBreakpoint, WrappedComponent as React.ComponentClass<any>)
  return FinalComponent as React.ComponentClass<any>
}

export default withBreakpoint
