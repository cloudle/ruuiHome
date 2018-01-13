import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import Icon from './vector-icons/EvilIcons';

import PageSection from './pageSection';
import { baseStyles } from '../utils';
import { Style, Element } from '../typeDefinition';

type Props = {
	wrapperStyle?: Style,
	innerStyle?: Style,
	itemComponent?: Function,
	configs?: {
		dark?: Boolean,
		title?: String | Element,
		wowDelay?: Number,
		columns?: Array<Object>,
	},
};

export default class WhySection extends Component {
	props: Props;

	render() {
		const configs = this.props.configs || {},
			columns = configs.columns || [],
			wowDelay = configs.wowDelay || 0.5,
			ItemComponent = this.props.itemComponent || DefaultItemComponent;

		return <PageSection
			dark={configs.dark}
			wrapperStyle={[styles.container, this.props.wrapperStyle]}
			innerStyle={[styles.innerContainer, this.props.innerStyle]}
			title={configs.title}>
			{columns.map((column, i) => {
				return <ItemComponent key={i} instance={column} index={i} wowDelay={wowDelay}/>;
			})}
		</PageSection>;
	}
}

type DefaultItemComponentProps = {
	index?: Number,
	instance?: Object,
	wowDelay?: Number,
}

function DefaultItemComponent({ instance, index, wowDelay = 0.5 }: DefaultItemComponentProps) {
	const delay = `${index * wowDelay}s`;

	return <View
		className="wow fadeIn" data-wow-delay={delay}
		style={styles.sectionColumnContainer}>
		{instance.icon && <Icon style={styles.columnIcon} name={instance.icon}/>}

		{instance.heading && <Text style={styles.columnHeadingText}>
			{instance.heading}</Text>}

		{instance.description && <Text style={styles.columnDescriptionText}>
			{instance.description}</Text>}
	</View>;
}

const styles = StyleSheet.create({
	container: {

	},
	innerContainer: {
		flexDirection: 'row', flexWrap: 'wrap',
	},
	sectionColumnContainer: {
		flex: 1, minWidth: 300,
		paddingHorizontal: 30, marginBottom: 60,
	},
	columnIcon: {
		fontSize: 50, textAlign: 'center', marginBottom: 18,
	},
	columnHeadingText: {
		...baseStyles.text, fontSize: 18, fontWeight: '600',
		textAlign: 'center', marginBottom: 30,
	},
	columnDescriptionText: {
		...baseStyles.text, textAlign: 'center', fontSize: 14,
	},
});