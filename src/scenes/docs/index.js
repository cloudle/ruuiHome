import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Markdown from 'react-markdown';

import Layout from '../../components/layout';
import CodeBlock from '../../components/markdownRenderers/codeBlock';
import Heading from '../../components/markdownRenderers/heading';
import List from '../../components/markdownRenderers/list';
import markdownHeadings from './markdowns/headingConfigs.md';

export default class DocumentScene extends Component {
	render() {
		const markdownContent = require('./markdowns/basic.md'),
			renderers = { ...Markdown.renderers, CodeBlock, Heading, List },
			markdownSource = `${markdownHeadings}${markdownContent}`;

		return <Layout style={styles.container}>
			<Markdown source={markdownSource} renderers={renderers}/>
		</Layout>;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, alignItems: 'center', justifyContent: 'center',
	},
});