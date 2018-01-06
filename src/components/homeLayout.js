import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Navigation from './navigation';
import type { Element, Style } from '../typeDefinition';

type Props = {
	children?: Element,
	style?: Style,
};

export default class HomeLayout extends Component {
	props: Props;

	render() {
		return <View style={[styles.container, this.props.style]}>
			<Navigation style={styles.navigationContainer}/>
			{this.props.children}
		</View>;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	navigationContainer: {
		backgroundColor: 'transparent',
	},
});