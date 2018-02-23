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
		height: 1, backgroundColor: 'rgba(255, 0, 0, 0.2)',
		margin: -32, marginTop: 15, marginBottom: 15,
	},
	fatContainerStyle = {
		height: 4, borderRadius: 2, backgroundColor: 'rgba(255, 0, 0, 0.2)',
		margin: -32, marginTop: 15, marginBottom: 15,
	};

export default hr;