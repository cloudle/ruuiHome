import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import { isString, isObject } from 'lodash';

import { sizes, colors, iStyles, baseStyles } from '../utils';
import { Style, Element, } from '../typeDefinition';

type Props = {
	wrapperStyle?: Style,
	innerStyle?: Style,
	children?: Element,
	title?: String | Element,
	dark?: Boolean,
};

export default class PageSection extends Component {
	props: Props;

	render() {
		return <View style={[styles.container, this.props.wrapperStyle]}>
			<View style={iStyles.contentContainer}>
				{this.renderTitle()}
				<View style={this.props.innerStyle}>
					{this.props.children}
				</View>
			</View>
		</View>;
	}

	renderTitle = () => {
		if (isString(this.props.title)) {
			const titleStyle = this.props.dark ? { color: '#ffffff', } : {},
				textClass = this.props.dark ? 'dark page-section-title' : 'page-section-title';

			return <Text className={textClass} style={[styles.titleText, titleStyle]}>
				{this.props.title}
			</Text>;
		} else if (isObject(this.props.title)) {
			return this.props.title;
		} else {
			return null;
		}
	};
}

const styles = StyleSheet.create({
	container: {
		borderTopWidth: 1, borderColor: colors.lineBreak,
		paddingVertical: 42,
	},
	titleText: {
		...baseStyles.text, fontSize: 25, fontWeight: '400',
		textAlign: 'center', marginBottom: 30,
	},
});