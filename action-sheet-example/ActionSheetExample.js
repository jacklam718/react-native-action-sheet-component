import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { ActionSheet, ActionSheetItem } from 'react-native-action-sheet-component';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 50,
  },
  buttonText: {
    fontSize: 16,
  },
});

const checkedIcon = <Ionicons name="ios-checkmark-outline" size={30} />;

export default class ActionSheetExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItems: ['item2'],
    };
  }

  showTopActionSheet = () => {
    this.topActionSheet.show();
  }

  showBottomActionSheet = () => {
    this.bottomActionSheet.show();
  }

  onChange = (value, index, values) => {
    console.log(values);
    this.setState({ selectedItems: values });
  }

  onItemPress = (value) => {
    console.log('Press: value -> ', value);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.showTopActionSheet} style={styles.button}>
          <Text style={styles.buttonText}>
            Show Top Action Sheet
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.showBottomActionSheet} style={styles.button}>
          <Text style={styles.buttonText}>
            Show Bottom Action Sheet (Multiple Select)
          </Text>
        </TouchableOpacity>

        <ActionSheet
          ref={(actionSheet) => { this.topActionSheet = actionSheet; }}
          position="top"
          onChange={this.onChange}
        >
          <ActionSheetItem
            text="Github"
            value="item1"
            selectedIcon={checkedIcon}
            icon={
              <EvilIcons name="sc-github" size={42} />
            }
            onPress={this.onItemPress}
          />
          <ActionSheetItem
            text="Facebook"
            value="item2"
            selectedIcon={checkedIcon}
            icon={
              <EvilIcons name="sc-facebook" color="#4363A2" size={42} />
            }
            onPress={this.onItemPress}
          />
        </ActionSheet>

        <ActionSheet
          ref={(actionSheet) => { this.bottomActionSheet = actionSheet; }}
          position="bottom"
          onChange={this.onChange}
          multiple
        >
          <ActionSheetItem
            text="Share"
            value="item1"
            selectedIcon={checkedIcon}
            icon={
              <EvilIcons name="share-google" color="#4B8FF6" size={42} />
            }
            onPress={this.onItemPress}
          />
          <ActionSheetItem
            text="Delete"
            value="item2"
            selectedIcon={checkedIcon}
            icon={
              <EvilIcons name="trash" color="#fa4b4b" size={42} />
            }
            onPress={this.onItemPress}
          />
        </ActionSheet>
      </View>
    );
  }
}
