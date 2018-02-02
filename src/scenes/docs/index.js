import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { utils } from 'react-universal-ui';

import Layout from './layout';
import Markdown from '../../components/universalMarkdown';
import { CoreExample } from '../../emulationExamples';
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

	render() {
		const { initialProps } = this.props,
			markdownContent = true
				? initialProps.data
				: require('../../markdowns/intro/installation.md');

		return <Layout
			style={styles.container}
			emulator={<CoreExample/>}>
			<Markdown content={markdownContent}/>
		</Layout>;
	}
}

const markdownStyles = {
	heading1: {
		fontSize: 24,
	},
	heading2: {
		fontSize: 22,
	},
	link: {
		color: 'pink',
	},
	mailTo: {
		color: 'orange',
	},
	text: {
		color: '#555555',
	},
};

const styles = StyleSheet.create({
	container: {
		padding: 40,
	},
});