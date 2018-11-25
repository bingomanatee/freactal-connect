import { Component } from 'react'; // eslint-disable-line import/no-extraneous-dependencies
import { StoreEngineReducer, StoreEngine } from '@wonderlandlabs/freactal-engine';
import FreactalContext from '../FreactalContext';
import injectState from './../injectState';

/**
 * Note - the Target/inject thing doesn't work - its a Babel/Webpack thing
 *
 * @param engineProps
 * @param Target
 * @param injectToTarget
 * @returns {Component}
 */
function provideState(engineProps, Target, injectToTarget) {
  const wrapper = function wrapper(View) {
    let InnerView = View;
    if (injectToTarget) {
      InnerView = injectState(View);
    }
    class StatefulView extends Component {
      constructor(props) {
        super(props);
        if (Array.isArray(engineProps)) {
          this.state = { engine: new StoreEngine(...engineProps) };
        } else {
          this.state = { engine: new StoreEngine(engineProps) };
        }
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

  return wrapper;
}

export default provideState;
