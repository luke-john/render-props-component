import * as React from 'react'
import { mount } from 'enzyme'

import { artist } from '.'

export interface Props {
  enabled?: boolean
}

export interface State {
  count: number
}

export type Action = {
  type: 'increment'
}

export type Data = {
  countText: string
}

const ExampleCounter = artist<Props, State, Action, Data>({
  initialState: {
    count: 0,
  },
  createAction: ({ props, state }) => action => {
    if (action.type === 'increment') {
      return { count: state.count ? state.count + 1 : 1 }
    }

    return {}
  },
  getData: ({ props, state }) => ({ countText: `Count: ${state.count}` }),
})

describe('Example', () => {
  it('example mounts', () => {
    mount(
      <ExampleCounter>
        {renderProps => {
          return (
            <div onClick={() => renderProps.action({ type: 'increment' })}>
              {renderProps.countText}
            </div>
          )
        }}
      </ExampleCounter>,
    )
  })
})
