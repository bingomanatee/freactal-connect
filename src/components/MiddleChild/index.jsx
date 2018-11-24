import { PureComponent } from 'react';

import injectState from '../injectState';

class MiddleChild extends PureComponent {
  render() {
    const state = this.props.state;
    const actions = this.props.actions;
    console.log('state:', state);
    return (
      <div>

        <h2>Child</h2>

        <div> z = {state ? state.z : '--'}</div>

        <button onClick={actions ? actions.incZ : () => {}}>Increment</button>
        {this.props.children};
      </div>
    );
  }
}

export default injectState(MiddleChild);
