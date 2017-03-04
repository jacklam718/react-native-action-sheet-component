// @flow

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';

const selectedIcon = require('./img/checkmark.png');

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
  },
});

type Props = {
  text: any;
  icon?: any;
  selectedIcon?: any;
  selected?: boolean;
  onPress?: () => void;
  style?: any;
}

const defaultProps = {
  icon: null,
  selectedIcon,
  selected: false,
  onPress: () => {},
  style: null,
};

function ActionSheetItem({ onPress, style, icon, text, selectedIcon, selected }: Props) {
  let iconOnSelected;
  if (selected) {
    iconOnSelected = (
      <Image source={selectedIcon} style={styles.selectedIcon} />
    );
  }

  const itemIcon = icon ? (
    <Image source={icon} style={styles.itemIcon} />
  ) : null;

  return (
    <TouchableHighlight onPress={onPress} underlayColor="#EDEDED">
      <View style={[styles.container, style]}>
        <View style={styles.itemContent}>
          {itemIcon}
          <Text style={styles.text}>
            {text}
          </Text>
        </View>
        <View>
          {iconOnSelected}
        </View>
      </View>
    </TouchableHighlight>
  );
}

ActionSheetItem.defaultProps = defaultProps;

export default ActionSheetItem;
