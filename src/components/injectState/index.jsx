import { Component } from 'react'; // eslint-disable-line import/no-extraneous-dependencies

import FreactalContext from '../FreactalContext';

function injector(View) {
  class InjectedView extends Component {
    get engineState() {
      return this.engine ? this.engine.state : {};
    }

    get engineActions() {
      return this.engine ? this.engine.actions : {};
    }

    get engine() {
      return this._engine;
    }

    set engine(engine) {
      if (engine === this._engine) return;
      if (this._engineSubscriber) {
        this._engineSubscriber.unsubscribe();
      }

      if (engine) {
        this._engineSubscriber = engine.subscribe(this.updateState(), this.engineError(), this.unsubscribe());
      }

      this._engine = engine;
    }

    updateState() {
      const self = this;
      return () => self.forceUpdate();
    }

    engineError(err) {
      const self = this;
      return () => {
        console.log('freactal state error:', err, self.engine);
      };
    }

    unsubscribe() {
      const self = this;
      return () => {
        if (self._engineSubscriber) {
          self._engineSubscriber.unsubscribe();
          self._engineSubscriber = null;
        }
      };
    }

    render() {
      return (
        <FreactalContext.Consumer>
          {(engine) => {
            this.engine = engine;
            return <View {...this.props} state={this.engineState} actions={this.engineActions} />;
          }}
        </FreactalContext.Consumer>
      );
    }
  }

  return InjectedView;
}

export default injector;
