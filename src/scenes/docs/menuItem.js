import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, } from 'react-native';

import { baseStyles } from '../../utils';

type Props = {
	title?: String,
	url?: String,
	childItems?: Array<{
		title?: String,
		url?: String,
	}>,
};

export default class DocMenuItem extends Component {
	props: Props;

	render() {
		return <View style={styles.container}>
			<TouchableOpacity className="doc-menu-item">
				<Text className="title" style={styles.titleText}>{this.props.title}</Text>
			</TouchableOpacity>
			{this.props.childItems && this.renderChildMenu()}
		</View>;
	}

	renderChildMenu = () => {
		return <View style={styles.childMenuContainer}>
			{this.props.childItems.map((menuItem) => {
				return <TouchableOpacity key={this.props.url + menuItem.url} className="doc-menu-item">
					<Text className="title" style={styles.childTitleText}>{menuItem.title}</Text>
				</TouchableOpacity>;
			})}
		</View>;
	};
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 12,
	},
	titleText: {
		...baseStyles.text,
		color: '#555555', fontSize: 14, fontWeight: '700',
		marginBottom: 6,
	},
	childMenuContainer: {
		paddingLeft: 10,
	},
	childTitleText: {
		...baseStyles.text, color: '#555555', fontSize: 14, paddingVertical: 5,
	},
});