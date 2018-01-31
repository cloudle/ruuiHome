import React, { Component } from 'react';
import { View } from 'react-native';
import SimpleMarkdown from 'simple-markdown';
import { merge, pick, omit, concat, pullAll } from 'lodash';
import initialRules from './rules';
import styles from './styles';

type Props = {
	styles?: any,
	children?: String,
	rules?: Object,
	whitelist?: Array<any>,
	blacklist?: Array<any>,
}

export default class Markdown extends Component {
	props: Props;
	static defaultProps = {
		styles,
		children: '',
		rules: {},
		whitelist: [],
		blacklist: [],
	};

	/** Post processes rules to strip out unwanted styling options
	 * while keeping the default 'paragraph' and 'text' rules
	 */
	postProcessRules(preRules) {
		const defaultRules = ['paragraph', 'text'];
		if (this.props.whitelist.length) {
			return pick(preRules, concat(this.props.whitelist, defaultRules));
		} else if (this.props.blacklist.length) {
			return omit(preRules, pullAll(this.props.blacklist, defaultRules));
		} else {
			return preRules;
		}
	}

	renderContent = (children: string) => {
		const mergedStyles = Object.assign(styles, this.props.styles),
			rules = this.postProcessRules(
				merge({}, SimpleMarkdown.defaultRules, initialRules(mergedStyles), this.props.rules)),
			child = Array.isArray(this.props.children)
				? this.props.children.join('')
				: this.props.children,
			blockSource = child + '\n\n',
			tree = SimpleMarkdown.parserFor(rules)(blockSource, { inline: false });

		return SimpleMarkdown.reactFor(SimpleMarkdown.ruleOutput(rules, 'react'))(tree);
	};

	shouldComponentUpdate(nextProps, nextState) {
		return !(this.props.children === nextProps.children && this.props.styles === nextProps.styles);
	}

	render() {
		return <View style={[styles.view, this.props.styles.view]}>
			{this.renderContent(this.props.children)}
		</View>;
	}
}
