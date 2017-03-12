// @flow

import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import ActionSheet from './ActionSheet';

export default class ActionSheetManager {
  constructor() {
    this.props = [];
  }

  setCurrent(props: Object, callback?: Function = () => {}): void {
    if (!props) {
      return;
    }

    this.currentActionSheet = new RootSiblings(
      <ActionSheet {...props} />,
      callback,
    );
  }

  create(props: Object, callback?: Function = () => {}): void {
    this.setCurrent(props, callback);
    this.props.push(props);
  }

  update = (props: Object, callback?: Function = () => {}): void => {
    this.props[this.props.length - 1] = props;
    this.currentActionSheet.update(
      <ActionSheet {...props} />,
      callback,
    );
  }

  show = (options: Object, callback?: Function = () => {}): void => {
    const props = {
      ...options,
      show: true,
      onHide: () => {
        callback();
        this.hide();
      },
    };

    this.create(props, callback);
  }

  hide = (callback?: Function = () => {}): void => {
    const props = this.props.pop();

    if (!props) {
      callback();
      return;
    }

    this.update({
      ...props,
      show: false,
      onHide: () => {
        callback();
        this.currentActionSheet.destroy();
        this.setCurrent(this.props[this.props.length] - 1);
      },
    });
  }
}
