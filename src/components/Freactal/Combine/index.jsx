import { PureComponent } from 'react';
import { StoreEngineReducer } from '@wonderlandlabs/freactal-engine';
import lget from 'lodash.get';
import FreactalContext from '../FreactalContext';

export default class Combine extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { engine: new StoreEngineReducer(props.engines, lget(props, 'reducers', {})) };
  }

  render() {
    return (
      <FreactalContext.Provider value={this.state.engine}>
        {this.props.children}
      </FreactalContext.Provider>
    );
  }
}
