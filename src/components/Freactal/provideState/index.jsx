import { StoreEngine } from '@wonderlandlabs/freactal-engine';
import provideEngine from './../provideEngine';

/**
 * Note - the Target/inject thing doesn't work - its a Babel/Webpack thing
 *
 * @param engineProps
 * @param Target
 * @param injectToTarget
 * @returns {Component}
 */
function provideState(engineProps, Target, injectToTarget) {
  let engine;
  if (Array.isArray(engineProps)) {
    engine = new StoreEngine(...engineProps);
  } else {
    engine = new StoreEngine(engineProps);
  }
  return provideEngine(engine, Target, injectToTarget);
}

export default provideState;
