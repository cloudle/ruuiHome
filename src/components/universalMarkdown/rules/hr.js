import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { defaultRules, blockRegex } from 'simple-markdown';
import { colors, baseStyles } from './utils';

export const hr = {
	...defaultRules.hr,
	match: blockRegex(/^( *[-*_]){3,} *(?:\n *)+/),
	react: (node, output, state) => {
		return <View key={state.key} style={styles.container}/>;
	},
};

export const fatHr = {
	...defaultRules.hr,
	match: blockRegex(/^( *[=]){3,} *(?:\n *)+/),
	react: (node, output, state) => {
		return <View key={state.key} style={styles.fatContainer}/>;
	},
};

const styles = StyleSheet.create({
	container: {
		height: 1, backgroundColor: 'rgba(255, 0, 0, 0.2)',
	},
	fatContainer: {
		height: 4, borderRadius: 2, backgroundColor: 'rgba(255, 0, 0, 0.2)',
	}
});

export default hr;