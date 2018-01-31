import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { defaultRules } from 'simple-markdown';
import { baseStyles, colors } from './utils';

export const underline = {
	order: defaultRules.em.order - 0.5,
	match: source => /^___([\s\S]+?)___(?!_)/.exec(source),
	parse: (capture, parse, state) => {
		return {
			content: parse(capture[1], state)
		};
	},
	react: (node, output, state) => {
		return <Text key={state} style={styles.textStyle}>
			{output(node.content, state)}
		</Text>;
	},
};

const styles = StyleSheet.create({
	textStyle: {
		...baseStyles.text,
		color: 'red', textDecorationLine: 'underline'
	},
});

export default underline;