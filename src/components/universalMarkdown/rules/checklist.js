import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { defaultRules, blockRegex } from 'simple-markdown';
import { baseStyles } from './utils';
import Icon from '../../../components/vector-icons/Ionicons';

export const checkList = {
	order: defaultRules.list.order - 1,
	match: blockRegex(/^ *(\[.\]) *([^\n]+?) *(?:\n *)+\n/),
	parse: (capture, parse, state) => {
		const listType = capture[0].substring(1, 2),
			content = capture[0].replace(/^ *\[.\] ?/gm, '');

		return { listType, content: parse(content, state) };
	},
	react: (node, output, state) => {
		const completeOption = {
				icon: 'md-checkmark-circle-outline',
				style: { color: '#7eb328', }
			},
			unCompleteOption = {
				icon: 'md-radio-button-on',
				style: { color: '#bbbbbb', fontSize: 20 },
			},
			options = node.listType === 'x' ? completeOption : unCompleteOption;

		return <View key={state.key} style={styles.container}>
			<Icon name={options.icon} style={[styles.icon, options.style]}/>
			<Text style={styles.text}>{output(node.content, state)}</Text>
		</View>;
	},
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row', alignItems: 'center',
	},
	textStyle: {
		...baseStyles.text, padding: 6, paddingLeft: 12,
	},
	icon: {
		fontSize: 18, marginRight: 8,
	},
});

export default checkList;