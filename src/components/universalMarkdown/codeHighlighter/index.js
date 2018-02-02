import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, } from 'react-native';

import SyntaxHighlighter, { registerLanguage } from './prism-light';
import jsx from './lang/jsx';
import nativeCodeRenderer from './nativeCodeRenderer';
import codeStyles from './codeStyle';

registerLanguage('javascript', jsx);

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
		return <View style={styles.container}>
			{this.state.expand ? <SyntaxHighlighter
				renderer={nativeCodeRenderer()}
				style={codeStyles}
				language={this.props.language}
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
	loadingContainer: {
		borderRadius: 3, backgroundColor: '#343542', padding: 18,
		alignItems: 'center', justifyContent: 'center',
	},
	loadingText: {
		color: '#ffffff', fontSize: 22,
	},
});