// @flow

import { Animated, Easing } from 'react-native';

export default class Animation {
  constructor(toValue: number) {
    this.transformOffsetY = new Animated.Value(toValue);
  }

  toValue(toValue: number, duration: number, onFinished?: Function = () => {}): void {
    Animated.timing(this.transformOffsetY, {
      toValue,
      duration,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: true,
    }).start(onFinished);
  }

  get animations(): Object {
    return {
      transform: [{ translateY: this.transformOffsetY }],
    };
  }
}
