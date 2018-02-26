import React from 'react';
import { defaultRules, blockRegex } from 'simple-markdown';
import { universalView } from './utils';

export const hr = {
	...defaultRules.hr,
	match: blockRegex(/^( *[-*_]){3,} *(?:\n *)+/),
	react: (node, output, state) => {
		return React.createElement(universalView, { key: state.key, style: containerStyle });
	},
};

export const fatHr = {
	...defaultRules.hr,
	match: blockRegex(/^( *[=]){3,} *(?:\n *)+/),
	react: (node, output, state) => {
		return React.createElement(universalView, { key: state.key, style: fatContainerStyle });
	},
};

const containerStyle = {
		height: 1, backgroundColor: '#f4f6f7',
		marginBottom: 20,
	},
	fatContainerStyle = {
		height: 4, borderRadius: 2, backgroundColor: '#f4f6f7',
		marginBottom: 20,
	};

export default hr;