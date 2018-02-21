import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';

import TransformHandler from './transformHandler';

type Props = {
	rotate?: Number,
	onResizeStart?: Function,
	onResize?: Function,
	onResizeRelease?: Function,
};

export default class TransformHandlers extends Component {
	props: Props;

	constructor(props) {
		super(props);
		this.state = {
			layout: { width: 0, height: 0, },
		};
	}

	render() {
		const { layout } = this.state,
			style = {

			};

		return <View
			onLayout={({ nativeEvent }) => this.setState({ layout: nativeEvent.layout })}
			style={styles.container}>
			{anchors.map((anchor, i) => {
				return <TransformHandler
					key={i}
					onDragStart={this.props.onResizeStart}
					onDrag={this.onDrag.bind(this, anchor.direction)}
					onDragRelease={this.props.onResizeRelease}
					style={[styles.handlerAnchor, { cursor: anchor.cursor }, getAnchorPosition(anchor.direction, layout)]}/>;
			})}
		</View>;
	}

	onDrag = (direction, gestureState) => {
		if (this.props.onResize) {
			this.props.onResize(direction, gestureState);
		}
	};
}

const anchors = [{
	direction: 'top-left',
	cursor: 'nw-resize',
}, {
	direction: 'top-center',
	cursor: 'n-resize',
}, {
	direction: 'top-right',
	cursor: 'ne-resize',
}, {
	direction: 'center-left',
	cursor: 'w-resize',
}, {
	direction: 'center-right',
	cursor: 'e-resize',
}, {
	direction: 'bottom-left',
	cursor: 'sw-resize',
}, {
	direction: 'bottom-center',
	cursor: 's-resize',
}, {
	direction: 'bottom-right',
	cursor: 'se-resize',
}, ];

function getAnchorPosition(direction, { width, height }) {
	const middleHandlerWidth = (width / 2) - (handlerSize / 2),
		middleHandlerHeight = (height / 2) - (handlerSize / 2);

	switch (direction) {
	case 'top-left':
		return { top: -handlerSize / 2, left: -handlerSize / 2, };
	case 'top-center':
		return { top: -handlerSize / 2, left: middleHandlerWidth, };
	case 'top-right':
		return { top: -handlerSize / 2, right: -handlerSize / 2, };
	case 'center-left':
		return { top: middleHandlerHeight, left: -handlerSize / 2, };
	case 'center-right':
		return { top: middleHandlerHeight, right: -handlerSize / 2, };
	case 'bottom-left':
		return { bottom: -handlerSize / 2, left: -handlerSize / 2, };
	case 'bottom-center':
		return { bottom: -handlerSize / 2, left: middleHandlerWidth, };
	case 'bottom-right':
		return { bottom: -handlerSize / 2, right: -handlerSize / 2, };
	default:
		return { bottom: -handlerSize / 2, left: -handlerSize / 2 };
	}
}

const handlerSize = 6;
const styles = StyleSheet.create({
	container: {
		position: 'absolute', top: 0, left: 0, bottom: 0, right: 0,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.25)',
	},
	handlerAnchor: {
		position: 'absolute', backgroundColor: '#ffffff',
		width: handlerSize, height: handlerSize,
		borderRadius: 1,
		// shadowRadius: 4,
		// shadowOffset: { x: 0, y: 0 }
	},
});