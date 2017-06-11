Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='src/ActionSheetManager.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNativeRootSiblings=require('react-native-root-siblings');var _reactNativeRootSiblings2=_interopRequireDefault(_reactNativeRootSiblings);
var _ActionSheet=require('./ActionSheet');var _ActionSheet2=_interopRequireDefault(_ActionSheet);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var

ActionSheetManager=function(){
function ActionSheetManager(){var _this=this;_classCallCheck(this,ActionSheetManager);this.



















update=function(props){var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:function(){};
_this.props[_this.props.length-1]=props;
_this.currentActionSheet.update(
_react2.default.createElement(_ActionSheet2.default,_extends({},props,{__source:{fileName:_jsxFileName,lineNumber:31}})),
callback);

};this.

show=function(options){var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:function(){};
var props=_extends({},
options,{
show:true,
onHide:function onHide(){
callback();
_this.hide();
}});


_this.create(props,callback);
};this.

hide=function(){var callback=arguments.length>0&&arguments[0]!==undefined?arguments[0]:function(){};
var props=_this.props.pop();

if(!props){
callback();
return;
}

_this.update(_extends({},
props,{
show:false,
onHide:function onHide(){
callback();
_this.currentActionSheet.destroy();
_this.setCurrent(_this.props[_this.props.length]-1);
}}));

};this.props=[];}_createClass(ActionSheetManager,[{key:'setCurrent',value:function setCurrent(props){var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:function(){};if(!props){return;}this.currentActionSheet=new _reactNativeRootSiblings2.default(_react2.default.createElement(_ActionSheet2.default,_extends({},props,{__source:{fileName:_jsxFileName,lineNumber:18}})),callback);}},{key:'create',value:function create(props){var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:function(){};this.setCurrent(props,callback);this.props.push(props);}}]);return ActionSheetManager;}();exports.default=ActionSheetManager;