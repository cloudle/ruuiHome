import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { defaultRules } from 'simple-markdown';

export const nptable = {
	...defaultRules.nptable,
	react: (node, output, state) => {
		return <Text key={state.key}>Yoohoo</Text>;
	}
};

export default nptable;