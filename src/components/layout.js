import React, { Component } from 'react';
import { Animated, ScrollView, Text, StyleSheet } from 'react-native';
import { enterAnimation } from 'react-universal-ui';

import Navigation from './navigation';
import { colors, sizes, } from '../utils';
import type { Element, Style } from '../typeDefinition';

type Props = {
	children?: Element,
	style?: Style,
	home?: Boolean,
};

@enterAnimation()

export default class ApplicationLayout extends Component {
	props: Props;

	render() {
		const opacity = this.state.enterAnimation.interpolate({
				inputRange: [0, 1], outputRange: [0.5, 1],
			}),
			wrapperStyle = {
				opacity,
				marginTop: this.props.home ? 0 : sizes.navigationHeight,
			},
			navigationContainerStyle = this.props.home ? {
				backgroundColor: 'transparent',
			} : {};

		return <Animated.View style={[styles.container, wrapperStyle, this.props.style]}>
			<Navigation style={navigationContainerStyle}/>
			<ScrollView>
				{this.props.children}
			</ScrollView>
		</Animated.View>;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});