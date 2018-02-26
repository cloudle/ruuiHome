import React from 'react';
import { defaultRules } from 'simple-markdown';
import UniversalHighlighter from '../codeHighlighter';
import { universalView } from './utils';

export const codeBlock = {
	...defaultRules.codeBlock,
	react: (node, output, state) => {
		const codeContent = React.createElement(UniversalHighlighter, {
			language: node.lang, code: node.content,
		});

		return React.createElement(universalView, {
			key: state.key,
			style: {
				marginBottom: 20,
			},
		}, codeContent);
	},
};

export default codeBlock;