import React, { Component } from 'react';
import { Animated, Easing, PanResponder, StyleSheet, View, Text, } from 'react-native';

import TransformHandlers from './transformHandlers';
import type { Element, Style } from '../../typeDefinition';

type Props = {
	style?: Style,
	children?: Function,
	initialState?: Object,
	minSize?: Object,
};

export default class Transformable extends Component {
	props: Props;
	static defaultProps = {
		minSize: { width: 10, height: 10, },
	};

	constructor(props) {
		super(props);
		this.state = {
			hover: false,
			dragging: false,
			focus: false,
			top: 0, left: 0, width: 100, height: 100,
			...this.props.initialState,
		};
		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderStart: this.onPanResponderStart,
			onPanResponderRelease: this.onPanResponderRelease,
			onPanResponderMove: this.onPanResponderMove,
		});
	}

	render() {
		const { top, left, width, height } = this.state,
			showResizeHandlers = this.state.hover || this.state.focus || this.state.resizing,
			hitSlopExtends = showResizeHandlers ? 5 : 0,
			hitSlop = {
				left: hitSlopExtends,
				top: hitSlopExtends,
				right: hitSlopExtends,
				bottom: hitSlopExtends,
			},
			style = {
				width, height,
				transform: [
					{ translateX: left },
					{ translateY: top },
				],
			};

		return <View
			className="noselect"
			hitSlop={hitSlop}
			style={[styles.container, this.props.style, style]}
			onMouseEnter={this.onMouseEnter}
			onMouseLeave={this.onMouseLeave}
			{...this.panResponder.panHandlers}>
			{this.props.children(this.state)}
			{showResizeHandlers &&
				<TransformHandlers
					rotate={0}
					onResizeStart={this.onResizeStart}
					onResize={this.onResize}
					onResizeRelease={this.onResizeRelease}/>}
		</View>;
	}

	onPanResponderStart = () => {
		this.setState({ dragging: true, });
		this.initialDragPosition = {
			top: this.state.top,
			left: this.state.left,
		};
	};

	onPanResponderRelease = (e, gestureState) => {
		this.setState({ dragging: false });
	};

	onPanResponderMove = (e, gestureState) => {
		this.setState({
			top: this.initialDragPosition.top + gestureState.dy,
			left: this.initialDragPosition.left + gestureState.dx,
		});
	};

	onMouseEnter = () => {
		this.setState({ hover: true });
	};

	onMouseLeave = () => {
		this.setState({ hover: false });
	};

	onResizeStart = () => {
		this.setState({ resizing: true });
		this.intialResizeState = { ...this.state, };
	};

	onResize = (direction, gestureState) => {
		const { top, left, width, height } = this.intialResizeState,
			{ dx, dy } = gestureState;

		if (direction === 'top-left'
			&& (height - dy) > this.props.minSize.height
			&& (width - dx) > this.props.minSize.width) {
			this.setState({ top: top + dy, height: height - dy, left: left + dx, width: width - dx, });
		} else if (direction === 'top-center'
			&& (height - dy) > this.props.minSize.height) {
			this.setState({ top: top + dy, height: height - dy, });
		} else if (direction === 'top-right'
			&& (height - dy) > this.props.minSize.height
			&& (width + dx) > this.props.minSize.width) {
			this.setState({ top: top + dy, height: height - dy, width: width + dx, });
		} else if (direction === 'center-left'
			&& (width - dx) > this.props.minSize.width) {
			this.setState({ left: left + dx, width: width - dx, });
		} else if (direction === 'center-right'
			&& (width + dx) > this.props.minSize.width) {
			this.setState({ width: width + dx, });
		} else if (direction === 'bottom-left'
			&& (height + dy) > this.props.minSize.height
			&& (width - dx) > this.props.minSize.width) {
			this.setState({ height: height + dy, left: left + dx, width: width - dx, });
		} else if (direction === 'bottom-center'
			&& (height + dy) > this.props.minSize.height) {
			this.setState({ height: height + dy, });
		} else if (direction === 'bottom-right'
			&& (height + dy) > this.props.minSize.height
			&& (width + dx) > this.props.minSize.width) {
			this.setState({ height: height + dy, width: width + dx, });
		}
	};

	onResizeRelease = () => {
		this.setState({ resizing: false });
	};
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute', top: 0, left: 0,
	},
});