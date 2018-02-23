import React from 'react';
import { defaultRules } from 'simple-markdown';
import { universalText, baseStyles } from './utils';

export const em = {
	...defaultRules.em,
	react: (node, output, state) => {
		return React.createElement(universalText, {
			key: state.key,
			style: {
				...baseStyles.text, fontStyle: 'italic',
			},
		}, output(node.content, state));
	},
};

export default em;