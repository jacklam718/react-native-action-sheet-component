// @flow

import { Animated, Easing } from 'react-native';

export default class Animation {
  constructor(toValue: number) {
    this.position = new Animated.Value(toValue);
  }

  toValue(toValue: number, duration: number, onFinished?: Function = () => {}): void {
    Animated.timing(this.position, {
      toValue,
      duration,
      easing: Easing.inOut(Easing.quad),
    })
    .start(onFinished);
  }

  get animations(): Object {
    return { position: this.position };
  }
}
