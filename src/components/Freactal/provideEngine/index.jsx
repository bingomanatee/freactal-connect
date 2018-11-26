import { Component } from 'react'; // eslint-disable-line import/no-extraneous-dependencies
import FreactalContext from '../FreactalContext';
import injectState from '../injectState';
import Combine from '../Combine';

/**
 * note - the Target property doesn't seem to work - its a webpack/babel thing.
 *
 * @param engine
 * @param Target
 * @param injectToTarget
 * @returns {Component}
 */
function provideEngine(engine, Target, injectToTarget) {
  function wrapper(View) {
    let InnerView = View;
    if (injectToTarget) {
      InnerView = injectState(View);
    }


    class StatefulView extends Component {
      static contextType = FreactalContext;
      constructor(props) {
        super(props);
        this.state = { engine };
      }
      render() {
        if (this.context) {
          return (
            <Combine engines={[this.context, this.state.engine]}>
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
                    <Combine engines={[previousState, this.state.engine]}>
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

  if (Target) {
    return wrapper(injectToTarget ? injectState(Target) : Target);
  }
  return wrapper;
}

export default provideEngine;
