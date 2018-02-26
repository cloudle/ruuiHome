import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { defaultRules } from 'simple-markdown';
import { universalText, universalView, colors, baseStyles } from './utils';
import Icon from '../../../components/vector-icons/Ionicons';
import { isString } from 'lodash';

export const list = {
	...defaultRules.list,
	react: (node, output, state) => {
		const items = node.items || [];

		const bullets = items.map((item, i) => {
			const lineOutput = output(item, state),
				[firstOutput, ...restOutput] = lineOutput,
				startingText = isString(firstOutput) ? firstOutput : '',
				checkListMatch = startingText.match(/^ *\[(.)\] *.*/),
				childContent = React.createElement(universalText, {
					style: baseStyles.text,
				}, checkListMatch
					? [firstOutput.substring(3), ...restOutput] : lineOutput);

			return <View key={`${state.key}:${i}`} style={styles.itemContainer}>
				{checkListMatch
					? renderCheckListIcon(checkListMatch)
					: renderNormalIcon(node, i)}
				{childContent}
			</View>;
		});

		return React.createElement(universalView, {
			key: state.key,
			style: {
				marginLeft: 4,
			}
		}, bullets);
	},
};

function renderCheckListIcon(match) {
	const completeOption = {
			icon: 'md-checkmark-circle-outline',
			style: { color: '#7eb328', }
		},
		unCompleteOption = {
			icon: 'md-radio-button-on',
			style: { color: '#bbbbbb', fontSize: 20 },
		},
		options = (match && ['*', 'x'].indexOf(match[1]) >= 0)
			? completeOption : unCompleteOption;

	return <Icon name={options.icon} style={[styles.icon, options.style]}/>;
}

function renderNormalIcon(node, i) {
	return node.ordered
		? <Text style={styles.listNumber}>{i + 1}.</Text>
		: <View style={styles.listCircle}/>;
}

const circleSize = 5;
const styles = StyleSheet.create({
	itemContainer: {
		flexDirection: 'row', marginBottom: 15,
	},
	icon: {
		fontSize: 18, marginRight: 8,
	},
	listNumber: {
		fontWeight: '700', marginRight: 4, marginTop: 1,
	},
	listCircle: {
		width: circleSize, height: circleSize, borderRadius: circleSize / 2,
		marginRight: 4, top: 8,
		backgroundColor: '#666666',
	},
});

export default list;