import { Component } from 'react'; // eslint-disable-line import/no-extraneous-dependencies
import { StoreEngineReducer } from '@wonderlandlabs/freactal-engine';
import FreactalContext from '../FreactalContext';

function createWrapper(engine) {
  return function wrapper(View) {
    class StatefulView extends Component {
      constructor(props) {
        super(props);
        this.state = { engine };
      }

      render() {
        let providedEngine = this.state.engine;
        return (
          <FreactalContext.Consumer>
            {
              (previousState) => {
              if (previousState) {
                providedEngine = new StoreEngineReducer([previousState, this.state.engine]);
              }

              return (
                <FreactalContext.Provider value={providedEngine}>
                  <View {...this.props} />
                </FreactalContext.Provider>
              );
            }
            }
          </FreactalContext.Consumer>
        );
      }
    }

    return StatefulView;
  };
}

export default createWrapper;
