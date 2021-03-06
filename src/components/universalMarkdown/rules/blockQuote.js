import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { defaultRules } from 'simple-markdown';
import { colors, baseStyles } from './utils';

export const blockQuote = {
	...defaultRules.blockQuote,
	react: (node, output, state) => {
		return <View key={state.key} style={styles.blockQuoteSection}>
			<View style={styles.blockQuoteSectionBar}/>
			<Text style={styles.textStyle}>{output(node.content, state)}</Text>
		</View>;
	},
};

const styles = StyleSheet.create({
	blockQuoteSection: {
		flexDirection: 'row',
		marginBottom: 20,
	},
	blockQuoteSectionBar: {
		width: 4, borderRadius: 2,
		backgroundColor: 'rgba(255, 0, 0, 0.25)',
	},
	textStyle: {
		...baseStyles.text, padding: 6, paddingLeft: 12,
	},
});

export default blockQuote;