import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { defaultRules, blockRegex } from 'simple-markdown';
import { baseStyles } from './utils';

const sizes = { 1: 28, 2: 21, 3: 16, 4: 12, 5: 10, 6: 8, };

export const heading = {
	...defaultRules.heading,
	match: blockRegex(/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n *)+/),
	react: (node, output, state) => {
		const headingStyle = {
			fontSize: sizes[node.level] || 8,
		};

		return <Text key={state.key} style={[styles.textStyle, headingStyle]}>
			{output(node.content, state)}
		</Text>;
	},
};

const styles = StyleSheet.create({
	textStyle: {
		...baseStyles.text, marginVertical: 8,
	},
});

export default heading;