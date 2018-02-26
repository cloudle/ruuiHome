import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { defaultRules, blockRegex } from 'simple-markdown';
import { universalView, universalText, baseStyles } from './utils';

const sizes = { 1: 28, 2: 21, 3: 16, 4: 12, 5: 10, 6: 8, };

export const heading = {
	...defaultRules.heading,
	match: blockRegex(/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n *)+/),
	react: (node, output, state) => {
		return React.createElement(universalText, {
			key: state.key,
			style: {
				...baseStyles.text,
				marginTop: 8, marginBottom: 8,
				fontSize: sizes[node.level] || 8,
				fontWeight: '700',
			},
		}, output(node.content, state));
	},
};

export default heading;