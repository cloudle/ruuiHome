import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { defaultRules } from 'simple-markdown';
import { colors, baseStyles } from './utils';

export const link = {
	...defaultRules.link,
	react: (node, output, state) => {
		return <Text
			key={state.key}
			style={styles.textStyle}
			onPress={() => openUrl(node.target)}>
			{output(node.content, state)}
		</Text>;
	},
};

function openUrl(url) {
	Linking.openURL(url).catch(error => console.warn('An error occurred: ', error));
}

const styles = StyleSheet.create({
	textStyle: {
		...baseStyles.text, textDecorationLine: 'underline',
		color: colors.main,
	},
});

export default link;