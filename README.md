This is a library for connecting Freactal StoreEngines to React components. 

It uses the [Freactal Store Engine-- @wonderlandlabs/freactal-engine.](https://github.com/bingomanatee/freactal3)

## API 

The Freactal connector uses several methods to communicate state into components:

### `provideState({state, initialize?, actions}, Target?, inject?)`

provideState creates a new engine and injects it into context, allowing for it to be consumed
by downstream readers. This is done "under the hood" by putting a value into a 
[React Context](https://reactjs.org/docs/context.html). 

* The first argument is the engines' parameters.
  * **state** is an object that will be the store's starting values.
  * **initialize** is a function that will set the stores' values before any action is
    executed. It is an asynchronous function, so you can poll APIs or do any other 
    promise based activity here. It is optional. 
  * **actions** is an object with methods that take in a context (the engine) and 
    optional arguments, and returns a new state. 
    
* The second argument is an optional component to inject state for. 
* The third argument is a boolean - indicates whether to directly inject the engine into the target. 

---- 

**Example:**

```jsx harmony

const Root = ({state, actions, children}) => {
    return (
      <div>
      <h1>I Provide State!</h1>
      <div>
        a = {state.a}
        <button onClick={actions.addOneToA()}>Add One To A</button>
      </div>
      {children}
      </div>
    )
}

const engine = new StoreEngine(
    {a: 1, b: 2, },
    {
        addOneToA: ({state}) => {
            return Object.assign({}, state, {a: state.a + 1});
        },
        addValueToB: ({state}, n) => {
            return Object.assign({}, state, {b: state.b + n});
          }
    });

const wrapperFunction = provideState({
    state: {a: 1, b: 2},
    actions: {
      incA: ({state}) => Object.assign({}, state, {a: state.a + 1})
    }
});

/**
 * method one: create a wrapper function
 */

const WrappedRoot = wrapperFunction(Root);

/**
 * method two: wrap directly. Note - this will NOT work if Root USES state.
 * 
 */

const WrappedRoot = provideEngine(engine)( Root);

/**
 * --- but this WILL work.
 * 
 */

const WrappedRoot = provideEngine(engine)(injectState(Root));

```

### `injectState(Target, customPropInjector?)`

makes freactal state and actions available to a wrapped version of Target. 

By default, the properties `state`, `actions`, and (sigh) `effects` (an alias to actions) are provided, with 
any properties passed to the wrapped view. 

However you can also decide to provide a second function that takes in the outer component and 
returns the properties injected to the child view. So if you want to take a subset of values of the 
state, or compute (synchronous) derived values based on state, you can do so with the third property. 
(no need to include children as a property - its managed elsewhere).

So, the two examples will render identically, if provideState from above is used at a higher level:

```jsx harmony

const BasicStatedInstance = injectState(({state, actions}) => {
    return (
      <div>
          a = {state.a}, b = {state.b} 
        <div>
          <button onClick={actions.incrementA}>Increment A</button>
          <button onClick={() => actions.addValueToB(5)}>Add 5 to B</button>
        </div>
      </div>
    );
});

```
or if you want to pull state into props directly, 

```jsx harmony

const BasicStatedInstance = injectState(({incrementA, addValueToB, a, b}) => {
    return (
      <div>
          a = {a}, b = {b} 
        <div>
          <button onClick={incrementA}>Increment A</button>
          <button onClick={() => addValueToB(5)}>Add 5 to B</button>
        </div>
      </div>
    );
},
 (props, context) => {
  return Object.assign({}, props, context.actions, {a: context.state.a, b: context.state.b});
});

```

### `provideEngine(engine, target?, inject?)`

provideEngine is an advanced variation of provideState above. 
instead of creating a store engine internally, provideEngine allows you to
 define the engine externally.

The engine should connect any stores that follow the following signature:

* **state**: a property that has a value that changes when actions are called
* **actions**: an object whose properties are functions that change the state
* **subscribe**: a method that follows the RxJS subscription 
  pattern(onUpdate, onError, onTerminate)

As with provideState, the target can be defined and if desired, injected with state.

---- 
**Example:**

```jsx harmony

class Root extends React.PureComponent {
  
  render() {
    return (
      <div>
      <h1>I Provide State!</h1>
      <div>a = {this.props.state.a}</div>
      {this.props.children}
      </div>
    )
  }
  
}

const engine = new StoreEngine({a: 1, b: 2, }, {inc: ({state}) => {
  return Object.assign({}, {a: state.a + 1});
}});

/**
 * method one: create a wrapper function
 */

const wrapperFunction = provideEngine(engine);

const WrappedRoot = wrapperFunction(Root);

/**
 * method two: wrap directly
 */

const WrappedRoot = provideEngine(engine)(Root);

```

## Some Advanced Notes

### how do we ensure that state values are unique when provided multiple times?

The state argument is ran through [lodash.cloneDeep](https://lodash.com/docs/4.17.11#cloneDeep) 
(don't worry we don't pull in all of lodash). however if there are 
complex/OOP arguments where references are important they should be provided with the initialize method. 

### When you call nested actions how do you ensure that context.state is up to date?

Context is the engine instance itself. So the state property of it is updated after the resolution of any
actions. to be safe ensure that you await any actions or use call.then(...) notation to resolve the actions
before polling state again. 

### Can I use Freactal 3 with pre-16.x React? 

Freactal 3 relies on 16.3 Contexts. We will provide a ...14.x friendly option soon that will accept
legacy Context support. 

### Can I use Freactal 3 with "not React"? 

Freactal itself uses React 16.3 as a peer dependency. However it wraps functions and anything else you feed to it
so in theory, you can use it *around* other systems as long as you provide a React library for the inner workings
of Freactal. 

### Does Freactal work with server side rendering? 

If you provide starting values for the state it should render with SSR. (hasn't been tested yet) 
