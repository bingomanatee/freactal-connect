import { PureComponent } from 'react';

import injectState from '../injectState';

class SampleChild extends PureComponent {
  render() {
    const state = this.props.state;
    const actions = this.props.actions;
    console.log('state:', state);
    return (
      <div style={({ border: '1px solid red' })}>

        <h2>Child</h2>

        <div> a = {state ? state.a : '--'}</div>
        <div> z = {state ? state.z : '--'}</div>

        <button onClick={actions ? actions.increment : () => {}}>Increment</button>
      </div>
    );
  }
}

export default injectState(SampleChild);
