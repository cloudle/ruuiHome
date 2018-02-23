import React from 'react';
import { defaultRules } from 'simple-markdown';
import { universalText, } from './utils';

export const br = {
	...defaultRules.br,
	react: (node, output, state) => {
		return <br key={state.key}/>;
	},
};

export default br;