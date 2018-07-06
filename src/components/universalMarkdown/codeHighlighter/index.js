import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, } from 'react-native';
import { atomOneLight as cs } from 'react-syntax-highlighter/styles/hljs';

import SyntaxHighlighter, { registerLanguage } from './prism-light';
import jsx from './lang/jsx';
import bash from './lang/bash';
import nativeCodeRenderer from './nativeCodeRenderer';
import codeStyles from './codeStyle';

registerLanguage('javascript', jsx);
registerLanguage('bash', bash);

type Props = {
	language?: String,
	code?: String,
};

export default class UniversalHighlighter extends Component {
	props: Props;

	constructor(props) {
		super(props);
		this.state = {
			expand: true,
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state.expand !== nextState.expand
			|| this.props.code !== nextProps.code;
	}

	render() {
		const options = this.props.language.split(':'),
			language = options[0],
			heading = options[1] || '';

		return <View style={styles.container}>
			<View style={styles.headingContainer}>
				<Text style={styles.headingText}>
					{heading.toUpperCase()} [{language.toUpperCase()}]
				</Text>
			</View>
			{this.state.expand ? <SyntaxHighlighter
				renderer={nativeCodeRenderer()}
				style={codeStyles}
				language={language}
				code={this.props.code}/> : <TouchableOpacity
				style={styles.loadingContainer}
				activeOpacity={0.8}
				onPress={this.expandCodeDetail}>
				<Text style={styles.loadingText}>PRESS TO SEE CODE..</Text>
			</TouchableOpacity>}
		</View>;
	}

	expandCodeDetail = () => {
		this.setState({ expand: true });
	};
}

const styles = StyleSheet.create({
	container: {

	},
	headingContainer: {
		padding: 12, paddingVertical: 6,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		backgroundColor: '#21242b',
	},
	headingText: {
		color: '#999999', fontWeight: '700',
	},
	loadingContainer: {
		borderRadius: 3, backgroundColor: '#343542', padding: 18,
		alignItems: 'center', justifyContent: 'center',
	},
	loadingText: {
		color: '#ffffff', fontSize: 22,
	},
});
