import { Component } from 'react'; // eslint-disable-line import/no-extraneous-dependencies

import FreactalContext from '../FreactalContext';

function injector(View, customProps) {
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

    get updatedProps() {
      const propList = { ...this.props };
      delete propList.children;

      if (customProps) return customProps(propList, this.engine);

      return Object.assign({}, propList, {
        actions: this.engineActions,
        effects: this.engineActions,
        state: this.engineState,
      });
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
            return <View {...this.updatedProps}>{ this.props.children}</View>;
          }}
        </FreactalContext.Consumer>
      );
    }
  }

  return InjectedView;
}

export default injector;
