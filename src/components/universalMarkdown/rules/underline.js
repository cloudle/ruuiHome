import React from 'react';
import { defaultRules } from 'simple-markdown';
import { universalText, baseStyles, colors } from './utils';

export const underline = {
	order: defaultRules.em.order - 0.5,
	match: source => /^___([\s\S]+?)___(?!_)/.exec(source),
	parse: (capture, parse, state) => {
		return {
			content: parse(capture[1], state)
		};
	},
	react: (node, output, state) => {
		return React.createElement(universalText, {
			key: state.key,
			style: {
				...baseStyles.text,
				color: 'red', textDecorationLine: 'underline',
			}
		}, output(node.content, state));
	},
};

export default underline;