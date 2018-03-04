Object.defineProperty(exports,"__esModule",{value:true});exports.calculateSize=undefined;

var _reactNative=require('react-native');

var calculateSize=exports.calculateSize=function calculateSize(_ref){var width=_ref.width,height=_ref.height;var _Dimensions$get=
_reactNative.Dimensions.get('window'),screenWidth=_Dimensions$get.width,screenHeight=_Dimensions$get.height;
var size={width:width,height:height};
if(width>0.0&&width<=1.0){
size.width*=screenWidth;
}
if(height>0.0&&height<=1.0){
size.height*=screenHeight;
}
return size;
};