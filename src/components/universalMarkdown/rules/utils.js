import { utils } from 'react-universal-ui';
import { Platform, Text, View } from 'react-native';
import { colors as color } from '../../../utils';

export const universalView = Platform.select({ web: 'div', default: View, });
export const universalText = Platform.select({ web: 'span', default: Text, });

export const platformFonts = utils.isWeb ? { fontFamily: '"Open Sans", sans-serif', } : {},
	baseStyles = {
		text: {
			...platformFonts,	backgroundColor: 'transparent', color: '#444444',
			fontSize: 16,
		},
	};

export const colors = color;
