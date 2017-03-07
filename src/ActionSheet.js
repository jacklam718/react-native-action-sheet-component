// @flow

import React, { Component, Children, cloneElement, type ReactElement } from 'react';
import { View, Animated, StyleSheet, ScrollView, Dimensions } from 'react-native';
import AnimatedOverlay from 'react-native-animated-overlay';
import _ from 'lodash';

import Separator from './Separator';
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
  position?: 'top' | 'bottom';
  onChange?: () => void;
  multiple?: boolean;
  showSparator?: boolean;
  value?: any;
  defaultValue?: any;
  hideOnSelceted?: boolean;
  children?: any;
};

const defaultProps = {
  onShow: () => {},
  onHide: () => {},
  show: false,
  animationDuration: DEFAULT_ANIMATION_DURATION,
  overlayOpacity: 0.3,
  position: 'top',
  onChange: () => {},
  multiple: false,
  showSparator: true,
  value: null,
  defaultValue: null,
  hideOnSelceted: true,
  children: null,
};

class ActionSheet extends Component {
  props: Props

  static defaultProps = defaultProps

  constructor(props: Props) {
    super(props);

    let initValue = (props.value || props.defaultValue);
    initValue = Array.isArray(initValue)
      ? initValue
      : (initValue === null && []) || [initValue];

    this.state = {
      show: props.show,
      selectedData: initValue,
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
    if (this.props.position !== nextProps.position) {
      this.setState({ actionSheetAnimation: new Animation(this.hideActionSheetPosition) });
    }

    if (this.props.show !== nextProps.show) {
      if (nextProps.show) {
        this.show();
      } else {
        this.hide();
      }
    }


    if (!_.isEqual(this.props.value, nextProps.value)) {
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

  onOverlayPress = (): void => {
    this.hide();
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

  onItemPress(value, index): void {
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

  isItemSelected(index): boolean {
    return !!this.state.selectedData[index];
  }

  renderItems(): ReactElement {
    const { children, showSparator } = this.props;
    const separator = showSparator ? <Separator /> : null;

    return Children.map(children, (child) => {
      const index = this.state.selectedData.indexOf(child.value);
      const item = cloneElement(child, {
        index,
        selected: this.state.selectedData.includes(child.props.value),
        onPress: (selectedValue, selectedIndex) => {
          child.props.onPress(selectedValue, selectedIndex);
          this.onItemPress(selectedValue, selectedIndex);
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
    const { animationDuration, overlayOpacity, position } = this.props;
    const { actionSheetState, actionSheetAnimation: { animations } } = this.state;

    const overlayShow = [ACTION_SHEET_OPENED, ACTION_SHEET_OPENING].includes(actionSheetState);
    const pointerEvents = (actionSheetState === ACTION_SHEET_OPENED) ? 'auto' : 'none';
    const hidden = actionSheetState === ACTION_SHEET_CLOSED && styles.hidden;

    const actionSheetPosition = (position === 'top')
      ? { top: INITIAL_TOP_POSITION }
      : { bottom: INITIAL_BOTTOM_POSITION };

    const scrollView = (position === 'top')
      ? { paddingTop: 30 }
      : null;

    return (
      <View style={[styles.container, hidden]}>
        <AnimatedOverlay
          onPress={this.onOverlayPress}
          overlayShow={overlayShow}
          duration={animationDuration}
          opacity={overlayOpacity}
          pointerEvents={pointerEvents}
        />
        <Animated.View
          style={[styles.contentContainer, actionSheetPosition, animations]}
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
