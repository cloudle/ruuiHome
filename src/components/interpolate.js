import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native';
import { isObject, isString, isNumber } from 'lodash';

import { baseStyles } from '../utils';
import { Style, Element } from '../typeDefinition';

const mustacheRegex = /{{\s*[\w\.]+\s*}}/g;

type InterpolateProps = {
	style?: Style,
	template?: String,
	sources?: Object,
	renderers?: Object,
};

export default function Interpolate({
	style, template = '', sources, renderers = defaultRenderers }: InterpolateProps) {
	const fragments = getFragments(template, sources),
		TextRenderer = renderers.Text, LinkRenderer = renderers.Link;

	return <View style={[styles.container, style]}>
		{fragments.map((item, i) => {
			switch (item.type) {
			case 'text':
				return <TextRenderer key={item.text} {...item}/>;
			case 'link':
				return <LinkRenderer key={item.text} {...item}/>;
			default:
				return null;
			}
		})}
	</View>;
}

type DefaultTextRendererProps = {
	style?: Style,
	text?: String,
};

type DefaultLinkRendererProps = {
	style?: Style,
	text?: String,
	link?: String,
	linkOpenType?: '' | '',
};

export const defaultRenderers = {
	Text: ({ text, style }: DefaultTextRendererProps) => {
		return <Text style={[styles.text, style]}>{text}</Text>;
	},
	Link: ({ text, style, link, linkOpenType }: DefaultLinkRendererProps) => {
		return <TouchableOpacity
			onPress={() => { window.open(link, linkOpenType || '_blank'); }}>
			<Text style={[styles.link, style]}>{text}</Text>
		</TouchableOpacity>;
	},
};

function getFragments(template, sources) {
	const fragments = []; let match = mustacheRegex.exec(template), currentIndex = 0;

	while (match) {
		const matchedString = match[0], matchedIndex = match.index;

		const headString = template.substring(currentIndex, matchedIndex),
			keyword = template.substring(matchedIndex + 2, (matchedIndex + matchedString.length) - 2);

		if (headString && headString.length > 0) {
			fragments.push({ type: 'text', text: headString, });
		}

		if (keyword && keyword.length > 0) {
			const fragmentConfigs = sources[keyword] || keyword;

			if (isObject(fragmentConfigs)) {
				fragments.push(fragmentConfigs);
			} else if (isString(fragmentConfigs) || isNumber(fragmentConfigs)) {
				fragments.push({ type: 'text', text: fragmentConfigs, });
			} else {
				fragments.push({ type: 'text', text: keyword, });
			}
		}

		currentIndex = matchedIndex + matchedString.length;
		match = mustacheRegex.exec(template);
	}

	const tailString = template.substring(currentIndex, template.length);

	if (tailString && tailString.length) {
		fragments.push({ type: 'text', text: tailString });
	}

	return fragments;
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	text: {
		...baseStyles.text, fontSize: 13, color: '#bebebe',
	},
	link: {
		...baseStyles.text, fontSize: 13, color: 'rgba(74,139,252,.7)',
	},
});