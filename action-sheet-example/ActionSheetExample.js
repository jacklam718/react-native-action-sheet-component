import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { ActionSheet, ActionSheetItem, Separator } from 'react-native-action-sheet-component';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class ActionSheetExample extends Component {
  constructor(props) {
    super(props);
  }

  showActionSheet = () => {
    this.actionSheet.show();
  }

  hideActionSheet = () => {
    this.actionSheet.hide();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.showActionSheet}>
          <Text>
            Show Action Sheet
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.hideActionSheet}>
          <Text>
            Hide Action Sheet
          </Text>
        </TouchableOpacity>

        <ActionSheet
          ref={(actionSheet) => { this.actionSheet = actionSheet; }}
        >
          <ActionSheetItem
            text="Hello"
            selected
            // icon={require('./src/img/checkmark.png')}
          />
          <Separator />
          <ActionSheetItem
            text="Hello"
            selected
            // icon={require('./src/img/checkmark.png')}
          />
          <Separator />
        </ActionSheet>
      </View>
    );
  }
}
