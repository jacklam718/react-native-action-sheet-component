// @flow

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';

const DEFAULT_SELECTED_ICON: number = require('./img/checkmark.png');

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  itemIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  selectedIcon: {
    width: 18,
    height: 18,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Props = {
  text: any;
  value?: any;
  index?: number;
  icon?: any;
  selectedIcon?: any;
  selected?: boolean;
  onPress?: () => void;
  style?: any;
}

const defaultProps = {
  value: null,
  icon: null,
  index: null,
  selectedIcon: DEFAULT_SELECTED_ICON,
  selected: false,
  onPress: () => {},
  style: null,
};

function ActionSheetItem({ text, value, index, onPress, style, icon, selectedIcon, selected }: Props) {
  let iconOnSelected;
  let itemIcon;

  if (selected) {
    if (['number', 'string'].includes(typeof selectedIcon)) {
      iconOnSelected = <Image source={selectedIcon} style={styles.selectedIcon} />;
    } else {
      iconOnSelected = selectedIcon;
    }
  }

  if (['number', 'string'].includes(typeof icon)) {
    itemIcon = <Image source={icon} style={styles.itemIcon} />;
  } else {
    itemIcon = icon;
  }

  return (
    <TouchableHighlight
      onPress={() => {
        onPress(value, index);
      }}
      underlayColor="#EDEDED"
    >
      <View style={[styles.container, style]}>
        <View style={styles.itemContent}>
          {itemIcon}
          <Text style={styles.text}>
            {text}
          </Text>
        </View>
        <View style={styles.itemContent}>
          {iconOnSelected}
        </View>
      </View>
    </TouchableHighlight>
  );
}

ActionSheetItem.defaultProps = defaultProps;

export default ActionSheetItem;
