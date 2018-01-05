import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Icon from '../vector-icons/Ionicons';

export default class List extends Component {
	render() {
		return <View style={styles.container}>
			{renderListItems(this.props.children)}
		</View>;
	}
}

function renderListItems(roots) {
	return roots.map((root, i) => {
		return root.props.children.map((node, i) => {
			return <ListNode key={i} node={node}/>;
		});
	});
}

function ListNode({ node }) {
	if (typeof node === 'string') {
		return <ListLeaf content={node}/>;
	} else {
		return <View style={styles.innerContainer}>
			{renderListItems(node.props.children)}
		</View>;
	}
}

function ListLeaf({ content }) {
	const isCompletedTodo = content.substring(0, 3) === '[x]',
		isPendingTodo = content.substring(0, 3) === '[ ]',
		realContent = isCompletedTodo || isPendingTodo
			? content.substring(3) : content;

	return <View style={styles.container}>
		<Text style={styles.outerText}>
			{isCompletedTodo && <Icon
				name="md-checkmark-circle-outline"
				color="#7eb328" size={18}/>}

			{isPendingTodo && <Icon
				name="md-ionic"
				color="#bbbbbb" size={18}/>}

			<Text style={styles.itemText}>{realContent}</Text>
		</Text>
	</View>;
}

const styles = StyleSheet.create({
	container: {
		paddingLeft: 7,
	},
	innerContainer: {
		paddingLeft: 25,
	},
	outerText: {},
	itemText: {
		marginLeft: 6,
	},
});

