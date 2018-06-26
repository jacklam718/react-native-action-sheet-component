Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='src/ActionSheet.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);





var _reactNative=require('react-native');









var _reactNativeAnimatedOverlay=require('react-native-animated-overlay');var _reactNativeAnimatedOverlay2=_interopRequireDefault(_reactNativeAnimatedOverlay);
var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _utils=require('./utils');

var _Separator=require('./Separator');var _Separator2=_interopRequireDefault(_Separator);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var BackHandler=_reactNative.BackHandler||_reactNative.BackAndroid;


var ACTION_SHEET_OPENING='opening';
var ACTION_SHEET_OPENED='opened';
var ACTION_SHEET_CLOSING='closing';
var ACTION_SHEET_CLOSED='closed';

var DEFAULT_ANIMATION_DURATION=180;


var INITIAL_POSITION_BOTTOM=-180;
var INITIAL_POSITION_TOP=0;


var HARDWARE_BACK_PRESS_EVENT='hardwareBackPress';

var styles=_reactNative.StyleSheet.create({
containerTop:{
flex:1,
position:'absolute',
backgroundColor:'white',
top:INITIAL_POSITION_TOP},

containerBottom:{
flex:1,
position:'absolute',
backgroundColor:'white',
bottom:INITIAL_POSITION_BOTTOM},

container:{
position:'absolute',
flex:1,
top:0,
bottom:0,
left:0},

contentContainer:{
flex:1,
position:'absolute',
backgroundColor:'white'},

scrollView:{}});

























var defaultProps={
onShow:function onShow(){},
onHide:function onHide(){},
show:false,
animationDuration:DEFAULT_ANIMATION_DURATION,
overlayOpacity:0.3,
position:'bottom',
style:null,
onChange:function onChange(){},
multiple:false,
showSparator:true,
showSeparator:true,
showSelectedIcon:true,
value:null,
defaultValue:null,
hideOnSelceted:true,
hideOnSelected:true,
hideOnHardwareBackPress:true,
children:null,
scrollEnabled:true,
maxHeight:_reactNative.Dimensions.get('window').height/2};var


