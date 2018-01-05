import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { sizes } from '../../utils';

export default class NavigationBar extends Component {
	render() {
		return <View style={styles.container}>
			{this.renderLogo()}
			{this.renderNavigation()}
		</View>;
	}

	renderLogo = () => {
		return <View>
			<Text>Logo</Text>
		</View>;
	};

	renderNavigation = () => {
		return <View>
			<Text>Navigation</Text>
		</View>;
	};
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: sizes.navigationHeight,
		borderWidth: 1, borderColor: '#dedede',
	},
});