// @flow

import React, { Component } from 'react';
import { View, Animated, StyleSheet, ScrollView, Dimensions } from 'react-native';
import AnimatedOverlay from 'react-native-animated-overlay';

import Animation from './Animation';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

// action sheet states
const ACTION_SHEET_OPENING: string = 'opening';
const ACTION_SHEET_OPENED: string = 'opened';
const ACTION_SHEET_CLOSING: string = 'closing';
const ACTION_SHEET_CLOSED: string = 'closed';

const DEFAULT_ANIMATION_DURATION: number = 250;

const INITIAL_TOP_POSITION: number = -180;
const INITIAL_BOTTOM_POSITION: number = HEIGHT * -1;


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'white',
  },
  contentContainer: {
    width: WIDTH,
    position: 'absolute',
    backgroundColor: 'white',
  },
  scrollView: {
  },
});

type Props = {
  onShow?: () => void;
  onHide?: () => void;
  show?: boolean;
  animationDuration?: number;
  overlayOpacity?: number;
  position?: 'top' | 'bottom';
  children?: any;
};

const defaultProps = {
  onShow: () => {},
  onHide: () => {},
  show: false,
  animationDuration: DEFAULT_ANIMATION_DURATION,
  overlayOpacity: 0.3,
  position: 'top',
  children: null,
};

class ActionSheet extends Component {
  props: Props

  static defaultProps = defaultProps

  constructor(props: Props) {
    super(props);

    this.state = {
      show: props.show,
      actionSheetState: ACTION_SHEET_CLOSED,
      actionSheetAnimation: new Animation(this.hideActionSheetPosition),
    };
  }

  componentDidMount() {
    if (this.props.show) {
      this.show();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.show !== nextProps.show) {
      if (nextProps.show) {
        this.show();
      } else {
        this.hide();
      }
    }
  }

  get showActionSheetPosition(): string {
    const { position } = this.props;
    if (position === 'top') {
      return INITIAL_TOP_POSITION * -1;
    }
    return 0;
  }

  get hideActionSheetPosition(): string {
    const { position } = this.props;
    if (position === 'top') {
      return INITIAL_TOP_POSITION;
    }
    return INITIAL_BOTTOM_POSITION * -1;
  }

  setActionSheetState(toValue: number, callback?: Function = () => {}): void {
    const { animationDuration } = this.props;
    const isClosed = (this.state.actionSheetState === ACTION_SHEET_CLOSED);

    let actionSheetState = isClosed ? ACTION_SHEET_OPENING : ACTION_SHEET_CLOSING;

    this.setState({ actionSheetState });

    this.state.actionSheetAnimation.toValue(toValue, animationDuration, () => {
      const isClosing = (this.state.actionSheetState === ACTION_SHEET_CLOSING);
      actionSheetState = isClosing ? ACTION_SHEET_CLOSED : ACTION_SHEET_OPENED;

      this.setState({ actionSheetState });
      callback();
    });
  }

  onOverlayPress = (): void => {
    this.hide();
  }

  show = (callback?: Function = () => {}): void => {
    if ([ACTION_SHEET_OPENING, ACTION_SHEET_OPENED].includes(this.state.actionSheetState)) {
      return;
    }

    const { onShow } = this.props;

    this.setState({ show: true });
    this.setActionSheetState(this.showActionSheetPosition);
    onShow();
    callback();
  }

  hide = (callback?: Function = () => {}): void => {
    if ([ACTION_SHEET_CLOSING, ACTION_SHEET_CLOSED].includes(this.state.actionSheetState)) {
      return;
    }

    const { onHide } = this.props;

    this.setState({ show: false });
    this.setActionSheetState(this.hideActionSheetPosition);
    onHide();
    callback();
  }

  render() {
    const { children, animationDuration, overlayOpacity, position } = this.props;
    const { actionSheetState, actionSheetAnimation: { animations } } = this.state;

    const overlayShow = [ACTION_SHEET_OPENED, ACTION_SHEET_OPENING].includes(actionSheetState);
    const pointerEvents = (actionSheetState === ACTION_SHEET_OPENED) ? 'auto' : 'none';

    const contentPosition = (position === 'top')
      ? { top: INITIAL_TOP_POSITION }
      : { bottom: INITIAL_BOTTOM_POSITION };

    const scrollView = (position === 'top')
      ? { paddingTop: 30 }
      : null;

    return (
      <View style={[styles.container]}>
        <AnimatedOverlay
          onPress={this.onOverlayPress}
          overlayShow={overlayShow}
          duration={animationDuration}
          opacity={overlayOpacity}
          pointerEvents={pointerEvents}
        />
        <Animated.View
          style={[styles.contentContainer, contentPosition, animations]}
        >
          <ScrollView style={[styles.scrollView, scrollView]}>
            {children}
          </ScrollView>
        </Animated.View>
      </View>
    );
  }
}

export default ActionSheet;
