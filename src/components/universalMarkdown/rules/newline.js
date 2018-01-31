import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { defaultRules, blockRegex } from 'simple-markdown';
import { colors, baseStyles } from './utils';

export const em = {
	...defaultRules.newline,
	react: (node, output, state) => {
		return <Text key={state.key} style={styles.textStyle}>
			{'\n\n'}
		</Text>;
	},
};

const styles = StyleSheet.create({
	textStyle: {
		...baseStyles.text,
	},
});

export default em;