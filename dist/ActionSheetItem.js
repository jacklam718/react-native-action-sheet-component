Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='src/ActionSheetItem.js';

var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var DEFAULT_SELECTED_ICON=require('./img/checkmark.png');

var styles=_reactNative.StyleSheet.create({
container:{

flexDirection:'row',
paddingTop:20,
paddingBottom:20,
paddingLeft:40,
paddingRight:40,
alignItems:'center',
justifyContent:'space-between'},

text:{
fontSize:18,
color:'black'},

itemIcon:{
width:25,
height:25,
marginRight:10},

selectedIcon:{
width:18,
height:18},

itemContent:{
flexDirection:'row',
alignItems:'center',
justifyContent:'center'}});














var defaultProps={
value:null,
icon:null,
index:null,
selectedIcon:DEFAULT_SELECTED_ICON,
selected:false,
onPress:function onPress(){},
style:null};


function ActionSheetItem(_ref){var text=_ref.text,value=_ref.value,index=_ref.index,onPress=_ref.onPress,style=_ref.style,icon=_ref.icon,selectedIcon=_ref.selectedIcon,selected=_ref.selected;
var iconOnSelected=void 0;
var itemIcon=void 0;

if(selected){
if(['number','string'].includes(typeof selectedIcon)){
iconOnSelected=_react2.default.createElement(_reactNative.Image,{source:selectedIcon,style:styles.selectedIcon,__source:{fileName:_jsxFileName,lineNumber:66}});
}else{
iconOnSelected=selectedIcon;
}
}

if(['number','string'].includes(typeof icon)){
itemIcon=_react2.default.createElement(_reactNative.Image,{source:icon,style:styles.itemIcon,__source:{fileName:_jsxFileName,lineNumber:73}});
}else{
itemIcon=icon;
}

return(
_react2.default.createElement(_reactNative.TouchableHighlight,{
onPress:function(_onPress){function onPress(){return _onPress.apply(this,arguments);}onPress.toString=function(){return _onPress.toString();};return onPress;}(function(){
onPress(value,index);
}),
underlayColor:'#EDEDED',__source:{fileName:_jsxFileName,lineNumber:79}},

_react2.default.createElement(_reactNative.View,{style:[styles.container,style],__source:{fileName:_jsxFileName,lineNumber:85}},
_react2.default.createElement(_reactNative.View,{style:styles.itemContent,__source:{fileName:_jsxFileName,lineNumber:86}},
itemIcon,
_react2.default.createElement(_reactNative.Text,{style:styles.text,__source:{fileName:_jsxFileName,lineNumber:88}},
text)),


_react2.default.createElement(_reactNative.View,{style:styles.itemContent,__source:{fileName:_jsxFileName,lineNumber:92}},
iconOnSelected))));




}ActionSheetItem.propTypes={text:require('prop-types').any.isRequired,value:require('prop-types').any,index:require('prop-types').number,icon:require('prop-types').any,selectedIcon:require('prop-types').any,selected:require('prop-types').bool,onPress:require('prop-types').func,style:require('prop-types').any};

ActionSheetItem.defaultProps=defaultProps;exports.default=

ActionSheetItem;