ActionSheet=function(_Component){_inherits(ActionSheet,_Component);




function ActionSheet(props){_classCallCheck(this,ActionSheet);var _this=_possibleConstructorReturn(this,(ActionSheet.__proto__||Object.getPrototypeOf(ActionSheet)).call(this,
props));_initialiseProps.call(_this);

var isTop=props.position==='top';

var initValue=props.value||props.defaultValue;
initValue=Array.isArray(initValue)?
initValue:
initValue===null&&[]||[initValue];

_this.state={
show:props.show,
selectedData:initValue,
transformOffsetY:new _reactNative.Animated.Value(100000),
actionSheetState:ACTION_SHEET_CLOSED,
actionSheetHeight:0};return _this;

}_createClass(ActionSheet,[{key:'componentDidMount',value:function componentDidMount()

{
if(this.props.show){
this.show();
}

BackHandler.addEventListener(HARDWARE_BACK_PRESS_EVENT,this.hardwareBackPressHandler);
}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(

nextProps){var _this2=this;
if(this.props.show!==nextProps.show){
if(nextProps.show){
this.show();
}else{
this.hide();
}
}

if(nextProps.value&&!_lodash2.default.isEqual(this.props.value,nextProps.value)){
var selectedData=[];
nextProps.value.forEach(function(value){
if(!_this2.props.multiple&&selectedData.length!==0){
return;
}
selectedData.push(value);
});
this.setState({selectedData:selectedData});
}
}},{key:'componentWillUnmount',value:function componentWillUnmount()

{
BackHandler.removeEventListener(HARDWARE_BACK_PRESS_EVENT);
this.hide();
}},{key:'setActionSheetState',value:function setActionSheetState(







toValue){var _this3=this;var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:function(){};var
duration=this.props.animationDuration;
var isClosed=this.state.actionSheetState===ACTION_SHEET_CLOSED;
var actionSheetState=isClosed?ACTION_SHEET_OPENING:ACTION_SHEET_CLOSING;

this.setState({actionSheetState:actionSheetState});

_reactNative.Animated.timing(this.state.transformOffsetY,{
toValue:toValue,
duration:duration,
useNativeDriver:true,
easing:_reactNative.Easing.inOut(_reactNative.Easing.quad)}).

start(function(){
var isClosing=_this3.state.actionSheetState===ACTION_SHEET_CLOSING;
actionSheetState=isClosing?ACTION_SHEET_CLOSED:ACTION_SHEET_OPENED;

_this3.setState({actionSheetState:actionSheetState});
callback();
});
}},{key:'selectItem',value:function selectItem(







































































value,index){var _props=
this.props,isMultiSelect=_props.multiple,onChange=_props.onChange;
var selectedData=[];

if(isMultiSelect){
selectedData=[].concat(_toConsumableArray(this.state.selectedData));
}

selectedData.push(value);
this.setState({selectedData:selectedData});
onChange(value,index,selectedData);
}},{key:'unselectItem',value:function unselectItem(

value,index){var _props2=
this.props,isMultiSelect=_props2.multiple,onChange=_props2.onChange;
var selectedData=[];

if(isMultiSelect){
selectedData=[].concat(_toConsumableArray(this.state.selectedData));
selectedData.splice(index,1);
}

this.setState({selectedData:selectedData});
onChange(value,index,selectedData);
}},{key:'renderItems',value:function renderItems()

{var _this4=this;var _props3=
this.props,children=_props3.children,showSparator=_props3.showSparator,showSeparator=_props3.showSeparator,showSelectedIcon=_props3.showSelectedIcon;

return _react.Children.map(children,function(child){
var separator=void 0;
var selectedIndex=_this4.state.selectedData.indexOf(child.props.value);

if(showSparator&&showSeparator){
separator=_react2.default.createElement(_Separator2.default,{__source:{fileName:_jsxFileName,lineNumber:306}});
}

var item=(0,_react.cloneElement)(child,{
index:selectedIndex,
showSelectedIcon:showSelectedIcon,
selected:_this4.state.selectedData.includes(child.props.value),
onPress:function onPress(_selectedValue,_selectedIndex){
child.props.onPress(_selectedValue,_selectedIndex);
_this4.onItemPress(_selectedValue,_selectedIndex);
},
textStyle:child.props.textStyle,
style:child.props.style});


return(
_react2.default.createElement(_reactNative.View,{style:{flex:1},__source:{fileName:_jsxFileName,lineNumber:322}},
item,
separator));


});
}},{key:'render',value:function render()

{var _props4=







this.props,animationDuration=_props4.animationDuration,overlayOpacity=_props4.overlayOpacity,position=_props4.position,style=_props4.style,_maxHeight=_props4.maxHeight,scrollEnabled=_props4.scrollEnabled;var _state=




this.state,actionSheetState=_state.actionSheetState,transformOffsetY=_state.transformOffsetY,actionSheetHeight=_state.actionSheetHeight;

var isTop=position==='top';
var overlayShow=false;
var pointerEvents='none';

if([ACTION_SHEET_OPENED,ACTION_SHEET_OPENING].includes(actionSheetState)){
overlayShow=true;
pointerEvents='auto';
}

var width={width:_reactNative.Dimensions.get('window').width};

var itemsStyle=isTop?
{paddingTop:30}:
null;

var actionSheetStyle=isTop?
styles.containerTop:
styles.containerBottom;

var scrollViewStyle=void 0;
var maxHeight=(0,_utils.calculateSize)({height:_maxHeight}).height;
if(actionSheetHeight>maxHeight){
scrollViewStyle={height:maxHeight};
}

return(
_react2.default.createElement(_reactNative.View,{style:[styles.container],__source:{fileName:_jsxFileName,lineNumber:371}},
_react2.default.createElement(_reactNativeAnimatedOverlay2.default,{
onPress:this.onOverlayPress,
overlayShow:overlayShow,
duration:animationDuration,
opacity:overlayOpacity,
pointerEvents:pointerEvents,
useNativeDirver:true,__source:{fileName:_jsxFileName,lineNumber:372}}),

_react2.default.createElement(_reactNative.Animated.View,{
style:[
actionSheetStyle,
style,
width,
{
transform:[{translateY:transformOffsetY}]}],__source:{fileName:_jsxFileName,lineNumber:380}},



_react2.default.createElement(_reactNative.ScrollView,{style:[styles.scrollView,scrollViewStyle],scrollEnabled:scrollEnabled,__source:{fileName:_jsxFileName,lineNumber:390}},
_react2.default.createElement(_reactNative.View,{onLayout:this.getActionSheetHeight,style:itemsStyle,__source:{fileName:_jsxFileName,lineNumber:391}},
this.renderItems())))));





}}]);return ActionSheet;}(_react.Component);ActionSheet.defaultProps=defaultProps;var _initialiseProps=function _initialiseProps(){var _this5=this;this.onOverlayPress=function(){if(_this5.state.actionSheetState===ACTION_SHEET_OPENED){_this5.hide();}};this.hardwareBackPressHandler=function(){var hideOnHardwareBackPress=_this5.props.hideOnHardwareBackPress;if(hideOnHardwareBackPress&&_this5.state.show){_this5.hide();return true;}return false;};this.getActionSheetHeight=function(e){var height=e.nativeEvent.layout.height;if(height&&height!==_this5.state.actionSheetHeight){var isTop=_this5.props.position==='top';_this5.setState({transformOffsetY:new _reactNative.Animated.Value(isTop?-height:height),actionSheetHeight:height});}};this.show=function(){var callback=arguments.length>0&&arguments[0]!==undefined?arguments[0]:function(){};if([ACTION_SHEET_OPENING,ACTION_SHEET_OPENED].includes(_this5.state.actionSheetState)){return;}var _props5=_this5.props,onShow=_props5.onShow,position=_props5.position;var initialPosition=position==='top'?0:-180;_this5.setState({show:true});_this5.setActionSheetState(initialPosition,function(){onShow();callback();});};this.hide=function(){var callback=arguments.length>0&&arguments[0]!==undefined?arguments[0]:function(){};if([ACTION_SHEET_CLOSING,ACTION_SHEET_CLOSED].includes(_this5.state.actionSheetState)){return;}var _props6=_this5.props,onHide=_props6.onHide,position=_props6.position;var toPosition=position==='top'?-_this5.state.actionSheetHeight:_this5.state.actionSheetHeight;_this5.setState({show:false});_this5.setActionSheetState(toPosition,function(){onHide();callback();});};this.onItemPress=function(value,index){var _props7=_this5.props,hideOnSelceted=_props7.hideOnSelceted,hideOnSelected=_props7.hideOnSelected;if(hideOnSelceted&&hideOnSelected){_this5.hide();}if(Object.values(_this5.state.selectedData).includes(value)){_this5.unselectItem(value,index);return;}_this5.selectItem(value,index);};};ActionSheet.propTypes={onShow:require('prop-types').func,onHide:require('prop-types').func,show:require('prop-types').bool,animationDuration:require('prop-types').number,overlayOpacity:require('prop-types').number,position:require('prop-types').oneOf(['top','bottom']),style:require('prop-types').any,onChange:require('prop-types').func,multiple:require('prop-types').bool,showSparator:require('prop-types').bool,showSeparator:require('prop-types').bool,showSelectedIcon:require('prop-types').bool,value:require('prop-types').any,defaultValue:require('prop-types').any,hideOnSelceted:require('prop-types').bool,hideOnSelected:require('prop-types').bool,hideOnHardwareBackPress:require('prop-types').bool,children:require('prop-types').any,scrollEnabled:require('prop-types').bool};exports.default=


ActionSheet;