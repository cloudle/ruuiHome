import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { defaultRules } from 'simple-markdown';
import { colors, baseStyles } from './utils';

export const text = {
	...defaultRules.text,
	react: (node, output, state) => {
		return <Text key={state.key} style={styles.textStyle}>
			{node.content}
		</Text>;
	},
};

const styles = StyleSheet.create({
	textStyle: {
		...baseStyles.text,
	},
});

export default text;