import { Component } from 'react'; // eslint-disable-line import/no-extraneous-dependencies
import { StoreEngineReducer } from '@wonderlandlabs/freactal-engine';
import FreactalContext from '../FreactalContext';
import injectState from '../injectState';

function provideEngine(engine, Target, injectToTarget) {
  const wrapper = function wrapper(View) {
    let InnerView = View;
    if (injectToTarget) {
      InnerView = injectState(View);
    }

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
                  <InnerView {...this.props} />
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

  if (Target) return wrapper(injectToTarget ? injectState(Target) : Target);
  return wrapper;
}

export default provideEngine;
