// @flow

import { Dimensions } from 'react-native';

export const calculateSize = ({ width, height }) => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const size = { width, height };
  if (width > 0.0 && width <= 1.0) {
    size.width *= screenWidth;
  }
  if (height > 0.0 && height <= 1.0) {
    size.height *= screenHeight;
  }
  return size;
}
