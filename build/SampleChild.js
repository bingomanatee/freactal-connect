(function(a,b){'object'==typeof exports&&'object'==typeof module?module.exports=b():'function'==typeof define&&define.amd?define('SampleChild',[],b):'object'==typeof exports?exports.SampleChild=b():a.SampleChild=b()})('undefined'==typeof self?this:self,function(){return function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a['default']}:function(){return a};return b.d(c,'a',c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p='./',b(b.s=7)}([function(a){a.exports=require('react')},function(a){a.exports=require('@wonderlandlabs/freactal-engine')},function(a,b,c){'use strict';Object.defineProperty(b,'__esModule',{value:!0});var d=c(1),e=c.n(d),f=c(0),g=c.n(f),h=g.a.createContext(null),i=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},j=function(a,b){class c extends f.Component{constructor(a){super(a);const c=a.props,d=a.engine;this.state=b?{engine:d,props:c,passThrough:b(c,d)}:d?{engine:d,props:c,passThrough:i({},c,{effects:d.actions,actions:d.actions,state:d.state})}:{engine:d,props:c,passThrough:i({},c,{effects:{},actions:{},state:{}})}}componentDidMount(){this.state.engine&&(this._engineSubscription=this.state.engine.subscribe(({state:a})=>{this.setState({passThrough:i({},this.state.props,{actions:this.state.engine.actions,state:a})})},(a)=>{console.log('error:',a)},()=>{this.stopSub()}))}componentWillUnmount(){this.stopSub()}stopSub(){this._engineSubscription&&(this._engineSubscription.unsubscribe(),delete this._engineSubscription)}render(){return Object(f.createElement)(a,this.state.passThrough,this.props.children)}}class d extends f.PureComponent{render(){return Object(f.createElement)(h.Consumer,null,(a)=>Object(f.createElement)(c,{props:this.props,engine:a},this.props.children))}}return d},k=c(3),l=c.n(k);class m extends f.PureComponent{constructor(a){super(a),this.state={engine:new d.StoreEngineReducer(a.engines,l()(a,'reducers',{}))}}render(){return Object(f.createElement)(h.Provider,{value:this.state.engine},this.props.children)}}var n=function(a,b={}){return function(c){const d=c;class e extends f.Component{constructor(b){super(b),this.state={engine:a}}render(){return this.context?Object(f.createElement)(m,{engines:[this.context,this.state.engine],reducers:b},Object(f.createElement)(d,this.props)):Object(f.createElement)(h.Consumer,null,(a)=>a?Object(f.createElement)(m,{engines:[a,this.state.engine],reducers:b},Object(f.createElement)(d,this.props)):Object(f.createElement)(h.Provider,{value:this.state.engine},Object(f.createElement)(d,this.props)))}}return Object.defineProperty(e,'contextType',{enumerable:!0,writable:!0,value:h}),e.contextType=h,e}},o=function(a,b,c){let e;return e=Array.isArray(a)?new d.StoreEngine(...a):new d.StoreEngine(a),n(e,b,c)};c.d(b,'FreactalContext',function(){return h}),c.d(b,'injectState',function(){return j}),c.d(b,'provideState',function(){return o}),c.d(b,'provideEngine',function(){return n}),c.d(b,'update',function(){return d.update}),c.d(b,'StoreEngine',function(){return d.StoreEngine})},function(a){a.exports=require('lodash.get')},,,,function(a,b,c){a.exports=c(8)},function(a,b,c){'use strict';Object.defineProperty(b,'__esModule',{value:!0});var d=c(0),e=c.n(d),f=c(2);b['default']=Object(f.injectState)(({a:b='--',z:a='--',increment:c=()=>{}})=>Object(d.createElement)('div',{style:{border:'1px solid red'}},Object(d.createElement)('h2',null,'Child'),Object(d.createElement)('div',null,' a = ',b),Object(d.createElement)('div',null,' z = ',a),Object(d.createElement)('button',{onClick:c},'Increment')),(a,b)=>Object.assign({},a,b.state,b.actions))}])});
//# sourceMappingURL=SampleChild.js.map