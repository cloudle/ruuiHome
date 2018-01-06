import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native';

import { sizes, colors } from '../../utils';
import { Style, Element, } from '../../typeDefinition';

type Props = {
	onPress?: Function,
	style?: Style,
	children?: Element,
	title?: String,
};

export default class NavigationItem extends Component {
	props: Props;

	render() {
		return <TouchableOpacity
			className="navigation-item"
			style={styles.container}>
			{this.renderContent()}
		</TouchableOpacity>;
	}

	renderContent = () => {
		return this.props.children || <Text className="title" style={styles.titleText}>
			{this.props.title}
		</Text>;
	}
}

const styles = StyleSheet.create({
	container: {
		height: sizes.navigationHeight,
		alignItems: 'center', justifyContent: 'center',
		marginHorizontal: 10,
	},
	titleText: {
		fontSize: 12, color: '#dadeeb',
	},
});