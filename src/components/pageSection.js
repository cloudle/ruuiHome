import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import { isString, isObject } from 'lodash';

import { sizes, colors, iStyles } from '../utils';
import { Style, Element, } from '../typeDefinition';

type Props = {
	wrapperStyle?: Style,
	innerStyle?: Style,
	children?: Element,
	title?: String | Element,
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
			return <Text className="page-section-title" style={styles.titleText}>
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
		fontSize: 20, textAlign: 'center', fontWeight: '200',
		marginBottom: 30,
	},
});