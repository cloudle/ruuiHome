import React, { Component } from 'react';
import { Image, View, ScrollView, Text, StyleSheet } from 'react-native';

import { Style, Element } from '../typeDefinition';

type Props = {
	style?: Style,
	children?: Element,
	fakeNavigator?: {
		color?: String,
		height?: Number,
	},
};

export default class MobileEmulator extends Component {
	props: Props;

	render() {
		return <View style={[styles.container, this.props.style]}>
			{this.props.children}
			{this.renderFakeNavigator()}
			<Image
				resizeMode={Image.resizeMode.contain}
				style={styles.statusBar}
				source={{ uri: '/img/ios-statusbar-light.png' }}/>
		</View>;
	}

	renderFakeNavigator = () => {
		if (this.props.fakeNavigator) {
			const color = this.props.fakeNavigator.color || 'red',
				height = this.props.fakeNavigator.height || 64,
				containerStyle = { color, height };

			return <View style={[styles.headingContainer, containerStyle]}/>;
		} return null;
	};
}

const emulatorSize = {
	width: 320, height: 568,
};

const styles = StyleSheet.create({
	container: {
		...emulatorSize,
		borderRadius: 3,
		overflow: 'hidden',
		backgroundColor: '#202434',
	},
	statusBar: {
		position: 'absolute',
		top: 0, left: 0, right: 0,
		height: 24,
	},
	fakeNavigatorContainer: {
		position: 'absolute', top: 0, left: 0, right: 0, height: 64,
	},
});