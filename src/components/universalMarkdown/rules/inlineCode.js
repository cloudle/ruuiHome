import React from 'react';
import { Platform } from 'react-native';
import { defaultRules } from 'simple-markdown';
import { universalView, universalText, colors, baseStyles } from './utils';

export const inlineCode = {
	...defaultRules.inlineCode,
	react: (node, output, state) => {
		const textContent = React.createElement(universalText, {
			style: textStyle,
		}, node.content);

		return React.createElement(universalView, {
			key: state.key,
			style: Platform.select({
				web: domContainerStyle,
				default: nativeContainerStyle,
			}),
		}, textContent);
	},
};

const domContainerStyle = {
		display: 'inline',
		boxSizing: 'border-box',
		backgroundColor: '#f2f2f2',
		border: 'solid 1px rgba(255, 0, 0, 0.15)',
		borderRadius: 3,
		paddingLeft: 4, paddingRight: 4,
		paddingTop: 0,
		fontSize: '92%',
	}, nativeContainerStyle = {
		backgroundColor: '#f2f2f2',
		borderColor: 'rgba(255, 0, 0, 0.15)',
		borderRadius: 3,
		borderWidth: 1,
		paddingHorizontal: 4,
		paddingTop: 1,
	}, textStyle = {
		...baseStyles.text,
		fontFamily: 'Fira Code, Courier',
		color: colors.main,
		fontSize: '92%',
	};

export default inlineCode;