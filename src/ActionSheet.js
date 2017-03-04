// @flow

import React, { Component } from 'react';
import { View, Animated, StyleSheet, ScrollView, Easing, Dimensions } from 'react-native';
import AnimatedOverlay from 'react-native-animated-overlay';

import Animation from './Animation';

const { width: WIDTH } = Dimensions.get('window');

// action sheet states
const ACTION_SHEET_OPENING: string = 'opening';
const ACTION_SHEET_OPENED: string = 'opened';
const ACTION_SHEET_CLOSING: string = 'closing';
const ACTION_SHEET_CLOSED: string = 'closed';

const DEFAULT_ANIMATION_DURATION: number = 250;
const SHOW_POSITION: number = 0;
const INITIAL_POSITION: number = -180;


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'white',
    zIndex: 1000,
  },
  contentContainer: {
    width: WIDTH,
    backgroundColor: 'white',
  },
  scrollView: {
    paddingTop: 30,
  },
  hidden: {
    top: -10000,
    left: 0,
    height: 0,
    width: 0,
  },
});

type Props = {
  onShow?: () => void;
  onHide?: () => void;
  show?: boolean;
  animationDuration?: number;
  overlayOpacity?: number;
  children?: any;
};

const defaultProps = {
  onShow: () => {},
  onHide: () => {},
  show: false,
  animationDuration: DEFAULT_ANIMATION_DURATION,
  overlayOpacity: 0.3,
  children: null,
};

class ActionSheet extends Component {
  props: Props

  static defaultProps = defaultProps

  constructor(props) {
    super(props);

    this.state = {
      show: props.show,
      actionSheetState: ACTION_SHEET_CLOSED,
      // animation: new Animation(0),
      transformOffsetY: new Animated.Value(INITIAL_POSITION),
    };


    this.animation = new Animation(INITIAL_POSITION);
  }

  componentDidMount() {
    if (this.props.show) {
      this.show();
    }
  }

  doAnimation(toValue, onFinished?: Function = () => {}) {
    const { animationDuration } = this.props;

    Animated.timing(this.state.transformOffsetY, {
      toValue,
      duration: animationDuration,
      easing: Easing.inOut(Easing.quad),
    }).start(onFinished);
  }

  onOverlayPress = () => {
    this.hide();
  }

  setActionSheetState(toValue: number, callback?: Function = () => {}): void {
    const { animationDuration } = this.props;
    const isClosed = (this.state.actionSheetState === ACTION_SHEET_CLOSED);

    let actionSheetState = isClosed ? ACTION_SHEET_OPENING : ACTION_SHEET_CLOSING;

    this.setState({ actionSheetState });

    this.animation.toValue(toValue, animationDuration, () => {
      const isClosing = (this.state.actionSheetState === ACTION_SHEET_CLOSING);
      actionSheetState = isClosing ? ACTION_SHEET_CLOSED : ACTION_SHEET_OPENED;

      this.setState({ actionSheetState });
      callback();
    });
  }

  show = (callback?: Function = () => {}): void => {
    const { onShow } = this.props;

    this.setActionSheetState(SHOW_POSITION);
    onShow();
    callback();
  }

  hide = (callback?: Function = () => {}): void => {
    const { onHide } = this.props;

    this.setActionSheetState(INITIAL_POSITION);
    onHide();
    callback();
  }

  render() {
    const { children, animationDuration, overlayOpacity } = this.props;
    const { actionSheetState } = this.state;

    const overlayShow = [ACTION_SHEET_OPENED, ACTION_SHEET_OPENING].includes(actionSheetState);
    const hidden = actionSheetState === ACTION_SHEET_CLOSED && styles.hidden;

    return (
      <View style={[styles.container, hidden]}>
        <AnimatedOverlay
          onPress={this.onOverlayPress}
          overlayShow={overlayShow}
          duration={animationDuration}
          opacity={overlayOpacity}
        />
        <Animated.View
          style={[styles.contentContainer, this.animation.animations]}
        >
          <ScrollView style={styles.scrollView}>
            {children}
          </ScrollView>
        </Animated.View>
      </View>
    );
  }
}

export default ActionSheet;
