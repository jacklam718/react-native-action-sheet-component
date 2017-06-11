// @flow

import React, { Component, Children, cloneElement, type ReactElement } from 'react';
import { View, Animated, Easing, StyleSheet, ScrollView, Dimensions, BackAndroid } from 'react-native';
import AnimatedOverlay from 'react-native-animated-overlay';
import _ from 'lodash';

import Separator from './Separator';

// action sheet states
const ACTION_SHEET_OPENING: string = 'opening';
const ACTION_SHEET_OPENED: string = 'opened';
const ACTION_SHEET_CLOSING: string = 'closing';
const ACTION_SHEET_CLOSED: string = 'closed';

const DEFAULT_ANIMATION_DURATION: number = 180;

// action sheet positions
const INITIAL_POSITION_BOTTOM: number = -180;
const INITIAL_POSITION_TOP: number = 0;
const TO_POSITION_BOTTOM: number = 180;
const TO_POSITION_TOP: number = -360;

// events
const HARDWARE_BACK_PRESS_EVENT: string = 'hardwareBackPress';

const styles = StyleSheet.create({
  containerTop: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'white',
    top: INITIAL_POSITION_TOP,
  },
  containerBottom: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'white',
    bottom: INITIAL_POSITION_BOTTOM,
  },
  container: {
    position: 'absolute',
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
  },
  contentContainer: {
    flex: 1,
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
  style?: any;
  onChange?: () => void;
  multiple?: boolean;
  showSparator?: boolean;
  value?: any;
  defaultValue?: any;
  hideOnSelceted?: boolean;
  hideOnHardwareBackPress?: boolean;
  children?: any;
};

const defaultProps = {
  onShow: () => {},
  onHide: () => {},
  show: false,
  animationDuration: DEFAULT_ANIMATION_DURATION,
  overlayOpacity: 0.3,
  position: 'bottom',
  style: null,
  onChange: () => {},
  multiple: false,
  showSparator: true,
  value: null,
  defaultValue: null,
  hideOnSelceted: true,
  hideOnHardwareBackPress: true,
  children: null,
};

class ActionSheet extends Component {
  props: Props

  static defaultProps = defaultProps

  constructor(props: Props) {
    super(props);

    const isTop = props.position === 'top';

    let initValue = (props.value || props.defaultValue);
    initValue = Array.isArray(initValue)
      ? initValue
      : (initValue === null && []) || [initValue];

    this.state = {
      show: props.show,
      selectedData: initValue,
      transformOffsetY: new Animated.Value(isTop ? -180 : 0),
      actionSheetState: ACTION_SHEET_CLOSED,
      actionSheetHeight: 0,
    };
  }

  componentDidMount() {
    if (this.props.show) {
      this.show();
    }

    BackAndroid.addEventListener(HARDWARE_BACK_PRESS_EVENT, this.hardwareBackPressHandler);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.show !== nextProps.show) {
      if (nextProps.show) {
        this.show();
      } else {
        this.hide();
      }
    }

