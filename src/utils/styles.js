import { StyleSheet, Platform } from 'react-native';
import { colors, sizes } from './configs';

export const baseStyles = {
	text: {
		backgroundColor: 'transparent',
		color: colors.text,
		paddingLeft: 10,
	},
};

export const iStyles = StyleSheet.create({
	contentContainer: {
		width: '100%', maxWidth: sizes.maxContentWidth,
		margin: 'auto',
	},
});