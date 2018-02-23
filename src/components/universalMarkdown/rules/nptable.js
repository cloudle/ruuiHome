import React from 'react';
import { defaultRules } from 'simple-markdown';
import { universalText } from './utils';

export const nptable = {
	...defaultRules.nptable,
	react: (node, output, state) => {
		return React.createElement(universalText, {
			key: state.key,
		}, 'Yoohoo');
	}
};

export default nptable;