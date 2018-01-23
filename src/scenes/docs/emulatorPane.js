import React, { Component } from 'react';
import { Animated, Easing, StyleSheet, View, Text, } from 'react-native';
import { enterAnimation } from 'react-universal-ui';

import MobileEmulator from '../../components/mobileEmulator';
import { sizes } from '../../utils';
import { Style, Element } from '../../typeDefinition';

type Props = {
	style?: Style,
	emulator?: Element,
};

@enterAnimation({ speed: 500, easing: Easing.out(Easing.back(1.4)) })

export default class EmulatorPane extends Component {
	props: Props;

	render() {
		const emulatorTranslate = this.state.enterAnimation.interpolate({
				inputRange: [0, 1], outputRange: [100, 0],
			}),
			headerTranslate = this.state.enterAnimation.interpolate({
				inputRange: [0, 1], outputRange: [-100, 0],
			}),
			headingContainer = { transform: [{ translateY: headerTranslate }] },
			emulatorContainer = { transform: [{ translateY: emulatorTranslate }] };

		return <View style={[styles.container, this.props.style]}>
			<Animated.View style={[styles.headingContainer]}/>
			<Animated.View style={[styles.emulatorContainer, emulatorContainer]}>
				<MobileEmulator>
					{this.props.emulator}
				</MobileEmulator>
			</Animated.View>
		</View>;
	}
}

const styles = StyleSheet.create({
	container: {
		zIndex: 19, position: 'fixed', top: 0, right: 0, bottom: 0,
		width: sizes.emulatorWidth, backgroundColor: '#343542',
		alignItems: 'center',
	},
	headingContainer: {
		// backgroundColor: '#de4f4f', height: 2,
		width: 320, height: sizes.navigationHeight - 30,
		backgroundColor: '#202434',
		borderBottomLeftRadius: 3, borderBottomRightRadius: 3,
	},
	emulatorContainer: {
		marginTop: 8,
	},
});