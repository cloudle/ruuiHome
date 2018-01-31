import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { defaultRules, blockRegex } from 'simple-markdown';
import { colors, baseStyles } from './utils';

export const codeBlock = {
	...defaultRules.codeBlock,
	react: (node, output, state) => {
		return <View key={state.key} style={styles.container}>
			<Text style={styles.textStyle}>
				{'['+node.lang+']\n\n'}
				{node.content}
			</Text>
		</View>;
	},
};

const styles = StyleSheet.create({
	container: {
		boxSizing: 'border-box',
		backgroundColor: '#f2f2f2',
		borderColor: 'rgba(255, 0, 0, 0.15)',
		borderRadius: 3,
		borderWidth: 1,
		padding: 8, marginVertical: 8,
	},
	textStyle: {
		...baseStyles.text,
		fontFamily: 'Fira Code, Courier',
		color: colors.main, fontSize: '90%',
	},
});

export default codeBlock;