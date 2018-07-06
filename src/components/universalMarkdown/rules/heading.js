import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { defaultRules, blockRegex } from 'simple-markdown';
import { universalView, universalText, baseStyles } from './utils';

const sizes = { 1: 34, 2: 24, 3: 22, 4: 18, 5: 14, 6: 8, };

export const heading = {
	...defaultRules.heading,
	match: blockRegex(/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n *)+/),
	react: (node, output, state) => {
		return React.createElement(universalText, {
			key: state.key,
			style: {
				...baseStyles.text,
				marginTop: 20, marginBottom: 8,
				fontSize: sizes[node.level] || 8,
				fontWeight: '700',
			},
		}, output(node.content, state));
	},
};

export default heading;
