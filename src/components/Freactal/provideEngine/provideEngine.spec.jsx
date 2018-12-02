/* eslint-disable react/jsx-closing-tag-location */
import React, { Component, PureComponent } from 'react';
import { StoreEngine, update } from '@wonderlandlabs/freactal-engine';

import FreactalContext from './../FreactalContext';
import provideEngine from './index';
import injectState from '../injectState';

import enzyme from '../../../enzyme';

const { mount } = enzyme;

describe('freactal3', () => {
  describe('provideState', () => {
    describe('over function', () => {
      let viewProps;
      let state;
      let actions;
      let next;
      let engine;
      let mounted;

      const subscribe = (onNext) => {
        next = onNext;
      };

      const BasicView = (props) => {
        viewProps = props;
        return <div>Basic View: a = {props.a} {props.children}</div>;
      };


      beforeEach(() => {
        state = { foo: 1, bar: [1, 2, 3] };
        actions = {
          setFoo: (actions, foo) => (state) => {
            const out = Object.assign({}, state, { foo });
            if (next) {
              next(out);
            }
            return out;
          },
        };

        const ProvidedView = provideEngine({ state, actions, subscribe })(BasicView);
        mounted = mount(<ProvidedView a={1} b="two">
          <FreactalContext.Consumer>
            {(providedEngine) => {
              engine = providedEngine;
              return 'inner';
            }}
          </FreactalContext.Consumer>
        </ProvidedView>);
      });

      it('should transport props to child view', () => {
        const pProps = { ...viewProps };
        delete pProps.children;
        expect(pProps).toEqual({
          a: 1, b: 'two',
        });
      });

      it('should provide engine ', () => {
        expect(engine).toEqual({ state, actions, subscribe });
      });

      describe('over an injected component', () => {
        beforeEach(() => {
          const ProvidedView = provideEngine({ state, actions, subscribe })(injectState(BasicView));
          mounted = mount(<ProvidedView a={1} b="two">
            <FreactalContext.Consumer>
              {(providedEngine) => {
                engine = providedEngine;
                return 'inner';
              }}
            </FreactalContext.Consumer>
          </ProvidedView>);
        });


        it('should transport props and engine to child view', () => {
          const pProps = { ...viewProps };
          delete pProps.children;
          expect(pProps).toEqual({
            a: 1, b: 'two', actions, state, effects: actions,
          });
        });
      });


      describe('combining', () => {
        let outerProps;
        let innerProps;

        const outerEngine = new StoreEngine({ a: 1, b: 'two' }, {
          setA: update((actions, a) => state => ({ a })),
        });
        const innerEngine = new StoreEngine({ a: 2, c: [1, 2, 3] }, {
          addToC: update(({ state }, v) => {
            const c = [...state.c, v];
            return { c };
          }),
        });

        beforeEach(() => {
          const BaseOuterView = ({ state, actions, children }) => (<span a={state.a}>{children}</span>);

          const BaseInnerView = ({ state, actions, children }) => (
            <div a={state.a} c={state.c}>
              {children}
            </div>
          );
          const OuterProvided = provideEngine(outerEngine)(injectState(BaseOuterView));
          const InnerProvided = provideEngine(innerEngine)(injectState(BaseInnerView));

          mounted = mount(<OuterProvided foo="bar">
            <InnerProvided />
          </OuterProvided>);
        });

        it('should communicate outer props from engine', () => {
          expect(mounted.getDOMNode().attributes.a.value).toEqual('1');
        });

        it('should blend inner props from engine', () => {
          expect(mounted.find('div').first().getDOMNode().attributes.a.value).toEqual('2');
        });

        it('should respect state change in outer props', async () => {
          await outerEngine.actions.setA(4);
          expect(mounted.getDOMNode().attributes.a.value).toEqual('4');
        });

        it('should not override inner state when outer prop cahnges', async () => {
          await outerEngine.actions.setA(4);
          expect(mounted.find('div').first().getDOMNode().attributes.a.value).toEqual('2');
        });
      });
    });
  });
});
