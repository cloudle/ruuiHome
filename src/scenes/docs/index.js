import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Linking } from 'react-native';
import { utils, Button } from 'react-universal-ui';

import Layout from './layout';
import { GithubIcon } from '../../components/svgs';
import Markdown from '../../components/universalMarkdown';
import { CoreExample } from '../../emulationExamples';
import { universalScene } from '../../decorators';
import { apiFetch, colors, sizes, } from '../../utils';
import type { RouterMatch } from '../../typeDefinition';

type Props = {
	data?: any,
	initialProps?: {
		data?: String,
	},
	match?: RouterMatch,
};

@universalScene({
	getInitialProps: ({ params, path }) => {
		const { group = 'intro', id = 'basic' } = params;
		return apiFetch('/markdown', { group, id });
	}
})

export default class Document extends Component {
	props: Props;

	render() {
		const { initialProps } = this.props,
			pageParams = this.props.match.params,
			baseDocUrl = 'https://github.com/cloudle/ruuiHome/tree/master/src/markdowns/',
			docUrl = `${baseDocUrl}${pageParams.group}/${pageParams.id}.md`,
			markdownContent = initialProps.data, //utils.isServer ? initialProps.data : require('../../markdowns/intro/installation.md'),
			docId = pageParams.id || 'Motivation';

		return <Layout
			style={styles.container}
			emulator={<CoreExample/>}>
			<View style={styles.headingContainer}>
				<View style={styles.titleContainer}>
					<Text style={styles.headingText}>
						{docId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
					</Text>
				</View>
				<View>
					{pageParams.group && <a href={docUrl} target="_blank">
						<Button
							wrapperStyle={styles.buttonWrapper}
							innerStyle={styles.buttonInner}
							textStyle={styles.buttonTitle}
							title="Edit on Github"
							icon={<GithubIcon size={20}/>}
							onPress={() => this.openGithubSource(docUrl)}/>
					</a>}
				</View>
			</View>
			<Markdown
				wrapperStyle={styles.contentContainer}
				content={markdownContent}/>
		</Layout>;
	}

	openGithubSource = (url) => {
		!utils.isWeb && Linking.openURL(url);
	};
}

const styles = StyleSheet.create({
	container: {

	},
	headingContainer: {
		flexDirection: 'row', alignItems: 'flex-end',
		paddingLeft: 18, paddingRight: 18,
		paddingTop: 20, paddingBottom: 10,
	},
	titleContainer: {
		flex: 1,
	},
	headingText: {
		fontSize: 32, color: '#444444',
	},
	commandContainer: {

	},
	buttonWrapper: {
		backgroundColor: colors.main
	},
	buttonTitle: {
		fontWeight: '600', color: 'rgba(255, 255, 255, 0.8)',
	},
	contentContainer: {
		padding: 18, paddingTop: 10,
	},
});
