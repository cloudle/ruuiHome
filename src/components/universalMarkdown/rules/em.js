import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { defaultRules } from 'simple-markdown';
import { colors, baseStyles } from './utils';

export const em = {
	...defaultRules.em,
	react: (node, output, state) => {
		return <Text key={state.key} style={styles.textStyle}>
			{output(node.content, state)}
		</Text>;
	},
};

const styles = StyleSheet.create({
	textStyle: {
		...baseStyles.text, fontStyle: 'italic',
	},
});

export default em;