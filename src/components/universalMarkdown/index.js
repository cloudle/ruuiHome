import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import SimpleMarkdown from 'simple-markdown';

import rules from './rules';
import { Style, Element } from '../../typeDefinition';

const rawBuiltParser = SimpleMarkdown.parserFor(rules),
	parse = (source) => {
		const blockSource = source + '\n\n';
		return rawBuiltParser(blockSource, { inline: false });
	},
	reactOutput = SimpleMarkdown.reactFor(SimpleMarkdown.ruleOutput(rules, 'react'));

type Props = {
	content?: String,
	wrapperStyle?: Style,
};

export default class UniversalMarkdown extends Component {
	props: Props;

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		const syntaxTree = parse(this.props.content);

		return <View style={[styles.container, this.props.wrapperStyle]}>
			{reactOutput(syntaxTree)}
		</View>;
	}
}

const styles = StyleSheet.create({
	container: {

	},
});