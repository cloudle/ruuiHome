import React, { Component } from 'react';
import ReactNative, { View, Text } from 'react-native';
import * as UniversalUI from 'react-universal-ui';

import hljs from 'highlight.js/lib/index';

hljs.configure({ tabReplace: '  ' });

export default class CodeBlock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEvil: this.props.language == 'evil',
		};
	}

	componentDidMount() {
		if (!this.state.isEvil) this::highlightCode();
	}

	componentDidUpdate() {
		if (!this.state.isEvil) this::highlightCode();
	}

	render() {
		if (this.state.isEvil) {
			const code = Babel.transform(this.props.literal,
				{ presets: ['es2015', 'react'] }).code;

			return <View>
				{eval(code)}
			</View>;
		} else {
			return <pre>
				<code className={this.props.language} ref="code">
					{this.props.literal}
				</code>
			</pre>;
		}
	}
}

function highlightCode() {
	hljs.highlightBlock(this.refs.code);
}