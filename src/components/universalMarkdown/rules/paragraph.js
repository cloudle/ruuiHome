import React from 'react';
import { defaultRules } from 'simple-markdown';
import { universalText, colors, baseStyles } from './utils';

export const paragraph = {
	...defaultRules.paragraph,
	react: (node, output, state) => {
		return React.createElement(universalText, {
			key: state.key,
			style: {
				...baseStyles.text,
				flexWrap: 'wrap',
				flexDirection: 'row',
				alignItems: 'flex-start',
				justifyContent: 'flex-start',
				marginBottom: 20,
			},
		}, output(node.content, state));
	},
};

export default paragraph;