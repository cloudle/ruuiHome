import React from 'react';
import { defaultRules } from 'simple-markdown';
import { universalText, colors, baseStyles } from './utils';

export const strong = {
	...defaultRules.strong,
	react: (node, output, state) => {
		return React.createElement(universalText, {
			key: state.key,
			style: {
				...baseStyles.text, fontWeight: 'bold',
			},
		}, output(node.content, state));
	},
};

export default strong;