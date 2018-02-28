import * as React from 'react'

/*
didMount({ state, setState, props, forceUpdate })
shouldUpdate({ state, props, nextProps, nextState })
didUpdate({ state, setState, props, forceUpdate, prevProps, prevState })
willUnmount({ state, props })
children({ state, setState, props, forceUpdate })
render({ state, setState, props, forceUpdate })
*/

export interface LifecycleProps<Props, State> {
  state: State
  props: Readonly<Props>
  setState: (state: State) => void
  forceUpdate: () => void
}

export type ArtistOptions<
  // tslint:disable-next-line no-any
  ComponentProps,
  State,
  Action,
  RenderData
> = {
  initialState?: State

  didMount?: (
    props: {
      state: State
      props: Readonly<ComponentProps>
      setState: (state: State) => void
      forceUpdate: () => void
    },
  ) => void
  shouldUpdate?: (
    props: {
      state: State
      props: Readonly<ComponentProps>
      nextState: State
      nextProps: Readonly<ComponentProps>
    },
  ) => boolean
  willUnmount?: (
    props: { state: State; props: Readonly<ComponentProps> },
  ) => void

  createAction: (
    param: {
      // tslint:disable-next-line no-any
      props: Readonly<ComponentProps>
      state: State
    },
  ) => (action: Action) => Partial<State>

  getData: (
    param: {
      // tslint:disable-next-line no-any
      props: Readonly<ComponentProps>
      state: State
    },
  ) => RenderData
}

export const artist = function<ComponentProps, State, Action, RenderData>(
  options: ArtistOptions<ComponentProps, Partial<State>, Action, RenderData>,
) {
  type Props = ComponentProps & {
    children: (
      options: { action: (action: Action) => void } & RenderData,
    ) => React.ReactNode
  }

  return class Painting extends React.Component<Props, Partial<State>> {
    constructor(props: Props) {
      super(props)

      this.performAction = this.performAction.bind(this)

      if (options.initialState !== undefined) {
        this.state = options.initialState
      }
    }

    componentDidMount() {
      if (options.didMount === undefined) {
        return
      }

      options.didMount({
        props: this.props,
        state: this.state,
        setState: this.setState,
        forceUpdate: this.forceUpdate,
      })
    }

    componentWillUnmount() {
      if (options.willUnmount === undefined) {
        return
      }

      options.willUnmount({
        props: this.props,
        state: this.state,
      })
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
      if (options.shouldUpdate === undefined) {
        return true
      }

      return options.shouldUpdate({
        props: this.props,
        state: this.state,
        nextProps: nextProps,
        nextState: nextState,
      })
    }

    performAction(action: Action): void {
      const outcome = options.createAction({
        props: this.props,
        state: this.state,
      })(action)

      this.setState(outcome)
    }

    render() {
      const action = this.performAction

      const dataProps = options.getData({
        props: this.props,
        state: this.state,
      })

      const renderProps = Object.assign({}, { action }, dataProps)

      return this.props.children(renderProps)
    }
  }
}
