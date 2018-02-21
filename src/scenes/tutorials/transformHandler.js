import React, { Component } from 'react';
import { StyleSheet, View, Text, PanResponder, } from 'react-native';

import { Style } from '../../typeDefinition';

type Props = {
	style?: Style,
	onDragStart?: Function,
	onDrag?: Function,
	onDragRelease?: Function,
};

export default class TransformHandler extends Component {
	props: Props;

	constructor(props) {
		super(props);
		this.state = {
			dragging: false,
		};
		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderStart: this.onPanResponderStart,
			onPanResponderRelease: this.onPanResponderRelease,
			onPanResponderMove: this.onPanResponderMove,
		});
	}

	render() {
		const draggingStyle = this.state.dragging ? { backgroundColor: '#999999' } : {};

		return <View
			hitSlop={{ top: -3, left: -3, right: -3, bottom: -3 }}
			style={[this.props.style, draggingStyle]}
			{...this.panResponder.panHandlers}/>;
	}

	onPanResponderStart = () => {
		this.setState({ dragging: true, });
		if (this.props.onDragStart) this.props.onDragStart();
	};

	onPanResponderRelease = (e, gestureState) => {
		this.setState({ dragging: false });
		if (this.props.onDragRelease) this.props.onDragRelease();
	};

	onPanResponderMove = (e, gestureState) => {
		if (this.props.onDrag) this.props.onDrag(gestureState);
	};
}

const styles = StyleSheet.create({
	container: {

	},
});