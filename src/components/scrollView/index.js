import React, { Component } from 'react';
import { Animated, Easing, PanResponder, View, Text, StyleSheet, ScrollView as NativeScrollView } from 'react-native';
import { utils } from 'react-universal-ui';
import type { Element, Style } from '../../typeDefinition';

const animationThrottle = 16;
type Props = {
	children?: Element,
	style?: Style,
	contentContainerStyle?: Style,
	onScroll?: Function,
	onLayout?: Function,
	onContentSizeChange?: Function,
	scrollEventThrottle?: Number,
};

export default class ScrollView extends Component {
	props: Props;
	static defaultProps = {
		scrollEventThrottle: animationThrottle,
	};

	constructor(props) {
		super(props);
		this.state = {
			containerWidth: 0,
			containerHeight: 0,
			contentWidth: 0,
			contentHeight: 0,
			indicatorHeight: 0,
		};

		this.yScrollAnimation = new Animated.Value(0);
		this.contentOffset = { x: 0, y: 0 };
		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderStart: this.onPanResponderStart,
			onPanResponderRelease: this.onPanResponderRelease,
			onPanResponderMove: this.onPanResponderMove,
		});
	}

	render() {
		const { style, ...rest } = this.props;

		return <View
			style={style}
			ref={(instance) => { this.container = instance; }}
			onLayout={this.onLayout}>
			<NativeScrollView
				{...rest}
				ref={(instance) => { this.scroll = instance; }}
				className="scroll-view"
				onScroll={this.onScroll}
				onContentSizeChange={this.onContentSizeChange}>
				{this.props.children}
			</NativeScrollView>
			{this.renderScrollIndicator()}
		</View>;
	}

	renderScrollIndicator = () => {
		const indicatorHeight = (this.state.containerHeight ** 2) / this.state.contentHeight,
			translateY = this.yScrollAnimation.interpolate({
				inputRange: [0, 1],
				outputRange: [0, this.state.containerHeight - indicatorHeight],
			}),
			indicatorColor = this.state.draggingHandler ? '#cccccc' : '#dbdbdb',
			indicatorStyle = {
				backgroundColor: indicatorColor,
				height: indicatorHeight,
				transform: [{ translateY }]
			};

		return <View style={styles.scrollIndicatorContainer}>
			<Animated.View
				{...this.panResponder.panHandlers}
				style={[styles.scrollIndicator, indicatorStyle]}/>
		</View>;
	};

	onScroll = (e) => {
		this.props.onScroll && this.props.onScroll(e);

		const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent,
			totalHeightSpace = contentSize.height - layoutMeasurement.height,
			totalWidthSpace = contentSize.width - layoutMeasurement.width,
			yScrollProgress = contentOffset.y / totalHeightSpace,
			xScrollProgress = contentOffset.x / totalWidthSpace;

		this.contentOffset = contentOffset;
		Animated.timing(this.yScrollAnimation, {
			toValue: yScrollProgress, easing: Easing.linear(),
			duration: 0,
		}).start();
	};

	onLayout = ({ nativeEvent }) => {
		this.setState({
			containerWidth: nativeEvent.layout.width,
			containerHeight: nativeEvent.layout.height,
		});
	};

	onContentSizeChange = (contentWidth, contentHeight) => {
		this.setState({ contentWidth, contentHeight, });
	};

	onPanResponderStart = () => {
		this.setState({ draggingHandler: true });
		this.draggingOffset = {
			x: this.contentOffset.x,
			y: this.contentOffset.y,
		};
	};

	onPanResponderRelease = (e, gestureState) => {
		this.setState({ draggingHandler: false });
	};

	onPanResponderMove = (e, gestureState) => {
		this.scroll.scrollTo({
			x: this.draggingOffset.x,
			y: this.draggingOffset.y + gestureState.dy,
			animated: false,
		});
	};
}

const indicatorWidth = 6;
const styles = StyleSheet.create({
	scrollIndicatorContainer: {
		position: 'absolute', top: 0, right: 0, bottom: 0,
		width: indicatorWidth,
		backgroundColor: '#ebebeb',
	},
	scrollIndicator: {
		position: 'absolute', top: 0, right: 0,
		width: indicatorWidth, borderRadius: indicatorWidth / 2,
		backgroundColor: '#dbdbdb',
	},
});