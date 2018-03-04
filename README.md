## React Native Action Sheet Component
React Native Action Sheet Component for iOS & Android.

Pull request are welcomed. Please follow the Airbnb style guide [Airbnb JavaScript](https://github.com/airbnb/javascript)

[Try it with Exponent](https://exp.host/@jacklam718/action-sheet-example)

#### Preview
<img src="https://raw.githubusercontent.com/jacklam718/react-native-action-sheet-component/master/.github/action-sheet.gif" width="300">
<img src="https://raw.githubusercontent.com/jacklam718/react-native-action-sheet-component/master/.github/action-sheet.png" width="300">


## Installation
##### yarn
`yarn add react-native-action-sheet-component`
##### npm
`npm install --save react-native-action-sheet-component`


## Usage with `ActionSheetManager`
```javascript
import { EvilIcons, Ionicons } from '@exponent/vector-icons';
import ActionSheetManager { ActionSheet, ActionSheetItem } from 'react-native-action-sheet-component';
```

##### Options
```javascript
const actionSheetItems = [
  <ActionSheetItem
    key='item-1'
    text="Github"
    value="github"
    selectedIcon={checkedIcon}
    icon={
      <EvilIcons name="sc-github" size={42} />
    }
    onPress={this.onItemPress}
  />,
  <ActionSheetItem
    key='item-2'
    text="Facebook"
    value="facebook"
    selectedIcon={checkedIcon}
    icon={
      <EvilIcons name="sc-facebook" color="#4363A2" size={42} />
    }
    onPress={this.onItemPress}
  />,
];

const options = {
  defaultValue: ['github'],
  children: actionSheetItems,
  onChange: (value, index, selectedData) => {
  },
}
```

##### Show
```javascript
ActionSheetManager.show(options, () => {
  console.log('callback');
});
```

##### Update
```javascript
ActionSheetManager.update(options, () => {
  console.log('callback');
});
```

##### Hide
```javascript
ActionSheetManager.hide(() => {
  console.log('callback');
});
```


## Usage with `ActionSheet`
```javascript
import { EvilIcons, Ionicons } from '@exponent/vector-icons';
import { ActionSheet, ActionSheetItem } from 'react-native-action-sheet-component';
```

```javascript
class Example extends Component {
  constructor(props) {
    super(props) {

      this.state = {
        defaultSelectedValues: ['github'],
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActionSheet
          ref={(actionSheet) => { this.topActionSheet = actionSheet; }}
          position="top"
          onChange={this.onChange}
          defaultValue={this.state.defaultSelectedValues}
          multiple
        >
          <ActionSheetItem
            text="Github"
            value="github"
            selectedIcon={checkedIcon}
            icon={
              <EvilIcons name="sc-github" size={42} />
            }
            onPress={this.onItemPress}
          />
          <ActionSheetItem
            text="Facebook"
            value="facebook"
            selectedIcon={checkedIcon}
            icon={
              <EvilIcons name="sc-facebook" color="#4363A2" size={42} />
            }
            onPress={this.onItemPress}
          />
        </ActionSheet>
      </View>
    )
  }
}
```


##### Show
```javascript
actionSheet.show(() => {
  console.log('callback - show');
})
```

##### Hide
```javascript
actionSheet.hide(() => {
  console.log('callback - hide');
})
```

## Props
### ActionSheet
| Prop | Type | Default | Note |
|---|---|---|---|
| `value?` | `any` | `null` | | |
| `defaultValue?` | `any` | `null` | | |
| `onShow?` | `Function` | `() => {}` | |
| `onHide?` | `Function` | `() => {}` | |
| `style?` | `any` | `null` | |
| `onChange?` | `Function` | `() => {}` | |
| `show?` | `boolean` | `false` | |
| `showSelectedIcon?` | `boolean` | `true` | | |
| `multiple?` | `boolean` | `false` | |
| `hideOnSelceted?` | `boolean` | `true` | |
| `hideOnHardwareBackPress?` | `boolean` | `true` | |
| `showSparator?` | `boolean` | `true` | |
| `animationDuration?` | `number` | `250` | |
| `overlayOpacity?` | `number` | `0.3` | |
| `position?` | `string` | `top` | |
| `maxHeight?` | `number` | `Dimensions.get('window').height / 2` | |
| `children?` | `any` | `null` | |

### ActionSheetItem
| Prop | Type | Default | Note |
|---|---|---|---|
| `text` | `any` | `null` | | |
| `icon?` | `any` | `null` | | |
| `index?` | `number` | `null` | | |
| `selectedIcon?` | `number` | ` require('./img/checkmark.png')` | | |
| `selected?` | `boolean` | `false` | | |
| `showSelectedIcon?` | `boolean` | `true` | | |
| `onPress?` | `Function` | `() => {}` | | |
| `style?` | `any` | `null` | | |
| `textStyle?` | `any` | `null` | | |
