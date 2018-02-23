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
			markdownContent = utils.isServer ? initialProps.data : require('../../markdowns/intro/installation.md'),
			pageParams = this.props.match.params,
			docId = pageParams.id || 'Docs';

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
					{pageParams.group && <Button
						wrapperStyle={styles.buttonWrapper}
						innerStyle={styles.buttonInner}
						textStyle={styles.buttonTitle}
						title="Edit on Github"
						icon={<GithubIcon size={20}/>}
						onPress={this.openGithubSource}/>}
				</View>
			</View>
			<Markdown
				wrapperStyle={styles.contentContainer}
				content={markdownContent}/>
		</Layout>;
	}

	openGithubSource = () => {
		const baseDocUrl = 'https://github.com/cloudle/ruuiHome/tree/master/src/markdowns/',
			pageParams = this.props.match.params;

		Linking.openURL(`${baseDocUrl}${pageParams.group}/${pageParams.id}.md`);
	};
}

const styles = StyleSheet.create({
	container: {

	},
	headingContainer: {
		flexDirection: 'row', alignItems: 'flex-end',
		borderBottomWidth: 1, borderColor: '#f4f6f7',
		paddingLeft: 40, paddingRight: 15,
		paddingTop: 20, paddingBottom: 10,
	},
	titleContainer: {
		flex: 1,
	},
	headingText: {
		fontSize: 32,
	},
	commandContainer: {

	},
	buttonWrapper: {
		backgroundColor: colors.main
	},
	buttonTitle: {
		// fontSize: 16,
	},
	contentContainer: {
		padding: 40, paddingTop: 10,
	},
});