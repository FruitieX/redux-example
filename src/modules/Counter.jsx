import React from 'react';

export class Counter extends React.Component {
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
}

export default Counter;
