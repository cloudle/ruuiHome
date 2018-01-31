import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { defaultRules } from 'simple-markdown';
import { colors, baseStyles } from './utils';

export const list = {
	...defaultRules.list,
	react: (node, output, state) => {
		const items = node.items || [];

		return <View key={state.key} style={styles.container}>
			{items.map((item, i) => {
				const bullet = node.ordered ? i + 1 : '\u2022';

				return <Text key={i} style={styles.textStyle}>
					{bullet} {output(item, state)}
				</Text>;
			})}
		</View>;
	},
};

const styles = StyleSheet.create({
	container: {
		marginLeft: 4,
	},
	textStyle: {
		...baseStyles.text,
	},
});

export default list;