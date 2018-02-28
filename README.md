# Render Props Component creator

## Why

I've been enjoying using render props lately and wanted to play with the concept.

It should also be fairly easy to add simple to reason about ssr support to the api.

## Example

```js
const ExampleCounter = renderProps({
  initialState: { count: 0 },
  createAction: ({ props, state }) => action => {
    switch(action) {
      case 'increment':
        return { count: state.count + 1 }  
      case 'decrement':
        return { count: state.count - 1 }  
      default:
        return {}
    }
  },
  getData: ({ props, state }) => ({ countText: `Count: ${state.count}` }),
})

export const Test: React.SFC = props => {
  return (
    <ExampleCounter>
      {({countText, action}) => (
        <>
          {countText}
          <button onClick={() => action('increment')}></button>
          <button onClick={() => action('decrement')}></button>
        <>
      )}
    </ExampleCounter>
  )
}
```

## renderProps options

### renderProps

* initialState - initial state for created renderProps Component
* createAction - creates an action which acts on state and props and returns a new state based on executions
* getData - use props and state to create static render props

### React lifecycle

* didMount({ state, setState, props, forceUpdate })
* shouldUpdate({ state, props, nextProps, nextState })
* didUpdate({ state, setState, props, forceUpdate, prevProps, prevState })
* willUnmount({ state, props })

## Possible additional apis

Declarative version.

## Inspiration

Inspired by [React Component ... Component
](https://github.com/ryanflorence/react-component-component) and [glamorous](https://glamorous.rocks/).
