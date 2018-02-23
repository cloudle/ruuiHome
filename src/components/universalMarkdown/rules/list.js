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
				bullet = node.ordered ? i + 1 : '\u2022',
				childContent = React.createElement(universalText, {
					style: baseStyles.text,
				}, checkListMatch
					? [firstOutput.substring(3), ...restOutput] : [`${bullet} `, lineOutput]);

			return <View key={`${state.key}:${i}`} style={styles.itemContainer}>
				{renderCheckListIcon(checkListMatch)}
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
		options = (match && ['*', 'x'].indexOf(match[1]) >= 0) ? completeOption : unCompleteOption;

	return match ? <Icon name={options.icon} style={[styles.icon, options.style]}/> : null;
}

const styles = StyleSheet.create({
	itemContainer: {
		flexDirection: 'row', marginVertical: 6,
	},
	icon: {
		fontSize: 18, marginRight: 8,
	},
});

export default list;