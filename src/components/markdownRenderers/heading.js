import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Heading extends Component {
	render () {
		const fontSize = 35 - (this.props.level * 4),
			textStyles = { fontSize };

		return <View style={styles.container}>
			<Text style={textStyles}>
				{this.props.children}
			</Text>
		</View>
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 30, marginBottom: 10,
	}
});

