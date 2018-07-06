import React from 'react';
import { Text, Platform } from 'react-native';
import { defaultRules } from 'simple-markdown';
import { colors, baseStyles } from './utils';

export const text = {
	...defaultRules.text,
	react: (node, output, state) => {
		return Platform.select({
			web: node.content,
			default: <Text key={state.key} style={baseStyles.text}>{node.content}</Text>,
		});
	},
};

export default text;
