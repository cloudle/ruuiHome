import React from 'react';
import { defaultRules } from 'simple-markdown';
import { universalText, baseStyles } from './utils';

export const del = {
	...defaultRules.del,
	react: (node, output, state) => {
		return React.createElement(universalText, {
			key: state.key,
			style: {
				...baseStyles.text, textDecorationLine: 'line-through'
			}
		}, output(node.content, state));
	},
};

export default del;