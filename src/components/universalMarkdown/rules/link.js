import React from 'react';
import { Platform, Text, Linking } from 'react-native';
import { defaultRules } from 'simple-markdown';
import { colors, baseStyles } from './utils';

const Link = Platform.select({ web: 'a', default: Text, });

export const link = {
	...defaultRules.link,
	react: (node, output, state) => {
		const platformProps = Platform.select({
			web: { href: node.target },
			default: { onPress: () => openUrl(node.target) },
		});

		return React.createElement(Link, {
			key: state.key,
			style: {
				...baseStyles.text,
				textDecorationLine: 'underline',
				color: colors.main,
			},
			...platformProps,
		}, output(node.content, state));
	},
};

function openUrl(url) {
	Linking.openURL(url).catch(error => console.warn('An error occurred: ', error));
}

export default link;