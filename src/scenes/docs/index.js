import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { utils } from 'react-universal-ui';
import Markdown from 'react-markdown';

import Layout from './layout';
import { CoreExample } from '../../emulationExamples';
import CodeBlock from '../../components/markdownRenderers/codeBlock';
import Heading from '../../components/markdownRenderers/heading';
import List from '../../components/markdownRenderers/list';
import { universalScene } from '../../decorators';
import { apiFetch, sizes } from '../../utils';

type Props = {
	data?: any,
	initialProps?: {
		data?: String,
	},
};

@universalScene({
	getInitialProps: ({ params, path }) => {
		const { group = 'intro', id = 'basic' } = params;
		return apiFetch('/markdown', { group, id });
	}
})

export default class DocumentScene extends Component {
	props: Props;

	constructor(props) {
		super(props);
		this.state = {
			number: 1204,
		};
	}

	// componentDidMount() {
	// 	this.interval = setInterval(() => {
	// 		const next = parseInt((Math.random() * 5000) - 2500, 10);
	// 		this.setState({ number: next });
	// 	}, 5000);
	// }

	componentWillUnmount() {
		this.interval && clearInterval(this.interval);
	}

	render() {
		const initialProps = this.props.initialProps,
			renderers = { ...Markdown.renderers, CodeBlock, Heading, List };

		return <Layout
			style={styles.container}
			emulator={<CoreExample/>}>
			<Markdown source={initialProps.data} renderers={renderers}/>
		</Layout>;
	}
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 12,
	},
});