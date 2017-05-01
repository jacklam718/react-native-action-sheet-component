Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _reactNative=require('react-native');function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var

Animation=function(){
function Animation(toValue){_classCallCheck(this,Animation);
this.position=new _reactNative.Animated.Value(toValue);
}_createClass(Animation,[{key:'toValue',value:function toValue(

_toValue,duration){var onFinished=arguments.length>2&&arguments[2]!==undefined?arguments[2]:function(){};
_reactNative.Animated.timing(this.position,{
toValue:_toValue,
duration:duration,
easing:_reactNative.Easing.inOut(_reactNative.Easing.quad)}).

start(onFinished);
}},{key:'animations',get:function get()

{
return{position:this.position};
}}]);return Animation;}();exports.default=Animation;