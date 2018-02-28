import * as React from 'react'
import { mount } from 'enzyme'

import renderPropsComponent from '.'

export interface Props {
  enabled?: boolean
}

export interface State {
  count: number
}

export type Action = 'increment' | 'decrement'

export type Data = {
  countText: string
}

const ExampleCounter = renderPropsComponent<Props, State, Action, Data>({
  initialState: {
    count: 0,
  },
  createAction: ({ props, state }) => action => {
    const currentCount = state.count || 0

    switch (action) {
      case 'increment':
        return { count: currentCount + 1 }
      case 'decrement':
        return { count: currentCount - 1 }
      default:
        return {}
    }
  },
  getData: ({ props, state }) => ({ countText: `Count: ${state.count}` }),
})

describe('Example', () => {
  it('example mounts', () => {
    mount(
      <ExampleCounter>
        {({ countText, action }) => (
          <div>
            {countText}
            <button onClick={() => action('increment')}>+</button>
            <button onClick={() => action('decrement')}>-</button>
          </div>
        )}
      </ExampleCounter>,
    )
  })
})
