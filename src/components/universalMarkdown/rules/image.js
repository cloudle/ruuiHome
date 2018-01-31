import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { defaultRules } from 'simple-markdown';
import { colors, baseStyles } from './utils';

export const em = {
	...defaultRules.image,
	react: (node, output, state) => {
		const containerStyle = node.target.match(/youtu|vimeo/)
				? styles.videoContainer : styles.imageContainer,
			imageSource = { uri: node.target };

		return <Image
			key={state.key}
			style={containerStyle}
			source={imageSource}
			resizeMode={Image.resizeMode.contain}/>;
	},
};

const styles = StyleSheet.create({
	imageContainer: {
		width: 50, height: 50,
	},
	videoContainer: {
		width: 50, height: 50,
	}
});

export default em;