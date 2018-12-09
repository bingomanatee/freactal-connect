import { Component } from 'react'; // eslint-disable-line import/no-extraneous-dependencies
import FreactalContext from '../FreactalContext';
import Combine from '../Combine';

/**
 * note - the Target property doesn't seem to work - its a webpack/babel thing.
 *
 * @param engine
 * @param reducers ({stateReducer, actionReducer}) - optional methods to customize the blending of states/actions
 * @returns {Component}
 */
function provideEngine(engine, reducers = {}) {
  function wrapper(View) {
    const InnerView = View;

    class StatefulView extends Component {
      static contextType = FreactalContext;
      constructor(props) {
        super(props);
        this.state = { engine };
      }
      render() {
        if (this.context) {
          return (
            <Combine engines={[this.context, this.state.engine]} reducers={reducers}>
              <InnerView {...this.props} />
            </Combine>
          );
        }
        return (
          <FreactalContext.Consumer>
            {
              (previousState) => {
                if (previousState) {
                  return (
                    <Combine engines={[previousState, this.state.engine]} reducers={reducers}>
                      <InnerView {...this.props} />
                    </Combine>
                  );
                }

                return (
                  <FreactalContext.Provider value={this.state.engine}>
                    <InnerView {...this.props} />
                  </FreactalContext.Provider>
                );
              }
            }
          </FreactalContext.Consumer>
        );
      }
    }

    StatefulView.contextType = FreactalContext;

    return StatefulView;
  }

  return wrapper;
}

export default provideEngine;
