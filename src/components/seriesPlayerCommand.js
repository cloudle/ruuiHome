import React, { Component } from 'react';
import { StyleSheet, Animated, Easing, View, TouchableOpacity, Text, } from 'react-native';

import { VideoPlayIcon } from './svgs';
import { colors } from '../utils';
import { Style, } from '../typeDefinition';

type Props = {
	style?: Style,
	headingTextStyle?: Style,
	activeColor?: String,
	lightColor?: String,
	highlightColor?: String,
	backgroundColor?: String,
	timeTextStyle?: Style,
	title?: String,
	length?: Number | String,
};

export default class SeriesPlayerCommand extends Component {
	props: Props;
	static defaultProps = {
		activeColor: colors.main,
	};

	constructor(props) {
		super(props);
		this.state = {
			focusAnimation: new Animated.Value(0),
			mouseInside: false,
		};
	}

	render() {
		const headingTextStyle = {
				color: this.state.mouseInside ? this.props.activeColor : this.props.highlightColor,
			},
			scale = this.state.focusAnimation.interpolate({
				inputRange: [0, 1], outputRange: [1, 1.8],
			}),
			translateX = this.state.focusAnimation.interpolate({
				inputRange: [0, 1], outputRange: [0, -10],
			}),
			circleStyle = {
				backgroundColor: this.props.backgroundColor,
				borderColor: this.state.mouseInside ? colors.main : this.props.lightColor,
				transform: [{ scale }],
			},
			touchableContainerStyle = {
				transform: [{ translateX }],
			};

		return <View
			onMouseEnter={this.onMouseEnter}
			onMouseLeave={this.onMouseLeave}
			style={[styles.container, this.props.style]}>
			<Animated.View style={[styles.circle, circleStyle]}>
				{this.state.mouseInside &&
					<VideoPlayIcon
						size={22} strokeWidth={0}
						color={colors.main} opacity={0.8}/>}
			</Animated.View>
			<Animated.View style={touchableContainerStyle}>
				<TouchableOpacity
					activeOpacity={0.75}
					style={{ flexDirection: 'row', alignItems: 'center', }}>
					<Text style={[this.props.headingTextStyle, headingTextStyle]}>{this.props.title}</Text>
					<VideoPlayIcon
						size={18} strokeWidth={1} triangleScale={0.9}
						color={this.props.lightColor}/>
					<Text style={[this.props.timeTextStyle, {
						color: this.props.lightColor, }]}>{this.props.length} MIN</Text>
				</TouchableOpacity>
			</Animated.View>
		</View>;
	}

	onMouseEnter = () => {
		this.setState({ mouseInside: true });
		this.playFocusAnimation(1);
	};

	onMouseLeave = () => {
		this.setState({ mouseInside: false });
		this.playFocusAnimation(0);
	};

	playFocusAnimation = (toValue, callback) => {
		Animated.timing(this.state.focusAnimation, {
			toValue,
			duration: 500,
			easing: Easing.in(Easing.bezier(0.23, 1, 0.32, 1)),
		}).start(callback);
	};
}

const circleSize = 12;
const styles = StyleSheet.create({
	container: {
		flexDirection: 'row', alignItems: 'center',
		marginBottom: 36, paddingLeft: 30,
	},
	circle: {
		position: 'absolute', left: -7,
		alignItems: 'center',
		width: circleSize, height: circleSize,
		borderWidth: 2, borderRadius: circleSize / 2,
		borderColor: 'rgba(0, 0, 0, 0.3)',
		backgroundColor: '#ffffff',
	}
});
