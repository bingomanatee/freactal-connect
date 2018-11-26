/* eslint-disable react/no-multi-comp */
import { Component, PureComponent } from 'react'; // eslint-disable-line import/no-extraneous-dependencies

import FreactalContext from '../FreactalContext';

function injector(View, customProps) {
  class EngineInjector extends Component {
    constructor(originalProps) {
      super(originalProps);
      const { props, engine } = originalProps;

      if (customProps) {
        this.state = {
          engine,
          props,
          passThrough: customProps(props, engine),
        };
      } else if (engine) {
        this.state = ({
          engine,
          props,
          passThrough: {
            ...props, effects: engine.actions, actions: engine.actions, state: engine.state,
          },
        });
      } else {
        this.state = ({
          engine,
          props,
          passThrough: {
            ...props, effects: {}, actions: {}, state: {},
          },
        });
      }
    }

    componentDidMount() {
      if (this.state.engine) {
        this._engineSubscription = this.state.engine.subscribe(({ state }) => {
          this.setState({
            passThrough: {
              ...this.state.props,
              actions: this.state.engine.actions,
              state,
            },
          });
        }, (err) => {
          console.log('error:', err);
        }, () => {
          this.stopSub();
        });
      }
    }

    componentWillUnmount() {
      this.stopSub();
    }


    stopSub() {
      if (this._engineSubscription) {
        this._engineSubscription.unsubscribe();
        delete this._engineSubscription;
      }
    }

    render() {
      return <View {...this.state.passThrough}>{this.props.children}</View>;
    }
  }

  class InjectedView extends PureComponent {
    render() {
      return (
        <FreactalContext.Consumer>
          {
            engine => (
              <EngineInjector props={this.props} engine={engine}>
                {this.props.children}
              </EngineInjector>
          )
          }
        </FreactalContext.Consumer>
      );
    }
  }

  return InjectedView;
}

export default injector;
