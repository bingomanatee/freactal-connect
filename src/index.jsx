/* eslint-disable import/no-extraneous-dependencies */
import { render } from 'react-dom';
import { StoreEngine, update } from '@wonderlandlabs/freactal-engine';

import createWrapper from './components/createWrapper';

import SampleRoot from './components/SampleRoot';
import SampleChild from './components/SampleChild';
import MiddleChild from './components/MiddleChild';

const store = new StoreEngine(
  { a: 1, b: 2 },
  { increment: update(context => ({ a: context.state.a + 1 })) },
);
const StoreRoot = createWrapper(store)(SampleRoot);

const root = document.getElementById('root');

const midStore = new StoreEngine(
  { z: 1 },
  { incZ: update(context => ({ z: context.state.z + 1 })) },
);

const MiddleChildInjected = createWrapper(midStore)(MiddleChild);

render(
  (
    <StoreRoot>
      <MiddleChildInjected>
        <SampleChild />
      </MiddleChildInjected>
    </StoreRoot>
  ), root,
);