    if (nextProps.value && !_.isEqual(this.props.value, nextProps.value)) {
      const selectedData = [];
      nextProps.value.forEach((value) => {
        if (!this.props.multiple && selectedData.length !== 0) {
          return;
        }
        selectedData.push(value);
      });
      this.setState({ selectedData });
    }
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener(HARDWARE_BACK_PRESS_EVENT);
    this.hide();
  }

  onOverlayPress = (): void => {
    if (this.state.actionSheetState === ACTION_SHEET_OPENED) {
      this.hide();
    }
  }

  setActionSheetState(toValue: number, callback?: Function = () => {}): void {
    const { animationDuration: duration } = this.props;
    const isClosed = (this.state.actionSheetState === ACTION_SHEET_CLOSED);
    let actionSheetState = isClosed ? ACTION_SHEET_OPENING : ACTION_SHEET_CLOSING;

    this.setState({ actionSheetState });

    Animated.timing(this.state.transformOffsetY, {
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.quad),
    })
    .start(() => {
      const isClosing = (this.state.actionSheetState === ACTION_SHEET_CLOSING);
      actionSheetState = isClosing ? ACTION_SHEET_CLOSED : ACTION_SHEET_OPENED;

      this.setState({ actionSheetState });
      callback();
    });
  }

  hardwareBackPressHandler = (): boolean => {
    const { hideOnHardwareBackPress } = this.props;

    if (hideOnHardwareBackPress && this.state.show) {
      this.hide();
      return true;
    }

    return false;
  }

  getActionSheetHeight = (e: any): void => {
    const height = e.nativeEvent.layout.height;
    if (height && height !== this.state.actionSheetHeight) {
      this.setState({ actionSheetHeight: height });
    }
  }

  show = (callback?: Function = () => {}): void => {
    if ([ACTION_SHEET_OPENING, ACTION_SHEET_OPENED].includes(this.state.actionSheetState)) {
      return;
    }

    const { onShow, position } = this.props;
    const initialPosition = position === 'top'
      ? INITIAL_POSITION_TOP
      : INITIAL_POSITION_BOTTOM;

    this.setState({ show: true });
    this.setActionSheetState(initialPosition, () => {
      onShow();
      callback();
    });
  }

  hide = (callback?: Function = () => {}): void => {
    if ([ACTION_SHEET_CLOSING, ACTION_SHEET_CLOSED].includes(this.state.actionSheetState)) {
      return;
    }

    const { onHide, position } = this.props;
    const toPosition = position === 'top'
      ? TO_POSITION_TOP
      : TO_POSITION_BOTTOM;

    this.setState({ show: false });
    this.setActionSheetState((toPosition), () => {
      onHide();
      callback();
    });
  }

  onItemPress = (value, index): void => {
    const { hideOnSelceted } = this.props;
    if (hideOnSelceted) {
      this.hide();
    }

    if (Object.values(this.state.selectedData).includes(value)) {
      this.unselectItem(value, index);
      return;
    }

    this.selectItem(value, index);
  }

  selectItem(value, index) {
    const { multiple: isMultiSelect, onChange } = this.props;
    let selectedData = [];

    if (isMultiSelect) {
      selectedData = [...this.state.selectedData];
    }

    selectedData.push(value);
    this.setState({ selectedData });
    onChange(value, index, selectedData);
  }

  unselectItem(value, index) {
    const { multiple: isMultiSelect, onChange } = this.props;
    let selectedData = [];

    if (isMultiSelect) {
      selectedData = [...this.state.selectedData];
      selectedData.splice(index, 1);
    }

    this.setState({ selectedData });
    onChange(value, index, selectedData);
  }

  renderItems(): ReactElement {
    const { children, showSparator } = this.props;

    return Children.map(children, (child) => {
      let separator;
      const selectedIndex = this.state.selectedData.indexOf(child.props.value);

      if (showSparator) {
        separator = <Separator />;
      }

      const item = cloneElement(child, {
        index: selectedIndex,
        selected: this.state.selectedData.includes(child.props.value),
        onPress: (_selectedValue, _selectedIndex) => {
          child.props.onPress(_selectedValue, _selectedIndex);
          this.onItemPress(_selectedValue, _selectedIndex);
        },
      });

      return (
        <View style={{ flex: 1 }}>
          {item}
          {separator}
        </View>
      );
    });
  }

  render() {
    const { animationDuration, overlayOpacity, position, style } = this.props;
    const { actionSheetState, transformOffsetY } = this.state;
    const isTop = position === 'top';

    let overlayShow = false;
    let pointerEvents = 'none';

    if ([ACTION_SHEET_OPENED, ACTION_SHEET_OPENING].includes(actionSheetState)) {
      overlayShow = true;
      pointerEvents = 'auto';
    }

    const width = { width: Dimensions.get('window').width };

    const scrollView = isTop
      ? { paddingTop: 30 }
      : null;

    const actionSheetStyle = isTop
       ? styles.containerTop
       : styles.containerBottom;

    return (
      <View style={[styles.container]}>
        <AnimatedOverlay
          onPress={this.onOverlayPress}
          overlayShow={overlayShow}
          duration={animationDuration}
          opacity={overlayOpacity}
          pointerEvents={pointerEvents}
          useNativeDirver
        />
        <Animated.View
          style={[
            actionSheetStyle,
            style,
            width,
            {
              transform: [{ translateY: transformOffsetY }],
            },
          ]}
          onLayout={this.getActionSheetHeight}
        >
          <ScrollView style={[styles.scrollView, scrollView]}>
            {this.renderItems()}
          </ScrollView>
        </Animated.View>
      </View>
    );
  }
}

export default ActionSheet;
