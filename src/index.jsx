/* eslint-disable import/no-extraneous-dependencies */
import { render } from 'react-dom';
import { StoreEngine, update } from '@wonderlandlabs/freactal-engine';

import { provideEngine, provideState } from './components/Freactal';

import SampleRoot from './components/SampleRoot';
import SampleChild from './components/SampleChild';
import MiddleChild from './components/MiddleChild';

const store = new StoreEngine(
  { a: 1, b: 2 },
  { increment: update(context => ({ a: context.state.a + 1 })) },
);

const StoreRoot = provideEngine(store)(SampleRoot);

const root = document.getElementById('root');

const MiddleChildInjected = provideState([{ z: 1 },
  { incZ: update(context => ({ z: context.state.z + 1 })) }])(MiddleChild);

render(
  (
    <StoreRoot>
      <h1>Outer Markup</h1>
      <MiddleChildInjected>
        <SampleChild />
      </MiddleChildInjected>
    </StoreRoot>
  ), root,
);
