import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Markdown from 'react-markdown';

import ApplicationLayout from '../../components/layout';
import CodeBlock from '../../components/markdownRenderers/codeBlock';
import Heading from '../../components/markdownRenderers/heading';
import List from '../../components/markdownRenderers/list';
import markdownHeadings from './markdowns/headingConfigs.md';

export default class DocumentScene extends Component {
	render() {
		const markdownContent = require('./markdowns/basic.md'),
			renderers = { ...Markdown.renderers, CodeBlock, Heading, List },
			markdownSource = `${markdownHeadings}${markdownContent}`;

		return <ApplicationLayout>
			<Markdown source={markdownSource} renderers={renderers}/>
		</ApplicationLayout>;
	}
}

const styles = StyleSheet.create({

});