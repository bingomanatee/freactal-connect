import { PureComponent } from 'react';
import { StoreEngineReducer } from '@wonderlandlabs/freactal-engine';
import FreactalContext from '../FreactalContext';

export default class Combine extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { engine: new StoreEngineReducer(props.engines) };
  }

  render() {
    return (
      <FreactalContext.Provider value={this.state.engine}>
        {this.props.children}
      </FreactalContext.Provider>
    );
  }
}
