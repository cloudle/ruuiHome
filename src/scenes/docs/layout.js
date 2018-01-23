import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import { connect, enterAnimation } from 'react-universal-ui';

import Navigation from '../../components/navigation';
import DocNavigator from './navigator';
import EmulatorPane from './emulatorPane';
import Footer from '../../components/footer';
import { colors, sizes, } from '../../utils';
import type { Element, Style } from '../../typeDefinition';

type Props = {
	style?: Style,
	children?: Element,
	emulator?: Element,
	dimensions?: Object,
};

@connect(({ app }) => {
	return {
		dimensions: app.dimensions,
	};
})
@enterAnimation()

export default class ApplicationLayout extends Component {
	props: Props;

	render() {
		const opacity = this.state.enterAnimation.interpolate({
				inputRange: [0, 1], outputRange: [0.5, 1],
			}),
			animatedStyle = { opacity, },
			emulatorMargin = this.props.emulator ? { marginRight: sizes.emulatorWidth } : {};

		return <Animated.View style={[styles.container, animatedStyle]}>
			<Navigation logoWidth={sizes.sideBarWidth} style={[emulatorMargin]}/>
			<DocNavigator/>
			{this.props.emulator && <EmulatorPane emulator={this.props.emulator}/>}
			<View style={[styles.contentContainer, emulatorMargin, this.props.style]}>
				{this.props.children}
			</View>
			<Footer
				fullSize
				wrapperStyle={[styles.footerContainer, emulatorMargin]}
				innerStyle={{ paddingHorizontal: 16, }}/>
		</Animated.View>;
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: sizes.navigationHeight,
	},
	contentContainer: {
		minHeight: 1000,
		marginLeft: sizes.sideBarWidth,
	},
	footerContainer: {
		marginLeft: sizes.sideBarWidth,
	},
});