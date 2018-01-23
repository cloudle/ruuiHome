import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { utils } from 'react-universal-ui';
import Markdown from 'react-markdown';

import Layout from './layout';
import DocNavigator from './navigator';
import CodeBlock from '../../components/markdownRenderers/codeBlock';
import Heading from '../../components/markdownRenderers/heading';
import List from '../../components/markdownRenderers/list';
import AnimatedNumbers from '../../components/animatedNumbers';
import AnimatedStepNumbers from '../../components/animatedStepNumbers';
import { universalScene } from '../../decorators';
import { apiFetch, sizes } from '../../utils';

type Props = {
	data?: any,
};

@universalScene({
	getInitialProps: ({ params }) => {
		return apiFetch('markdown', { path: params.id || 'basic.md' });
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

	componentDidMount() {
		this.interval = setInterval(() => {
			const next = parseInt((Math.random() * 5000) - 2500, 10);
			this.setState({ number: next });
		}, 5000);
	}

	componentWillUnmount() {
		this.interval && clearInterval(this.interval);
	}

	render() {
		const	renderers = { ...Markdown.renderers, CodeBlock, Heading, List };

		return <Layout
			style={styles.container}
			emulator={<View
				style={{ flex: 1, marginTop: 24, alignItems: 'center', justifyContent: 'center' }}>
				<Text style={{ color: '#ffffff', }}>Hey!</Text>
			</View>}>
			<Markdown source={this.props.data} renderers={renderers}/>
		</Layout>;
	}
}

const styles = StyleSheet.create({
	container: {

	},
});