import { injectState } from '../Freactal';

export default injectState(({ state, actions, children }) => (
  <div>
    <h2>Child</h2>

    <div> z = {state ? state.z : '--'}</div>

    <button onClick={actions ? actions.incZ : () => {}}>Increment</button>
    {children};
  </div>
));
