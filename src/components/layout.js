import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import { enterAnimation } from 'react-universal-ui';
import { debounce } from 'lodash';

import Navigation from './navigation';
import Footer from './footer';
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

	componentDidMount() {
		new WOW().init();
	}

	render() {
		const opacity = this.state.enterAnimation.interpolate({
				inputRange: [0, 1], outputRange: [0.5, 1],
			}),
			wrapperStyle = {
				marginTop: this.props.home ? 0 : sizes.navigationHeight,
			},
			animatedStyle = { opacity, minHeight: 1000, };

		return <View style={[styles.container, wrapperStyle, this.props.style]}>
			<Navigation home={this.props.home}/>
			<Animated.View style={animatedStyle}>
				{this.props.children}
			</Animated.View>
			<Footer/>
		</View>;
	}
}

const styles = StyleSheet.create({
	container: {

	},
});