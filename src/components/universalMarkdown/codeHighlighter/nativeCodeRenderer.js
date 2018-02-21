import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { utils } from 'react-universal-ui';
import { AutoSizer, List } from 'react-virtualized';

import { createStyleObject } from './create-element';

const virtualizedAvailable = utils.isWeb;

type Props = {
	rows?: Array<Object>,
	baseStyle?: Object,
	stylesheet?: Object,
	useInlineStyles?: Boolean,
};

export default function universalCodeRenderer() {
	return ({ rows, stylesheet, useInlineStyles }: Props) => {
		const containerElement = virtualizedAvailable ? 'div' : View,
			useVirtualized = virtualizedAvailable && rows.length >= 100,
			containerStyle = useVirtualized ? { height: '320px' } : {},
			codeRows = useVirtualized
				? virtualizedRenderer({ rows, stylesheet, useInlineStyles, rowHeight: 22 })
				: defaultRenderer({ rows, stylesheet, useInlineStyles, });

		return React.createElement(containerElement, {
			className: 'universal-code-container',
			style: containerStyle,
		}, codeRows);
	};
}

function defaultRenderer({ rows, stylesheet, useInlineStyles }) {
	return (
		rows.map((node, i) => createElement({
			node,
			stylesheet,
			useInlineStyles,
			key: `code-segement${i}`
		}))
	);
}


function virtualizedRenderer({ rows, stylesheet, useInlineStyles, rowHeight }) {
	return <AutoSizer>
		{({ width, height }) => {
			return <List
				height={height}
				width={width}
				rowHeight={20}
				rowCount={rows.length}
				rowRenderer={rowRenderer.bind(null, { rows, stylesheet, useInlineStyles })}
				overscanRowCount={10}/>;
		}}
	</AutoSizer>;
}

function createElement(
	{ node, style = {}, stylesheet, useInlineStyles, key }) {
	const textElement = virtualizedAvailable ? 'span' : Text,
		{ properties, type, tagName, value } = node,
		classes = ((properties && properties.className) || []) || [],
		className = classes.join(' ');

	if (type === 'text') {
		return React.createElement(textElement, { key, className, }, value);
	} else if (tagName) {
		const textStyle = virtualizedAvailable ? style : styles.text,
			childrenCreator = createChildren({ stylesheet, useInlineStyles }),
			generatedTextStyle = createStyleObject(
				properties.className, { ...properties.style, ...textStyle }, stylesheet),
			children = childrenCreator(node.children);

		return React.createElement(textElement, {
			className, style: generatedTextStyle, key
		}, children);
	}
}

function createChildren({ stylesheet, useInlineStyles }) {
	let childrenCount = 0;
	return (children) => {
		childrenCount += 1;
		return children.map((child, i) => createElement({
			node: child,
			stylesheet,
			useInlineStyles,
			key: `code-segment-${childrenCount}-${i}`
		}));
	};
}

function rowRenderer({ rows, stylesheet, useInlineStyles }, { index, key, style }) {
	return createElement({
		node: rows[index],
		style,
		stylesheet,
		useInlineStyles,
		key
	});
}

const styles = StyleSheet.create({
	text: {
		fontFamily: "Fira Code, Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
		color: '#ffffff', fontWeight: '500',
	},
});