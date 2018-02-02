import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { defaultRules, blockRegex } from 'simple-markdown';
import UniversalHighlighter from '../codeHighlighter';

export const codeBlock = {
	...defaultRules.codeBlock,
	react: (node, output, state) => {
		return <View key={state.key} style={styles.container}>
			<UniversalHighlighter
				language={node.lang}
				code={node.content}/>
		</View>;
	},
};

const styles = StyleSheet.create({
	container: {
		marginVertical: 20,
	},
});

export default codeBlock;