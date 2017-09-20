import React from 'react';
import { connect } from 'react-redux';

export const INCREMENT = 'INCREMENT'; // Action type! (SCREAMING_CASE)
export const DECREMENT = 'DECREMENT'; // Action type! (SCREAMING_CASE)
export const SET_VALUE = 'SET_VALUE'; // Action type! (SCREAMING_CASE)

// Action creator! (camelCase)
export const increment = () => {
  return { type: INCREMENT };
};
export const decrement = () => {
  return { type: DECREMENT };
};
export const setValue = value => {
  return {
    type: SET_VALUE,
    payload: value,
  };
};

export const reducer = (currentState, action) => {
  if (!currentState) {
    return {
      value: 0,
    };
  }

  if (action.type === INCREMENT) {
    return {
      value: currentState.value + 1,
    };
  } else if (action.type === DECREMENT) {
    return {
      value: currentState.value - 1,
    };
  } else if (action.type === SET_VALUE) {
    return {
      value: action.payload,
    };
  } else {
    return currentState;
  }
};

const mapStateToProps = currentState => {
  return {
    counterValue: currentState.counter.value,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    incrementCounter: () => dispatch(increment()),
    decrementCounter: () => dispatch(decrement()),
    setCurrentValue: value => dispatch(setValue(value)),
  };
};

export class Counter extends React.Component {
  /*
  state = { value: 0 };

  render = () => (
    <div>
      <button onClick={() => this.setState({ value: this.state.value + 1 })}>
        +1
      </button>
      <button onClick={() => this.setState({ value: this.state.value - 1 })}>
        -1
      </button>

      <div>Current state of the counter: {this.state.value}</div>
    </div>
  );
  */
  render = () => (
    <div>
      <button onClick={this.props.incrementCounter}>+1</button>
      <button onClick={this.props.decrementCounter}>-1</button>

      <button onClick={() => this.props.setCurrentValue(10)}>
        Set counter value to 10
      </button>

      <div>Current state of the Redux counter: {this.props.counterValue}</div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
