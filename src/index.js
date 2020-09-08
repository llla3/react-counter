import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { createStore } from 'redux'

const reducers = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT': return state + 1;
    case 'DECREMENT': return state - 1;
    default: return state;
  }
};

const store = createStore(reducers)
const rootEl = document.getElementById('root')

class Counter extends Component{
  constructor (props) {
    super(props);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment () {
    const { onIncrement } = this.props
    onIncrement()
  }

  decrement () {
    const { onDecrement } = this.props
    onDecrement()
  }

  render () {
    const { value } = this.props
    return (
      <p>
        Count: {value} <br/>
        {' '}
        <button onClick={this.increment}>
          +
        </button>
        {' '}
        <button onClick={this.decrement}>
          -
        </button>
      </p>
    )
  }
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired
}

const render = () => ReactDOM.render(
  <Counter
    value={store.getState()}
    onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
    onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
  />,
  rootEl
)

render()
store.subscribe(render)
