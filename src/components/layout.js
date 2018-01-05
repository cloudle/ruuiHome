import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Navigation from './navigation';
import type { Element, Style } from '../typeDefinition';

type Props = {
	children?: Element,
	style?: Style,
};

export default class ApplicationLayout extends Component {
	props: Props;

	render() {
		return <View style={[styles.container, this.props.style]}>
			<Navigation/>
			{this.props.children}
		</View>;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});