import { utils } from 'react-universal-ui';
import { colors as color } from '../../../utils';

export const platformFonts = utils.isWeb ? { fontFamily: '"Open Sans", sans-serif', } : {},
	baseStyles = {
		text: {
			...platformFonts,	backgroundColor: 'transparent', color: color.text,
			fontSize: 15,
		},
	};

export const colors = color;