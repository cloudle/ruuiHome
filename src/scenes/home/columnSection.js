import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import Icon from '../../components/vector-icons/EvilIcons';

import PageSection from '../../components/pageSection';
import { Style, Element } from '../../typeDefinition';

type Props = {
	wrapperStyle?: Style,
	innerStyle?: Style,
	configs?: {
		title?: String | Element,
		columns?: Array<Object>,
	},
};

export default class WhySection extends Component {
	props: Props;

	render() {
		const configs = this.props.configs || {};

		return <PageSection
			wrapperStyle={[styles.container, this.props.wrapperStyle]}
			innerStyle={[styles.innerContainer, this.props.innerStyle]}
			title={configs.title}>
			{configs.columns.map((column, i) => {
				return <View className="wow fadeIn" key={i} style={styles.sectionColumnContainer}>
					{column.icon && <Icon style={styles.columnIcon} name={column.icon}/>}

					{column.heading && <Text style={styles.columnHeadingText}>
						{column.heading}</Text>}

					{column.description && <Text style={styles.columnDescriptionText}>
						{column.description}</Text>}
				</View>;
			})}
		</PageSection>;
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
	},
	innerContainer: {
		flexDirection: 'row',
	},
	sectionColumnContainer: {
		flex: 1, paddingHorizontal: 30,
	},
	columnIcon: {
		fontSize: 50, textAlign: 'center', marginBottom: 18,
	},
	columnHeadingText: {
		textAlign: 'center', fontSize: 18, fontWeight: '600',
		marginBottom: 30,
	},
	columnDescriptionText: {
		textAlign: 'center', fontSize: 13,
	},
});