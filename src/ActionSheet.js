// @flow

import React, { Component, Children, cloneElement, type ReactElement } from 'react';
import { View, Animated, StyleSheet, ScrollView, Dimensions } from 'react-native';
import AnimatedOverlay from 'react-native-animated-overlay';

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
  multi?: boolean;
  showSparator?: boolean;
  defaultSelected: any;
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
  multi: false,
  showSparator: true,
  defaultSelected: null,
  hideOnSelceted: true,
  children: null,
};

class ActionSheet extends Component {
  props: Props

  static defaultProps = defaultProps

  constructor(props: Props) {
    super(props);

    // set default selected
    const { defaultSelected } = props;
    const selectedData = {};
    props.children.forEach((child, index) => {
      (Array.isArray(defaultSelected) ? defaultSelected : [defaultSelected]).forEach((selected) => {
        if (child.props.value === selected) {
          if (props.multi) {
            selectedData[index] = child.props.value;
          } else if (Object.keys(selectedData).length === 0) {
            selectedData[index] = child.props.value;
          }
        }
      });
    });


    this.state = {
      show: props.show,
      selectedData,
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

    nextProps.children.forEach((child, index) => {
      if (child.props.selected && !this.state.selectedData[index]) {
        const selectedData = { ...this.state.selectedData };
        selectedData[index] = child.props.value;
        this.setState({ selectedData });
      }
    });
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

    if (this.state.selectedData[index]) {
      this.unselectItem(value, index);
      return;
    }

    this.selectItem(value, index);
  }

  selectItem(value, index) {
    const { multi: isMultiSelect, onChange } = this.props;
    let selectedData;

    if (isMultiSelect) {
      selectedData = { ...this.state.selectedData };
    } else {
      selectedData = {};
    }

    selectedData[index] = value;
    this.setState({ selectedData });
    onChange(value, index);
  }

  unselectItem(value, index) {
    const { multi: isMultiSelect, onChange } = this.props;
    let selectedData;

    if (isMultiSelect) {
      selectedData = { ...this.state.selectedData };
      delete selectedData[index];
    } else {
      selectedData = {};
    }

    this.setState({ selectedData });
    onChange(value, index);
  }

  isItemSelected(index): boolean {
    return !!this.state.selectedData[index];
  }

  renderItems(): ReactElement {
    const { children, showSparator } = this.props;
    const separator = showSparator ? <Separator /> : null;

    return Children.map(children, (child, index) => {
      const item = cloneElement(child, {
        index,
        selected: child.props.selected || this.isItemSelected(index),
        onPress: (value, selectedIndex) => {
          child.props.onPress(value, selectedIndex);
          this.onItemPress(value, selectedIndex);
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

    const contentPosition = (position === 'top')
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
          style={[styles.contentContainer, contentPosition, animations]}
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
