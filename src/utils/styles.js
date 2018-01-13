import { StyleSheet, Platform } from 'react-native';
import { utils } from 'react-universal-ui';
import { colors, sizes } from './configs';

export const platformFonts = utils.isWeb ? { fontFamily: '"Open Sans", sans-serif', } : {},
	baseStyles = {
		text: {
			...platformFonts,	backgroundColor: 'transparent', color: colors.text,
		},
	};

export const iStyles = StyleSheet.create({
	text: baseStyles.text,
	contentContainer: {
		width: '100%', maxWidth: sizes.maxContentWidth,
		margin: 'auto',
	},
});