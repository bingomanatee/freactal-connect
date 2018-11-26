import React, { Component, PureComponent } from 'react';

import FreactalContext from './../FreactalContext';
import injectState from './index';
import enzyme from '../../../enzyme';

const { mount } = enzyme;

describe('freactal3', () => {
  describe('injectState', () => {
    describe('over function', () => {
      let viewProps;

      const BasicView = (props) => {
        viewProps = props;
        return <div>Basic View: a = {props.a} {props.children}</div>;
      };

      const WrappedBasicView = injectState(BasicView);

      it('should survive injection with no parent engine', () => {
        const mounted = mount(<WrappedBasicView a={1} b="two" />);

        expect(viewProps).toEqual({
          a: 1, b: 'two', children: undefined, actions: {}, effects: {}, state: {},
        });
      });

      it('should accept data from an injected engine', () => {
        const state = { foo: 1, bar: [1, 2, 3] };
        const actions = {
          setFoo: (n) => {
            state.foo = n;
            if (next) next(state);
            return state;
          },
        };
        let next;
        const subscribe = (onNext) => {
          next = onNext;
        };
        // eslint-disable-next-line function-paren-newline
        const mounted = mount(
          <FreactalContext.Provider value={({ state, actions, subscribe })}>
            <WrappedBasicView a={1} b="two" />
          </FreactalContext.Provider>);
        expect(viewProps).toEqual({
          a: 1, b: 'two', children: undefined, actions, effects: actions, state,
        });
      });
    });
    describe('over PureComponent', () => {
      let viewProps;

      class BasicView extends PureComponent {
        constructor(props) {
          super(props);
          viewProps = props;
        }

        render() {
          return <div>Basic View: a = {this.props.a} {this.props.children}</div>;
        }
      }

      const WrappedBasicView = injectState(BasicView);

      it('should survive injection with no parent engine', () => {
        const mounted = mount(<WrappedBasicView a={1} b="two" />);

        expect(viewProps).toEqual({
          a: 1, b: 'two', children: undefined, actions: {}, effects: {}, state: {},
        });
      });

      it('should accept data from an injected engine', () => {
        const state = { foo: 1, bar: [1, 2, 3] };
        const actions = {
          setFoo: (n) => {
            state.foo = n;
            if (next) next(state);
            return state;
          },
        };
        let next;
        const subscribe = (onNext) => {
          next = onNext;
        };
        // eslint-disable-next-line function-paren-newline
        const mounted = mount(
          <FreactalContext.Provider value={({ state, actions, subscribe })}>
            <WrappedBasicView a={1} b="two" />
          </FreactalContext.Provider>);
        expect(viewProps).toEqual({
          a: 1, b: 'two', children: undefined, actions, effects: actions, state,
        });
      });
    });
    describe('over Component', () => {
      let viewProps;

      class BasicView extends Component {
        constructor(props) {
          super(props);
          viewProps = props;
        }

        render() {
          return <div>Basic View: a = {this.props.a} {this.props.children}</div>;
        }
      }

      const WrappedBasicView = injectState(BasicView);

      it('should survive injection with no parent engine', () => {
        const mounted = mount(<WrappedBasicView a={1} b="two" />);

        expect(viewProps).toEqual({
          a: 1, b: 'two', children: undefined, actions: {}, effects: {}, state: {},
        });
      });

      it('should accept data from an injected engine', () => {
        const state = { foo: 1, bar: [1, 2, 3] };
        const actions = {
          setFoo: (n) => {
            state.foo = n;
            if (next) next(state);
            return state;
          },
        };
        let next;
        const subscribe = (onNext) => {
          next = onNext;
        };
        // eslint-disable-next-line function-paren-newline
        const mounted = mount(
          <FreactalContext.Provider value={({ state, actions, subscribe })}>
            <WrappedBasicView a={1} b="two" />
          </FreactalContext.Provider>);
        expect(viewProps).toEqual({
          a: 1, b: 'two', children: undefined, actions, effects: actions, state,
        });
      });
    });
  });
});
