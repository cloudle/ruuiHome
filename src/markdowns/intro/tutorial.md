# Tutorial

### Basic usage

```jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Button } from 'react-universal-ui';

export default class RuuiExample extends React.Component {
	render() {
		return <View style={styles.container}>
		  <Text> This is your first Ruui Application</Text>
		  <Button 
		    title="This is the Button" 
		    wrapperStyle={{ marginTop: 10 }}
		  />
      		</View>
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
```