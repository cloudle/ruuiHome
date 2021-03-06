import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Navigation from '../../components/navigation';
import DocNavigator from './navigator';
import EmulatorPane from './emulatorPane';
import Footer from '../../components/footer';
import { animated } from '../../decorators';
import { colors, sizes, } from '../../utils';
import type { Element, Style } from '../../typeDefinition';

type Props = {
	style?: Style,
	children?: Element,
	emulator?: Element,
	dimensions?: Object,
};

@connect(({ ruui }) => {
	return {
		dimensions: ruui.dimensions,
	};
})
@animated()

export default class ApplicationLayout extends Component {
	props: Props;

	render() {
		const opacity = this.animation.interpolate({
				inputRange: [0, 1], outputRange: [0.5, 1],
			}),
			animatedStyle = { opacity, },
			screenSize = this.props.dimensions.window || {},
			isTablet = screenSize.width && screenSize.width < 1024,
			showEmulator = !isTablet && this.props.emulator,
			emulatorMargin = showEmulator ? { marginRight: sizes.emulatorWidth } : {};

		return <Animated.View style={[styles.container, animatedStyle]}>
			<View style={styles.bodyContainer}>
				<Navigation logoWidth={sizes.sideBarWidth} style={[emulatorMargin]}/>
				<DocNavigator/>
				{showEmulator && <EmulatorPane emulator={this.props.emulator}/>}
				<View
					className="docs-container"
					style={[styles.contentContainer, emulatorMargin, this.props.style]}>
					{this.props.children}
				</View>
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
	bodyContainer: {

	},
	contentContainer: {
		minHeight: 1000,
		marginLeft: sizes.sideBarWidth,
	},
	footerContainer: {
		// marginLeft: sizes.sideBarWidth,
	},
});
