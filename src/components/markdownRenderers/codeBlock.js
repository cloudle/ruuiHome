import React, { Component } from 'react';
import ReactNative, { View, Text } from 'react-native';
import * as UniversalUI from 'react-universal-ui';

import hljs from 'highlight.js/lib/index';

hljs.configure({ tabReplace: '  ' });

type Props = {
	language?: String,
	literal?: String,
};

export default class CodeBlock extends Component {
	props: Props;

	constructor(props) {
		super(props);
		this.state = {
			isEvil: this.props.language === 'evil',
		};
	}

	componentDidMount() {
		if (!this.state.isEvil) this.highlightCode();
	}

	componentDidUpdate() {
		if (!this.state.isEvil) this.highlightCode();
	}

	render() {
		if (this.state.isEvil) {
			const { code } = Babel.transform(this.props.literal, { presets: ['es2015', 'react'] });

			return <View>{eval(code)}</View>;
		} else {
			return <pre>
				<code
					className={this.props.language}
					ref={(instance) => { this.code = instance; }}>
					{this.props.literal}
				</code>
			</pre>;
		}
	}

	highlightCode = () => {
		hljs.highlightBlock(this.code);
	};
}