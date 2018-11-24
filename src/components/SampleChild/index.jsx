import { injectState } from '../Freactal';

const SampleChild = ({ a = '--', z = '--', increment = () => {} }) => (
  <div style={({ border: '1px solid red' })}>

    <h2>Child</h2>

    <div> a = {a}</div>
    <div> z = {z}</div>

    <button onClick={increment}>Increment</button>
  </div>
);

export default injectState(
  SampleChild,
  (props, engine) => Object.assign({}, props, engine.state, engine.actions),
);
